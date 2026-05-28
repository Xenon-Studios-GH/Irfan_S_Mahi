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

function initParticles() {
  const container = document.getElementById("heroParticles");
  if (!container) return;

  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";

    particle.style.animationDelay = Math.random() * 15 + "s";

    particle.style.animationDuration = 15 + Math.random() * 10 + "s";

    particle.style.width = 2 + Math.random() * 4 + "px";
    particle.style.height = particle.style.width;

    particle.style.opacity = Math.random() * 0.5 + 0.2;

    container.appendChild(particle);
  }
}

function initScrollReveal() {
  gsap.registerPlugin(ScrollTrigger);
  gsap.from("section > *", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power2.out",
    stagger: 0.08,
    scrollTrigger: {
      trigger: "section",
      start: "top 90%",
      toggleActions: "play none none reverse",
    },
  });
}

const SKILL_BREAKPOINT = 960;

function initPixelPerfectSkills() {
  const skillsSection = document.getElementById("skills");
  if (!skillsSection) return;

  const videoWrapper = skillsSection.querySelector(".video-wrapper");
  const skillsContainer = skillsSection.querySelector(".w-\\[40\\%\\]");

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
    }

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

  updateLayout();
  window.addEventListener("resize", debounce(updateLayout, 100));
}

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

document.addEventListener("DOMContentLoaded", () => {
  initParticles();
  initScrollReveal();
  initPixelPerfectSkills();
  initPixelPerfectScroll();
  initPixelPerfectTouch();
  initPixelPerfectAccessibility();
});
