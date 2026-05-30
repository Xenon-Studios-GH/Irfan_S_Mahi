(function () {
  var _twOrigWarn = console.warn;
  console.warn = function (m) {
    if (typeof m === "string" && m.includes("cdn.tailwindcss.com")) return;
    _twOrigWarn.apply(console, arguments);
  };
})();
