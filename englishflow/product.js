(function () {
  var MONTHLY_PRICE = "pri_01kxfqkjc3fa8ckcj0z2bpbbt5";
  var ANNUAL_PRICE = "pri_01kxdy8k28zdsq3p3j4gabfspg";
  var LIFETIME_PRICE = "pri_01kxdy52y2yna3mqh6jrv25rzd";
  var CLIENT_TOKEN = "live_3d23a490eb6f34c96ae919a7b4c";
  var CHROME_STORE_URL = "https://chromewebstore.google.com/detail/nobiefbaobhcpdbidggmfikalohfejpc";
  var GUEST_CHECKOUT_DATA = {
    checkout_mode: "guest",
    product_id: "com.wisteria.englishflow"
  };

  var referralCode = new URLSearchParams(window.location.search).get("ref") || "";
  if (/^[A-Za-z0-9_-]{6,24}$/.test(referralCode)) {
    var handoff = document.createElement("aside");
    handoff.className = "referral-handoff";
    handoff.setAttribute("aria-live", "polite");
    handoff.innerHTML =
      '<div><span class="referral-handoff-kicker">FluentSocial AI invitation</span>' +
      '<strong>You both receive 15 extra Trial days</strong>' +
      '<p id="referralHandoffStatus">Keep this page open while installing FluentSocial AI. The invitation will be handed to the extension automatically.</p></div>' +
      '<div class="referral-handoff-code"><span>Invite code</span><b></b></div>' +
      '<div class="referral-handoff-actions"><a target="_blank" rel="noopener">Install extension</a>' +
      '<button type="button">Copy code</button></div>';
    handoff.querySelector("b").textContent = referralCode;
    handoff.querySelector("a").href = CHROME_STORE_URL;
    handoff.querySelector("button").addEventListener("click", function () {
      navigator.clipboard.writeText(referralCode).then(function () {
        handoff.querySelector("button").textContent = "Copied";
      }).catch(function () {
        document.getElementById("referralHandoffStatus").textContent =
          "Copy the invite code manually, then paste it in Account → Referral inside FluentSocial AI.";
      });
    });
    document.querySelector("main").before(handoff);
    window.addEventListener("message", function (event) {
      if (event.origin !== window.location.origin || event.data?.source !== "englishflow-extension") return;
      if (event.data.type === "EF_REFERRAL_CAPTURED") {
        handoff.classList.add("is-captured");
        document.getElementById("referralHandoffStatus").textContent =
          "Invitation saved in FluentSocial AI. Verify your email there to claim it.";
      }
    });
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

  function setCheckoutStatus(message, error) {
    var status = document.querySelector("#checkoutStatus");
    if (!status) return;
    status.textContent = message || "";
    status.classList.toggle("is-error", Boolean(error));
  }

  function checkoutCompleted(event) {
    var transactionId = transactionFromEvent(event);
    var destination = "/englishflow/payment-complete.html";
    if (transactionId) destination += "?transaction_id=" + encodeURIComponent(transactionId);
    window.location.href = destination;
  }

  if (window.Paddle) {
    try {
      window.Paddle.Initialize({
        token: CLIENT_TOKEN,
        eventCallback: function (event) {
          if (event && event.name === "checkout.completed") checkoutCompleted(event);
        }
      });
    } catch (error) {}
  }

  document.querySelectorAll("[data-paddle-price-id]").forEach(function (button) {
    button.addEventListener("click", function (event) {
      if (!window.Paddle) return;
      event.preventDefault();
      setCheckoutStatus("Opening secure Paddle checkout…");
      try {
        window.Paddle.Checkout.open({
          items: [{ priceId: button.getAttribute("data-paddle-price-id"), quantity: 1 }],
          customData: GUEST_CHECKOUT_DATA,
          settings: {
            displayMode: "overlay",
            variant: "one-page",
            allowLogout: true,
            theme: "light",
            successUrl: "https://wisteriasoftware.uk/englishflow/payment-complete.html"
          }
        });
        setCheckoutStatus("Enter your email and payment details in Paddle.");
      } catch (error) {
        setCheckoutStatus("Checkout could not be opened. Please try again.", true);
      }
    });
  });

  document.documentElement.classList.add("reveal-ready");
  var revealNodes = document.querySelectorAll(".reveal");
  function revealEverything() {
    revealNodes.forEach(function (node) { node.classList.add("is-visible"); });
  }

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealNodes.forEach(function (node) { observer.observe(node); });
    window.setTimeout(revealEverything, 1400);
  } else {
    revealEverything();
  }
})();
