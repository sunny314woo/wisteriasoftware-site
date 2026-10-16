# OutlineSave 价格区改版：本地审查

开发分支：`codex/outline-pro-pricing`，基于 `origin/main` 的 `97b009d`。
本改动在独立 worktree 中开发，未修改原工作区中的未提交改动。用户已授权 main 发布；发布需先确认服务器识别新终身 Price ID，具体状态见最新发布记录。

## 启动与预览

在本目录运行（需要 Node.js，无需安装 npm 依赖）：

```sh
node tests/serve-outline-pro-preview.mjs
```

- 中文：<http://127.0.0.1:8765/outline-pro.html?lang=zh-CN>
- 英文：<http://127.0.0.1:8765/outline-pro.html?lang=en>
- 已到期：<http://127.0.0.1:8765/outline-pro.html?lang=zh-CN&scenario=expired>
- 未开始：<http://127.0.0.1:8765/outline-pro.html?lang=zh-CN&scenario=upcoming>
- 自定义金额及时间示例：<http://127.0.0.1:8765/outline-pro.html?lang=zh-CN&scenario=custom>
- 旧版外观：<http://127.0.0.1:8765/outline-pro-legacy.html?lang=zh-CN>，购买入口已由预览服务器禁用。

端口可通过 `OUTLINE_PREVIEW_PORT=8766` 更改。服务器仅绑定 `127.0.0.1`，用 CSP 禁止外部请求、第三方脚本和支付 iframe。
所有 `scenario` 均为本地服务器注入的测试数据，生产页面不解析这些参数。

点击购买按钮 → 模拟结账 → 模拟支付成功，会进入原有 `payment-success` 页面。
该页面源文件保持原样，预览服务器仅在响应中将其 API 地址改为本地假接口。
示例激活码为 `DEMO-CODE-0000`，无法激活真实许可证；邮件重发仅模拟成功、冷却及限次，不发送邮件。

## 配置入口

`outline-pro-pricing-config.js` 提供默认配置。也可在加载该文件之前设置 `window.OutlineSavePricingInput`，各配置组会与默认值合并。
配置金额仅用于本地模拟；正式页面通过 Paddle.PricePreview() 读取金额和优惠。时间使用带时区的 ISO 字符串。不从浏览器首次访问时间、localStorage 或刷新时间推算截止时间。

```js
window.OutlineSavePricingInput = {
  annual: { amount: 2499, priceId: 'pri_01kqsj92jxydy135ep6cdex06f' },
  lifetime: { amount: 4999, priceId: 'pri_01m4t0yykn0h1dcvzt97qsnzt2' },
  campaign: {
    startsAt: '2026-10-16T00:00:00+08:00',
    endsAt: '2026-11-15T00:00:00+08:00',
    discountAmount: 1000,
    discountId: 'dsc_01kvwqx6yfm3ba3319109j6att',
    discountCode: '10discount',
  },
};
```

本地金额和活动日期按配置；正式金额与实际减免按 Paddle 预览返回值。活动天数从固定起止日期计算，不写死 30 天。
如果传入有效的 `discountId`，优先使用该 ID；否则使用已确认的 `discountCode`，不会同时传两者。
年度版始终不带优惠参数，且禁止 Checkout 手动添加其他折扣。

活动未开始、已到期或时间/折扣配置无效时，显示配置中的正常终身价格。
到期后隐藏倒计时、早鸟标记、划线原价和节省金额，购买参数同时移除折扣。页面和模拟结账保持打开跨过截止时刻也会更新；模拟结账中的价格变化需要再次确认。
SEO 的 SoftwareApplication/Product Offer 价格同步更新；Organization、WebSite、BreadcrumbList、FAQPage 与原版一致。

## Paddle 后台核对（2026-10-16）

根据用户提供的信息，通过已登录的 Paddle 页面核实：

- `pri_01m4t0yykn0h1dcvzt97qsnzt2` 是 OutlineSave 的 $49.99 终身版一次性价格。
- 使用已有 `zhaoniao 10` 折扣，代码 `10discount`，固定减 USD 10，仅限上述 $49.99 价格，单次付款应用，Checkout code 已启用。
- 按用户授权，仅为已有折扣增加截止时间：`2026-11-14 16:00 UTC`，即 `2026-11-15 00:00 Asia/Shanghai`。
- 未创建新折扣，未修改价格，未修改其他优惠或现有官网支付入口。
- 后续已从后台折扣表的实际记录取得 ID `dsc_01kvwqx6yfm3ba3319109j6att`，与 `10discount` 为同一优惠；正式预览和结账优先使用该 ID。

