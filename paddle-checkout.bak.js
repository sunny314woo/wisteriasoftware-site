// Paddle.js 结账（Overlay/Inline）启动器，用于这个静态网站。
// 关于 successUrl/cancelUrl：
// - 这是“支付成功/取消”后的回跳地址，属于结账配置的一部分。
// - 这些 URL 的域名也可能需要在 Paddle 后台允许/审核（建议与主站同域或确保都已批准）。

(function () {
  // IMPORTANT:
  // - Client-side tokens are designed to be used in frontend code.
  // - You still shouldn't paste them into chats/issues; rotate if needed.
  const PADDLE_CLIENT_TOKEN = "live_3d23a490eb6f34c96ae919a7b4c";

  // Paddle Checkout 需要 Price ID（pri_...），不是 Product ID（pro_...）。
  // 你已经创建了 Outline 的 Pro 套餐价格，把它填在这里即可。
  const OUTLINE_PRO_PRICE_ID = "pri_01khqxts0v5x9z1vv2tz4zxpbg";

  // 支付成功/取消后的回跳地址。
  // 说明：
  // - 这里用的是你提供的 app 子域名；请确保 Paddle 后台允许该域名的跳转（否则可能仍然报错）。

  const SUCCESS_URL = "https://app.wisteriasoftware.uk/payment-success";
  const CANCEL_URL = "https://app.wisteriasoftware.uk/payment-cancel";

  let initialized = false;

  function setError(message) {
    const nodes = document.querySelectorAll("[data-checkout-error]");
    nodes.forEach((n) => {
      n.textContent = message;
      n.style.display = "block";
    });
  }

  function isHttpsUrl(url) {
    try {
      const u = new URL(url);
      return u.protocol === "https:";
    } catch {
      return false;
    }
  }

  function isLocalhost(hostname) {
    return (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "[::1]"
    );
  }

  function ensureInitialized() {
    if (initialized) return true;

    // Paddle checkout won't reliably work from file:// pages.
    if (window.location && window.location.protocol === "file:") {
      setError(
        "Checkout requires serving this page over http(s), not file://. Try: `python3 -m http.server 8000` and open http://localhost:8000/outline-pro.html"
      );
      return false;
    }

    // Live checkouts should run on HTTPS (localhost for testing is OK).
    if (
      window.location &&
      window.location.protocol !== "https:" &&
      !isLocalhost(window.location.hostname)
    ) {
      setError("Checkout requires HTTPS on production domains.");
      return false;
    }

    // success/cancel 回跳必须是 https（并且最好是你在 Paddle 后台允许的域名）。
    if (!isHttpsUrl(SUCCESS_URL) || !isHttpsUrl(CANCEL_URL)) {
      setError("Checkout is not configured correctly (invalid success/cancel URL).");
      return false;
    }

    if (!window.Paddle || typeof window.Paddle.Initialize !== "function") {
      // Some Paddle scripts expose Setup instead of Initialize.
      if (!window.Paddle || typeof window.Paddle.Setup !== "function") {
        setError("Checkout failed to load. Please refresh and try again.");
        return false;
      }
    }
    if (!PADDLE_CLIENT_TOKEN || PADDLE_CLIENT_TOKEN.includes("REPLACE_WITH")) {
      setError("Checkout is not configured yet (missing Paddle client-side token).");
      return false;
    }
    const initPayload = {
      token: PADDLE_CLIENT_TOKEN,
      eventCallback: function (event) {
        if (!event || !event.name) return;
        if (
          event.name === "checkout.error" ||
          event.name === "checkout.warning" ||
          event.name === "checkout.payment.error" ||
          event.name === "checkout.payment.failed"
        ) {
          const code = event.code ? String(event.code) : "";
          const detail = event.detail ? String(event.detail) : "";
          const docUrl = event.documentation_url ? String(event.documentation_url) : "";
          const pieces = [];
          if (detail) pieces.push(detail);
          if (code) pieces.push("code: " + code);
          if (docUrl) pieces.push(docUrl);
          if (pieces.length) setError(pieces.join(" | "));
          // Keep a richer payload available for debugging.
          // eslint-disable-next-line no-console
          console.warn("[Paddle event]", event);
        }
      },
    };

    if (typeof window.Paddle.Initialize === "function") {
      window.Paddle.Initialize(initPayload);
    } else {
      window.Paddle.Setup(initPayload);
    }
    initialized = true;
    return true;
  }

  function getPriceId(kind) {
    if (kind === "outline-pro") return OUTLINE_PRO_PRICE_ID;
    return "";
  }

  function openCheckout(kind) {
    if (!ensureInitialized()) return;

    const priceId = getPriceId(kind);
    if (!priceId || priceId.includes("REPLACE_WITH")) {
      setError("Checkout is not configured yet (missing price ID).");
      return;
    }

    try {
      window.Paddle.Checkout.open({
        items: [{ priceId, quantity: 1 }],
        // successUrl/cancelUrl 属于结账配置。不同版本文档字段可能略有差异，
        // 但 Paddle v2 通常放在 settings 下。
        settings: {
          successUrl: SUCCESS_URL,
          cancelUrl: CANCEL_URL,
        },
      });
    } catch (e) {
      setError("Unable to open checkout. Please try again later.");
    }
  }

  function wireButtons() {
    const buttons = document.querySelectorAll("[data-paddle-buy]");
    buttons.forEach((btn) => {
      const kind = btn.getAttribute("data-paddle-buy") || "outline-pro";
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        openCheckout(kind);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wireButtons);
  } else {
    wireButtons();
  }
})();
