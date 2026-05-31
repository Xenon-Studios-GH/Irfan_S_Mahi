document.addEventListener("DOMContentLoaded", () => {
  initSectionIndicator();
});

function initSectionIndicator() {
  const sections = document.querySelectorAll("section[id]");
  const indicator = document.querySelector(".section-indicator");
  if (!indicator || !sections.length) return;

  const items = indicator.querySelectorAll(".section-indicator-item");

  function updateActive() {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const viewportCenter = scrollY + vh / 2;

    let currentId = null;
    let closestDist = Infinity;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + scrollY;
      const sectionBottom = sectionTop + rect.height;
      const sectionMid = sectionTop + rect.height / 2;
      const dist = Math.abs(sectionMid - viewportCenter);

      if (dist < closestDist) {
        closestDist = dist;
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
