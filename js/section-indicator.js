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
    const docHeight = document.documentElement.scrollHeight;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const mid = rect.top + rect.height / 2;
      if (mid >= 0 && mid <= vh) {
        currentId = section.id;
      }
    });

    if (!currentId) {
      if (scrollY < 100 && sections.length > 0) {
        currentId = sections[0].id;
      } else if (scrollY + vh >= docHeight - 10 && sections.length > 0) {
        currentId = sections[sections.length - 1].id;
      }
    }

    items.forEach((item) => {
      const sectionId = item.dataset.section;
      item.classList.toggle("active", sectionId === currentId);
    });
  }

  updateActive();
  window.addEventListener("scroll", updateActive, { passive: true });
}
