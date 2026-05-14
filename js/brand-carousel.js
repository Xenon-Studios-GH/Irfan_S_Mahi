/* ============================================================
   BRAND CAROUSEL (Logo Infinite Scroll)
   ============================================================
   This creates an infinite scroll effect for the brand carousel.
   It duplicates the carousel items to create seamless looping.
   
   How it works:
   - CSS animation scrolls the track left continuously
   - When track reaches 50%, it instantly resets to 0
   - Because content is duplicated, this appears seamless
   ============================================================ */

/**
 * Initialize brand carousel with duplicated content
 */
document.addEventListener("DOMContentLoaded", () => {
  initBrandCarousel();
});

/**
 * Duplicate carousel items to enable infinite scroll
 */
function initBrandCarousel() {
  const carousels = document.querySelectorAll(".carousel-track");

  carousels.forEach((track) => {
    // Get all existing items
    const items = track.querySelectorAll(".carousel-item");

    if (items.length > 0) {
      // Clone each item and append to end
      // This creates the illusion of infinite scrolling
      const itemsCopy = Array.from(items).map((item) => item.cloneNode(true));
      itemsCopy.forEach((item) => track.appendChild(item));
    }
  });
}
