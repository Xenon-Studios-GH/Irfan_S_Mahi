document.addEventListener("DOMContentLoaded", () => {
  initSectionIndicator();
});

function initSectionIndicator() {

  const sections = document.querySelectorAll("section[id]");

  const indicator = document.querySelector(".section-indicator");

  if (!indicator || !sections.length) return;

  const items = indicator.querySelectorAll(".section-indicator-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;

          items.forEach((item) => {
            const sectionId = item.dataset.section;
            if (sectionId === id) {
              item.classList.add("active");
            } else {
              item.classList.remove("active");
            }
          });
        }
      });
    },
    { threshold: 0.5 },
  );

  sections.forEach((section) => observer.observe(section));
}
