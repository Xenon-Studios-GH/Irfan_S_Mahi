document.addEventListener("DOMContentLoaded", () => {
  initCTAForm();
});

function initCTAForm() {
  const form = document.getElementById("ctaForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector("[name='name']").value.trim();
    const email = form.querySelector("[name='email']").value.trim();
    const project = form.querySelector("[name='project']").value.trim();
    const message = form.querySelector("[name='message']").value.trim();

    if (!name || !email) {
      if (!name) {
        form.querySelector("[name='name']").style.borderColor = "rgba(255, 100, 100, 0.5)";
        setTimeout(() => { form.querySelector("[name='name']").style.borderColor = ""; }, 1500);
      }
      if (!email || !isValidEmail(email)) {
        form.querySelector("[name='email']").style.borderColor = "rgba(255, 100, 100, 0.5)";
        setTimeout(() => { form.querySelector("[name='email']").style.borderColor = ""; }, 1500);
      }
      return;
    }

    const text = [
      "*New Project Inquiry*",
      `*Name:* ${name}`,
      `*Email:* ${email}`,
      project ? `*Project:* ${project}` : "",
      message ? `*Message:* ${message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const whatsappUrl = `https://wa.me/8801723034312?text=${encodeURIComponent(text)}`;

    const btn = form.querySelector(".cta-submit");
    btn.textContent = "Opening WhatsApp...";
    btn.disabled = true;

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      btn.textContent = "Send Message \u2192";
      btn.disabled = false;
      form.reset();
    }, 800);
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
