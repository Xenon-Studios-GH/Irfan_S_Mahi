document.addEventListener("DOMContentLoaded", () => {
  initFooter();
});

function initFooter() {

  const currentYear = new Date().getFullYear();

  const copyrightEl = document.querySelector(".footer-year");

  if (copyrightEl) {
    copyrightEl.textContent = currentYear;
  }
}