官方参数文档：<https://developer.paddle.com/paddle-js/methods/paddle-checkout-open/>

## 正式价格与结账

用户已授权发布。准备发布的配置为 live，已填入原官网公开的 Paddle 客户端 token（不是服务端 API key）、用户确认的年度 Price ID、新终身 Price ID 和现有折扣 ID。只有官方域名可打开真实 Checkout；localhost/file 仍强制模拟，非官方域名禁用。

正式页面加载时调用 Paddle.PricePreview()，读取 USD 基准价格。活动期内额外预览终身折扣；在打开 Checkout 前重新读取，金额和节省文案随 Paddle 结果更新。失败或 15 秒超时时禁用购买，不用本地模拟价格继续结账。实际税费与最终总额由 Paddle 结账页按真实地区计算。

活动时间仍由配置驱动，需与 Paddle 折扣有效期保持一致。现有 checkout-return.js、付款成功页、许可证协议和交易回调保持原样。

服务器操作参见 `services/api-server/ops/outlinesave-price-deployment.md`；先新增新终身 Price ID 映射，再发布官网。真实扣款、真实发证与邮件投递未由本地模拟测试代替；本次只通过真实 Paddle SDK 读取价格，没有发起付款。

## 验证命令

```sh
node --test tests/*.test.mjs
python tests/outline-pro-browser.py
```

浏览器脚本需要 Python Playwright 和本机 Chrome；未增加网站运行依赖。
可用临时虚拟环境安装：`python3 -m venv /tmp/outline-pro-browser-env`，再运行 `/tmp/outline-pro-browser-env/bin/pip install playwright`。
脚本使用真实 Chrome 的无界面进程，默认生成截图和结果到 `/tmp/outline-pro-preview-artifacts/`。
`CHROME_PATH`、`OUTLINE_PREVIEW_URL`、`OUTLINE_PREVIEW_ARTIFACTS` 可覆盖默认路径。

## 回滚

原始 HTML（含原支付逻辑）和 CSS 保存在 `tests/fixtures/outline-pro-legacy.html`、`tests/fixtures/outline-pro-legacy.css`，与分支基线内容逐字一致。`tests/` 不会被现有生产同步 workflow 发布。
如未来合并后需完整回滚，revert 本功能提交即可恢复原价格页、样式和原支付逻辑。
也可从基线 `97b009d` 恢复 `outline-pro.html`、`outline-pro.css` 及相应测试，再移除本次新增的配置/控制器脚本引用。
回滚官网代码不会自动撤销 Paddle 后台的折扣截止日期；若需要延长或重开折扣，应单独调整后台。

## 本次验证记录（2026-10-16）

- Node 自动化：38 项通过，含原付款成功页、两次邮件重发及冷却、交易回调、analytics 与新增定价边界测试。
- 真实 Chrome 无界面回归：22 项通过。中英文分别覆盖 320 / 390 / 768 / 1024 / 1440px，无横向溢出；验证比较表展开、FAQ、语言切换、倒计时刷新、配置覆盖、未开始/已到期状态、开着结账弹窗跨过截止时刻。
- 年度/终身模拟支付均进入原付款成功页，本地演示激活码及重发次数在刷新后仍正确。
- 拦截 SDK 的虚拟官方域名测试确认：终身版传指定 Price ID 与 `discountCode: '10discount'`；年度版和到期终身版均无折扣参数。没有真实请求发往 Paddle 或生产 API。
- 既有 i18n 架构检查、品牌检查、9 个页面中英文往返检查、JS 语法与 `git diff --check` 通过。
- 新增 Price ID 的真实扣款、真实许可证签发、真实邮件投递尚未测试，继续保持关闭。

## 按参考图调整（2026-10-16）

