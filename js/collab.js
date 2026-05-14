/* ============================================================
   COLLABORATION CARDS ANIMATIONS
   ============================================================
   This handles:
   - Scroll reveal animations for cards
   - 3D tilt effect on mouse hover
   - Staggered entrance animation
   ============================================================ */

/**
 * Initialize all collaboration card animations
 */
document.addEventListener("DOMContentLoaded", () => {
  initCollabAnimations();
});

/**
 * Sets up scroll-triggered reveals and hover effects for cards
 */
function initCollabAnimations() {
  const cards = document.querySelectorAll(".collab-card");

  // Create Intersection Observer for scroll reveal
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger each card's reveal by 150ms
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, index * 150);
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 10% visible
      rootMargin: "0px 0px -50px 0px", // Offset for earlier trigger
    },
  );

  // Observe each card
  cards.forEach((card) => cardObserver.observe(card));

  // Add mouse move/leave handlers for 3D tilt effect
  cards.forEach((card) => {
    card.addEventListener("mousemove", handleCardMouseMove);
    card.addEventListener("mouseleave", handleCardMouseLeave);
  });
}

/**
 * Creates 3D tilt effect based on mouse position within card
 * @param {MouseEvent} e - Mouse move event
 */
function handleCardMouseMove(e) {
  const rect = e.currentTarget.getBoundingClientRect();

  // Calculate mouse position relative to card
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Calculate center of card
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  // Calculate rotation based on distance from center
  // Negative values tilt toward mouse direction
  const rotateX = (y - centerY) / 20; // Vertical tilt
  const rotateY = (centerX - x) / 20; // Horizontal tilt

  // Apply 3D transform with perspective
  e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.02)`;
}

/**
 * Reset card transform when mouse leaves
 * @param {MouseEvent} e - Mouse leave event
 */
function handleCardMouseLeave(e) {
  e.currentTarget.style.transform = ""; // Remove inline transform
}

// NOTE: The click handler below is a placeholder - not yet implemented
// This would be used to handle card clicks (e.g., for navigation or modal)
document.querySelectorAll(".collab-card").forEach((card) => {
  card.addEventListener("click", () => {
    const title = card.querySelector("h3").textContent;
    // TODO: Implement click action (e.g., open project details)
  });
});
