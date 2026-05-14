/* ============================================================
   SECTION INDICATOR (Left Side Navigation)
   ============================================================
   This creates a visual indicator on the left side showing
   the current section as the user scrolls through the page.
   Features:
   - Lists all sections (01 Hero, 02 Work, etc.)
   - Highlights current section based on scroll position
   - Updates dynamically as user scrolls
   ============================================================ */

/**
 * Initialize section indicator functionality
 */
document.addEventListener("DOMContentLoaded", () => {
  initSectionIndicator();
});

/**
 * Sets up intersection observer to track current section
 */
function initSectionIndicator() {
  // Get all sections with IDs
  const sections = document.querySelectorAll("section[id]");
  // Get the indicator container
  const indicator = document.querySelector(".section-indicator");

  // Exit if no indicator or sections exist
  if (!indicator || !sections.length) return;

  // Get individual indicator items
  const items = indicator.querySelectorAll(".section-indicator-item");

  // Create observer to track which section is in view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id; // Current section ID

          // Update active class on matching indicator item
          items.forEach((item) => {
            const sectionId = item.dataset.section; // Section ID from data attribute
            if (sectionId === id) {
              item.classList.add("active"); // Highlight current
            } else {
              item.classList.remove("active"); // Remove from others
            }
          });
        }
      });
    },
    { threshold: 0.5 }, // Trigger when 50% of section is visible
  );

  // Start observing each section
  sections.forEach((section) => observer.observe(section));
}
