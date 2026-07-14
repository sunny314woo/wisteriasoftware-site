(function () {
  var MONTHLY_PRICE = "pri_01kxfqkjc3fa8ckcj0z2bpbbt5";
  var ANNUAL_PRICE = "pri_01kxdy8k28zdsq3p3j4gabfspg";
  var LIFETIME_PRICE = "pri_01kxdy52y2yna3mqh6jrv25rzd";
  var CLIENT_TOKEN = "live_3d23a490eb6f34c96ae919a7b4c";

  function updatePrice(kind, value) {
    var node = document.querySelector('[data-price="' + kind + '"]');
    if (node && value) node.textContent = value;
  }

  if (window.Paddle) {
    try {
      window.Paddle.Initialize({ token: CLIENT_TOKEN });
      window.Paddle.PricePreview({
        items: [
          { priceId: MONTHLY_PRICE, quantity: 1 },
          { priceId: ANNUAL_PRICE, quantity: 1 },
          { priceId: LIFETIME_PRICE, quantity: 1 }
        ]
      }).then(function (result) {
        var lines = result && result.data && result.data.details
          ? result.data.details.lineItems || [] : [];
        lines.forEach(function (line) {
          var priceId = line && line.price ? line.price.id : "";
          var formatted = line && line.formattedTotals ? line.formattedTotals.subtotal : "";
          if (priceId === MONTHLY_PRICE) updatePrice("monthly", formatted);
          if (priceId === ANNUAL_PRICE) updatePrice("annual", formatted);
          if (priceId === LIFETIME_PRICE) updatePrice("lifetime", formatted);
        });
      }).catch(function () {});
    } catch (error) {}
  }

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