- 购买区改为纯白边框面板；倒计时横跨两张卡片上方，年度卡使用紫色描边按钮，终身卡使用浅紫色边框和紫色按钮。
- Free / Pro 对比默认折叠。点击「查看免费版与 Pro 的完整对比」展开后，按钮切换为「收起免费版对比」，箭头朝上；再次点击收起。使用原生 details/summary，支持 Enter / Space，禁用 JavaScript 时折叠本身仍可用。
- 中英文切换保留展开状态，并同步更新可见标签和辅助技术读取的控件名称。
- 「只比一年版多多少钱」根据两个方案当前价格计算；活动天数根据配置起止时间计算。到期后横幅、划线价格、早鸟标签和差价提示一起隐藏，正常价与模拟支付规则不变。
- 本轮 38 项 Node 检查、23 项 Chrome 浏览器检查、现有 i18n / 品牌 / 9 页语言往返检查通过。中英文均覆盖 320 / 390 / 768 / 1024 / 1440px，检查默认折叠、展开、收起、键盘操作、切换语言和优惠到期。
- 本轮未修改 Paddle 后台或价格配置，仍只在开发分支上使用模拟支付。

## 最新精简调整（2026-10-16）

- 顶部仅保留主标题，移除重复的权益副标题及「免费每周一次 → Pro 无限次」说明。具体权益放在购买卡片内，免费额度仅在比较表中列出。
- 删除购买卡下方的 Paddle / 美元计价提示与本地预览提示。模拟支付开关和本地接口隔离保持原样，模拟结账弹窗仍清楚标示测试性质。
- 比较区最大宽度缩至 640px 并居中（最新为四列布局）；入口固定为「免费版与 Pro 对比」（英文 Free & Pro comparison），展开与收起时不更换文字，仅箭头表示状态。
- Pro 列采用淡紫背景和 Pro 标记，突出「不限次数」及优先支持；两张购买卡的高级 HTML 无限次导出权益加粗。
- 38 项 Node、23 项 Chrome 浏览器回归及既有多语言检查通过，覆盖固定标题、居中宽度、10 组语言/尺寸组合及原模拟支付流程。

## 四列比较与首屏调整（2026-10-16）

- 比较表改为「功能 / 免费版 / Pro 一年版 / Pro 终身版」，第一列缩为 30%（手机 28%），免费版表头与 Pro 列用不同浅底色区分。
- 两列 Pro 分别突出无限次高级 HTML 导出，并增加授权期限一行。两种付费方案权益相同，区别为一年 / 终身；表内不放价格或购买按钮。
- OutlineSave Pro 品牌移入两张购买卡，移除顶部独占行；收紧首屏间距。页面只保留卡片内两个购买按钮，不提供额外浮动价格按钮。
- Chrome 验证中英文在 1280×720、1366×768、1440×900 下无需滚动即可看到两个卡片购买按钮。窄屏保留卡片纵向排列，四列表格在 320 / 390px 下可读且无页面横向溢出。
- 最终验证：38 项 Node 自动化、24 项 Chrome 浏览器检查通过；同时通过 i18n 架构、品牌、9 页中英文往返及 diff 检查。支付配置、Paddle 后台和生产环境未改动。

## 表头、试用与卡片交互（2026-10-16）

- 比较表头统一为白底深色文字，删除紫底 PRO 标签及 Pro 列紫字 / 紫色底。用字重突出无限次导出，继续保留四列。
- 试用放在免费版对应的「Pro 试用：7 天」单元格中，不增加独立方案列。说明沿用现有 FAQ：免费用户首次高级 HTML 导出开启试用，无需绑卡，到期回到免费版。没有修改插件试用逻辑或承诺额外权益。
- 终身卡默认显示外框和按钮高亮；鼠标经过任一卡片，高亮跟随该卡片，并轻微上浮 3px；移出恢复终身卡默认高亮。键盘聚焦年度按钮时也转移高亮；减少动态效果偏好下禁用位移与过渡。没有新增购买按钮或持久化选择。
- 划线价格加「原价 / Regular」说明并加深文字颜色；金额仍由配置填充。活动到期时整组原价说明与其他早鸟元素一起隐藏。
- 本轮最终验证：38 项 Node 自动化、25 项 Chrome 检查以及 i18n / 9 页语言往返检查通过。包含默认终身高亮、悬停年度 / 终身、离开恢复、键盘、减少动态效果、优惠跨截止和原模拟支付流程。

## 柔化比较表与合并试用期限（2026-10-16）

