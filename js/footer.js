/* ============================================================
   FOOTER DYNAMIC CONTENT
   ============================================================
   This handles dynamic footer elements:
   - Automatically updates copyright year
   - Ensures the year is always current
   ============================================================ */

/**
 * Initialize footer with dynamic content
 */
document.addEventListener("DOMContentLoaded", () => {
  initFooter();
});

/**
 * Update copyright year to current year
 */
function initFooter() {
  // Get current year (e.g., 2026)
  const currentYear = new Date().getFullYear();

  // Find the year element in footer
  const copyrightEl = document.querySelector(".footer-year");

  // Update text content if element exists
  if (copyrightEl) {
    copyrightEl.textContent = currentYear;
  }
}
