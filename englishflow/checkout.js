(function () {
  var CLIENT_TOKEN = "live_3d23a490eb6f34c96ae919a7b4c";
  var params = new URLSearchParams(window.location.search);
  var transactionId = params.get("_ptxn") || "";
  var title = document.querySelector("#checkoutTitle");
  var status = document.querySelector("#checkoutStatus");
  var reopen = document.querySelector("#reopenCheckout");

  function validTransaction(value) {
    return /^txn_[a-z0-9]+$/.test(value);
  }

  function transactionFromEvent(event) {
    var data = event && event.data ? event.data : {};
    var candidates = [data.id, data.transaction_id, data.transactionId,
      data.transaction && data.transaction.id];
    for (var i = 0; i < candidates.length; i += 1) {
      if (typeof candidates[i] === "string" && candidates[i].indexOf("txn_") === 0) return candidates[i];
    }
    return transactionId;
  }

  function openCheckout() {
    if (!window.Paddle || !validTransaction(transactionId)) return;
    try {
      window.Paddle.Checkout.open({ transactionId: transactionId });
    } catch (error) {
      title.textContent = "Checkout could not be opened.";
      status.textContent = "Return to FluentSocial AI and create a fresh checkout, or contact support.";
    }
  }

  if (!validTransaction(transactionId)) {
    title.textContent = "This checkout link is incomplete.";
    status.textContent = "For your security, start a purchase from the signed-in FluentSocial AI extension.";
    reopen.hidden = true;
    return;
  }
  if (!window.Paddle) {
    title.textContent = "Paddle is temporarily unavailable.";
    status.textContent = "Check your connection and reload this page.";
    return;
  }

  try {
    window.Paddle.Initialize({
      token: CLIENT_TOKEN,
      checkout: {
        settings: {
          displayMode: "overlay",
          variant: "one-page",
          allowLogout: false,
          theme: "light",
          successUrl: "https://wisteriasoftware.uk/englishflow/payment-complete.html"
        }
      },
      eventCallback: function (event) {
        if (!event) return;
        if (event.name === "checkout.loaded") {
          title.textContent = "Checkout is ready.";
          status.textContent = "Complete payment in the secure Paddle window.";
        }
        if (event.name === "checkout.closed") {
          title.textContent = "Checkout paused.";
          status.textContent = "Nothing was charged. Reopen checkout when you are ready.";
          reopen.hidden = false;
        }
        if (event.name === "checkout.completed") {
          var completedId = transactionFromEvent(event);
          window.location.href = "/englishflow/payment-complete.html?transaction_id=" + encodeURIComponent(completedId);
        }
      }
    });
    reopen.hidden = false;
    reopen.addEventListener("click", openCheckout);
    // Paddle.js automatically opens the server-created transaction supplied in `_ptxn`.
  } catch (error) {
    title.textContent = "Checkout could not be initialized.";
    status.textContent = "Reload the page or create a fresh checkout from FluentSocial AI.";
  }
})();
