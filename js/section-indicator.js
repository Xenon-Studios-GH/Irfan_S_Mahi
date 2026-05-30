document.addEventListener("DOMContentLoaded", () => {
  initSectionIndicator();
});

function initSectionIndicator() {
  const sections = document.querySelectorAll("section[id]");
  const indicator = document.querySelector(".section-indicator");
  if (!indicator || !sections.length) return;

  const items = indicator.querySelectorAll(".section-indicator-item");

  function updateActive() {
    let currentId = null;
    const scrollY = window.scrollY;
    const vh = window.innerHeight;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const mid = rect.top + rect.height / 2;
      if (mid >= 0 && mid <= vh) {
        currentId = section.id;
      }
    });

    items.forEach((item) => {
      const sectionId = item.dataset.section;
      item.classList.toggle("active", sectionId === currentId);
    });
  }

  updateActive();
  window.addEventListener("scroll", updateActive, { passive: true });
}