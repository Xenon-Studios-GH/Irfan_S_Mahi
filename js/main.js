/* ============================================================
   MAHI PORTFOLIO - MAIN JAVASCRIPT
   ============================================================
   This file contains core functionality:
   - Helper utilities (debounce, throttle)
   - Particle system for hero section
   - Parallax scroll effects
   - Scroll reveal animations
   - Skills section responsive layout
   - Smooth scroll for anchor links
   - Touch and accessibility features
   ============================================================ */

/* ============================================================
   HELPER FUNCTIONS
   ============================================================ */

/**
 * Debounce function - delays function execution until after
 * a specified wait time has elapsed since the last call.
 * Useful for performance (e.g., resize handlers).
 *
 * @param {Function} func - Function to debounce
 * @param {number} wait - Milliseconds to wait
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function - ensures function is called at most
 * once per specified time limit. Useful for scroll events.
 *
 * @param {Function} func - Function to throttle
 * @param {number} limit - Minimum time between calls (ms)
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/* ============================================================
   PARTICLE SYSTEM (Hero Section)
   ============================================================ */

/**
 * Creates floating particles in the hero section for visual effect.
 * Particles are randomly positioned and have varied sizes and animations.
 * The animation is defined in CSS (@keyframes float).
 */
function initParticles() {
  const container = document.getElementById("heroParticles");
  if (!container) return; // Exit if container doesn't exist

  const particleCount = 30; // Number of particles to create

  // Create each particle with random properties
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    // Random position within the container
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";

    // Random animation delay - staggered start times
    particle.style.animationDelay = Math.random() * 15 + "s";

    // Random animation duration - varied speeds
    particle.style.animationDuration = 15 + Math.random() * 10 + "s";

    // Random size between 2px and 6px
    particle.style.width = 2 + Math.random() * 4 + "px";
    particle.style.height = particle.style.width;

    // Random opacity between 0.2 and 0.7
    particle.style.opacity = Math.random() * 0.5 + 0.2;

    // Add to container
    container.appendChild(particle);
  }
}

/* ============================================================
   PARALLAX EFFECTS
   ============================================================ */

/**
 * Creates parallax effect on the hero section elements.
 * As user scrolls, the background circle moves slower than the content,
 * creating depth perception.
 */
function initParallax() {
  const heroCircle = document.querySelector(".hero-circle");
  const heroContent = document.querySelector(".hero-content");

  if (!heroCircle || !heroContent) return;

  // Listen to scroll events with throttling for performance
  window.addEventListener(
    "scroll",
    throttle(() => {
      const scrollY = window.scrollY; // Current scroll position
      const maxScroll = window.innerHeight; // One viewport height
      const progress = Math.min(scrollY / maxScroll, 1); // 0 to 1 progress

      // Move and scale the background circle
      // translateY: moves down as user scrolls (slower than content)
      // scale: gradually increases as user scrolls
      heroCircle.style.transform = `translateX(-50%) translateY(${scrollY * 0.3}px) scale(${1 + progress * 0.2})`;

      // Move content up and fade out as user scrolls
      heroContent.style.transform = `translateY(${-scrollY * 0.2}px)`;
      heroContent.style.opacity = 1 - progress * 1.5;
    }, 16),
    { passive: true },
  ); // 16ms = ~60fps
}

/* ============================================================
   SCROLL REVEAL ANIMATIONS
   ============================================================ */

/**
 * Reveals elements as they enter the viewport using Intersection Observer.
 * Elements start invisible and fade in when scrolled into view.
 */
function initScrollReveal() {
  // Select all direct children of sections
  const revealElements = document.querySelectorAll("section > *");

  // Create Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // When element enters viewport (10% visible)
        if (entry.isIntersecting) {
          // Make visible
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 10% visible
      rootMargin: "-50px", // Offset for earlier trigger
    },
  );

  // Initialize each element with hidden state and transition
  revealElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    observer.observe(el);
  });
}

/**
 * Alternative throttle implementation (appears duplicated)
 * This ensures throttle is available if not defined elsewhere
 */
function throttle(func, limit) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/* ============================================================
   PIXEL PERFECT SKILLS SECTION
   ============================================================ */

/**
 * Manages responsive layout for the skills section.
 * - Desktop (>960px): Video is sticky on left, skills list on right
 * - Mobile (<=960px): Stacked vertically with video on top
 */
const SKILL_BREAKPOINT = 960; // Breakpoint for responsive layout

function initPixelPerfectSkills() {
  const aboutSection = document.getElementById("about");
  if (!aboutSection) return;

  // Get video wrapper and skills container elements
  const videoWrapper = aboutSection.querySelector(".video-wrapper");
  const skillsContainer = aboutSection.querySelector(".w-\\[40\\%\\]");

  /**
   * Updates the layout based on viewport width
   */
  function updateLayout() {
    const width = window.innerWidth;

    // Mobile/tablet layout (stacked)
    if (width <= SKILL_BREAKPOINT) {
      if (videoWrapper) {
        videoWrapper.style.position = "relative";
        videoWrapper.style.top = "auto";
        videoWrapper.style.width = "100%";
      }
      if (skillsContainer) {
        skillsContainer.style.width = "100%";
      }
      // Reorder elements so video comes first on mobile
      if (videoWrapper && skillsContainer) {
        const parent = videoWrapper.parentElement;
        const children = Array.from(parent.children);
        const videoIndex = children.indexOf(videoWrapper);
        const skillsIndex = children.indexOf(skillsContainer);

        if (videoIndex > skillsIndex) {
          parent.insertBefore(videoWrapper, skillsContainer);
        }
      }
    }
    // Desktop layout (side by side)
    else {
      if (videoWrapper) {
        videoWrapper.style.position = "sticky";
        videoWrapper.style.top = "20px";
        videoWrapper.style.width = "60%";
      }
      if (skillsContainer) {
        skillsContainer.style.width = "40%";
      }
    }
  }

  // Initialize on load and on resize
  updateLayout();
  window.addEventListener("resize", debounce(updateLayout, 100));
}

