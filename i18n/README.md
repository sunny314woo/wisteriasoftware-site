# Wisteria 官网语言维护

更新时间：2026-10-16。发布步骤见源码仓库的 [统一维护手册](https://github.com/sunny314woo/wisteria-suite/blob/main/apps/website/WEBSITE_RELEASE_RUNBOOK.md)，需要对应仓库权限。

## 当前结构

- `config.js`：语言、别名、存储键、共享主导航和分组页脚。
- `locales/zh-Hans.js`：中文字典，注册到 `window.WISTERIA_I18N_DICTIONARIES`；英文原文直接保留在 HTML。
- `../i18n.js`：语言选择、共享布局、键值翻译、页面 title / description 和缺失键记录。
- `../outline-pro-pricing-i18n.js`：购买区倒计时、模拟支付等动态消息，单独维护中英文。

当前正文翻译只按 `data-i18n` 键执行，旧 `selectors` 字典和 `i18n-semantic.js` 自动绑定层已经移除。不要依据旧文档重新引入它们；CI 会检查。

加载顺序保持：

```html
<script src="i18n/config.js" defer></script>
<script src="i18n/locales/zh-Hans.js" defer></script>
<script src="i18n.js" defer></script>
```

生产 HTML 使用资源版本参数，更新脚本后也要更新相应引用。`zh-Hans/` 旧页面保留 `<base href="../" />`，属于兼容入口，不是新的主维护路径。

## 内容和属性翻译

```html
<h1 data-i18n="content.example.heroTitle">English fallback</h1>
<img src="example.png" alt="English fallback"
  data-i18n-attrs="alt" data-i18n-alt="content.example.imageAlt" />
```

在中文词典中加入对应键。新键描述语义，不包含 `nth-child` 或布局位置；旧键不为改版随意重命名。页面元数据放在词典 `pages[页面文件名]`。不要把动态价格或活动日期写成普通翻译常量。

## 语言优先级和 URL

1. URL 中明确的 `?lang=`。
2. 已保存的语言选择。
3. 旧本地化路径，如 `/zh-Hans/`。
4. 浏览器语言。
5. 默认英文。

中文内部代码 `zh-Hans`，公开 query 为 `zh-CN`。语言按钮通过 history 替换 query，保留当前路径、其他参数及 hash；不因切换语言重命名产品页和回调 URL。只标为可选择的语言才开放切换，pending 语言不能仅凭列表存在就宣称已支持。

OutlineSave、EnglishFlow、Inbox 和平台品牌名保留原名。EnglishFlow 独立页面不自动套用共享语言组件；技术文档 / 博客的 UI 翻译也属于另一个仓库，不能混改。

## 共享菜单和页脚

入口统一在 `config.js` 的 `sharedLayout`。共享头部由运行时渲染，不能只改某个 HTML 中的旧头部而期望全站生效。主导航分组使用展开按钮，子项保留现有 href；中文标签在词典的 `shared.nav` / `shared.footer` 中维护。

产品为 OutlineSave、EnglishFlow、Inbox；页脚政策、支持和公司信息保留。菜单改动须同时检查手机触摸、电脑键盘、Escape、外部点击及语言切换。

## 检查

从 monorepo 根目录执行（运行时测试需 `jsdom@26`，安装方式见统一手册）：

```bash
node scripts/check-wisteria-i18n.js
node scripts/check-wisteria-branding.js
node scripts/test-wisteria-i18n-runtime.js
node scripts/test-wisteria-navigation.js
```

浏览器检查 EN → 中文 → EN、标题、正文、图片 alt、菜单、页脚及动态消息。`window.WisteriaI18n.missingKeys` 应为空；没有缺失键不代表文案语义正确，仍需查看页面。

## 支付保护边界

翻译任务只改可见文案。不要顺带修改 Price ID、折扣、`checkout.completed` 回调、交易存储键、成功地址、API 路径或激活 / 重发逻辑。涉及购买页时按范围运行支付回归，纯翻译不主动发起真实付款或邮件。
