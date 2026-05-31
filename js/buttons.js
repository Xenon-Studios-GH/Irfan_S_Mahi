document.addEventListener("DOMContentLoaded", () => {
  const hireBtn = document.querySelector(".animated-button");
  if (hireBtn) {
    hireBtn.addEventListener("click", () => {
      const target = hireBtn.getAttribute("data-href");
      if (target) {
        window.location.href = target;
      }
    });
  }
});
