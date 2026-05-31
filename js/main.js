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

function initScrollReveal() {
  gsap.registerPlugin(ScrollTrigger);
  document.querySelectorAll("section").forEach((section) => {
    gsap.from(section.children, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.08,
      scrollTrigger: {
        trigger: section,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });
  });
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
          if (window.lenis) {
            window.lenis.scrollTo(target, { offset, duration: 1.2 });
          } else {
            const targetPosition =
              target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: targetPosition, behavior: "smooth" });
          }
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
}

document.addEventListener("DOMContentLoaded", () => {
  initScrollReveal();
  initPixelPerfectScroll();
  initPixelPerfectTouch();
  initPixelPerfectAccessibility();
});
