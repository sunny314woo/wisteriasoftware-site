// Paddle.js 结账（Overlay/Inline）启动器
// ✅ 保留原有逻辑
// ✅ 仅增强成功后自动跳转逻辑
// ✅ 不改函数结构inline
// ✅ 不改模块结构

(function () {
  const PADDLE_CLIENT_TOKEN = "live_d34e7d8bc33519a2cb27f563270";
  const OUTLINE_PRO_PRICE_ID = "pri_01khqxts0v5x9z1vv2tz4zxpbg";

  // 成功/取消页面
  const SUCCESS_URL = "https://wisteriasoftware.uk/payment-success.html";
  const CANCEL_URL = "https://wisteriasoftware.uk/payment-cancel.html";

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

  // =============================
  // 初始化 Paddle
  // =============================
  function ensureInitialized() {
    if (initialized) return true;

    if (window.location.protocol === "file:") {
      setError("Checkout requires http(s), not file://");
      return false;
    }

    if (
      window.location.protocol !== "https:" &&
      !isLocalhost(window.location.hostname)
    ) {
      setError("Checkout requires HTTPS on production.");
      return false;
    }

    if (!isHttpsUrl(SUCCESS_URL) || !isHttpsUrl(CANCEL_URL)) {
      setError("Invalid success/cancel URL.");
      return false;
    }

    if (!window.Paddle) {
      setError("Paddle.js failed to load.");
      return false;
    }

    // =============================
    // 关键增强点：监听 checkout.completed
    // =============================
    const initPayload = {
      token: PADDLE_CLIENT_TOKEN,

      eventCallback: function (event) {
        if (!event || !event.name) return;

        // 1️⃣ 支付成功事件
        if (event.name === "checkout.completed") {
          try {
            //防止拿不到，修改这句话。
            //const txn = event?.data?.transaction_id;
            const txn =
              event?.data?.id ||
              event?.data?.transaction_id ||
              event?.data?.transaction?.id;

            if (txn) {
              // 🔥 手动跳转并带上 transaction_id
              window.location.href =
                SUCCESS_URL + "?transaction_id=" + encodeURIComponent(txn);
            } else {
              // 如果 Paddle 没返回 transaction_id
              window.location.href = SUCCESS_URL;
            }
          } catch (e) {
            console.error("Redirect failed:", e);
          }
        }

        // 2️⃣ 支付取消事件
        if (event.name === "checkout.closed") {
          // 用户主动关闭窗口
          // 不强制跳转
        }

        // 3️⃣ 错误处理（保留原逻辑）
        if (
          event.name === "checkout.error" ||
          event.name === "checkout.warning" ||
          event.name === "checkout.payment.error" ||
          event.name === "checkout.payment.failed"
        ) {
          const code = event.code ? String(event.code) : "";
          const detail = event.detail ? String(event.detail) : "";
          const docUrl = event.documentation_url
            ? String(event.documentation_url)
            : "";

          const pieces = [];
          if (detail) pieces.push(detail);
          if (code) pieces.push("code: " + code);
          if (docUrl) pieces.push(docUrl);

          if (pieces.length) setError(pieces.join(" | "));

          console.warn("[Paddle event]", event);
        }
      },
    };

    window.Paddle.Initialize(initPayload);

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
    if (!priceId) {
      setError("Missing price ID.");
      return;
    }

    try {
      window.Paddle.Checkout.open({
        items: [{ priceId, quantity: 1 }],
        settings: {
          successUrl: SUCCESS_URL,
          cancelUrl: CANCEL_URL,
        },
      });
    } catch (e) {
      setError("Unable to open checkout.");
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
