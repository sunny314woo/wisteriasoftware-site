/*
 * Semantic i18n compatibility layer for the Wisteria landing site.
 * Purpose: keep translations stable when page layout/classes change.
 * It complements the legacy selector bridge in i18n.js; it does not replace
 * payment, checkout, routing, or existing locale preference logic.
 */
(function () {
  const zhCodes = new Set(["zh", "zh-cn", "zh-hans", "zh-hk", "zh-tw"]);
  const translatedNodes = new Set();
  const originalText = new WeakMap();
  let applying = false;

  function normalize(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function pageKey() {
    const clean = window.location.pathname.replace(/\/+$/, "");
    return clean.split("/").pop() || "index.html";
  }

  function activeLanguage() {
    const htmlLang = (document.documentElement.lang || "").toLowerCase();
    if (zhCodes.has(htmlLang) || htmlLang.startsWith("zh-")) return "zh-Hans";
    try {
      const query = new URLSearchParams(window.location.search).get("lang");
      if (query && zhCodes.has(query.toLowerCase())) return "zh-Hans";
    } catch (error) {}
    try {
      const saved = (localStorage.getItem("wisteria-language") || "").toLowerCase();
      if (zhCodes.has(saved)) return "zh-Hans";
    } catch (error) {}
    return "en";
  }

  const pages = {
    "outline-pro.html": {
      "outline.hero.eyebrow": ["For existing Outline users", "面向现有 OutlineSave 用户"],
      "outline.hero.title": ["Save long ChatGPT & Gemini chats as searchable HTML knowledge pages", "把长篇 ChatGPT 和 Gemini 对话保存为可搜索的离线 HTML 知识页"],
      "outline.hero.subtitle": ["Outline Pro helps you jump through long AI conversations, mark important answers, and export private offline HTML pages with search, filters, highlights, and notes.", "OutlineSave Pro 帮你在长篇 AI 对话中快速跳转、标记重要回答，并导出带搜索、筛选、高亮和笔记的私密离线 HTML 页面。"],
      "outline.cta.lifetime": ["Get Lifetime Access", "获取终身授权"],
      "outline.cta.compare": ["Compare Plans", "比较方案"],
      "outline.hero.note": ["7-day Pro trial · 14-day refund · One-time payment · No subscription", "7 天 Pro 试用 · 14 天退款 · 一次性付款 · 非订阅"],
      "outline.kicker.local": ["Local-first", "本地优先"],
      "outline.kicker.upload": ["No chat upload", "不上传聊天内容"],
      "outline.kicker.activation": ["Works after activation", "激活后即可使用"],
      "outline.problem.long": ["AI conversations get long.", "AI 对话会变得很长。"],
      "outline.problem.hidden": ["Useful answers disappear in the middle.", "有用的回答很容易埋在中间。"],
      "outline.problem.history": ["Browser history is not a knowledge system.", "浏览器历史记录不是知识系统。"],
      "outline.features.eyebrow": ["What Pro unlocks", "Pro 解锁内容"],
      "outline.features.title": ["Turn saved chats into reusable knowledge", "把保存的聊天变成可复用知识"],
      "outline.features.subtitle": ["Pro focuses on one result: searchable, filterable, long-lived HTML pages for the AI work you want to keep.", "Pro 聚焦一个结果：把你想长期保留的 AI 工作保存为可搜索、可筛选、可长期使用的 HTML 知识页。"],
      "outline.features.find.title": ["Find faster", "更快找到重点"],
      "outline.features.find.body": ["Use the automatic outline and local search to jump to the answer you need without rescrolling the whole conversation.", "使用自动目录和本地搜索直接跳到需要的回答，不必重新滚动整段对话。"],
      "outline.features.mark.title": ["Mark what matters", "标记重要内容"],
      "outline.features.mark.body": ["Keep highlights, notes, bookmarks, and starred items attached to the parts of the chat that deserve review.", "把高亮、笔记、书签和星标保留在真正值得复习的聊天内容旁。"],
      "outline.features.export.title": ["Export as knowledge", "导出为知识页"],
      "outline.features.export.body": ["Create private offline HTML pages with preserved structure, search, filters, and readable formatting.", "生成私密离线 HTML 页面，保留结构、搜索、筛选和易读格式。"],
      "outline.pricing.title": ["Need more HTML exports?", "需要更多 HTML 导出？"],
      "outline.pricing.subtitle": ["Upgrade to Pro to save long ChatGPT and Gemini conversations as searchable offline HTML knowledge pages.", "升级到 Pro，把长篇 ChatGPT 和 Gemini 对话保存成可搜索的离线 HTML 知识页。"],
      "outline.pricing.year.name": ["Pro 1-Year", "Pro 一年授权"],
      "outline.pricing.year.for": ["For regular AI work review", "适合持续回顾 AI 工作"],
      "outline.pricing.unlimited": ["Unlimited searchable HTML exports", "无限次可搜索 HTML 导出"],
      "outline.pricing.search": ["Search and filter exported pages", "在导出页面中搜索和筛选"],
      "outline.pricing.annotations": ["Highlights, notes, and bookmarks in exported pages", "导出页面保留高亮、笔记和书签"],
      "outline.pricing.priority": ["Priority email support", "优先邮件支持"],
      "outline.pricing.validity": ["Valid for 1 year · Manual renewal · No auto-renewal", "有效期 1 年 · 手动续期 · 不自动续费"],
      "outline.pricing.getYear": ["Get 1-Year Pro", "获取一年 Pro"],
      "outline.pricing.badge": ["Best Value", "最划算"],
      "outline.pricing.lifetime.name": ["Lifetime", "终身授权"],
      "outline.pricing.lifetime.for": ["Best for long-term AI knowledge building", "适合长期沉淀 AI 知识"],
      "outline.pricing.early": ["Early Bird", "早鸟价"],
      "outline.pricing.value": ["Only $15 more than 1-Year", "只比一年授权多 $15"],
      "outline.pricing.forever": ["Unlimited searchable HTML exports forever", "永久无限次可搜索 HTML 导出"],
      "outline.pricing.everything": ["Everything in 1-Year Pro", "包含一年 Pro 的全部功能"],
      "outline.pricing.noReminder": ["No renewal reminders", "无需续费提醒"],
      "outline.pricing.future": ["All future Pro updates", "所有未来 Pro 更新"],
      "outline.pricing.oneTime": ["One-time payment", "一次性付款"],
      "outline.pricing.support": ["Support a local-first independent product.", "支持一个本地优先的独立产品。"],
      "outline.demo.eyebrow": ["Product proof", "产品实测"],
      "outline.demo.title": ["See what Pro unlocks", "看看 Pro 能解锁什么"],
      "outline.demo.subtitle": ["The screenshots below use English UI examples and focus on the four Pro outcomes.", "下面的截图使用英文界面示例，重点展示四类 Pro 使用结果。"],
      "outline.demo.fig1": ["Outline navigation keeps long conversations scannable.", "目录导航让长对话更容易浏览。"],
      "outline.demo.fig2": ["HTML export creates private, searchable offline pages.", "HTML 导出会生成私密、可搜索的离线页面。"],
      "outline.demo.fig3": ["Search and filters narrow down the parts worth reviewing.", "搜索和筛选帮助你快速缩小到值得复习的内容。"],
      "outline.demo.fig4": ["Notes and highlights keep your reasoning attached to the source chat.", "笔记和高亮让你的思考始终和原始聊天保持关联。"],
      "outline.trust.private.title": ["Private by default", "默认保护隐私"],
      "outline.trust.private.body": ["Chat content is processed in your browser. Wisteria does not upload or analyze your conversations.", "聊天内容在浏览器本地处理。Wisteria 不会上传或分析你的对话。"],
      "outline.trust.activation.title": ["Simple activation", "激活简单"],
      "outline.trust.activation.body": ["You receive an activation code by email after purchase. Enter it in the extension to unlock Pro.", "购买后你会通过邮件收到激活码，在扩展中输入即可解锁 Pro。"],
      "outline.trust.refund.title": ["Refund friendly", "支持退款"],
      "outline.trust.refund.body": ["All purchases are covered by a 14-day refund policy, with support available by email.", "所有购买均适用 14 天退款政策，并提供邮件支持。"],
      "outline.faq.title": ["Questions before upgrading", "升级前常见问题"],
      "outline.faq.upload.q": ["Does Outline upload my chats?", "OutlineSave 会上传我的聊天吗？"],
      "outline.faq.upload.a": ["No. ChatGPT and Gemini page content is processed locally in your browser and is not uploaded to Wisteria servers.", "不会。ChatGPT 和 Gemini 页面内容在浏览器本地处理，不会上传到 Wisteria 服务器。"],
      "outline.faq.subscription.q": ["Is this a subscription?", "这是订阅吗？"],
      "outline.faq.subscription.a": ["No. Both Pro plans are one-time payments. The 1-Year plan expires after a year; Lifetime does not require renewal.", "不是。两种 Pro 方案都是一次性付款。一年授权在一年后到期；终身授权无需续费。"],
      "outline.faq.activate.q": ["How do I activate after purchase?", "购买后如何激活？"],
      "outline.faq.activate.a": ["You receive an activation code by email. Enter it in the extension to activate Pro access.", "你会通过邮件收到激活码，在扩展中输入即可激活 Pro。"],
      "outline.faq.free.q": ["What is the difference between Free and Pro?", "免费版和 Pro 有什么区别？"],
      "outline.faq.free.a": ["Free lets you try the core workflow. Pro unlocks unlimited searchable HTML exports, filters, offline review, and priority support.", "免费版可以使用核心工作流；Pro 解锁无限次可搜索 HTML 导出、筛选、离线回顾和优先支持。"],
      "outline.faq.refund.q": ["Can I get a refund?", "可以退款吗？"],
      "outline.faq.wechat.q": ["What if WeChat Pay looks stuck?", "微信支付看起来卡住怎么办？"],
      "outline.faq.wechat.a": ["WeChat Pay can complete asynchronously. Please allow about 15 minutes for payment sync and about 20 minutes for the activation email before contacting support.", "微信支付可能异步完成。请预留约 15 分钟等待支付状态同步，并预留约 20 分钟等待激活邮件；之后如仍有问题再联系支持。"]
    }
  };

  const attrMessages = {
    "outline-pro.html": {
      "Outline Pro product preview": "OutlineSave Pro 产品预览",
      "Why Pro matters": "为什么需要 Pro",
      "Privacy and purchase details": "隐私与购买说明",
      "Previous promotional image": "上一张宣传图",
      "Next promotional image": "下一张宣传图",
      "Promotional image carousel controls": "宣传图轮播控制"
    }
  };

  function patchLegacyDictionary() {
    const dictionaries = window.WISTERIA_I18N_DICTIONARIES;
    if (!dictionaries || !dictionaries["zh-Hans"]) return false;
    const dictionary = dictionaries["zh-Hans"];
    dictionary.shared = dictionary.shared || {};
    dictionary.shared.nav = dictionary.shared.nav || {};
    dictionary.shared.footer = dictionary.shared.footer || {};
    dictionary.shared.nav["outline-pro.html"] = "OutlineSave";
    dictionary.shared.footer["outline-pro.html"] = "OutlineSave";
    dictionary.shared.nav["support-help-guides"] = "帮助与指南";
    dictionary.shared.nav["support-contact"] = "联系支持";

    function normalizeBrand(value) {
      if (typeof value === "string") return value.replace(/\bOutline\b/g, "OutlineSave");
      if (Array.isArray(value)) return value.map(normalizeBrand);
      if (value && typeof value === "object") {
        Object.keys(value).forEach((key) => {
          value[key] = normalizeBrand(value[key]);
        });
      }
      return value;
    }
    normalizeBrand(dictionary.pages || {});
    return true;
  }

  function remember(node) {
    if (!originalText.has(node)) originalText.set(node, node.nodeValue);
    translatedNodes.add(node);
  }

  function restoreSemanticText() {
    translatedNodes.forEach((node) => {
      if (node && originalText.has(node)) node.nodeValue = originalText.get(node);
    });
    translatedNodes.clear();
  }

  function translateTextNodes(messageMap) {
    const byEnglish = new Map();
    Object.entries(messageMap || {}).forEach(([key, pair]) => {
      if (!pair || pair.length < 2) return;
      byEnglish.set(normalize(pair[0]), { key, zh: pair[1] });
    });
    if (!byEnglish.size) return;

    const root = document.querySelector("main") || document.body;
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        if (["SCRIPT", "STYLE", "CODE", "PRE"].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
        return normalize(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });

    const nodes = [];
    let node;
    while ((node = walker.nextNode())) nodes.push(node);
    nodes.forEach((textNode) => {
      const match = byEnglish.get(normalize(textNode.nodeValue));
      if (!match) return;
      remember(textNode);
      textNode.nodeValue = match.zh;
      if (textNode.parentElement && !textNode.parentElement.dataset.i18nSemanticKey) {
        textNode.parentElement.dataset.i18nSemanticKey = match.key;
      }
    });
  }

  function translateAttributes(page) {
    const map = attrMessages[page] || {};
    document.querySelectorAll("[aria-label]").forEach((element) => {
      const original = element.dataset.i18nSemanticOriginalAria || element.getAttribute("aria-label") || "";
      if (!element.dataset.i18nSemanticOriginalAria) element.dataset.i18nSemanticOriginalAria = original;
      if (activeLanguage() === "zh-Hans" && map[original]) {
        element.setAttribute("aria-label", map[original]);
      } else {
        element.setAttribute("aria-label", original);
      }
    });
  }

  function fixSharedLabels(language) {
    const chinese = language === "zh-Hans";
    document.querySelectorAll('[data-i18n-key="outline-pro.html"], .footer-links a[data-i18n-base-href="outline-pro.html"]').forEach((el) => {
      el.textContent = "OutlineSave";
    });
    document.querySelectorAll('[data-i18n-key="support-help-guides"], .footer-links a[data-i18n-base-href="support.html#help-guides"]').forEach((el) => {
      el.textContent = chinese ? "帮助与指南" : "Help & Guides";
    });
    document.querySelectorAll('[data-i18n-key="support-contact"]').forEach((el) => {
      el.textContent = chinese ? "联系支持" : "Contact Support";
    });
  }

  function fixSupport(language) {
    if (pageKey() !== "support.html") return;
    const chinese = language === "zh-Hans";
    const helpTitle = document.querySelector("#help-guides h2");
    const helpBody = document.querySelector("#help-guides > p");
    const helpLink = document.querySelector("#help-guides a");
    const contactTitle = document.querySelector("#contact h2");
    if (helpTitle) helpTitle.textContent = chinese ? "帮助与指南" : "Help & Guides";
    if (helpBody) helpBody.textContent = chinese
      ? "在 Wisteria 帮助中心浏览分步教程、FAQ、导出指南和故障排查。"
      : "Browse step-by-step tutorials, FAQs, export guides, and troubleshooting in the Wisteria Help Center.";
    if (helpLink) helpLink.textContent = chinese ? "浏览帮助与指南" : "Browse Help & Guides";
    if (contactTitle) contactTitle.textContent = chinese ? "联系" : "Contact";
  }

  function apply() {
    if (applying) return;
    applying = true;
    try {
      patchLegacyDictionary();
      const language = activeLanguage();
      restoreSemanticText();
      fixSharedLabels(language);
      fixSupport(language);
      if (language === "zh-Hans") translateTextNodes(pages[pageKey()] || {});
      translateAttributes(pageKey());
    } finally {
      applying = false;
    }
  }

  function initialize() {
    let attempts = 0;
    const timer = window.setInterval(() => {
      attempts += 1;
      const patched = patchLegacyDictionary();
      if (patched && window.WisteriaI18n && typeof window.WisteriaI18n.applyLanguage === "function") {
        window.clearInterval(timer);
        const lang = activeLanguage();
        window.WisteriaI18n.applyLanguage(lang);
        apply();
      } else if (attempts >= 40) {
        window.clearInterval(timer);
        apply();
      }
    }, 50);

    const observer = new MutationObserver((mutations) => {
      if (mutations.some((mutation) => mutation.type === "attributes" && mutation.attributeName === "lang")) {
        window.setTimeout(apply, 0);
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });

    window.WisteriaSemanticI18n = { apply, pageKey, version: "2026-09-17-v1" };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
