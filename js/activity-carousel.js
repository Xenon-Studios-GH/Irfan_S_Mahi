/* ============================================================
   ACTIVITY CAROUSEL (Recent Activities Feed)
   ============================================================
   This creates a horizontal scrolling carousel showing
   recent activities/reels in the Activities section.
   
   Similar to brand carousel - duplicates content for
   continuous scrolling effect.
   ============================================================ */

/**
 * Initialize activity carousel
 */
document.addEventListener("DOMContentLoaded", () => {
  initActivityCarousel();
});

/**
 * Duplicate activity cards for infinite scroll effect
 */
function initActivityCarousel() {
  const track = document.getElementById("activityTrack");

  if (!track) return;

  // Get all activity cards
  const cards = track.querySelectorAll(".activity-card");
  const totalCards = cards.length;

  // Clone each card and append to create seamless loop
  for (let i = 0; i < totalCards; i++) {
    const clone = cards[i].cloneNode(true);
    track.appendChild(clone);
  }
}
