/* ============================================================
   DYNAMIC ISLAND NAVBAR
   ============================================================
   This handles the floating navbar that:
   - Starts hidden (collapsed circle at bottom)
   - Expands to show menu when user scrolls past hero
   - Collapses again when returning to hero
   - Uses CSS transitions for smooth animation
   ============================================================ */

/**
 * Initialize the Dynamic Island navbar behavior
 */
function initPixelPerfectNavbar() {
  const navbar = document.querySelector(".dynamic-island");
  if (!navbar) return; // Exit if navbar doesn't exist

  let isAnimating = false; // Prevent overlapping animations

  /**
   * Expand the navbar to show menu items
   */
  function expandNavbar() {
    // Don't expand if already expanding or already expanded
    if (isAnimating || navbar.classList.contains("expand")) return;
    isAnimating = true;

    // First make visible (fade in)
    navbar.classList.add("visible");

    // Then expand to full width after short delay
    setTimeout(() => {
      navbar.classList.add("expand");
      isAnimating = false;
    }, 250);
  }

  /**
   * Collapse the navbar back to circle
   */
  function collapseNavbar() {
    // Don't collapse if already collapsing or already collapsed
    if (isAnimating || !navbar.classList.contains("expand")) return;
    isAnimating = true;

    // First shrink width
    navbar.classList.remove("expand");

    // Then hide after animation completes
    setTimeout(() => {
      navbar.classList.remove("visible");
      isAnimating = false;
    }, 450);
  }

  /**
   * Handle scroll events to determine navbar state
   */
  function handleScroll() {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const threshold = viewportHeight * 0.8; // 80% of viewport height

    // If scrolled past threshold, show navbar
    if (scrollY > threshold) {
      expandNavbar();
    } else {
      // Otherwise, hide navbar
      collapseNavbar();
    }
  }

  // Listen for scroll events (passive for performance)
  window.addEventListener("scroll", handleScroll, { passive: true });
}

/* ============================================================
   INITIALIZATION
   ============================================================ */

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initPixelPerfectNavbar);
