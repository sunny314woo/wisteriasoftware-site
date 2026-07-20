(function () {
  var CLIENT_TOKEN = "live_3d23a490eb6f34c96ae919a7b4c";
  var plans = {
    MONTHLY: {
      name: "Monthly",
      detail: "US$6 per month · hosted AI included · no API key required.",
      priceId: "pri_01kxfqkjc3fa8ckcj0z2bpbbt5"
    },
    ANNUAL: {
      name: "Annual",
      detail: "US$49 per year · hosted AI included · save US$23 compared with monthly.",
      priceId: "pri_01kxdy8k28zdsq3p3j4gabfspg"
    },
    LIFETIME: {
      name: "Lifetime BYOK",
      detail: "US$59 one-time · requires your own DeepSeek API key · hosted AI not included.",
      priceId: "pri_01kxdy52y2yna3mqh6jrv25rzd"
    }
  };
  var selectedPlan = new URLSearchParams(window.location.search).get("plan") || "ANNUAL";
  if (!plans[selectedPlan]) selectedPlan = "ANNUAL";

  var openButton = document.querySelector("#openCheckoutButton");
  var status = document.querySelector("#purchaseStatus");
  var checkoutOpened = false;

  document.querySelector("#purchasePlanName").textContent = plans[selectedPlan].name;
  document.querySelector("#purchasePlanDetail").textContent = plans[selectedPlan].detail;

  function setStatus(message, error) {
    status.textContent = message || "";
    status.classList.toggle("is-error", Boolean(error));
  }

  function transactionFromEvent(event) {
    var data = event && event.data ? event.data : {};
    var candidates = [
      data.transaction_id,
      data.transactionId,
      data.transaction && data.transaction.id,
      data.checkout && data.checkout.transaction_id,
      data.id
    ];
    for (var i = 0; i < candidates.length; i += 1) {
      if (typeof candidates[i] === "string" && candidates[i].indexOf("txn_") === 0) {
        return candidates[i];
      }
    }
    return "";
  }

  function complete(event) {
    var transactionId = transactionFromEvent(event);
    var destination = "/englishflow/payment-complete.html";
    if (transactionId) destination += "?transaction_id=" + encodeURIComponent(transactionId);
    window.location.href = destination;
  }

  function openCheckout() {
    if (!window.Paddle) {
      setStatus("Paddle is temporarily unavailable. Check your connection and try again.", true);
      return;
    }
    setStatus("Opening secure Paddle checkout…");
    try {
      window.Paddle.Checkout.open({
        items: [{ priceId: plans[selectedPlan].priceId, quantity: 1 }],
        customData: {
          checkout_mode: "guest",
          product_id: "com.wisteria.englishflow"
        },
        settings: {
          displayMode: "overlay",
          variant: "one-page",
          allowLogout: true,
          theme: "light",
          successUrl: "https://wisteriasoftware.uk/englishflow/payment-complete.html"
        }
      });
      checkoutOpened = true;
      openButton.textContent = "Reopen secure checkout";
      setStatus("Enter your email and payment details in Paddle.");
    } catch (error) {
      setStatus("Checkout could not be opened. Please try again.", true);
    }
  }

  if (!window.Paddle) {
    setStatus("Paddle is temporarily unavailable. Check your connection and reload this page.", true);
    return;
  }

  try {
    window.Paddle.Initialize({
      token: CLIENT_TOKEN,
      eventCallback: function (event) {
        if (!event) return;
        if (event.name === "checkout.completed") complete(event);
        if (event.name === "checkout.closed" && checkoutOpened) {
          setStatus("Nothing was charged. Reopen checkout when you are ready.");
        }
      }
    });
    openButton.addEventListener("click", openCheckout);
    window.setTimeout(openCheckout, 0);
  } catch (error) {
    setStatus("Checkout could not be initialized. Reload this page and try again.", true);
  }
})();
