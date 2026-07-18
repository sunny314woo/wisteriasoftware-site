(function () {
  var MONTHLY_PRICE = "pri_01kxfqkjc3fa8ckcj0z2bpbbt5";
  var ANNUAL_PRICE = "pri_01kxdy8k28zdsq3p3j4gabfspg";
  var LIFETIME_PRICE = "pri_01kxdy52y2yna3mqh6jrv25rzd";
  var CLIENT_TOKEN = "live_3d23a490eb6f34c96ae919a7b4c";
  var CHROME_STORE_URL = "https://chromewebstore.google.com/detail/nobiefbaobhcpdbidggmfikalohfejpc";

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

  if (window.Paddle) {
    try {
      window.Paddle.Initialize({ token: CLIENT_TOKEN });
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
