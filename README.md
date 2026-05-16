# Wisteria 官网（wisteriasoftware.uk 静态落地站）

**文档更新时间：** 2026-05-07  

**当前维护状态：** 静态站点；无根目录 `package.json` 构建链（以当前仓库为准）。部署方式（如 Cloudflare Pages）见站内 `cf-pages-trigger.html` 等线索，具体生产配置 **待确认** 运维文档。  

**项目定位：** 产品介绍、定价、法律条款、支付成功/取消页、Outline / Inbox 相关落地页的多语言静态站点；通过 `i18n/` + `i18n.js` 在浏览器端完成语言切换与文案注入。  

**维护原则：** 多语言依赖 DOM（`data-i18n` 与部分 `selectors` 桥接），改 HTML 结构后需回归各语言；不假设 CDN 或域名重定向细节；不在此写入 Paddle 密钥。

---

## 1. 项目简介

本站由多个 `.html` 页面、`style.css`、`analytics.js` 及 `i18n/` 字典组成。简体中文等语言既有独立路径页面（如 `zh-Hans/`），也由运行时脚本根据 `localStorage`、路径、`config.js` 中的默认语言解析。

---

## 2. 当前功能

- 静态营销与法务页：`index.html`、`product.html`、`outline-pro.html`、`pricing.html`、`privacy.html`、`terms.html`、`refund.html`、`support.html`、`inbox.html` 等。
- 支付结果页：`payment-success.html`、`payment-cancel.html`。
- 多语言：`i18n/config.js`、`i18n/locales/*.js`、根目录 `i18n.js`；加载顺序见 `i18n/README.md`。
- SEO 相关：`sitemap.xml`、`robots.txt`、`site.webmanifest`（以实际文件为准）。

---

## 3. 技术栈

- 静态 HTML / CSS / 原生 JavaScript。
- 无强制打包工具（仓库现状）；`analytics.js` 等外链策略 **待确认** 是否启用。

---

## 4. 目录结构（要点）

```
wisteriasoftware.uk/
├── index.html, pricing.html, outline-pro.html, ...
├── zh-Hans/           # 部分本地化静态页
├── i18n/
│   ├── config.js
│   ├── locales/zh-Hans.js, ...
│   └── README.md      # i18n 维护说明（英文）
├── i18n.js            # 运行时翻译与语言切换
├── style.css, analytics.js, footer.html, ...
└── assets / images（见各 HTML 引用）
```

---

## 5. 核心文件说明

- **`i18n/config.js`：** 支持的语言列表、别名、`localStorage` 键、SEO 路径等。
- **`i18n.js`：** 读取字典、`data-i18n` 替换、语言选择器注入、与 `footer.html` 等共享布局的衔接（以代码为准）。
- **`i18n/locales/zh-Hans.js` 等：** 翻译表；可能含 `selectors` 映射兼容旧页面。
- **`outline-pro.html` / `pricing.html`：** 商业与产品核心入口，常与 Paddle 结账链接配合（链接形态以 HTML 为准）。

---

## 6. 本地开发与启动

静态站无需编译时，可用任意静态服务器预览，例如在本目录执行：

```bash
cd apps/website/landing/wisteriasoftware.uk
python3 -m http.server 8080
```

浏览器访问 `http://127.0.0.1:8080/`。若相对路径或 `<base href>` 与本地路径冲突，以页面实际引用为准。

（若团队规定使用 `npx serve` 等，**待确认** 统一命令。）

---

## 7. 配置与环境变量

- 无服务端 `.env`。Paddle、API 域名等多在 HTML/JS 中硬编码或由外链脚本提供；具体键名与生产域名 **待确认** 与 `services/api-server` / 支付后台一致。

---

## 8. 数据流 / 业务流程

- 用户浏览静态页 → 点击购买 → 跳转 Paddle Hosted Checkout（细节以页面链接为准）→ 支付成功/取消回到本站或 API 同源页面（与 `services/api-server` 的 `payment-success` 等路由关系 **待确认** 当前主用哪一套）。
- i18n：首屏英文 fallback → 脚本加载字典 → 按优先级覆盖文案。

---

## 9. 与其他项目的关系

| 项目 | 关系 |
|------|------|
| `services/api-server` | License、Webhook、部分支付成功页可由 API 同源托管（见该服务 `main.py`） |
| `apps/chatgpt-outline` | 官网引导安装扩展；API 域名一致 |
| `apps/website/app.wisteriasoftware.uk` | 另一子域门户，站点根隔离 |

---

## 10. 当前风险与注意事项

- **多语言脆弱性：** 依赖 DOM 结构与 `selectors`；改版易漏翻或错绑。
- **双站点：** landing 与 `app.wisteriasoftware.uk` 内容可能重复或链接分叉，需避免用户迷路。
- **支付回调 URL：** 须与 Paddle 后台、API 服务配置一致，否则支付成功但无法发证。

---

## 11. 后续开发建议

- 新页面优先使用 `data-i18n` 键（见 `i18n/README.md`），减少 `selectors` 依赖。
- 重大文案或定价变更同步 `sitemap`/`hreflang`（若使用）。

---

## 12. 给未来 AI / 维护者的提示

- 深度问题分析可参考 `docs/website-多语言专项审计-2026-05.md`（若存在）；最终以浏览器开发者工具中网络与控制台为准。
- 修改 `zh-Hans/` 下页面时注意 `<base href="../" />` 对相对路径的影响。
