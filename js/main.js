// Main JavaScript
document.addEventListener("DOMContentLoaded", () => {
  console.log("Munthasir Rahman Portfolio initialized");

  // Initialize Lenis Smooth Scroll
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Dynamic Island Scroll Animation
  const island = document.querySelector(".dynamic-island");
  let hasAnimated = false;
  let isAtTop = true;

  function triggerIslandAnimation() {
    if (hasAnimated && !isAtTop) {
      // Remove animation classes
      island.style.animation = "none";
      island.offsetHeight; // Force reflow
      island.style.opacity = "1";
      island.style.width = "60px";
      island.style.transform = "translateX(-50%) scale(0.8)";
      
      const logo = document.querySelector(".island-logo");
      const menu = document.querySelector(".island-menu");
      const items = document.querySelectorAll(".island-menu li");
      const content = document.querySelector(".island-content");
      
      logo.style.animation = "none";
      menu.style.animation = "none";
      items.forEach((item) => (item.style.animation = "none"));
      content.style.animation = "none";
      
      // Re-add animations with slight delay
      setTimeout(() => {
        island.style.animation = "islandExpand 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards";
        setTimeout(() => {
          content.style.animation = "fadeInContent 0.6s ease forwards";
          logo.style.animation = "fadeInLogo 0.4s ease forwards";
          menu.style.animation = "fadeInMenu 0.4s ease forwards";
          items.forEach((item, i) => {
            item.style.animation = `fadeInItem 0.3s ease forwards`;
          });
        }, 400);
      }, 50);
    } else if (!hasAnimated) {
      hasAnimated = true;
    }
  }

  // Listen for scroll
  lenis.on("scroll", ({ scroll }) => {
    const wasAtTop = isAtTop;
    isAtTop = scroll < 100;

    if (wasAtTop && !isAtTop) {
      // Just scrolled away from top
    } else if (!wasAtTop && isAtTop) {
      // Just scrolled back to top - trigger animation
      triggerIslandAnimation();
    }
  });
});
