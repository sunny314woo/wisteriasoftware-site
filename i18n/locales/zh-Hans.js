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
        "inbox.html": "Inbox",
        "privacy.html": "隐私政策",
        "terms.html": "服务条款",
        "refund.html": "退款政策",
        "support.html": "支持",
        "nav-about": "关于",
        "https://blog.wisteriasoftware.uk/": "博客",
      },
      footer: {
        "product.html": "产品",
        "pricing.html": "价格",
        "outline-pro.html": "Outline",
        "inbox.html": "Inbox",
        "support.html": "支持",
        "privacy.html": "隐私政策",
        "terms.html": "服务条款",
        "refund.html": "退款政策",
      },
      company:
        "© 2026 Wisteria Software Ltd.<br />在英格兰和威尔士注册。<br />公司编号：16965144<br />邮箱：",
    },
    pages: {
      "index.html": {
        title: "紫藤软件 — 找到它。标记它。保存它。",
        description:
          "紫藤软件帮你导航、标记和保存长 AI 对话。为 ChatGPT 和 Gemini 自动生成可点击目录，标记重要内容并结构化保存到本地。",
        selectors: {
          ".home-hero h1": "别再在长 AI 对话里<br>反复翻找。",
          ".home-hero-sub":
            "为 ChatGPT 和 Gemini 自动生成可点击目录，快速定位重要内容，并将其结构化保存到本地。",
          ".home-hero-tagline": "找到它。标记它。保存它。",
          ".home-hero .hero-actions .btn-link.primary": "安装 Chrome 插件",
          ".home-hero .hero-actions .btn-link.secondary": "了解 Inbox",
          ".home-products .section-intro h2": "两个工具。一个工作流。",
          ".home-products .section-intro > p":
            "从在长对话中找到答案，到长期保存和复用——紫藤软件帮你建立完整的 AI 知识工作流。",
          ".product-card:nth-child(1) h3": "ChatGPT Gemini 对话目录与大纲",
          ".product-card:nth-child(1) .subtitle":
            "Chrome 扩展。为 200+ 轮超长对话自动生成目录，支持一键跳转、书签标记，并导出为 Markdown 或带结构的对话到 Inbox。",
          ".product-card:nth-child(1) .btn-link.primary": "查看 Outline",
          ".product-card:nth-child(2) h3": "Inbox for Mac",
          ".product-card:nth-child(2) .subtitle":
            "紫藤软件开发的本地 Mac 应用，用于保存 AI 对话、笔记和截图。从 Outline 导入时完整保留目录结构以便跳转导航。标签、筛选、回顾你的知识——一切数据留在你的设备上。",
          ".product-card:nth-child(2) .small-note": "现已支持 macOS（Apple Silicon）。Windows 版本即将推出。",
          ".product-card:nth-child(2) .btn-link.primary": "查看 Inbox",
          ".home-value-summary":
            "从「找到答案」到「长期保存和复用」，紫藤软件是你完整的 AI 知识工作流。",
          ".home-cta h2": "准备好告别反复翻找了吗？",
          ".home-cta p":
            "安装免费 Chrome 插件，将你的下一段长 AI 对话转变为结构化、可导航的目录。",
          ".home-cta a": "从 Outline 开始",
        },
      },
      "privacy.html": {
        title: "隐私政策 - Wisteria Software",
        description:
          "Wisteria Software 产品的隐私政策，包括 Outline、Inbox Capture 和 Inbox Local / Wisteria Inbox。",
        selectors: {
          ".compact-hero h1": "隐私政策",
          ".compact-hero .subtitle":
            "适用于 <strong>Wisteria Software</strong> 产品，包括 <strong>Outline</strong>、<strong>Inbox Capture</strong> 和 <strong>Inbox Local / Wisteria Inbox</strong><br /><strong>最后更新：</strong>2026 年 3 月 24 日",
          ".contact-box p":
            "<strong>摘要：</strong>本政策适用于 Wisteria Software 网站及本站当前展示的相关产品，包括 <strong>Outline</strong>、<strong>Inbox Capture</strong> 和 <strong>Inbox Local / Wisteria Inbox</strong>。我们的产品围绕本地优先工作流设计。我们仅在支付、授权、支持、安全、欺诈预防、保护隐私的网站分析和网站基础运行所需的范围内收集有限的技术与运营数据。我们不出售个人数据，也不使用第三方广告追踪器。",
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
            "<strong>Outline</strong> 是一款本地优先的浏览器扩展。它的核心大纲功能会在你使用它的页面中，于你的浏览器内运行。",
          "main > section:nth-of-type(3) p:nth-of-type(2)":
            "用于生成大纲的对话内容会在你的浏览器本地处理。我们不会为了分析或广告目的将这些对话内容传输到我们的服务器。",
          "main > section:nth-of-type(3) p:nth-of-type(3)":
            "启用付费或受限功能时，可能会处理有限的技术与运营数据，用于许可证激活、验证、试用或权益检查、欺诈预防、反滥用、诊断、安全监控和支持。",
          "main > section:nth-of-type(3) p:nth-of-type(4)":
            "为这些目的可能处理的数据包括：",
          "main > section:nth-of-type(3) li:nth-child(1)":
            "Paddle（Merchant of Record）提供的购买相关标识符",
          "main > section:nth-of-type(3) li:nth-child(2)":
            "许可证、激活或权益状态信息",
          "main > section:nth-of-type(3) li:nth-child(3)":
            "用于启用或限制产品功能所必需的本地扩展数据",
          "main > section:nth-of-type(3) li:nth-child(4)":
            "你联系我们时产生的支持沟通数据",
          "main > section:nth-of-type(3) p:nth-of-type(5)":
            "扩展生成的 Markdown 导出内容由用户发起并保存或处理。我们不会将这些导出内容用于广告或画像。",
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
          "紫藤软件产品：ChatGPT Gemini 对话目录与大纲、Inbox for Mac 与 Inbox Capture。为重度 AI 用户打造的本地优先工具。",
        selectors: {
          ".compact-hero h1": "为重度 AI 用户打造的工具。",
          ".compact-hero .subtitle":
            "导航长 AI 对话，捕获重要内容，并将一切结构化保存在本地。",
          ".product-card.featured-product h2": "ChatGPT Gemini 对话目录与大纲",
          ".product-card.featured-product .product-tag": "Chrome 扩展",
          ".product-card.featured-product .subtitle": "为 ChatGPT 和 Gemini 长对话自动生成可点击目录。一键跳转到任意消息、标记关键问答，并带结构完整导出。",
          ".product-card.featured-product .hero-actions .btn-link.primary": "查看 Outline",
          ".product-grid article:nth-child(2) h3": "Inbox for Mac",
          ".product-grid article:nth-child(2) .product-tag": "macOS",
          ".product-grid article:nth-child(2) .subtitle": "你的本地知识中枢，用于 AI 对话、笔记和网页捕获。一切数据留在你的设备上。",
          ".product-grid article:nth-child(2) .hero-actions .btn-link.primary": "查看 Inbox",
          ".product-grid article:nth-child(3) h3": "Inbox Capture",
          ".product-grid article:nth-child(3) .product-tag": "Chrome 扩展",
          ".product-grid article:nth-child(3) .subtitle": "一键将网页内容发送到 Inbox。轻量级捕获伴侣。",
          ".product-grid article:nth-child(3) .hero-actions .btn-link.primary": "查看 Inbox",
          ".home-value-summary": "Outline 帮你找到它。Capture 帮你收集它。Inbox 帮你保存它。",
        },
      },
      "pricing.html": {
        title: "价格 – Outline",
        description:
          "Outline 的免费、Pro 与计划中的终身版价格。Pro 早鸟价为每年 $9.99，终身版早鸟计划价为 $19.90；Gemini 大纲跳转无次数上限。",
        selectors: {
          ".compact-hero h1": "价格",
          ".compact-hero .subtitle":
            "三种方式使用 <strong>Outline</strong>：免费入门、按年解锁完整 Pro 工作流，或等待计划中的终身早鸟选项。",
          ".price-grid .price-card:nth-child(1) .status-pill": "免费",
          ".price-grid .price-card:nth-child(1) h2": "免费",
          ".price-grid .price-card:nth-child(1) .plan-kicker": "ChatGPT 和 Gemini 的完整目录导航。",
          ".price-grid .price-card:nth-child(1) ul li:nth-child(1)":
            "<strong>目录跳转：</strong>所有 ChatGPT 和 Gemini 对话完全不限跳转次数",
          ".price-grid .price-card:nth-child(1) ul li:nth-child(2)":
            "<strong>书签：</strong>每会话 5 个书签",
          ".price-grid .price-card:nth-child(1) ul li:nth-child(3)":
            "<strong>导出：</strong>每月共 5 次 — ChatGPT、Gemini、Inbox 与本地 Markdown 合并计算",
          ".price-grid .price-card:nth-child(1) ul li:nth-child(4)":
            "<strong>Inbox 集成：</strong>本地 Mac 应用完整保留目录结构",
          ".price-grid .price-card:nth-child(1) ul li:nth-child(5)":
            "<strong>Markdown 导出：</strong>不安装 Inbox 也可使用",
          ".price-grid .price-card:nth-child(1) > p:last-of-type": "适合需要可靠导航和偶尔导出的日常 AI 用户。",
          ".price-grid .price-card:nth-child(2) .status-pill": "Pro 年费",
          ".price-grid .price-card:nth-child(2) h2": "Pro",
          ".price-grid .price-card:nth-child(2) .plan-kicker": "包含免费版全部功能，另加无限书签、无限导出与 AI 摘要。",
          ".price-grid .price-card:nth-child(2) ul li:nth-child(1)":
            "<strong>目录跳转：</strong>所有 ChatGPT 和 Gemini 对话完全不限跳转次数",
          ".price-grid .price-card:nth-child(2) ul li:nth-child(2)":
            "<strong>书签：</strong>每会话无限制",
          ".price-grid .price-card:nth-child(2) ul li:nth-child(3)":
            "<strong>导出：</strong>无限制 — ChatGPT、Gemini、Inbox、本地 Markdown，另支持仅导出书签",
          ".price-grid .price-card:nth-child(2) ul li:nth-child(4)":
            "<strong>Inbox 摘要：</strong>在 Inbox 桌面应用中用你自己的 API Key 触发深度 AI 摘要",
          ".price-grid .price-card:nth-child(2) ul li:nth-child(5)": "每份许可最多 3 台设备，许可期内可重新激活",
          // 【MODIFIED】Selector corrected after shared layout QA so the Pro checkout note translates without touching Paddle logic.
          ".price-grid .price-card:nth-child(2) p.small-note:not([data-checkout-error])":
            "按年一次性付费。这不是自动续订的订阅，因此日后无需担心意外续费。",
          ".price-grid .price-card:nth-child(2) .hero-actions .btn-link.primary": "解锁 Pro",
          ".price-grid .price-card:nth-child(3) .status-pill": "终身早鸟",
          ".price-grid .price-card:nth-child(3) h2": "终身",
          ".price-grid .price-card:nth-child(3) .plan-kicker": "与计划中的一次性购买相同的 Pro 工作流。",
          ".price-grid .price-card:nth-child(3) ul li:nth-child(1)": "为 Outline 的 Pro 方案一次性付费",
          ".price-grid .price-card:nth-child(3) ul li:nth-child(2)": "包含全部 Pro 导航、书签、导出与 Inbox 摘要能力，无需按年续费",
          ".price-grid .price-card:nth-child(3) ul li:nth-child(3)": "维护承诺至少至 2029 年 5 月",
          ".price-grid .price-card:nth-child(3) ul li:nth-child(4)": "结账入口尚未接通",
          ".price-grid .price-card:nth-child(3) > p:last-of-type": "终身早鸟资格。",
          ".price-grid .price-card:nth-child(3) .hero-actions .btn-link.secondary": "查看终身方案",
          ".notice-box.plan-note":
            "<strong>交付方式：</strong>购买后以激活码形式数字交付。激活后可离线使用；有效的 Pro 试用在书签、导出、ChatGPT 导航与 Inbox 摘要权限上与 Pro 相同。",
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
          "Inbox 是紫藤软件出品的本地优先、隐私优先的 AI 信息处理器。AI 与人脑之间的缓存层——导入结构化 AI 对话并保留目录跳转、按标签和时间筛选、支持插件扩展。",
        selectors: {
          ".inbox-page .split-hero .eyebrow": "紫藤软件",
          ".inbox-page .hero-title":
            "Inbox —— AI 与人脑之间的缓存层。",
          ".inbox-page .split-hero > div > .subtitle:nth-of-type(1)":
            "AI 在单次会话中产生的信息量远超任何人能吸收的上限。<strong>Inbox</strong> 位于你与 AI 之间，提供一个本地优先、隐私优先的空间，用于导入、筛选、回顾和复用结构化 AI 对话——同时完整保留使你能够高效使用的目录导航。",
          ".inbox-page .split-hero > div > .subtitle:nth-of-type(2)":
            "与其他工具导出的扁平 Markdown 或 PDF 不同，通过 <strong>Outline</strong> 导入 Inbox 的对话保留了完整目录跳转功能。点击大纲中的任意问题，即可跳转到对应回答——就像在原始聊天中一样。",
          ".inbox-page .split-hero .hero-actions .btn-link.primary": "下载 Inbox Local（macOS 版）",
          ".inbox-page .split-hero .hero-actions .btn-link.secondary": "了解功能",
          ".inbox-page .hero-card h2": "概览",
          ".inbox-page .hero-points li:nth-child(1)":
            "<strong>本地优先与隐私优先：</strong>你的数据留存在你自己的设备上，不上传到我们的服务器。",
          ".inbox-page .hero-points li:nth-child(2)":
            "<strong>由紫藤软件有限公司开发</strong>，英国注册的独立软件公司。",
          ".inbox-page .hero-points li:nth-child(3)":
            "<strong>与 Outline 联动：</strong>通过 Outline 导出的 ChatGPT 和 Gemini 对话保留目录结构，支持跳转导航。",
          ".inbox-page .hero-points li:nth-child(4)":
            "<strong>可扩展：</strong>插件系统支持捕获网页内容、图片和剪贴板材料。",
          "main > section:nth-of-type(1) h2": "Inbox 能做什么",
          "main > section:nth-of-type(1) > p":
            "Inbox 专为 AI 工作的现实场景而设计：长线程、有价值的碎片，以及日后查找的持续需求。它处理结构化的 AI 信息，为你提供保持条理的工具。",
          "main > section:nth-of-type(1) .feature-item:nth-child(1) h3": "导入结构化对话",
          "main > section:nth-of-type(1) .feature-item:nth-child(1) p":
            "导入通过 <strong>Outline</strong> 导出的 ChatGPT 和 Gemini 对话。目录结构被完整保留——点击任意大纲条目即可跳转到对话对应位置。没有其他工具能做到这一点。",
          "main > section:nth-of-type(1) .feature-item:nth-child(2) h3": "按标签、时间等条件筛选",
          "main > section:nth-of-type(1) .feature-item:nth-child(2) p":
            "为导入的材料添加标签。按标签、日期范围和其他条件进行筛选，在需要时精准找到所需内容。",
          "main > section:nth-of-type(1) .feature-item:nth-child(3) h3": "从任何地方捕获",
          "main > section:nth-of-type(1) .feature-item:nth-child(3) p":
            "使用浏览器伴侣插件 <strong>Inbox Capture</strong>，在浏览时保存网页文本、截图、图片和笔记。也可以从剪贴板直接粘贴到 Inbox。",
          "main > section:nth-of-type(1) .feature-item:nth-child(4) h3": "插件扩展",
          "main > section:nth-of-type(1) .feature-item:nth-child(4) p":
            "Inbox 支持插件来扩展捕获能力：抓取网页文章、图片和结构化内容，将它们纳入你的本地知识工作流。",
          "main > section:nth-of-type(1) .feature-item:nth-child(5) h3": "回顾与复用",
          "main > section:nth-of-type(1) .feature-item:nth-child(5) p":
            "不再重复问同样的问题。建立一个不断增长的个人 AI 辅助工作库，可以随时搜索、筛选和在此基础上继续构建。",
          "main > section:nth-of-type(1) .feature-item:nth-child(6) h3": "你的数据，你的设备",
          "main > section:nth-of-type(1) .feature-item:nth-child(6) p":
            "一切都在本地。没有云存储，没有数据上传到我们的服务器。Inbox 是原生 macOS 应用，完全在你的机器上运行。",
          "main > section:nth-of-type(2) h2": "工作流",
          "main > section:nth-of-type(2) .workflow-line": "与 AI 对话 → 用 Outline 生成目录 → 导出到 Inbox → 标签、筛选、回顾 → 复用",
          "main > section:nth-of-type(2) > p:nth-of-type(2)":
            "Inbox 将 AI 从一次性问答工具转变为长期思考和知识的系统。Outline 浏览器扩展生成结构；Inbox 存储、保留它，并让你与之协作。",
          "main > section:nth-of-type(2) .meta-card:nth-child(1)":
            "<strong>Outline</strong>从任意 ChatGPT 或 Gemini 对话中生成可点击的目录。",
          "main > section:nth-of-type(2) .meta-card:nth-child(2)":
            "<strong>导出</strong>将结构化对话发送到 Inbox——目录跳转保持完整。",
          "main > section:nth-of-type(2) .meta-card:nth-child(3)":
            "<strong>Inbox</strong>标签、筛选、搜索，并回顾你不断增长的知识库。",
          ".companion-section .section-intro .eyebrow": "浏览器伴侣",
          ".companion-section .section-intro h2": "Inbox Capture",
          ".companion-section > p":
            "Inbox Capture 是 Inbox 的浏览器端插件。在浏览时保存有用的文本、截图、图片和笔记，然后将它们带入 Inbox 知识库进行回顾和复用。与 Outline 配合使用，形成完整的捕获工作流。",
          ".companion-section .hero-actions .btn-link.primary": "在 Chrome 上安装 Inbox Capture",
          ".companion-section .hero-actions .btn-link.secondary": "查看全部产品",
          "main > section.cta h2": "你的 AI 对话值得拥有一个归宿。",
          "main > section.cta > p": "用 Inbox Local（macOS 版）导入、整理并拥有它们。",
          "main > section.cta a": "下载 Inbox Local（macOS 版）",
        },
      },
      "support.html": {
        title: "支持 – Wisteria Software",
        description: "Wisteria Software 产品支持：Outline、Inbox for Mac 与 Inbox Capture。安装、计费与缺陷报告。",
        selectors: {
          ".compact-hero h1": "支持",
          ".compact-hero .subtitle": "Wisteria Software 产品的安装、计费、激活与缺陷报告。",
          ".product-grid .product-card:nth-child(1) h3": "ChatGPT Gemini 对话目录与大纲",
          ".product-grid .product-card:nth-child(1) .product-tag": "Chrome 扩展",
          ".product-grid .product-card:nth-child(1) p:nth-of-type(2)": "安装、激活、计费、退款与缺陷报告相关问题。",
          ".product-grid .product-card:nth-child(1) .hero-actions .btn-link": "查看 Outline",
          ".product-grid .product-card:nth-child(2) h3": "Inbox for Mac",
          ".product-grid .product-card:nth-child(2) .product-tag": "macOS",
          ".product-grid .product-card:nth-child(2) p:nth-of-type(2)": "Apple Silicon Mac 上的下载、设置与本地应用问题。Windows 版本即将推出。",
          ".product-grid .product-card:nth-child(2) .hero-actions .btn-link": "查看 Inbox",
          ".product-grid .product-card:nth-child(3) h3": "Inbox Capture",
          ".product-grid .product-card:nth-child(3) .product-tag": "Chrome 扩展",
          ".product-grid .product-card:nth-child(3) p:nth-of-type(2)": "安装、设置与浏览器伴侣相关问题。",
          ".product-grid .product-card:nth-child(3) .hero-actions .btn-link": "查看 Inbox",
          ".contact-box h2": "联系",
          ".contact-box > p:nth-of-type(1)": "<a href=\"mailto:support@wisteriasoftware.uk\">support@wisteriasoftware.uk</a>",
          ".contact-box .subtitle": "通常 1–2 个工作日内回复。",
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
        title: "Outline - ChatGPT Gemini 对话目录与大纲",
        description:
          "Outline 是面向 ChatGPT 与 Gemini 的 Chrome 扩展：ChatGPT Gemini 对话目录与大纲：ChatGPT Gemini 对话目录与大纲。将长对话变为可点击的侧边栏大纲。跳转到消息、为关键问答加书签，并导出为 Markdown 或 Inbox。Gemini 大纲跳转无次数上限。",
        selectors: {
          ".sales-hero .eyebrow": "ChatGPT Gemini 对话目录与大纲",
          ".sales-hero h1": "别再翻找。找到它。保存它。",
          ".sales-hero > p:nth-child(3)":
            "用专注的侧边栏大纲导航 ChatGPT 与 Gemini 的长对话。跳转到消息、标记关键回合，并轻松导出聊天。",
          ".sales-hero > p:nth-child(4)":
            "Gemini 大纲跳转无目录条数上限。为重要问答加书签，并将保存的内容精确导出到本地 Markdown 或 Inbox。",
          ".sales-hero .hero-actions .btn-link.primary": "安装 Chrome 插件",
          ".sales-hero > p:nth-child(6)":
            "14 天退款政策。<a href=\"refund.html\">查看退款说明</a>。",
          ".sales-hero > p:nth-child(8)": "付款由 Paddle（Merchant of Record）处理。",
          ".sales-hero .kicker-list .kicker:nth-child(1)": "Chrome 扩展",
          ".sales-hero .kicker-list .kicker:nth-child(2)": "支持 ChatGPT 与 Gemini",
          ".sales-hero .kicker-list .kicker:nth-child(3)": "本地处理，隐私友好",
          ".sales-hero .kicker-list .kicker:nth-child(4)": "支持 200+ 轮对话",
          ".demo-section .section-intro h2": "观看演示",
          ".video-poster-overlay .video-poster-cta": "观看演示",
          "#outline-demo-note":
            "当前环境无法播放视频。显示产品截图。",
          "main > section:nth-of-type(2) h2": "长 AI 对话几乎无法导航。",
          "main > section:nth-of-type(2) p:nth-of-type(1)":
            "你向 ChatGPT 或 Gemini 提问。你追问。你深入挖掘。不知不觉，对话已经 150 条——而你需要的那个答案埋在中间的某处。你滚动。你搜索。你放弃，然后重新提问。",
          "main > section:nth-of-type(2) p:nth-of-type(2)":
            "<strong>Outline</strong> 解决了这个问题。它自动为你的整个对话构建可点击目录。一键找到任意消息。标记值得保存的内容。在它们消失在聊天记录中之前导出。",
          "main > section#pricing .section-intro .eyebrow": "价格",
          "main > section#pricing .section-intro h2": "免费起步。需要更多时升级 Pro。",
          "main > section#pricing .section-intro .subtitle":
            "所有套餐均支持 ChatGPT 和 Gemini 无限制目录跳转。Pro 增加无限书签、无限导出和 Inbox AI 摘要。",
          "main > section#pricing .price-card:nth-child(1) .status-pill": "免费",
          "main > section#pricing .price-card:nth-child(1) h3": "免费",
          "main > section#pricing .price-card:nth-child(1) .plan-kicker": "ChatGPT 和 Gemini 的完整目录导航。",
          "main > section#pricing .price-card:nth-child(1) .plan-compare-list li:nth-child(1)":
            "<span class=\"plan-icon\">🟢</span><span><strong>目录跳转：</strong>所有 ChatGPT 和 Gemini 对话均不限制跳转次数</span>",
          "main > section#pricing .price-card:nth-child(1) .plan-compare-list li:nth-child(2)":
            "<span class=\"plan-icon\">🟡</span><span><strong>书签：</strong>每会话 5 个书签</span>",
          "main > section#pricing .price-card:nth-child(1) .plan-compare-list li:nth-child(3)":
            "<span class=\"plan-icon\">🟠</span><span><strong>导出：</strong>每月共 5 次导出 &mdash; ChatGPT、Gemini、Inbox 与本地 Markdown 合并计算</span>",
          "main > section#pricing .price-card:nth-child(1) .plan-compare-list li:nth-child(4)":
            "<span class=\"plan-icon\">🟢</span><span><strong>Inbox：</strong>本地 Mac 应用，完整保留目录结构；通过 Outline 导出的 ChatGPT 和 Gemini 对话支持目录跳转</span>",
          "main > section#pricing .price-card:nth-child(1) .plan-compare-list li:nth-child(5)":
            "<span class=\"plan-icon\">❌</span><span><strong>Inbox 摘要：</strong>仅 Pro &mdash; 需填入你自己的 API Key</span>",
          "main > section#pricing .price-card:nth-child(1) > p:last-of-type": "适合需要可靠导航、基本书签和偶尔导出的日常 AI 用户。",
          "main > section#pricing .price-card:nth-child(2) .status-pill": "Pro 年费",
          "main > section#pricing .price-card:nth-child(2) h3": "Pro",
          "main > section#pricing .price-card:nth-child(2) .plan-kicker": "包含免费版全部功能，另加无限书签、无限导出与 AI 摘要。",
          "main > section#pricing .price-card:nth-child(2) .plan-compare-list li:nth-child(1)":
            "<span class=\"plan-icon\">✅</span><span><strong>目录跳转：</strong>所有 ChatGPT 和 Gemini 对话均不限制跳转次数</span>",
          "main > section#pricing .price-card:nth-child(2) .plan-compare-list li:nth-child(2)":
            "<span class=\"plan-icon\">✅</span><span><strong>书签：</strong>每会话无限制</span>",
          "main > section#pricing .price-card:nth-child(2) .plan-compare-list li:nth-child(3)":
            "<span class=\"plan-icon\">✅</span><span><strong>导出：</strong>无限制 &mdash; ChatGPT、Gemini、Inbox 与本地 Markdown 合并计算；书签导出支持 Markdown、PDF 与 Typeless 格式</span>",
          "main > section#pricing .price-card:nth-child(2) .plan-compare-list li:nth-child(4)":
            "<span class=\"plan-icon\">✅</span><span><strong>Inbox：</strong>本地 Mac 应用，完整保留目录结构；通过 Outline 导出的 ChatGPT 和 Gemini 对话支持目录跳转</span>",
          "main > section#pricing .price-card:nth-child(2) .plan-compare-list li:nth-child(5)":
            "<span class=\"plan-icon\">✅</span><span><strong>Inbox 摘要：</strong>在 Inbox 桌面应用中用你自己的 API Key 触发深度 AI 摘要</span>",
          "main > section#pricing .price-card:nth-child(2) p.small-note":
            "按年一次性付费。这不是自动续订的订阅，因此日后无需担心意外续费。",
          "main > section#pricing .price-card:nth-child(2) > p:nth-of-type(4)":
            "适合严肃研究、写作、编程与周期性知识回顾。",
          "main > section#pricing .price-card:nth-child(2) .hero-actions .btn-link.primary": "解锁 Pro",
          // 【MODIFIED】Selector corrected after shared layout QA so the refund notice translates reliably.
          "main > section#pricing > .notice-box:not(.plan-note)":
            "<strong>退款政策：</strong>所有购买均适用 14 天退款政策。<a href=\"refund.html\">查看退款政策</a>",
          "main > section#pricing > p.small-note":
            "新用户可获得 7 天 Pro 试用。试用期间，大纲导航、书签与导出适用 Pro 限制。",
          "main > section#pricing .notice-box.plan-note":
            "<strong>技术与隐私：</strong>Inbox 是可选的本地 macOS 应用（Apple Silicon）。数据默认保存在你的设备上；AI 摘要由你手动触发，并在 Inbox 内使用你自己的 API Key。Inbox 可单独从 wisteriasoftware.uk 下载。",
          "#features h2": "它能做什么",
          "#features .feature-item:nth-child(1) h3": "为 200+ 轮对话生成可点击目录",
          "#features .feature-item:nth-child(1) p": "一键为任意 ChatGPT 或 Gemini 对话生成完整目录。支持任意长度的对话——200 条消息或更多。",
          "#features .feature-item:nth-child(2) h3": "一键跳转到任意消息",
          "#features .feature-item:nth-child(2) p": "点击目录中的任意条目。页面直接滚动到对应消息。不再无休止地翻阅数百条回复。",
          "#features .feature-item:nth-child(3) h3": "标记重点内容",
          "#features .feature-item:nth-child(3) p": "标记值得保存的具体问答回合。免费用户每会话 5 个书签；Pro 用户无限制。随时回顾你的书签。",
          "#features .feature-item:nth-child(4) h3": "导出到 Inbox，完整保留结构",
          "#features .feature-item:nth-child(4) p": "将对话发送到 Inbox，目录结构保持不变。在 Inbox 内像原始聊天一样在消息间跳转。没有其他导出工具能做到这一点。",
          "#features .feature-item:nth-child(5) h3": "Markdown 导出",
          "#features .feature-item:nth-child(5) p": "将完整对话或仅已加书签的问答导出为清晰的 Markdown 文件。安装或不安装 Inbox 均可使用。",
          "#features .feature-item:nth-child(6) h3": "本地处理，隐私优先",
          "#features .feature-item:nth-child(6) p": "所有页面内容留在你的浏览器中。没有任何内容上传到任何服务器。激活后扩展可离线运行。",
          ".demo-section .section-intro h2": "观看演示",
          ".video-poster-overlay .video-poster-cta": "观看演示",
          "#outline-demo-note": "当前环境无法播放视频。显示产品截图。",
          "main > section:nth-of-type(5) h2": "还包括",
          "main > section:nth-of-type(5) .meta-card:nth-child(1)": "<strong>深色模式</strong>自动匹配你的系统偏好。",
          "main > section:nth-of-type(5) .meta-card:nth-child(2)": "<strong>键盘快捷键</strong>Alt/Option + ←/→ 切换侧边栏。",
          "main > section:nth-of-type(5) .meta-card:nth-child(3)": "<strong>灵活侧边栏</strong>左右切换，拖拽调整大小。",
          "main > section:nth-of-type(5) .meta-card:nth-child(4)": "<strong>自动刷新</strong>新消息出现或切换对话时，目录自动更新。",
          "main > section:nth-of-type(5) .meta-card:nth-child(5)": "<strong>图像感知</strong>纯图片提示会被标注，便于快速浏览。",
          "main > section:nth-of-type(5) .meta-card:nth-child(6)": "<strong>持续维护</strong>当 ChatGPT 或 Gemini 变更页面结构时，我们会及时适配，确保扩展持续可用。",
          "#faq h2": "常见问题",
          "#faq .faq-item:nth-child(1) h3": "Outline 是做什么的？",
          "#faq .faq-item:nth-child(1) p": "它为长 ChatGPT 和 Gemini 对话自动生成可点击的目录，让你可以跳转到任意消息、标记关键问答并导出重点内容。适用于 200+ 轮对话。",
          "#faq .faq-item:nth-child(2) h3": "支持 Gemini 吗？",
          "#faq .faq-item:nth-child(2) p": "支持。Outline 可在 Chrome 和 Chromium 浏览器中同时支持 ChatGPT 和 Gemini。Gemini 目录跳转无次数限制。",
          "#faq .faq-item:nth-child(3) h3": "购买后如何激活？",
          "#faq .faq-item:nth-child(3) p": "你会收到包含激活码的邮件（例如 <code>XXXX-XXXX-XXXX</code>）。在扩展中输入即可激活。仅首次激活需要联网——之后可完全离线运行。许可期内可按需重新激活。",
          "#faq .faq-item:nth-child(4) h3": "微信支付成功但页面似乎卡住？",
          "#faq .faq-item:nth-child(4) p": "微信支付可能异步完成，成功页可能需要几分钟更新。请预留约 15 分钟等待支付状态同步。激活码邮件也可能延迟——若 20 分钟后仍未收到，请联系 <a href=\"mailto:support@wisteriasoftware.uk\">support@wisteriasoftware.uk</a>。",
          "#faq .faq-item:nth-child(5) h3": "有试用吗？",
          "#faq .faq-item:nth-child(5) p": "有。新用户可获得 7 天 Pro 试用，享有完整 Pro 导航、书签和导出限制。试用期内 Gemini 目录跳转无限制。",
          "#faq .faq-item:nth-child(6) h3": "需要一直联网吗？",
          "#faq .faq-item:nth-child(6) p": "不需要。仅首次激活需联网。之后扩展完全离线运行。",
          "#faq .faq-item:nth-child(7) h3": "免费版和 Pro 有什么区别？",
          "#faq .faq-item:nth-child(7) p": "两个版本均支持 ChatGPT 和 Gemini 无限制目录跳转。免费版每会话 5 个书签、每月 5 次导出。Pro 解锁无限书签和导出，外加 Inbox AI 摘要（使用你自己的 API Key）。详见上方<a href=\"#pricing\">价格对比表</a>。",
          "#faq .faq-item:nth-child(8) h3": "Outline 会上传我的对话吗？",
          "#faq .faq-item:nth-child(8) p": "不会。所有页面内容在你浏览器本地处理。任何内容都不会上传到任何服务器。激活后扩展可离线运行。",
          "#faq .faq-item:nth-child(9) h3": "能否仅导出已加书签的部分？",
          "#faq .faq-item:nth-child(9) p": "可以。先为你想保留的问答加书签，然后仅将那些部分导出为 Markdown 或发送到 Inbox——无需导出整个对话。",
          "#faq .faq-item:nth-child(10) h3": "如何联系支持？",
          "#faq .faq-item:nth-child(10) p": "<a href=\"mailto:support@wisteriasoftware.uk\">support@wisteriasoftware.uk</a>",
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
