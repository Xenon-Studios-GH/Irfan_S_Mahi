document.addEventListener("DOMContentLoaded", () => {
  initCTAForm();
});

function initCTAForm() {
  const form = document.getElementById("ctaForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const input = form.querySelector(".cta-input");
    const btn = form.querySelector(".cta-submit");
    const email = input.value.trim();

    if (!email || !isValidEmail(email)) {

      input.style.borderColor = "rgba(255, 100, 100, 0.5)";
      setTimeout(() => {
        input.style.borderColor = "";
      }, 1500);
      return;
    }

    btn.textContent = "Sending...";
    btn.disabled = true;

    setTimeout(() => {

      btn.textContent = "Sent \u2713";
      input.value = "";

      setTimeout(() => {
        btn.textContent = "Send \u2192";
        btn.disabled = false;
      }, 2000);
    }, 1000);
  });
}

function isValidEmail(email) {

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