/* ============================================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================================ */

/**
 * Handles smooth scrolling when clicking navigation links.
 * Also updates the active navigation item based on scroll position.
 */
function initPixelPerfectScroll() {
  // Add click handlers to all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      // Skip empty or just "#" links
      if (href && href !== "#") {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault(); // Stop default jump behavior

          // Calculate position with offset for navbar
          const offset = 40;
          const targetPosition =
            target.getBoundingClientRect().top + window.pageYOffset - offset;

          // Smooth scroll to target
          window.scrollTo({ top: targetPosition, behavior: "smooth" });
        }
      }
    });
  });

  // Get all sections and navigation items
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".island-menu a");

  /**
   * Updates the active navigation item based on scroll position
   */
  function updateActiveNav() {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + scrollY;
      const sectionBottom = sectionTop + section.offsetHeight;

      // Check if current section is in middle of viewport
      if (
        scrollY >= sectionTop - viewportHeight / 2 &&
        scrollY < sectionBottom - viewportHeight / 2
      ) {
        const id = section.getAttribute("id");
        navItems.forEach((item) => {
          // Add accent color to active link
          if (item.getAttribute("href") === "#" + id) {
            item.classList.add("text-accent");
          } else {
            item.classList.remove("text-accent");
          }
        });
      }
    });
  }

  // Update active nav on scroll (throttled for performance)
  window.addEventListener("scroll", throttle(updateActiveNav, 100), {
    passive: true,
  });
}

/* ============================================================
   TOUCH DEVICE SUPPORT
   ============================================================ */

/**
 * Adds touch feedback for skill items on mobile devices.
 * Simulates hover effect when user touches the items.
 */
function initPixelPerfectTouch() {
  const skillItems = document.querySelectorAll(".skill-item");

  skillItems.forEach((item) => {
    // Add touch-active class on touch start
    item.addEventListener(
      "touchstart",
      function () {
        this.classList.add("touch-active");
      },
      { passive: true }, // Passive for better scroll performance
    );

    // Remove touch-active class after touch ends
    item.addEventListener(
      "touchend",
      function () {
        setTimeout(() => {
          this.classList.remove("touch-active");
        }, 100); // Small delay for visual feedback
      },
      { passive: true },
    );
  });

  // Inject CSS for touch-active state
  const touchStyles = document.createElement("style");
  touchStyles.textContent = `
        .skill-item.touch-active {
            background: rgba(113, 90, 90, 0.4) !important;
            transform: scale(0.98);
        }
    `;
  document.head.appendChild(touchStyles);
}

/* ============================================================
   ACCESSIBILITY FEATURES
   ============================================================ */

/**
 * Implements accessibility improvements:
 * - Keyboard navigation detection
 * - Focus indicators for keyboard users
 * - Respects "prefers-reduced-motion" setting
 */
function initPixelPerfectAccessibility() {
  // Detect keyboard navigation (Tab key press)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-nav");
    }
  });

  // Remove keyboard mode on mouse use
  document.addEventListener("mousedown", () => {
    document.body.classList.remove("keyboard-nav");
  });

  // Inject focus styles for keyboard navigation
  const focusStyles = document.createElement("style");
  focusStyles.textContent = `
        .keyboard-nav *:focus {
            outline: 2px solid #715A5A !important;
            outline-offset: 2px !important;
        }
        .keyboard-nav .dynamic-island:focus-within {
            outline: 2px solid #715A5A !important;
            outline-offset: 4px !important;
        }
    `;
  document.head.appendChild(focusStyles);

  // Handle "prefers-reduced-motion" user preference
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );

  function handleReducedMotion() {
    if (prefersReducedMotion.matches) {
      document.body.classList.add("reduced-motion");
    } else {
      document.body.classList.remove("reduced-motion");
    }
  }

  // Check on load and when preference changes
  handleReducedMotion();
  prefersReducedMotion.addEventListener("change", handleReducedMotion);
}

/* ============================================================
   INITIALIZATION ON DOM READY
   ============================================================ */

/**
 * Initialize all functionality when the DOM is fully loaded.
 * This ensures all elements exist before we try to manipulate them.
 */
document.addEventListener("DOMContentLoaded", () => {
  initParticles(); // Hero section particles
  initParallax(); // Parallax scroll effects
  initScrollReveal(); // Element reveal animations
  initPixelPerfectSkills(); // Skills section responsive
  initPixelPerfectScroll(); // Smooth scroll + active nav
  initPixelPerfectTouch(); // Touch device support
  initPixelPerfectAccessibility(); // Accessibility features
});
