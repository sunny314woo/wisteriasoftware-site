(function () {
  var API_BASE = "https://account.wisteriasoftware.uk/api/account/v1";
  var plans = {
    MONTHLY: { name: "Monthly", detail: "US$6 per month · recurring subscription · official AI allowance and BYOK." },
    ANNUAL: { name: "Annual", detail: "US$49 per year · recurring subscription · official AI allowance and BYOK." },
    LIFETIME: { name: "Lifetime", detail: "US$59 once · lifetime BYOK access · no Wisteria public AI allowance." }
  };
  var selectedPlan = new URLSearchParams(window.location.search).get("plan") || "ANNUAL";
  if (!plans[selectedPlan]) selectedPlan = "ANNUAL";

  var emailForm = document.querySelector("#emailForm");
  var emailInput = document.querySelector("#purchaseEmail");
  var checkoutButton = document.querySelector("#continueCheckoutButton");
  var status = document.querySelector("#purchaseStatus");

  document.querySelector("#purchasePlanName").textContent = plans[selectedPlan].name;
  document.querySelector("#purchasePlanDetail").textContent = plans[selectedPlan].detail;

  function setStatus(message, error) {
    status.textContent = message || "";
    status.classList.toggle("is-error", Boolean(error));
  }

  function setBusy(busy) {
    checkoutButton.disabled = busy;
    checkoutButton.textContent = busy ? "Opening checkout…" : "Continue to payment";
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
      throw new Error(typeof detail === "string" ? detail : "Checkout could not be prepared. Please try again.");
    }
    return body;
  }

  function approvedCheckout(checkout) {
    if (!checkout || checkout.plan !== selectedPlan) return null;
    var destination = new URL(checkout.checkout_url, window.location.origin);
    var validPath = destination.pathname === "/englishflow/checkout.html" ||
      destination.pathname === "/englishflow/checkout";
    if (destination.origin !== window.location.origin || !validPath ||
        !/^txn_[a-z0-9]+$/.test(destination.searchParams.get("_ptxn") || "")) {
      return null;
    }
    return destination;
  }

  emailForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    var email = emailInput.value.trim().toLowerCase();
    if (!email) return;
    setBusy(true);
    setStatus("Preparing your secure Paddle checkout…");
    try {
      var checkout = await request("/payments/guest-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, plan: selectedPlan })
      });
      var destination = approvedCheckout(checkout);
      if (!destination) {
        throw new Error("Checkout is not configured for the approved Wisteria domain. Please contact support.");
      }
      window.location.assign(destination.toString());
    } catch (error) {
      setStatus(message(error), true);
      setBusy(false);
    }
  });
})();
