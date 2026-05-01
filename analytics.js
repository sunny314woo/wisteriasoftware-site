(function () {
  const token = "REPLACE_WITH_CLOUDFLARE_WEB_ANALYTICS_TOKEN";
  const isConfigured = token && !token.startsWith("REPLACE_WITH_");
  const isLocalPreview =
    window.location.protocol === "file:" ||
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  if (!isConfigured || isLocalPreview) {
    return;
  }

  const beacon = document.createElement("script");
  beacon.defer = true;
  beacon.src = "https://static.cloudflareinsights.com/beacon.min.js";
  beacon.setAttribute("data-cf-beacon", JSON.stringify({ token: token, spa: false }));
  document.head.appendChild(beacon);
})();