- 删除独立「Pro 试用」行；免费版的授权期限直接显示「7 天试用」，与一年 / 终身方案同一行，保留原试用开启及到期说明。
- 表格保持居中 640px，取消硬外框与所有竖线，改为极浅横向分隔、圆角和轻微阴影。Pro 表头及无限次导出对应单元格用少量浅紫强调，其他区域维持白底 / 近白底与深色文字。
- 不改变卡片默认终身高亮、悬停切换、配置价格、优惠截止时间或支付流程。
- 38 项 Node、25 项 Chrome 回归及 i18n 检查通过；中英文 320 / 390 / 768 / 1024 / 1440px 验证通过，授权期限行在两种语言中均为三种方案对应值，表格保持五个功能行。

## 购买卡片检索卖点（2026-10-16）

- 仅两张购买卡片将「目录检索」改为「400+ 轮长对话的二级目录检索」，英文为 Two-level outline search for 400+ turn chats，深色文字适度加粗；顶部主标题及比较表行名保持原样。
- 通过中英文 10 组屏幕宽度与 6 组桌面首屏检查、9 项定价测试及既有 i18n 往返检查。本次仅改展示文案与字重，未修改支付配置或服务器。

## 产品介绍与销售分离（2026-10-16）

- 新增 `outlinesave.html` 和独立 `outlinesave.css`：大标题「400+ 个问题，也能找对那一条」，配原 `outline-search.png`；下方迁入两级目录、书签 / 高亮 / 笔记、离线知识与备份说明，以及原 `html-export.png`。两张原图文件未修改，展示完整比例，可点击看原图。
- 原 `outline-pro.html` 与现有 `/outline-pro` 入口继续负责销售。移走功能截图、长篇功能介绍及三项保障介绍；保留价格、比较表、完整原 FAQ、结账控制器、成功回调及现有 JSON-LD。页面标题和描述调整为价格与授权用途。
- 销售页增加轻量介绍页入口；介绍页的 Pro 链接仍回到 `outline-pro.html#pricing`。新链接脚本只维护页面间的 `lang` 和 `source`，不触碰支付参数。
- 首页和产品列表的介绍按钮、共享导航 / 页脚的 OutlineSave 产品入口指向新介绍页；导航保留 OutlineSave Pro 的原销售入口。新增站点地图记录。
- 本地启动命令保持不变：`node tests/serve-outline-pro-preview.mjs`。介绍页为 `http://127.0.0.1:8765/outlinesave.html?lang=zh-CN`；销售页为 `http://127.0.0.1:8765/outline-pro.html?lang=zh-CN`。新增 `/outlinesave` 本地简写路由。
- 本轮验证：38 项 Node、原销售页 25 项 Chrome 检查通过；新增介绍页回归覆盖中英文 320 / 390 / 768 / 1024 / 1440px、两张图片载入及完整比例、两页往返与来源保留、语言菜单、首页 / 产品列表入口和本地模拟购买；10 页中英文往返、i18n 架构和品牌检查通过。
- 无真实 Paddle 配置、价格、服务器或生产部署变更。页面拆分不需要更改后端；未来切换新 Price ID 时仍需单独完成前述服务器映射与真实支付配置。

## 发布准备与保障模块（2026-10-16）

- 用户授权推送 main，销售页仍保留 `outline-pro.html` 及现有 `/outline-pro?...#pricing` 入口。main 发布会触发官网同步，先等服务器映射更新成功。
- 三项保障同时保留在介绍页与销售页；销售页放在 FAQ 后、最后购买引导之前，含退款政策链接。
- 价格来源改为真实 Paddle PricePreview，已实际读取 $24.99 / $49.99 / 减 $10 后 $39.99。活动窗口或页面可见性变化时更新，购买前复核。41 项 Node 测试及 28 项销售页浏览器回归通过，包含 Paddle 返回金额变化与失败禁用。
- 单文件服务器更新器已通过 5 项本地测试（旧 ID 保留、识别新 ID、只读检查、幂等及失败回滚）并已上传；用户已执行 --apply 并报告部署成功；备份 `/opt/m2-m4/deploy-backups/paddle-lifetime-price-8wnc3ssh`。随后通过 SSH 再次 --check：新 ID 已识别，服务健康，未重复修改或重启。
