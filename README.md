# Wisteria 官网源码说明

更新时间：2026-10-16。当前为静态 HTML / CSS / 原生 JavaScript 站点，无站点根目录构建依赖。维护原则：限定项目范围、保留已发布 URL、中英文同步、保持支付和授权兼容。

**先读源码仓库的 [官网与技术文档维护手册](https://github.com/sunny314woo/wisteria-suite/blob/main/apps/website/WEBSITE_RELEASE_RUNBOOK.md)**，其中包含准确目录、分支职责、本地预览、检查命令、Paddle / 服务器边界、发布和回滚。该手册在 monorepo 内，访问需要对应仓库权限；不随公开站点同步。

## 源码与分支

- 源码正本：`sunny314woo/wisteria-suite` 的 `apps/website/landing/wisteriasoftware.uk/`。
- 生产源分支：`wisteria-suite/main`。
- 自动公开副本：`sunny314woo/wisteriasoftware-site/main`，由 `Sync website repo` 写入，不手动维护。
- 正式域：<https://wisteriasoftware.uk/>。
- 技术文档 / 博客：独立仓库 `sunny314woo/wisteria-tech-docs`，发布到 <https://blog.wisteriasoftware.uk/>，不由此目录生成。

功能分支用于开发，推送后不会自动更新官网。只有相应官网变更进入 main 才触发同步；GitHub push 不会部署授权服务器。

## 页面分工

| 页面 | 职责 |
| --- | --- |
| `index.html` | 公司首页和产品概览 |
| `outlinesave.html` | OutlineSave 产品介绍，真实检索和导出截图 |
| `outline-pro.html` | OutlineSave 价格、购买、可展开对比、FAQ、退款说明 |
| `englishflow/` | EnglishFlow 独立产品页和购买流程，一个产品 |
| `inbox.html` | Inbox 产品页 |
| `product.html`、`pricing.html` | 保留原入口；不要随意删除或改路径 |
| `payment-success.html` / `.js` | 交易查询、激活码和受限重发 |
| `payment-cancel.html` | 取消返回 |
| `privacy.html`、`englishflow-privacy.html`、`terms.html`、`refund.html`、`support.html` | 政策及支持，保留地址和页脚入口 |

## 菜单、翻译与价格

- `i18n/config.js`：共享主导航和分组页脚；产品下并列 OutlineSave、EnglishFlow、Inbox。
- `i18n.js`：共享布局、电脑 / 手机菜单交互、语言选择、翻译。EnglishFlow 子站有独立导航。
- `i18n/locales/zh-Hans.js`：中文字典，正文使用 `data-i18n` 键；详见 [语言维护说明](i18n/README.md)。
- `style.css`：共享样式；`outline-pro.css`：购买区样式。
- `outline-pro-pricing-config.js`：已核对的 USD 显示快照、Price ID、Discount ID 和固定活动时间。
- `outline-pro-pricing-model.js` / `outline-pro-paddle-prices.js` / `outline-pro-pricing.js`：计算、Paddle 后台预览、真实或本地模拟结账。
- `outline-pro-pricing-i18n.js`：倒计时和模拟弹窗等动态消息。
- `checkout-return.js`：保留支付完成回跳协议。

Paddle 根据 ID 决定实际收款和税费。活动只给终身版默认折扣；到期隐藏优惠区并显示原价。启用全新 Price ID 前，先确认授权服务器映射。不要在静态文件中存服务端密钥。

## 本地预览

在本目录运行 OutlineSave 专用模拟预览：

```bash
OUTLINE_PREVIEW_PORT=8765 node tests/serve-outline-pro-preview.mjs
```

打开 `http://127.0.0.1:8765/outline-pro.html?lang=zh-CN#pricing`，英文使用 `lang=en`。本地不产生真实支付或邮件。到期、自定义价格等场景和测试命令见统一手册。

预览 EnglishFlow 等完整静态目录：

```bash
python3 -m http.server 8080 --bind 127.0.0.1
```

该普通服务器没有模拟支付 API，也不保证所有产品的真实支付被禁用。支付验证按各产品文档执行。

## 发布注意

`tests/` 不同步生产；其他目录文件会同步公开，不能存私有资料。修改 CSS / JS 后更新 HTML 中对应资源的 `?v=...`。发布后检查主分支、同步工作流、公开副本和正式域，不能仅凭本地分支名或流水线绿灯判断成功。
