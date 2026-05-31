document.addEventListener("DOMContentLoaded", () => {
  const hireBtn = document.querySelector(".animated-button");
  if (!hireBtn) return;

  hireBtn.addEventListener("click", () => {
    const target = hireBtn.getAttribute("data-href");
    if (!target) return;

    const targetEl = document.querySelector(target);
    if (!targetEl) return;

    if (window.lenis) {
      window.lenis.scrollTo(targetEl, { offset: 40, duration: 1.2 });
    } else {
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
