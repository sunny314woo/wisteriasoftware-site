/*
 * 【MODIFIED】File purpose: Simplified Chinese translation dictionary for the static Wisteria landing site.
 * Main functions: provides shared navigation/footer, page selector translations, and runtime strings for dynamic UI.
 * Latest modification purpose: support first-stage Chinese i18n without expanding hand-written /zh-Hans/ pages.
 */
(function () {
  window.WISTERIA_I18N_DICTIONARIES = window.WISTERIA_I18N_DICTIONARIES || {};

  window.WISTERIA_I18N_DICTIONARIES["zh-Hans"] = {
    shared: {
      nav: {
        "index.html": "首页",
        "product.html": "产品",
        "pricing.html": "价格",
        "outline-pro.html": "Outline",
        "englishflow/": "FluentSocial AI",
        "inbox.html": "Inbox",
        "support.html": "支持",
        "privacy.html": "隐私",
        "privacy-general": "通用隐私",
        "englishflow-privacy.html": "FluentSocial AI",
        "terms.html": "条款",
        "refund.html": "退款",
      },
      footer: {
        "product.html": "产品",
        "pricing.html": "价格",
        "outline-pro.html": "Outline",
        "englishflow/": "FluentSocial AI",
        "inbox.html": "Inbox",
        "support.html": "支持",
        "privacy.html": "隐私政策",
        "englishflow-privacy.html": "FluentSocial AI 隐私政策",
        "terms.html": "服务条款",
        "refund.html": "退款政策",
      },
      company:
        "© 2026 Wisteria Software Ltd.<br />在英格兰和威尔士注册。<br />公司编号：16965144<br />邮箱：",
    },
    pages: {
      "index.html": {
        title: "Wisteria Software - Wisteria Suite",
        description:
          "Wisteria Software 是英国注册的独立软件公司，为认真使用 AI 的开发者、科研人员、创作者和知识工作者构建本地优先效率工具。",
        selectors: {
          ".eyebrow": "英国独立软件公司",
          ".hero-title": "为认真使用 AI 的人构建软件。",
          ".split-hero > div > .subtitle":
            "<strong>Wisteria Software</strong> 是一家英国注册的独立软件公司，面向 AI 时代构建本地优先的效率工具。我们帮助开发者、科研人员、创作者和重度 AI 用户导航长对话、保留重要上下文，并把有价值的输出沉淀成真正属于自己的第二大脑。",
          ".split-hero .hero-actions .btn-link.primary": "了解 Outline",
          ".split-hero .hero-actions .btn-link.secondary": "查看产品套组",
          ".hero-card h2": "我们重视什么",
          ".hero-points li:nth-child(1)":
            "<strong>数据归属：</strong>本地优先的工作流，让重要材料留在你的掌控之中。",
          ".hero-points li:nth-child(2)":
            "<strong>流畅效率：</strong>减少滚动、搜索、复制和上下文切换。",
          ".hero-points li:nth-child(3)":
            "<strong>知识记忆：</strong>为 AI 工作建立实用的第二大脑层。",
          "main > section:nth-of-type(1) .section-intro h2": "为 AI 工作日而构建",
          "main > section:nth-of-type(1) .section-intro .subtitle":
            "AI 很强大，但围绕 AI 的工作很容易变乱：长线程、分散截图、想不起在哪的答案，以及被困在昨天对话里的好想法。",
          "main > section:nth-of-type(1) .meta-card:nth-child(1)":
            "<strong>更快推进</strong>在长 AI 对话中快速定位，不丢位置，也不打断思路。",
          "main > section:nth-of-type(1) .meta-card:nth-child(2)":
            "<strong>保留重点</strong>在信息消失前捕捉重要答案、研究片段、截图和笔记。",
          "main > section:nth-of-type(1) .meta-card:nth-child(3)":
            "<strong>建立第二大脑</strong>把有用的 AI 输出变成可复用的知识，并整理在你自己的设备上。",
          "main > section:nth-of-type(2) h2": "Wisteria Suite",
          "main > section:nth-of-type(2) > p":
            "我们的产品套组遵循一个简单工作流：导航对话、捕捉重点，并把它们保存在本地优先的系统中，用于回顾和复用。",
          ".product-card:nth-child(1) .status-pill": "现已可用",
          ".product-card:nth-child(1) h3": "Outline",
          ".product-card:nth-child(1) .subtitle":
            "面向长 ChatGPT 和 Gemini 对话的智能侧边栏大纲。跳转消息、收藏重要问答，导出为 Markdown 或 HTML，并备份到你自己的 Google Drive。",
          ".product-card:nth-child(1) .btn-link.primary": "查看 Outline",
          ".product-card:nth-child(2) .status-pill": "现已可用",
          ".product-card:nth-child(2) h3": "Inbox Capture",
          ".product-card:nth-child(2) .subtitle":
            "浏览器伴侣工具，用于把有价值的网页文本、截图、图片和笔记保存到你的知识工作流。",
          ".product-card:nth-child(2) .btn-link.primary": "查看 Inbox",
          ".product-card:nth-child(3) .status-pill": "可下载",
          ".product-card:nth-child(3) h3": "Inbox Local",
          ".product-card:nth-child(3) .subtitle":
            "本地优先的 macOS 应用，用于整理和回顾 AI 对话、捕捉材料与工作笔记。",
          ".product-card:nth-child(3) .btn-link.primary": "查看 Inbox",
          ".product-card:nth-child(4) .status-pill": "现已可用",
          ".product-card:nth-child(4) h3": "FluentSocial AI",
          ".product-card:nth-child(4) .subtitle":
            "面向 Reddit 与 X 的上下文语言助手。双语阅读对话，并起草自然回复；发送前始终由你审核。",
          ".product-card:nth-child(4) .btn-link.primary": "查看 FluentSocial AI",
          ".product-card:nth-child(4) .btn-link.secondary": "查看隐私政策",
          "main > section:nth-of-type(3) h2": "为依赖 AI 的人服务",
          "main > section:nth-of-type(3) > p":
            "Wisteria Software 面向那些希望 AI 工作更快、更安全、更可沉淀的人：在长线程中调试的开发者、保留推理和资料的科研人员、收集灵感的写作者，以及希望把每日 AI 输出变成长期知识的知识工作者。",
          "main > section:nth-of-type(3) .hero-actions .btn-link.primary": "观看 Outline 演示",
          "main > section:nth-of-type(3) .hero-actions .btn-link.secondary": "探索产品套组",
        },
      },
      "privacy.html": {
        title: "隐私政策 - Wisteria Software",
        description:
          "Wisteria Software 产品的隐私政策，包括 Outline、Inbox Capture 和 Inbox Local / Wisteria Inbox。",
        selectors: {
          ".compact-hero h1": "隐私政策",
          ".compact-hero .subtitle":
            "适用于 <strong>Wisteria Software</strong> 产品，包括 <strong>Outline</strong>、<strong>Inbox Capture</strong> 和 <strong>Inbox Local / Wisteria Inbox</strong><br /><strong>最后更新：</strong>2026 年 6 月 7 日",
          ".contact-box p": "<strong>隐私摘要：</strong>",
          ".contact-box li:nth-child(1)": "<strong>本地处理</strong>：ChatGPT 和 Gemini 对话内容在你的浏览器本地处理。",
          ".contact-box li:nth-child(2)":
            "<strong>不上传我们的服务器</strong>：我们不会将聊天内容上传到 Wisteria Software 的服务器。只有当你主动使用 Google Drive 备份时，所选导出文件才会直接发送到你自己的 Google Drive。",
          ".contact-box li:nth-child(3)": "<strong>无广告追踪</strong>：我们不使用广告追踪器，也不出售个人数据。",
          ".contact-box li:nth-child(4)":
            "<strong>极简数据收集</strong>：仅收集激活、计费和客户支持所需的有限信息。",
          ".contact-box li:nth-child(5)":
            "<strong>支付安全</strong>：所有支付均由我们的 Merchant of Record <strong>Paddle</strong> 安全处理。",
          "main > section:nth-of-type(2) h2": "1. 一般信息",
          "main > section:nth-of-type(2) p:nth-of-type(1)":
            "本隐私政策说明 <strong>Wisteria Software Ltd.</strong> 如何处理与本网站、产品页面、结账相关流程、客户支持以及本站列出的产品有关的数据。",
          "main > section:nth-of-type(2) p:nth-of-type(2)":
            "根据具体产品，数据可能在你的设备本地处理，也可能由支付或基础设施服务商处理，或在授权、支持、安全、反滥用和服务运行所必需时由我们处理。",
          "main > section:nth-of-type(2) p:nth-of-type(3)":
            "对于网站本身，我们以及托管或 CDN 服务商可能会处理有限的技术请求数据，例如用户代理、请求路径、时间戳，以及基础错误或安全日志，用于交付页面、防止滥用、排查问题、保持服务可靠性，并了解聚合页面使用情况。",
          "main > section:nth-of-type(2) p:nth-of-type(4)":
            "我们可能使用保护隐私的网站分析工具，例如 Cloudflare Web Analytics，以了解聚合页面浏览量、来源、设备/浏览器类别和页面性能。这些分析用于网站运行和改进，不用于广告或跨站画像。",
          "main > section:nth-of-type(3) h2": "2. Outline",
          "main > section:nth-of-type(3) p:nth-of-type(1)":
            "本部分适用于面向 <strong>ChatGPT</strong> 和 <strong>Gemini</strong> 的浏览器扩展功能。",
          "main > section:nth-of-type(3) p:nth-of-type(2)":
            "<strong>对话内容处理</strong>：扩展读取的对话内容会在浏览器本地处理，不会上传到我们的服务器。",
          "main > section:nth-of-type(3) p:nth-of-type(3)":
            "<strong>导出功能</strong>：导出 Markdown 或 HTML 时，文件会在本地生成并由你保存。HTML 导出可包含目录。",
          "main > section:nth-of-type(3) p:nth-of-type(4)":
            "<strong>Google 账号授权与 Google Drive 备份</strong>：只有当你选择使用自己的 Google 账号进行授权时，扩展才会使用 Chrome 的 <code>identity</code> 权限。身份验证由 Chrome 和 Google OAuth 处理。",
          "main > section:nth-of-type(3) p:nth-of-type(5)":
            "扩展仅使用取得的授权令牌，将对话导出文件上传到你所选择的 Google Drive 位置。文件仅在你主动发起备份时直接上传到你自己的 Google Drive，不会经由或存储在 Wisteria Software 的服务器上。",
          "main > section:nth-of-type(3) p:nth-of-type(6)":
            "扩展不会收集、存储、出售或分享你的 Google 身份信息。Google 可能依据其自身的隐私政策和服务条款处理账号信息及上传的文件。",
          "main > section:nth-of-type(3) p:nth-of-type(7)":
            "<strong>我们收集的数据</strong>：为了管理订阅和许可证，启用付费功能时我们可能收集以下信息：",
          "main > section:nth-of-type(3) li:nth-child(1)":
            "Paddle（Merchant of Record）提供的购买相关标识符",
          "main > section:nth-of-type(3) li:nth-child(2)":
            "许可证、激活或权益状态信息",
          "main > section:nth-of-type(3) li:nth-child(3)":
            "用于启用或限制产品功能所必需的本地扩展数据",
          "main > section:nth-of-type(3) li:nth-child(4)":
            "你联系我们时产生的支持沟通数据",
          "main > section:nth-of-type(3) p:nth-of-type(8)":
            "上述数据仅用于许可证验证、计费管理和客户支持。我们不会将这些数据或你的导出内容用于广告或画像。",
          "main > section:nth-of-type(4) h2": "3. Inbox Capture",
          "main > section:nth-of-type(4) p:nth-of-type(1)":
            "<strong>Inbox Capture</strong> 用于捕捉用户选定的浏览器内容，并发送到本地 Inbox 工作流。你捕捉的内容主要在你的设备上处理。",
          "main > section:nth-of-type(4) p:nth-of-type(2)":
            "如果启用了本地集成，Inbox Capture 可能会从浏览器连接到同一设备上运行的服务，例如 <code>127.0.0.1</code> 或 <code>localhost</code> 这样的本地端点，以便将捕捉内容传入你的本地 Inbox 环境。",
          "main > section:nth-of-type(4) p:nth-of-type(3)":
            "仅因为你使用本地捕捉流程，我们不会把捕捉的页面内容经由我们的服务器转发。如果未来某项功能引入对捕捉内容的云端处理，该功能应在使用点明确说明。",
          "main > section:nth-of-type(5) h2": "4. Inbox Local / Wisteria Inbox",
          "main > section:nth-of-type(5) p:nth-of-type(1)":
            "<strong>Inbox Local / Wisteria Inbox</strong> 旨在作为安装并运行在用户自己设备上的产品。在这种本地优先模型中，你的笔记、导入内容、截图、Markdown 文件和相关工作数据会存储并处理在你自己的机器上，而不是经由我们的服务器。",
          "main > section:nth-of-type(5) p:nth-of-type(2)":
            "如果你为 Inbox Local / Wisteria Inbox 配置 AI 设置、API Key、模型偏好或本地集成，这些设置预期保留在你自己的本地环境中，除非未来某项功能明确说明其他处理方式。",
          "main > section:nth-of-type(5) p:nth-of-type(3)":
            "换句话说，产品本身作为用户自己设备上的本地服务器或本地服务运行。我们不会通过本站为用户的本地 Inbox 内容提供通用云存储服务。",
          "main > section:nth-of-type(6) h2": "5. 支付、支持和第三方服务",
          "main > section:nth-of-type(6) p:nth-of-type(1)":
            "我们使用选定的第三方服务商来支持支付、托管、内容分发、安全和基础设施运行。",
          "main > section:nth-of-type(6) p:nth-of-type(2)":
            "支付由 <strong>Paddle</strong> 作为 Merchant of Record 处理。Paddle 可能会在其自身隐私与合规框架下处理账单、结账和交易信息。",
          "main > section:nth-of-type(6) p:nth-of-type(3)":
            "托管服务商、CDN 服务和相关基础设施供应商可能会在安全可靠地提供本网站所需的范围内处理标准技术请求数据。",
          "main > section:nth-of-type(6) p:nth-of-type(4)":
            "如果你联系支持，我们可能会处理你提供的信息，用于回复请求、诊断问题，并在合理必要时维护客户支持记录。",
          "main > section:nth-of-type(7) h2": "6. 处理的法律依据",
          "main > section:nth-of-type(7) p":
            "在 UK GDPR 或 EU GDPR 适用的情况下，我们会基于以下一种或多种依据处理有限个人数据：",
          "main > section:nth-of-type(7) li:nth-child(1)":
            "<strong>履行合同</strong> - 用于提供付费功能、结账相关服务、授权和支持",
          "main > section:nth-of-type(7) li:nth-child(2)":
            "<strong>合法利益</strong> - 用于保护服务安全、防止欺诈和滥用、诊断问题并运营网站",
          "main > section:nth-of-type(7) li:nth-child(3)":
            "<strong>法律义务</strong> - 在我们必须保留或披露信息以遵守适用法律时",
          "main > section:nth-of-type(8) h2": "7. 数据保留与安全",
          "main > section:nth-of-type(8) p:nth-of-type(1)":
            "本地产品数据主要由你在自己的设备上控制。卸载产品、清除本地浏览器存储或移除本地应用数据，可能会删除本地存储的数据，具体取决于你的使用方式。",
          "main > section:nth-of-type(8) p:nth-of-type(2)":
            "服务器端日志、授权记录、结账相关标识符和支持记录只会在安全、欺诈预防、法律合规、支付管理和服务运行合理必要的期限内保留。",
          "main > section:nth-of-type(8) p:nth-of-type(3)":
            "我们采取合理的技术和组织措施，旨在保护数据免遭未经授权的访问、篡改、披露或毁坏。",
          "main > section:nth-of-type(9) h2": "8. 国际数据传输",
          "main > section:nth-of-type(9) p":
            "我们的服务商可能会根据具体提供商和技术交付路径，在英国、欧盟或其他司法辖区处理相关数据，并遵守适用的数据保护法律。",
          "main > section:nth-of-type(10) h2": "9. 你的权利与联系方式",
          "main > section:nth-of-type(10) p:nth-of-type(1)":
            "根据你所在地区和适用法律，你可能有权请求访问、更正、删除、限制处理、反对处理，或请求了解我们如何处理你的个人数据的其他信息。",
          "main > section:nth-of-type(10) p:nth-of-type(2)":
            "如需提出隐私相关请求或询问本政策，请联系：<strong><a href=\"mailto:support@wisteriasoftware.uk\">support@wisteriasoftware.uk</a></strong>",
        },
      },
      "product.html": {
        title: "产品 – Wisteria Software",
        description:
          "了解 Wisteria Suite 产品：面向 macOS 与浏览器的 Outline、Inbox Capture、Inbox Local 与 FluentSocial AI。",
        selectors: {
          ".compact-hero h1": "产品",
          ".compact-hero .subtitle":
            "<strong>Wisteria Suite</strong> 包含面向 AI 原生工作流的工具：<strong>Outline</strong>、<strong>Inbox Capture</strong>、<strong>适用于 macOS 的 Inbox Local</strong> 与 <strong>FluentSocial AI</strong>。",
          ".product-card.featured-product .status-pill": "当前付费产品",
          ".product-card.featured-product h2": "Outline",
          ".product-card.featured-product > p:first-of-type":
            "用于导航长篇 ChatGPT 与 Gemini 对话、收藏重要问答，以及导出或备份聊天记录的 Chrome 扩展。",
          ".product-card.featured-product ul li:nth-child(1)": "面向长 ChatGPT 与 Gemini 对话的可点击大纲导航",
          ".product-card.featured-product ul li:nth-child(2)": "直接跳转到你需要的位置",
          ".product-card.featured-product ul li:nth-child(3)": "将对话导出为 Markdown 或带目录的 HTML",
          ".product-card.featured-product ul li:nth-child(4)": "将对话直接备份到你自己的 Google Drive",
          ".product-card.featured-product ul li:nth-child(5)": "本地优先，兼顾隐私与速度",
          ".product-card.featured-product p.small-note":
            "ChatGPT 与 Gemini 页面内容在浏览器本地处理。只有当你主动选择 Google Drive 备份时，所选导出文件才会直接发送到你自己的 Drive。",
          ".product-card.featured-product .hero-actions .btn-link.primary": "查看产品",
          ".product-card.featured-product .hero-actions .btn-link.secondary": "在 Chrome 网上应用店查看",
          ".product-grid article:nth-child(2) .status-pill": "现已推出",
          ".product-grid article:nth-child(2) h3": "Inbox Capture",
          ".product-grid article:nth-child(2) > p:first-of-type":
            "用于将文本、截图、图片和笔记保存到工作流的浏览器捕捉工具。",
          ".product-grid article:nth-child(2) ul li:nth-child(1)": "从当前页面捕捉",
          ".product-grid article:nth-child(2) ul li:nth-child(2)": "快速预览与保存流程",
          ".product-grid article:nth-child(2) ul li:nth-child(3)": "作为浏览器伴侣与 Inbox 配合使用",
          ".product-grid article:nth-child(2) .hero-actions .btn-link.primary": "查看 Inbox",
          ".product-grid article:nth-child(2) .hero-actions .btn-link.secondary": "在 Chrome 上安装",
          ".product-grid article:nth-child(3) .status-pill": "可下载",
          ".product-grid article:nth-child(3) h3": "Inbox",
          ".product-grid article:nth-child(3) > p:first-of-type":
            "用于捕捉、整理与回顾 AI 对话、笔记与截图的本地优先知识工作流。目前以适用于 macOS 的 Inbox Local 形式提供。",
          ".product-grid article:nth-child(3) ul li:nth-child(1)": "将 Markdown 文件导入本地优先的回顾工作流",
          ".product-grid article:nth-child(3) ul li:nth-child(2)": "预览导入的 ChatGPT 对话时保留对话导航",
          ".product-grid article:nth-child(3) ul li:nth-child(3)": "支持 AI 摘要；免费用户可使用自己的 API Key",
          ".product-grid article:nth-child(3) p.small-note":
            "在当前试用期内，Outline 用户也可免费试用 Inbox Pro 的 AI 摘要功能。",
          ".product-grid article:nth-child(3) .hero-actions .btn-link.primary": "查看 Inbox",
          ".product-grid article:nth-child(3) .hero-actions .btn-link.secondary": "下载 macOS 版",
          ".product-grid article:nth-child(4) .status-pill": "现已可用",
          ".product-grid article:nth-child(4) h3": "FluentSocial AI",
          ".product-grid article:nth-child(4) > p:first-of-type":
            "面向 Reddit 与 X 的上下文语言助手，用于双语阅读和自然回复，无需离开当前对话。",
          ".product-grid article:nth-child(4) ul li:nth-child(1)": "同时查看原帖、评论与对应翻译",
          ".product-grid article:nth-child(4) ul li:nth-child(2)": "根据当前讨论上下文起草回复",
          ".product-grid article:nth-child(4) ul li:nth-child(3)": "使用你习惯的语言写作，并在原位置转换文本",
          ".product-grid article:nth-child(4) p.small-note":
            "FluentSocial AI 绝不会自动发布内容。每一条回复都由你审核并亲自发送。",
          ".product-grid article:nth-child(4) .hero-actions .btn-link.primary": "查看 FluentSocial AI",
          ".product-grid article:nth-child(4) .hero-actions .btn-link.secondary": "查看隐私政策",
          "main > section.cta h2": "当前付费方案",
          "main > section.cta > p":
            "Outline 在本站提供付费 Pro 方案。结账前请查看价格、激活与退款说明。",
          "main > section.cta a": "查看 Outline 价格",
        },
      },
      "englishflow-privacy.html": {
        title: "FluentSocial AI 隐私政策 - Wisteria Software",
        description:
          "FluentSocial AI Chrome 扩展的隐私政策，说明翻译、改写、上下文回复辅助、API Key、本地存储和 Wisteria Software API 的数据处理方式。",
        selectors: {
          ".compact-hero h1": "FluentSocial AI 隐私政策",
          ".compact-hero .subtitle":
            "适用于 <strong>FluentSocial AI: Read in your language. Reply naturally in theirs.</strong>，由 <strong>Wisteria Software Ltd.</strong> 提供的 Chrome 扩展。<br /><strong>最后更新：</strong>2026 年 7 月 18 日",
          ".contact-box p": "<strong>隐私摘要：</strong>",
          ".contact-box li:nth-child(1)":
            "<strong>单一用途：</strong>FluentSocial AI 帮助用户在支持的网站上进行多语言阅读、翻译、改写和回复。",
          ".contact-box li:nth-child(2)":
            "<strong>用户触发处理：</strong>只有当你请求翻译、改写或回复辅助时，相关文本才会发送给 AI 服务处理。",
          ".contact-box li:nth-child(3)":
            "<strong>本地设置：</strong>语言偏好、模型设置、API Endpoint 和 API Key 保存在浏览器扩展存储中。",
          ".contact-box li:nth-child(4)":
            "<strong>API 服务：</strong>请求可能发送到你配置的 AI API Endpoint，包括 DeepSeek 或 Wisteria Software API Endpoint。",
          ".contact-box li:nth-child(5)":
            "<strong>无广告用途：</strong>我们不出售用户数据，不用于定向广告，也不建立广告画像。",
        },
      },
      "pricing.html": {
        title: "价格 – Outline",
        description:
          "Outline 价格：免费开始，升级 1 年 Pro 使用搜索与筛选，或选择终身授权，一次付费、无订阅。",
        selectors: {
          ".compact-hero h1": "价格",
          ".compact-hero .subtitle":
            "免费开始；需要更快搜索与筛选时升级；想长期安心使用则选择终身授权。",
          ".price-grid .price-card:nth-child(1) .status-pill": "免费",
          ".price-grid .price-card:nth-child(1) h2": "FREE",
          ".price-grid .price-card:nth-child(1) .plan-kicker": "保存你的聊天",
          ".price-grid .price-card:nth-child(1) ul li:nth-child(1)":
            "Chat Outlines & Bookmarks",
          ".price-grid .price-card:nth-child(1) ul li:nth-child(2)":
            "Highlights & Notes",
          ".price-grid .price-card:nth-child(1) ul li:nth-child(3)":
            "Unlimited Markdown Exports",
          ".price-grid .price-card:nth-child(1) ul li:nth-child(4)":
            "Save to Your Own Google Drive",
          ".price-grid .price-card:nth-child(1) ul li:nth-child(5)":
            "10 HTML Exports Included, then +1 per Week",
          ".price-grid .price-card:nth-child(1) > p:last-of-type": "我已经可以整理和保存聊天了。",
          ".price-grid .price-card:nth-child(2) .status-pill": "快速找到重点",
          ".price-grid .price-card:nth-child(2) h2": "PRO 1-Year License",
          ".price-grid .price-card:nth-child(2) .plan-kicker": "一次性付款",
          ".price-grid .price-card:nth-child(2) ul li:nth-child(1)":
            "Everything in FREE",
          ".price-grid .price-card:nth-child(2) ul li:nth-child(2)":
            "Unlimited HTML Knowledge Pages",
          ".price-grid .price-card:nth-child(2) ul li:nth-child(3)":
            "Offline Search",
          ".price-grid .price-card:nth-child(2) ul li:nth-child(4)":
            "Highlight & Notes Filters",
          ".price-grid .price-card:nth-child(2) ul li:nth-child(5)":
            "Faster Knowledge Retrieval",
          ".price-grid .price-card:nth-child(2) ul li:nth-child(6)": "Priority Email Support",
          ".price-grid .price-card:nth-child(2) .plan-meta-list li:nth-child(1)": "1 Year Duration",
          ".price-grid .price-card:nth-child(2) .plan-meta-list li:nth-child(2)": "Manual Renewal",
          ".price-grid .price-card:nth-child(2) .plan-meta-list li:nth-child(3)": "No Auto-Renewal",
          ".price-grid .price-card:nth-child(2) .hero-actions .btn-link.primary": "Get 1-Year Access",
          ".price-grid .price-card:nth-child(3) .status-pill": "BEST VALUE ✦",
          ".price-grid .price-card:nth-child(3) h2": "PRO Lifetime",
          ".price-grid .price-card:nth-child(3) .early-bird-label": "早鸟价",
          ".price-grid .price-card:nth-child(3) .plan-kicker": "永久拥有",
          ".price-grid .price-card:nth-child(3) ul li:nth-child(1)": "Everything in PRO 1-Year",
          ".price-grid .price-card:nth-child(3) ul li:nth-child(2)": "One-Time Payment",
          ".price-grid .price-card:nth-child(3) ul li:nth-child(3)": "No Subscription",
          ".price-grid .price-card:nth-child(3) ul li:nth-child(4)": "No Hidden Renewals",
          ".price-grid .price-card:nth-child(3) ul li:nth-child(5)": "All Future Updates",
          ".price-grid .price-card:nth-child(3) ul li:nth-child(6)": "Support Independent Development",
          ".price-grid .price-card:nth-child(3) .hero-actions .btn-link.primary": "Get Lifetime Access",
          ".notice-box.plan-note":
            "<strong>交付方式：</strong>购买后以激活码形式数字交付。激活后可离线使用；有效的 Pro 试用拥有与 Pro 相同的搜索、筛选、书签与导出权限。",
          "main > section:nth-of-type(2) h2": "技术与隐私说明",
          "main > section:nth-of-type(2) > p":
            "Inbox 是可选的本地 macOS 应用（Apple Silicon）。可单独从 wisteriasoftware.uk 下载，基础 Outline 导航不依赖 Inbox。",
          "main > section:nth-of-type(2) ul li:nth-child(1)": "Inbox 数据默认保存在你的设备上",
          "main > section:nth-of-type(2) ul li:nth-child(2)": "AI 摘要由你手动触发，不会自动运行",
          "main > section:nth-of-type(2) ul li:nth-child(3)": "使用摘要时在 Inbox 内自行提供 API Key",
          "main > section:nth-of-type(2) ul li:nth-child(4)": "本地优先架构，数据由你掌控",
          "main > section:nth-of-type(3) h2": "支付与交付",
          "main > section:nth-of-type(3) p:nth-of-type(1)":
            "所有付款均由 Paddle 安全处理，Paddle 是我们的授权支付服务商（Merchant of Record）。",
          "main > section:nth-of-type(3) p:nth-of-type(2)": "支付成功后，客户将收到：",
          "main > section:nth-of-type(3) ul li:nth-child(1)": "购买确认邮件",
          "main > section:nth-of-type(3) ul li:nth-child(2)": "数字许可密钥",
          "main > section:nth-of-type(3) ul li:nth-child(3)": "在许可有效期内允许重新激活",
          "main > section:nth-of-type(4) h2": "退款政策",
          "main > section:nth-of-type(4) p:nth-of-type(1)":
            "数字购买适用 14 天退款政策。如遇问题，请联系：<strong>support@wisteriasoftware.uk</strong>",
          "main > section:nth-of-type(4) p:nth-of-type(2)":
            "阅读完整政策：<a href=\"refund.html\">退款政策</a>",
        },
      },
      "inbox.html": {
        title: "Inbox – Wisteria Software",
        description:
          "Inbox 帮助你捕捉、整理并回顾 AI 对话、截图与笔记。目前提供适用于 macOS 的 Inbox Local，并以 Inbox Capture 作为浏览器伴侣。",
        selectors: {
          ".inbox-page .split-hero .eyebrow": "Inbox",
          ".inbox-page .hero-title":
            "把 AI 对话变成你真正拥有的知识。",
          ".inbox-page .split-hero > div > .subtitle":
            "ChatGPT 与其他 AI 工具里最好的想法不该消失在滚动记录里。Inbox 帮助你捕捉、整理并回顾重要内容，让对话结束后工作仍然有用。",
          ".inbox-page .split-hero .hero-actions .btn-link.primary": "下载适用于 macOS 的 Inbox Local",
          ".inbox-page .split-hero .hero-actions .btn-link.secondary": "了解工作流",
          ".inbox-page .hero-card h2": "当前可用性",
          ".inbox-page .hero-points li:nth-child(1)":
            "<strong>适用于 macOS 的 Inbox Local：</strong>现已支持 Apple Silicon Mac。",
          ".inbox-page .hero-points li:nth-child(2)":
            "<strong>Inbox Capture：</strong>现已在 Chrome 网上应用店上线，作为浏览器伴侣。",
          ".inbox-page .hero-points li:nth-child(3)":
            "<strong>数据归属：</strong>围绕本地优先工作流构建，保存的资料留在你手中。",
          "main > section:nth-of-type(1) h2": "为什么需要 Inbox",
          "main > section:nth-of-type(1) > p":
            "AI 擅长生成答案，却不擅长帮你把它们留下来。",
          "main > section:nth-of-type(1) .feature-item:nth-child(1) h3": "长对话会埋没有价值的工作",
          "main > section:nth-of-type(1) .feature-item:nth-child(1) p": "有用的回答、提示与想法会淹没在重度滚动的会话里。",
          "main > section:nth-of-type(1) .feature-item:nth-child(2) h3": "好素材变得支离破碎",
          "main > section:nth-of-type(1) .feature-item:nth-child(2) p": "截图、笔记、引用与导出的对话散落在太多地方。",
          "main > section:nth-of-type(1) .feature-item:nth-child(3) h3": "复用比想象中更难",
          "main > section:nth-of-type(1) .feature-item:nth-child(3) p": "你不得不重复提问，而不是在已学到的内容上继续构建。",
          "main > section:nth-of-type(1) .feature-item:nth-child(4) h3": "平台所有权不等于你的所有权",
          "main > section:nth-of-type(1) .feature-item:nth-child(4) p":
            "太多工作仍困在从未被设计成你长期资料库的工具里。",
          "main > section:nth-of-type(2) h2": "Inbox 是什么",
          "main > section:nth-of-type(2) p:nth-of-type(1)":
            "Inbox 是面向重度 AI 使用者的个人知识工作流，帮助你把对话、截图与笔记变成可以长期保存、回顾与复用的材料。",
          "main > section:nth-of-type(2) p:nth-of-type(2)":
            "目前 Inbox 以 <strong>适用于 macOS 的 Inbox Local</strong> 提供，并与浏览器伴侣 <strong>Inbox Capture</strong> 配合，让保存有用内容更快捷。",
          "main > section:nth-of-type(3) h2": "用 Inbox 能做什么",
          "main > section:nth-of-type(3) .feature-item:nth-child(1) h3": "捕捉重要内容",
          "main > section:nth-of-type(3) .feature-item:nth-child(1) p": "在有用内容消失前，保存对话、截图、摘录与想法。",
          "main > section:nth-of-type(3) .feature-item:nth-child(2) h3": "整理成可用的结构",
          "main > section:nth-of-type(3) .feature-item:nth-child(2) p": "以更清晰的结构回顾已保存内容，减少滚动，突出要点。",
          "main > section:nth-of-type(3) .feature-item:nth-child(3) h3": "回顾与复用",
          "main > section:nth-of-type(3) .feature-item:nth-child(3) p": "快速回到过去的答案，减少重复提示，建立可复用的知识。",
          "main > section:nth-of-type(3) .feature-item:nth-child(4) h3": "保持归属",
          "main > section:nth-of-type(3) .feature-item:nth-child(4) p": "采用本地优先工作流，让保存的资料留在你的设备上并由你掌控。",
          "main > section:nth-of-type(4) h2": "更好的工作流",
          "main > section:nth-of-type(4) .workflow-line": "捕捉 → 整理 → 复用 → 归属",
          "main > section:nth-of-type(4) > p:nth-of-type(2)":
            "Inbox 帮助把 AI 从一次性对话工具，变成面向长期思考与知识的系统。",
          "main > section:nth-of-type(4) .meta-card:nth-child(1)":
            "<strong>捕捉</strong>在工作中及时保存重要内容，避免有用上下文流失。",
          "main > section:nth-of-type(4) .meta-card:nth-child(2)":
            "<strong>整理</strong>让已保存内容更易浏览、回顾与查找。",
          "main > section:nth-of-type(4) .meta-card:nth-child(3)":
            "<strong>复用</strong>把一次性 AI 输出变成可不断查阅的参考资料。",
          ".companion-section .section-intro .eyebrow": "浏览器伴侣",
          ".companion-section .section-intro h2": "与 Inbox Capture 配合",
          ".companion-section > p":
            "Inbox Capture 是 Inbox 的浏览器伴侣。浏览时快速保存有用文本、截图、图片与笔记，再带入 Inbox 工作流进行回顾与复用。",
          ".companion-section .hero-actions .btn-link.primary": "在 Chrome 上安装 Inbox Capture",
          ".companion-section .hero-actions .btn-link.secondary": "查看全部产品",
          "main > section:nth-of-type(6) h2": "适合谁",
          "main > section:nth-of-type(6) .feature-item:nth-child(1) h3": "开发者",
          "main > section:nth-of-type(6) .feature-item:nth-child(1) p": "整理提示、代码解释与研究笔记，供后续开发使用。",
          "main > section:nth-of-type(6) .feature-item:nth-child(2) h3": "写作者与创作者",
          "main > section:nth-of-type(6) .feature-item:nth-child(2) p": "保存想法、草稿、引用与 AI 辅助产出，不丢线索。",
          "main > section:nth-of-type(6) .feature-item:nth-child(3) h3": "研究者与知识工作者",
          "main > section:nth-of-type(6) .feature-item:nth-child(3) p": "建立个人参考层，而不是每次都从零开始。",
          "main > section:nth-of-type(6) .feature-item:nth-child(4) h3": "日常 AI 用户",
          "main > section:nth-of-type(6) .feature-item:nth-child(4) p": "留住 AI 工作流中有用的部分，而不是让它们消失在聊天记录里。",
          "main > section.cta h2": "别再丢掉你用 AI 创造的价值。",
          "main > section.cta > p": "用适用于 macOS 的 Inbox Local 保存、结构化并真正拥有它们。",
          "main > section.cta a": "下载适用于 macOS 的 Inbox Local",
        },
      },
      "support.html": {
        title: "支持 – Wisteria Suite",
        description: "Outline、Inbox Capture 与适用于 macOS 的 Inbox Local 的支持页面。",
        selectors: {
          ".compact-hero h1": "支持",
          ".compact-hero .subtitle":
            "关于 <strong>Outline</strong>、<strong>Inbox Capture</strong> 与 <strong>适用于 macOS 的 Inbox Local</strong> 的帮助与联系信息。",
          "main > section:nth-of-type(1) > p":
            "安装问题、账单协助、版本状态与缺陷报告，均可通过本页联系 Wisteria Suite。",
          // 【MODIFIED】Support card label translated during residual-English QA; product name remains intact.
          ".product-grid .product-card:nth-child(3) .status-pill": "适用于 macOS 的 Inbox Local",
          ".product-grid .product-card:nth-child(1) p": "安装、激活、账单、退款与缺陷报告相关问题。",
          ".product-grid .product-card:nth-child(2) p": "Chrome 扩展的安装、设置与支持问题。",
          ".product-grid .product-card:nth-child(3) p": "在 Apple Silicon Mac 上的下载、设置与本地应用问题。",
          ".contact-box h2": "联系",
          ".contact-box p:nth-of-type(1)":
            "📧 邮箱：<a href=\"mailto:support@wisteriasoftware.uk\">support@wisteriasoftware.uk</a>",
          ".contact-box .subtitle": "我们通常在 1–2 个工作日内回复。",
        },
      },
      "terms.html": {
        title: "服务条款 – Outline",
        description: "适用于本站 Outline 付费购买与使用的服务条款。",
        selectors: {
          ".compact-hero h1": "服务条款",
          ".compact-hero .subtitle": "Outline",
          "main > section:nth-of-type(1) h2": "1. 引言",
          "main > section:nth-of-type(1) p:nth-of-type(1)":
            "本服务条款目前适用于在本站购买与使用 Outline 付费方案。",
          "main > section:nth-of-type(1) p:nth-of-type(2)":
            "本服务条款规范你对 Wisteria Software Ltd. 提供的 Outline Chrome 扩展（「产品」）的使用。购买、安装或使用产品即表示你同意本条款。",
          "main > section:nth-of-type(2) h2": "2. 产品说明",
          "main > section:nth-of-type(2) p":
            "Outline 是一款为 ChatGPT 与 Gemini 对话生成可导航目录结构的浏览器扩展。扩展在用户浏览器内本地运行。",
          "main > section:nth-of-type(3) h2": "3. 许可",
          "main > section:nth-of-type(3) p":
            "购买后，你获得非独占、不可转让、有限范围的许可，可将产品用于个人或商业用途。",
          "main > section:nth-of-type(3) ul li:nth-child(1)": "许可有效期：自购买日起 1 年（另有说明除外）。",
          "main > section:nth-of-type(3) ul li:nth-child(2)": "许可可能限制在指定数量的设备上使用。",
          "main > section:nth-of-type(3) ul li:nth-child(3)": "在许可有效期内，可按需重新激活。",
          "main > section:nth-of-type(3) ul li:nth-child(4)": "不得转售、再分发或逆向工程本产品。",
          "main > section:nth-of-type(4) h2": "4. 支付",
          "main > section:nth-of-type(4) p":
            "付款通过 Paddle（我们的 Merchant of Record）安全处理。完成购买即表示你同意 Paddle 的结账条款。",
          "main > section:nth-of-type(5) h2": "5. 数字交付",
          "main > section:nth-of-type(5) p":
            "产品以电子方式交付。许可密钥在购买成功后通过邮件发送。不寄送实体商品。",
          "main > section:nth-of-type(6) h2": "6. 退款",
          "main > section:nth-of-type(6) p":
            "退款请求按照我们的退款政策处理。详情请参阅退款政策页面。",
          "main > section:nth-of-type(7) h2": "7. 责任限制",
          "main > section:nth-of-type(7) p":
            "产品按「现状」提供，不作任何明示或暗示担保。Wisteria Software Ltd. 不对因使用产品而产生的间接、附带或后果性损害承担责任。",
          "main > section:nth-of-type(8) h2": "8. 变更",
          "main > section:nth-of-type(8) p":
            "我们可能随时更新本条款。继续使用产品即视为接受更新后的条款。",
          "main > section:nth-of-type(9) h2": "9. 联系",
          "main > section:nth-of-type(9) p": "如对本条款有疑问：support@wisteriasoftware.uk",
        },
      },
      "refund.html": {
        title: "退款政策 – Outline",
        description: "通过 Paddle 在本站完成的符合条件的 Outline 数字购买之退款政策。",
        selectors: {
          ".compact-hero h1": "退款政策",
          ".compact-hero .subtitle": "Outline",
          "main > section:nth-of-type(1) h2": "1. 数字产品",
          "main > section:nth-of-type(1) p:nth-of-type(1)":
            "本退款政策适用于通过 Paddle 在本站完成的符合条件的数字购买。",
          "main > section:nth-of-type(1) p:nth-of-type(2)":
            "Outline 为以电子方式交付的数字软件产品，不寄送实体商品。",
          "main > section:nth-of-type(2) h2": "2. 14 天退款政策",
          "main > section:nth-of-type(2) p:nth-of-type(1)":
            "根据 Paddle 的买家保护标准与适用的消费者法规，客户有权在购买后 14 天内获得全额退款。",
          "main > section:nth-of-type(2) p:nth-of-type(2)": "退款由我们的 Merchant of Record——Paddle 处理。",
          "main > section:nth-of-type(3) h2": "3. 如何申请退款",
          "main > section:nth-of-type(3) p:nth-of-type(1)":
            "如需退款，请直接通过购买收据邮件联系 Paddle，或联系我们的支持团队：",
          "main > section:nth-of-type(3) p:nth-of-type(2)":
            "<a href=\"mailto:support@wisteriasoftware.uk\">support@wisteriasoftware.uk</a>",
          "main > section:nth-of-type(4) h2": "4. 处理时间",
          "main > section:nth-of-type(4) p":
            "获批的退款由 Paddle 处理，到账原支付方式可能需要 5–10 个工作日。",
        },
      },
      "outline-pro.html": {
        title: "Outline - ChatGPT 与 Gemini 可搜索离线知识",
        description:
          "Outline 将 ChatGPT 与 Gemini 对话变成可搜索的离线知识，支持大纲、书签、高亮、笔记、筛选、Markdown 导出、HTML 页面和 Google Drive 备份。",
        selectors: {
          ".sales-hero .eyebrow": "ChatGPT 与 Gemini 知识保存器",
          ".sales-hero h1": "把 AI 聊天变成可搜索的离线知识",
          ".sales-hero > p:nth-child(3)":
            "用大纲、书签、高亮、笔记、离线搜索和筛选保存 ChatGPT 与 Gemini 对话。",
          ".sales-hero > p:nth-child(4)":
            "把有用回答保留为可读、可搜索、由你掌控的知识，而不是遗失在无尽聊天记录里。",
          ".sales-hero .hero-actions .btn-link.primary": "升级到 Pro",
          ".sales-hero > p:nth-child(6)":
            "14 天退款政策。<a href=\"refund.html\">查看退款说明</a>。",
          ".sales-hero > p:nth-child(8)": "付款由 Paddle（Merchant of Record）处理。",
          ".sales-hero .kicker-list .kicker:nth-child(1)": "Chrome 扩展",
          ".sales-hero .kicker-list .kicker:nth-child(2)": "本地优先",
          ".sales-hero .kicker-list .kicker:nth-child(3)": "对话内容留在你的设备上",
          ".sales-hero .kicker-list .kicker:nth-child(4)": "激活码通过邮件发送",
          ".demo-section > h2": "查看 Outline 实际效果",
          ".demo-section > p:first-of-type":
            "浏览产品亮点：快速搜索、离线 HTML 知识页、筛选和长 AI 对话笔记。",
          ".promo-slide:nth-child(1) figcaption":
            "Find Fast：把长聊天变成可扫读大纲，快速跳到重点。",
          ".promo-slide:nth-child(2) figcaption":
            "强大的离线 HTML 导出，生成私密、可搜索的知识页面。",
          ".promo-slide:nth-child(3) figcaption":
            "按笔记、书签、星标、高亮和关键词筛选内容。",
          ".promo-slide:nth-child(4) figcaption":
            "用高亮和笔记标注聊天，并在之后快速找回。",
          ".demo-section .hero-actions-centered .btn-link.primary": "比较方案",
          ".demo-section .hero-actions-centered .btn-link.secondary": "浏览功能",
          "main > section:nth-of-type(2) h2": "它能做什么",
          "main > section:nth-of-type(2) p:nth-of-type(1)":
            "<strong>Outline</strong> 会自动把冗长的 ChatGPT 与 Gemini 会话变成可点击的目录。无论你是在写作、编程、学习还是进行多轮讨论，都可以瞬间跳到任意要点，而无需无尽滚动。",
          "main > section:nth-of-type(2) p:nth-of-type(2)":
            "你还可以为值得保留的具体问答回合加书签，然后将整段对话或仅书签部分导出为 Markdown、带目录的 HTML 或发送到 Inbox。Google Drive 备份会将文件直接保存到你自己的 Drive。",
          "main > section:nth-of-type(2) p:nth-of-type(3)":
            "ChatGPT 与 Gemini 页面内容在浏览器本地处理，不会上传到我们的服务器。只有当你主动选择 Google Drive 备份时，所选导出文件才会直接发送到你自己的 Drive。",
          "main > section#pricing .section-intro .eyebrow": "升级 Pro",
          "main > section#pricing .section-intro h2": "解锁完整 Outline 工作流",
          "main > section#pricing .section-intro .subtitle":
            "先保存聊天；当你需要更快搜索、筛选和找回知识时再升级。",
          "main > section#pricing .price-card:nth-child(1) .status-pill": "免费",
          "main > section#pricing .price-card:nth-child(1) h3": "FREE",
          "main > section#pricing .price-card:nth-child(1) .plan-kicker": "保存你的聊天",
          "main > section#pricing .price-card:nth-child(1) .plan-compare-list li:nth-child(1)":
            "<span class=\"plan-icon\">✓</span><span>Chat Outlines & Bookmarks</span>",
          "main > section#pricing .price-card:nth-child(1) .plan-compare-list li:nth-child(2)":
            "<span class=\"plan-icon\">✓</span><span>Highlights & Notes</span>",
          "main > section#pricing .price-card:nth-child(1) .plan-compare-list li:nth-child(3)":
            "<span class=\"plan-icon\">✓</span><span>Unlimited Markdown Exports</span>",
          "main > section#pricing .price-card:nth-child(1) .plan-compare-list li:nth-child(4)":
            "<span class=\"plan-icon\">✓</span><span>Save to Your Own Google Drive</span>",
          "main > section#pricing .price-card:nth-child(1) .plan-compare-list li:nth-child(5)":
            "<span class=\"plan-icon\">✓</span><span>10 HTML Exports Included, then +1 per Week</span>",
          "main > section#pricing .price-card:nth-child(1) > p:last-of-type": "我已经可以整理和保存聊天了。",
          "main > section#pricing .price-card:nth-child(2) .status-pill": "快速找到重点",
          "main > section#pricing .price-card:nth-child(2) h3": "PRO 1-Year License",
          "main > section#pricing .price-card:nth-child(2) .plan-kicker": "一次性付款",
          "main > section#pricing .price-card:nth-child(2) .plan-compare-list li:nth-child(1)":
            "<span class=\"plan-icon\">✓</span><span>Everything in FREE</span>",
          "main > section#pricing .price-card:nth-child(2) .plan-compare-list li:nth-child(2)":
            "<span class=\"plan-icon\">✓</span><span>Unlimited HTML Knowledge Pages</span>",
          "main > section#pricing .price-card:nth-child(2) .plan-compare-list li:nth-child(3)":
            "<span class=\"plan-icon\">✓</span><span>Offline Search</span>",
          "main > section#pricing .price-card:nth-child(2) .plan-compare-list li:nth-child(4)":
            "<span class=\"plan-icon\">✓</span><span>Highlight & Notes Filters</span>",
          "main > section#pricing .price-card:nth-child(2) .plan-compare-list li:nth-child(5)":
            "<span class=\"plan-icon\">✓</span><span>Faster Knowledge Retrieval</span>",
          "main > section#pricing .price-card:nth-child(2) .plan-compare-list li:nth-child(6)":
            "<span class=\"plan-icon\">✓</span><span>Priority Email Support</span>",
          "main > section#pricing .price-card:nth-child(2) .plan-meta-list li:nth-child(1)": "1 Year Duration",
          "main > section#pricing .price-card:nth-child(2) .plan-meta-list li:nth-child(2)": "Manual Renewal",
          "main > section#pricing .price-card:nth-child(2) .plan-meta-list li:nth-child(3)": "No Auto-Renewal",
          "main > section#pricing .price-card:nth-child(2) .hero-actions .btn-link.primary": "Get 1-Year Access",
          "main > section#pricing .price-card:nth-child(3) .status-pill": "BEST VALUE ✦",
          "main > section#pricing .price-card:nth-child(3) h3": "PRO Lifetime",
          "main > section#pricing .price-card:nth-child(3) .early-bird-label": "早鸟价",
          "main > section#pricing .price-card:nth-child(3) .plan-kicker": "永久拥有",
          "main > section#pricing .price-card:nth-child(3) .plan-compare-list li:nth-child(1)":
            "<span class=\"plan-icon\">✓</span><span>Everything in PRO 1-Year</span>",
          "main > section#pricing .price-card:nth-child(3) .plan-compare-list li:nth-child(2)":
            "<span class=\"plan-icon\">✓</span><span>One-Time Payment</span>",
          "main > section#pricing .price-card:nth-child(3) .plan-compare-list li:nth-child(3)":
            "<span class=\"plan-icon\">✓</span><span>No Subscription</span>",
          "main > section#pricing .price-card:nth-child(3) .plan-compare-list li:nth-child(4)":
            "<span class=\"plan-icon\">✓</span><span>No Hidden Renewals</span>",
          "main > section#pricing .price-card:nth-child(3) .plan-compare-list li:nth-child(5)":
            "<span class=\"plan-icon\">✓</span><span>All Future Updates</span>",
          "main > section#pricing .price-card:nth-child(3) .plan-compare-list li:nth-child(6)":
            "<span class=\"plan-icon\">✓</span><span>Support Independent Development</span>",
          "main > section#pricing .price-card:nth-child(3) .hero-actions .btn-link.primary": "Get Lifetime Access",
          // 【MODIFIED】Selector corrected after shared layout QA so the refund notice translates reliably.
          "main > section#pricing > .notice-box:not(.plan-note)":
            "<strong>退款政策：</strong>所有购买均适用 14 天退款政策。<a href=\"refund.html\">查看退款政策</a>",
          "main > section#pricing > p.small-note":
            "新用户可获得 7 天 Pro 试用。试用期间可使用 Pro 搜索、筛选、书签与导出功能。",
          "main > section#pricing .notice-box.plan-note":
            "<strong>技术与隐私：</strong>Inbox 是可选的本地 macOS 应用（Apple Silicon）。数据默认保存在你的设备上；AI 摘要由你手动触发，并在 Inbox 内使用你自己的 API Key。Inbox 可单独从 wisteriasoftware.uk 下载。",
          "#features h2": "查找、筛选并复用你的 AI 聊天",
          "#features .feature-lede":
            "Outline 围绕一个工作流设计：保存聊天，标记重点，并在需要时快速找回。",
          "#features .feature-item:nth-child(1) h3": "即时聊天大纲",
          "#features .feature-item:nth-child(1) p":
            "将长篇 ChatGPT 与 Gemini 对话变成可点击大纲，立刻跳到正确段落。",
          "#features .feature-item:nth-child(2) h3": "书签、高亮和笔记",
          "#features .feature-item:nth-child(2) p": "标记值得保留的内容，添加笔记，在长聊天之上建立更清晰的记忆层。",
          "#features .feature-item:nth-child(3) h3": "离线 HTML 知识页面",
          "#features .feature-item:nth-child(3) p":
            "将对话保存为私密 HTML 页面，之后即使不依赖原始聊天页面，也能打开、搜索和回顾。",
          "#features .feature-item:nth-child(4) h3": "筛选重点内容",
          "#features .feature-item:nth-child(4) p": "当对话太长而无法手动扫读时，可按书签、高亮、笔记、星标和关键词筛选。",
          "#features .feature-item:nth-child(5) h3": "Markdown 与 Google Drive 备份",
          "#features .feature-item:nth-child(5) p": "导出可读 Markdown 文件，或备份到你自己的 Google Drive。数据始终由你掌控。",
          "#features .feature-item:nth-child(6) h3": "本地优先设计",
          "#features .feature-item:nth-child(6) p":
            "聊天内容在你的浏览器中处理。Wisteria 不会上传或分析你的对话。",
          "#features .feature-footnote":
            "同时包含自动刷新、图像感知标记、可调整大小的侧边栏，以及可选的 Inbox 本地回顾传递。",
          "main > section:nth-of-type(5) h2": "常见问题",
          ".faq-grid .faq-item:nth-child(1) h3": "这款产品适合做什么？",
          ".faq-grid .faq-item:nth-child(1) p":
            "将冗长的 ChatGPT 与 Gemini 对话变成可点击大纲，便于不限次数地快速查找与回顾要点。",
          ".faq-grid .faq-item:nth-child(2) h3": "Outline 支持 Gemini 吗？",
          ".faq-grid .faq-item:nth-child(2) p": "支持。Outline 在 Chrome 及基于 Chromium 的浏览器扩展环境中支持 Gemini 对话。",
          ".faq-grid .faq-item:nth-child(3) h3": "大纲导航有限制吗？",
          ".faq-grid .faq-item:nth-child(3) p": "无限制。ChatGPT 与 Gemini 的大纲导航均不限次数。",
          ".faq-grid .faq-item:nth-child(4) h3": "购买后如何激活？",
          ".faq-grid .faq-item:nth-child(4) p":
            "你会收到包含激活码的邮件（例如：<code>XXXX-XXXX-XXXX</code>）。在扩展中输入即可激活。在许可有效期内可按需重新激活。",
          ".faq-grid .faq-item:nth-child(5) h3": "若微信支付成功但页面似乎卡住？",
          ".faq-grid .faq-item:nth-child(5) p":
            "微信支付可能异步完成，因此成功页可能稍晚才更新。请预留约 15 分钟等待支付状态同步。激活码邮件也可能延迟；若 20 分钟后仍未收到，请联系 <a href=\"mailto:support@wisteriasoftware.uk\">support@wisteriasoftware.uk</a>。",
          ".faq-grid .faq-item:nth-child(6) h3": "是否提供试用？",
          ".faq-grid .faq-item:nth-child(6) p":
            "是的。新用户可获得 7 天 Pro 试用，试用期间可使用 Pro 搜索、筛选、书签与导出功能。",
          ".faq-grid .faq-item:nth-child(7) h3": "激活后需要一直联网吗？",
          ".faq-grid .faq-item:nth-child(7) p": "不需要。首次激活需要联网；之后可本地离线运行。",
          ".faq-grid .faq-item:nth-child(8) h3": "免费版与 Pro 有何区别？",
          ".faq-grid .faq-item:nth-child(8) p":
            "免费版帮助你保存、备份和记录 AI 聊天。Pro 1-Year 增加无限 HTML 知识页面、离线搜索、Highlight 与 Notes 筛选、更快的知识找回和优先邮件支持。",
          ".faq-grid .faq-item:nth-child(9) h3": "终身方案是什么？",
          ".faq-grid .faq-item:nth-child(9) p":
            "终身方案是长期 Pro 使用权的一次性购买，包含无订阅、无隐藏续费、所有未来更新，并支持独立开发。",
          ".faq-grid .faq-item:nth-child(10) h3": "Outline 会上传我的 ChatGPT 或 Gemini 内容吗？",
          ".faq-grid .faq-item:nth-child(10) p":
            "不会。页面内容在浏览器本地处理，不会上传到我们的服务器。只有当你主动使用 Google Drive 备份时，所选导出文件才会直接发送到你自己的 Drive。",
          ".faq-grid .faq-item:nth-child(11) h3": "能否仅导出加书签的部分？",
          ".faq-grid .faq-item:nth-child(11) p":
            "可以。先为重要问答加书签，即可仅将保存的段落导出为 Markdown、HTML 或发送到 Inbox，而无需导出整段对话。",
          ".faq-grid .faq-item:nth-child(12) h3": "支持哪些环境？",
          ".faq-grid .faq-item:nth-child(12) p": "Chrome / Chromium 浏览器扩展环境下的 ChatGPT 与 Gemini 网页使用场景。",
          ".faq-grid .faq-item:nth-child(13) h3": "使用这个扩展需要登录 ChatGPT 或创建单独账户吗？",
          ".faq-grid .faq-item:nth-child(13) p:nth-of-type(1)": "不需要。这个扩展不需要任何单独的用户账户系统。",
          ".faq-grid .faq-item:nth-child(13) p:nth-of-type(2)":
            "它会基于当前 ChatGPT 或 Gemini 页面内容在你的浏览器本地工作。你的聊天内容在设备上处理，扩展本身不需要单独登录即可运行。",
          ".faq-grid .faq-item:nth-child(14) h3": "扩展支持无痕模式吗？",
          ".faq-grid .faq-item:nth-child(14) p:nth-of-type(1)": "支持，可以在无痕模式中使用。",
          ".faq-grid .faq-item:nth-child(14) p:nth-of-type(2)":
            "不过 Chrome 默认会在无痕模式中禁用扩展。你需要在 Chrome 的扩展设置里手动允许这个扩展在无痕模式中运行。",
          ".faq-grid .faq-item:nth-child(14) p:nth-of-type(3)":
            "你可以在这里开启：<code>chrome://extensions</code> &rarr; <code>Details</code> &rarr; <code>Allow in Incognito</code>",
          ".faq-grid .faq-item:nth-child(14) p:nth-of-type(4)":
            "这是 Chrome 浏览器设置，不是扩展本身的问题。",
          ".faq-grid .faq-item:nth-child(15) h3": "为什么我没有登录 ChatGPT 时，有些功能不能用？",
          ".faq-grid .faq-item:nth-child(15) p:nth-of-type(1)":
            "如果你没有登录 ChatGPT，部分功能可能会受限，这是 ChatGPT 网页自身的限制。",
          ".faq-grid .faq-item:nth-child(15) p:nth-of-type(2)":
            "由于扩展基于当前页面内容工作，ChatGPT 如何显示或加载页面也可能影响扩展在某些情况下的表现。",
          ".faq-grid .faq-item:nth-child(15) p:nth-of-type(3)": "这不是扩展本身造成的问题。",
          ".faq-grid .faq-item:nth-child(16) h3": "如果我仍然遇到问题该怎么办？",
          ".faq-grid .faq-item:nth-child(16) p:nth-of-type(1)": "如果你仍有问题或遇到异常，欢迎联系我：",
          ".faq-grid .faq-item:nth-child(16) p:nth-of-type(2)":
            "<a href=\"mailto:info@wisteriasoftware.uk\">info@wisteriasoftware.uk</a>",
          ".faq-grid .faq-item:nth-child(16) p:nth-of-type(3)": "我会很乐意帮你处理。",
        },
      },
      "payment-success": {
        title: "支付成功",
        description: "支付成功。请激活你的 Outline 许可。",
        selectors: {
          "main .hero h1": "🎉 支付成功！",
          "main .hero .subtitle":
            "你的支付已成功完成。<br>你现在拥有 <strong>Outline</strong> 的 <strong>一年订阅</strong>。",
          "main > section:nth-of-type(1) h2": "你的激活码",
          "main > section:nth-of-type(1) > p": "在扩展中输入此码以激活许可。",
          ".waiting-text": "正在安全生成你的许可。",
          ".waiting-warning": "⚠️ 请勿关闭本页面。",
          "main > section:nth-of-type(2) h2": "如何激活",
          "main > section:nth-of-type(2) ol li:nth-child(1)": "复制上方显示的激活码。",
          "main > section:nth-of-type(2) ol li:nth-child(2)": "打开扩展并点击 <strong>获取 Pro</strong>。",
          "main > section:nth-of-type(2) ol li:nth-child(3)": "点击 <strong>已有许可？</strong>",
          "main > section:nth-of-type(2) ol li:nth-child(4)": "输入激活码并点击 <strong>激活</strong>。",
          "main > section:nth-of-type(3) h2": "重要提示",
          ".important-box p": "🔐 请妥善保管你的激活码。",
          ".email-notice p:nth-of-type(1)": "📧 激活码副本已发送至你的邮箱。",
          ".email-notice p:nth-of-type(2)": "若未收到，可点击重新发送。",
          "#resend-btn": "📧 重新发送许可邮件",
          "#license-box .btn-primary": "📋 复制激活码",
          "#copy-tip": "✓ 已复制！",
          "main > section:nth-of-type(4) h2": "需要帮助？",
          "main > section:nth-of-type(4) p": "📧 support@wisteriasoftware.uk",
        },
      },
      "payment-success.html": {
        title: "支付成功",
        description: "支付成功。请激活你的 Outline 许可。",
        selectors: {
          "main .hero h1": "🎉 支付成功！",
          "main .hero .subtitle":
            "你的支付已成功完成。<br>你现在拥有 <strong>Outline</strong> 的 <strong>一年订阅</strong>。",
          "main > section:nth-of-type(1) h2": "你的激活码",
          "main > section:nth-of-type(1) > p": "在扩展中输入此码以激活许可。",
          ".waiting-text": "正在安全生成你的许可。",
          ".waiting-warning": "⚠️ 请勿关闭本页面。",
          "main > section:nth-of-type(2) h2": "如何激活",
          "main > section:nth-of-type(2) ol li:nth-child(1)": "复制上方显示的激活码。",
          "main > section:nth-of-type(2) ol li:nth-child(2)": "打开扩展并点击 <strong>获取 Pro</strong>。",
          "main > section:nth-of-type(2) ol li:nth-child(3)": "点击 <strong>已有许可？</strong>",
          "main > section:nth-of-type(2) ol li:nth-child(4)": "输入激活码并点击 <strong>激活</strong>。",
          "main > section:nth-of-type(3) h2": "重要提示",
          ".important-box p": "🔐 请妥善保管你的激活码。",
          ".email-notice p:nth-of-type(1)": "📧 激活码副本已发送至你的邮箱。",
          ".email-notice p:nth-of-type(2)": "若未收到，可点击重新发送。",
          "#resend-btn": "📧 重新发送许可邮件",
          "#license-box .btn-primary": "📋 复制激活码",
          "#copy-tip": "✓ 已复制！",
          "main > section:nth-of-type(4) h2": "需要帮助？",
          "main > section:nth-of-type(4) p": "📧 support@wisteriasoftware.uk",
        },
      },
      "payment-cancel": {
        title: "支付已取消",
        description: "",
        selectors: {
          ".card h1": "支付已取消",
          ".card p:nth-of-type(1)": "你的结账未完成。",
          ".card p:nth-of-type(2)": "未产生扣款。",
          ".card .btn": "返回产品页",
        },
      },
      "payment-cancel.html": {
        title: "支付已取消",
        description: "",
        selectors: {
          ".card h1": "支付已取消",
          ".card p:nth-of-type(1)": "你的结账未完成。",
          ".card p:nth-of-type(2)": "未产生扣款。",
          ".card .btn": "返回产品页",
        },
      },
    },
  };
})();
