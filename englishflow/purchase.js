(function () {
  var API_BASE = "https://account.wisteriasoftware.uk/api/account/v1";
  var PRODUCT_ID = "com.wisteria.englishflow";
  var STORAGE = {
    installationId: "englishflow.web.installationId",
    installationToken: "englishflow.web.installationToken",
    challengeId: "englishflow.web.challengeId",
    email: "englishflow.web.email",
    sessionToken: "englishflow.web.sessionToken"
  };
  var plans = {
    MONTHLY: { name: "Monthly", detail: "US$6 per month · recurring subscription · official AI allowance and BYOK." },
    ANNUAL: { name: "Annual", detail: "US$49 per year · recurring subscription · official AI allowance and BYOK." },
    LIFETIME: { name: "Lifetime", detail: "US$59 once · lifetime BYOK access · no Wisteria public AI allowance." }
  };
  var selectedPlan = new URLSearchParams(window.location.search).get("plan") || "ANNUAL";
  if (!plans[selectedPlan]) selectedPlan = "ANNUAL";

  var emailForm = document.querySelector("#emailForm");
  var codeForm = document.querySelector("#codeForm");
  var emailInput = document.querySelector("#purchaseEmail");
  var codeInput = document.querySelector("#purchaseCode");
  var sendButton = document.querySelector("#sendCodeButton");
  var verifyButton = document.querySelector("#verifyCodeButton");
  var checkoutButton = document.querySelector("#continueCheckoutButton");
  var checkoutReady = document.querySelector("#checkoutReady");
  var status = document.querySelector("#purchaseStatus");

  document.querySelector("#purchasePlanName").textContent = plans[selectedPlan].name;
  document.querySelector("#purchasePlanDetail").textContent = plans[selectedPlan].detail;

  function store(key, value) { window.sessionStorage.setItem(key, value); }
  function read(key) { return window.sessionStorage.getItem(key) || ""; }
  function clear(key) { window.sessionStorage.removeItem(key); }
  function setStatus(message, error) {
    status.textContent = message || "";
    status.classList.toggle("is-error", Boolean(error));
  }
  function setBusy(button, busy, label) {
    button.disabled = busy;
    if (label) button.textContent = label;
  }
  function message(error) {
    return error && error.message ? error.message : "Something went wrong. Please try again.";
  }

  async function request(path, options) {
    var response;
    try {
      response = await window.fetch(API_BASE + path, Object.assign({
        headers: { "Accept": "application/json" },
        cache: "no-store"
      }, options || {}));
    } catch (_) {
      throw new Error("Could not reach EnglishFlow Account Service. Check your connection and try again.");
    }
    var text = await response.text();
    var body = {};
    try { body = text ? JSON.parse(text) : {}; } catch (_) {}
    if (!response.ok) {
      var detail = body && body.detail;
      throw new Error(typeof detail === "string" ? detail : "Account verification could not be completed. Please try again.");
    }
    return body;
  }

  async function ensureWebInstallation() {
    var installationId = read(STORAGE.installationId);
    var token = read(STORAGE.installationToken);
    if (installationId && token) return { installationId: installationId, token: token };
    installationId = window.crypto && window.crypto.randomUUID ? window.crypto.randomUUID() : "";
    if (!installationId) throw new Error("This browser cannot create a secure purchase session. Please use a current browser.");
    var registration = await request("/installations/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        installation_id: installationId,
        product_id: PRODUCT_ID,
        app_version: "web-1.0.0",
        platform: "web",
        locale: navigator.language || "en"
      })
    });
    if (!registration.installation_token) throw new Error("Could not initialize a secure purchase session. Reload this page and try again.");
    store(STORAGE.installationId, installationId);
    store(STORAGE.installationToken, registration.installation_token);
    return { installationId: installationId, token: registration.installation_token };
  }

  emailForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    var email = emailInput.value.trim().toLowerCase();
    if (!email) return;
    setBusy(sendButton, true, "Sending…");
    setStatus("Preparing your verified purchase session…");
    try {
      var installation = await ensureWebInstallation();
      var result = await request("/auth/email/start", {
        method: "POST",
        headers: { "Authorization": "Bearer " + installation.token, "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, product_id: PRODUCT_ID })
      });
      store(STORAGE.challengeId, result.challenge_id);
      store(STORAGE.email, email);
      codeForm.hidden = false;
      codeInput.focus();
      setStatus("Verification code sent. Check your inbox.");
    } catch (error) {
      setStatus(message(error), true);
    } finally {
      setBusy(sendButton, false, "Send code");
    }
  });

  codeForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    var challengeId = read(STORAGE.challengeId);
    var code = codeInput.value.trim();
    if (!challengeId || !/^\d{6}$/.test(code)) {
      setStatus("Enter the 6-digit code from your email.", true);
      return;
    }
    setBusy(verifyButton, true, "Verifying…");
    setStatus("Verifying your EnglishFlow account…");
    try {
      var result = await request("/auth/email/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challenge_id: challengeId, code: code })
      });
      store(STORAGE.sessionToken, result.session_token);
      clear(STORAGE.challengeId);
      checkoutReady.hidden = false;
      document.querySelector("#verifiedAccount").textContent = "Verified as " + result.email + ". Your " + plans[selectedPlan].name + " checkout is ready.";
      setStatus("Email verified. Continue when you are ready.");
    } catch (error) {
      setStatus(message(error), true);
    } finally {
      setBusy(verifyButton, false, "Verify email");
    }
  });

  checkoutButton.addEventListener("click", async function () {
    var sessionToken = read(STORAGE.sessionToken);
    if (!sessionToken) {
      setStatus("Verify your email before starting checkout.", true);
      return;
    }
    setBusy(checkoutButton, true, "Creating checkout…");
    setStatus("Creating a secure Paddle transaction for your verified account…");
    try {
      var checkout = await request("/payments/checkout", {
        method: "POST",
        headers: { "Authorization": "Bearer " + sessionToken, "Content-Type": "application/json" },
        body: JSON.stringify({ plan: selectedPlan })
      });
      var destination = new URL(checkout.checkout_url, window.location.origin);
      if (destination.origin !== window.location.origin || destination.pathname !== "/englishflow/checkout.html") {
        throw new Error("Checkout is not configured for the approved Wisteria domain. Please contact support.");
      }
      window.location.assign(destination.toString());
    } catch (error) {
      setStatus(message(error), true);
      setBusy(checkoutButton, false, "Continue to secure Paddle checkout");
    }
  });
})();
