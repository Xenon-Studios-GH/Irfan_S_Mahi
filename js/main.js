/* ===================================
   MAHI PORTFOLIO - MAIN JS
   =================================== */

/* ===================================
    HELPERS
    =================================== */
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

/* ===================================
   PIXEL PERFECT SKILLS SECTION
   =================================== */
const SKILL_BREAKPOINT = 960;

function initPixelPerfectSkills() {
  const aboutSection = document.getElementById("about");
  if (!aboutSection) return;

  const videoWrapper = aboutSection.querySelector(".video-wrapper");
  const skillsContainer = aboutSection.querySelector(".w-\\[40\\%\\]");

  function updateLayout() {
    const width = window.innerWidth;

    if (width <= SKILL_BREAKPOINT) {
      if (videoWrapper) {
        videoWrapper.style.position = "relative";
        videoWrapper.style.top = "auto";
        videoWrapper.style.width = "100%";
      }
      if (skillsContainer) {
        skillsContainer.style.width = "100%";
      }
      if (videoWrapper && skillsContainer) {
        const parent = videoWrapper.parentElement;
        const children = Array.from(parent.children);
        const videoIndex = children.indexOf(videoWrapper);
        const skillsIndex = children.indexOf(skillsContainer);

        if (videoIndex > skillsIndex) {
          parent.insertBefore(videoWrapper, skillsContainer);
        }
      }
    } else {
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

  updateLayout();
  window.addEventListener("resize", debounce(updateLayout, 100));
}

/* ===================================
    PIXEL PERFECT SCROLL (SMOOTH ANCHORS)
    =================================== */
function initPixelPerfectScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href && href !== "#") {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const offset = 40;
          const targetPosition =
            target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: targetPosition, behavior: "smooth" });
        }
      }
    });
  });

  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".island-menu a");

  function updateActiveNav() {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + scrollY;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (
        scrollY >= sectionTop - viewportHeight / 2 &&
        scrollY < sectionBottom - viewportHeight / 2
      ) {
        const id = section.getAttribute("id");
        navItems.forEach((item) => {
          if (item.getAttribute("href") === "#" + id) {
            item.classList.add("text-accent");
          } else {
            item.classList.remove("text-accent");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", throttle(updateActiveNav, 100), {
    passive: true,
  });
}

/* ===================================
   PIXEL PERFECT TOUCH
   =================================== */
function initPixelPerfectTouch() {
  const skillItems = document.querySelectorAll(".skill-item");

  skillItems.forEach((item) => {
    item.addEventListener(
      "touchstart",
      function () {
        this.classList.add("touch-active");
      },
      { passive: true },
    );

    item.addEventListener(
      "touchend",
      function () {
        setTimeout(() => {
          this.classList.remove("touch-active");
        }, 100);
      },
      { passive: true },
    );
  });

  const touchStyles = document.createElement("style");
  touchStyles.textContent = `
        .skill-item.touch-active {
            background: rgba(113, 90, 90, 0.4) !important;
            transform: scale(0.98);
        }
    `;
  document.head.appendChild(touchStyles);
}

/* ===================================
   PIXEL PERFECT ACCESSIBILITY
   =================================== */
function initPixelPerfectAccessibility() {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-nav");
    }
  });

  document.addEventListener("mousedown", () => {
    document.body.classList.remove("keyboard-nav");
  });

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

  handleReducedMotion();
  prefersReducedMotion.addEventListener("change", handleReducedMotion);
}

/* ===================================
    INIT ON DOM READY
    =================================== */
document.addEventListener("DOMContentLoaded", () => {
  initPixelPerfectSkills();
  initPixelPerfectScroll();
  initPixelPerfectTouch();
  initPixelPerfectAccessibility();
});
