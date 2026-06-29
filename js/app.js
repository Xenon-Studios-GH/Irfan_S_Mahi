/* ========== HERO GSAP ANIMATION ========== */
document.addEventListener("DOMContentLoaded", () => {
  const heroLines = document.querySelectorAll(".hero-line");
  const profileWrap = document.getElementById("profile-img-wrap");

  if (heroLines.length && profileWrap && typeof gsap !== "undefined") {
    gsap.set(heroLines, { opacity: 0, x: -30 });
    gsap.set(profileWrap, { opacity: 0, x: 30, scale: 0.95 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    heroLines.forEach((line) => {
      const delay = parseFloat(line.dataset.delay) || 0;
      tl.to(line, { opacity: 1, x: 0, duration: 0.25, delay }, "+=0.05");
    });

    tl.to(profileWrap, { opacity: 1, x: 0, scale: 1, duration: 0.6 }, "-=0.3");
  }
});

/* ========== UTILITY ========== */
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

/* ========== LENIS SMOOTH SCROLL ========== */
(function initLenis() {
  if (typeof Lenis === "undefined") return;
  window.lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });
  function raf(time) {
    window.lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.normalizeScroll(true);
    ScrollTrigger.config({ ignoreMobileResize: true });
    window.lenis.on("scroll", () => ScrollTrigger.update());
    gsap.ticker.lagSmoothing(0);
  }
})();

/* ========== SCROLL REVEAL ========== */
(function initScrollReveal() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined")
    return;
  const sections = document.querySelectorAll(
    "section:not(#skills):not(#collab):not(#footer)",
  );
  sections.forEach((section) => {
    gsap.from(section.children, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.08,
      scrollTrigger: {
        trigger: section,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });
  });
})();

/* ========== SMOOTH SCROLL TO ANCHORS ========== */
(function initAnchorScroll() {
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
})();

/* ========== ACTIVE NAV UPDATE ========== */
(function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".island-menu a");
  if (!sections.length || !navItems.length) return;

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
})();

/* ========== TOUCH SUPPORT FOR SKILLS ========== */
(function initTouchSupport() {
  document.querySelectorAll(".skill-item").forEach((item) => {
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
        setTimeout(() => this.classList.remove("touch-active"), 100);
      },
      { passive: true },
    );
  });
})();

/* ========== KEYBOARD ACCESSIBILITY ========== */
(function initKeyboardNav() {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab") document.body.classList.add("keyboard-nav");
  });
  document.addEventListener("mousedown", () => {
    document.body.classList.remove("keyboard-nav");
  });
})();

/* ========== DYNAMIC ISLAND NAVBAR ========== */
(function initNavbar() {
  const navbar = document.querySelector(".dynamic-island");
  if (!navbar) return;

  const isMobile = window.innerWidth <= 768;
  let isAnimating = false;

  function expandNavbar() {
    if (isAnimating || navbar.classList.contains("expand")) return;
    isAnimating = true;
    navbar.classList.add("visible");
    setTimeout(() => {
      navbar.classList.add("expand");
      isAnimating = false;
    }, 250);
  }

  function collapseNavbar() {
    if (isAnimating || !navbar.classList.contains("expand")) return;
    isAnimating = true;
    navbar.classList.remove("expand");
    setTimeout(() => {
      if (!isMobile) navbar.classList.remove("visible");
      isAnimating = false;
    }, 450);
  }

  function toggleNavbar() {
    if (navbar.classList.contains("expand")) {
      collapseNavbar();
    } else {
      expandNavbar();
    }
  }

  if (isMobile) {
    navbar.classList.add("visible");
    navbar.addEventListener("click", toggleNavbar);

    document.querySelectorAll(".island-menu a").forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.stopPropagation();
        setTimeout(collapseNavbar, 400);
      });
    });

    document.addEventListener("click", function (e) {
      if (navbar.classList.contains("expand") && !navbar.contains(e.target)) {
        collapseNavbar();
      }
    });
  } else {
    function handleScroll() {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const threshold = viewportHeight * 0.8;
      const footer = document.getElementById("footer");
      let footerInView = false;
      if (footer) {
        const rect = footer.getBoundingClientRect();
        footerInView = rect.top < viewportHeight;
      }
      if (scrollY > threshold && !footerInView) {
        expandNavbar();
      } else {
        collapseNavbar();
      }
    }

    window.addEventListener("scroll", throttle(handleScroll, 100), {
      passive: true,
    });
  }
})();

/* ========== SECTION INDICATOR ========== */
(function initSectionIndicator() {
  const sections = document.querySelectorAll("section[id]");
  const indicator = document.querySelector(".section-indicator");
  if (!indicator || !sections.length) return;
  const items = indicator.querySelectorAll(".section-indicator-item");

  function updateActive() {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    const viewportCenter = scrollY + vh / 2;
    let currentId = null;
    let closestDist = Infinity;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + scrollY;
      const sectionMid = sectionTop + rect.height / 2;
      const dist = Math.abs(sectionMid - viewportCenter);
      if (dist < closestDist) {
        closestDist = dist;
        currentId = section.id;
      }
    });

    items.forEach((item) => {
      item.classList.toggle("active", item.dataset.section === currentId);
    });
  }

  updateActive();
  window.addEventListener("scroll", updateActive, { passive: true });
})();

/* ========== COLLAB COUNTER ========== */
(function initCollabCounter() {
  const counters = document.querySelectorAll(".stat-number");
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -50px 0px", threshold: 0.1 },
  );

  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-target")) || 0;
    const suffix = counter.getAttribute("data-suffix") || "";
    buildDigitStructure(counter, target, suffix);
    observer.observe(counter);
  });

  function buildDigitStructure(counter, target, suffix) {
    counter.innerHTML = "";
    const targetStr = target.toString();
    const digits = targetStr.split("");

    digits.forEach((digit) => {
      const stack = document.createElement("div");
      stack.className = "digit-stack";
      const outer = document.createElement("div");
      outer.className = "digit-outer";
      const inner = document.createElement("div");
      inner.className = "digit-inner";
      for (let i = 0; i <= 9; i++) {
        const span = document.createElement("span");
        span.textContent = i;
        inner.appendChild(span);
      }
      inner.style.setProperty("--target-percent", parseInt(digit) * 10 + "%");
      outer.appendChild(inner);
      stack.appendChild(outer);
      counter.appendChild(stack);
    });

    if (suffix) {
      const suffixEl = document.createElement("span");
      suffixEl.className = "counter-suffix";
      suffixEl.textContent = suffix;
      counter.appendChild(suffixEl);
    }
  }

  function animateCounter(counter) {
    counter.classList.add("is-visible");
    const digitInners = counter.querySelectorAll(".digit-inner");
    digitInners.forEach((inner, index) => {
      inner.style.animationDuration = "2500ms";
      inner.style.animationDelay = index * 150 + "ms";
    });
    setTimeout(
      () => {
        counter.classList.add("animation-complete");
      },
      2500 + digitInners.length * 150,
    );
  }
})();

/* ========== COLLAB CARD REVEAL ========== */
(function initCollabReveal() {
  const cards = document.querySelectorAll(".collab-card");
  if (!cards.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Array.from(cards).indexOf(entry.target);
          setTimeout(() => entry.target.classList.add("visible"), index * 150);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
  );
  cards.forEach((card) => observer.observe(card));
})();

/* ========== ACTIVITY CAROUSEL DUPLICATE ========== */
(function initActivityCarousel() {
  const track = document.getElementById("activityTrack");
  if (!track) return;
  const cards = track.querySelectorAll(".activity-card");
  for (let i = 0; i < cards.length; i++) {
    track.appendChild(cards[i].cloneNode(true));
  }
})();

/* ========== CTA FORM HANDLER ========== */
(function initCTAForm() {
  const form = document.getElementById("ctaForm");
  if (!form) return;

  let isSubmitting = false;
  let statusTimeoutId = null;

  const statusEl = document.createElement("div");
  statusEl.className =
    "cta-status text-[0.85rem] text-light/60 mt-[12px] transition-all duration-300";
  form.appendChild(statusEl);

  function setStatus(msg, isError) {
    if (statusTimeoutId) clearTimeout(statusTimeoutId);
    statusEl.textContent = msg;
    statusEl.style.color = isError
      ? "rgba(255, 100, 100, 0.8)"
      : "rgba(52, 211, 153, 0.8)";
    statusTimeoutId = setTimeout(() => {
      if (statusEl.textContent === msg) {
        statusEl.textContent = "";
      }
      statusTimeoutId = null;
    }, 5000);
  }

  function flashInput(el) {
    el.style.borderColor = "rgba(255, 100, 100, 0.5)";
    el.style.transition = "border-color 0.3s ease";
    el.focus();
    setTimeout(() => {
      el.style.borderColor = "";
    }, 2000);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector(".cta-submit");
    if (!btn || isSubmitting) return;
    isSubmitting = true;

    const nameEl = form.querySelector("[name='name']");
    const emailEl = form.querySelector("[name='email']");
    const projectEl = form.querySelector("[name='project']");
    const messageEl = form.querySelector("[name='message']");

    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const project = projectEl.value.trim();
    const message = messageEl.value.trim();

    let hasError = false;

    if (!name) {
      flashInput(nameEl);
      hasError = true;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      flashInput(emailEl);
      hasError = true;
    }

    if (hasError) {
      setStatus("Please fill in all required fields correctly.", true);
      isSubmitting = false;
      return;
    }

    const text = [
      "*New Project Inquiry*",
      `*Name:* ${name}`,
      `*Email:* ${email}`,
      project ? `*Project:* ${project}` : "",
      message ? `*Message:* ${message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const whatsappUrl = `https://wa.me/8801723034312?text=${encodeURIComponent(text)}`;

    const originalText = btn.textContent;
    btn.textContent = "Opening WhatsApp...";
    btn.disabled = true;

    setTimeout(() => {
      const win = window.open(whatsappUrl, "_blank");
      if (!win || win.closed || typeof win.closed === "undefined") {
        setStatus("Popup blocked. Please allow popups or try again.", true);
      } else {
        setStatus("Message sent successfully!", false);
        form.reset();
      }
      btn.textContent = originalText;
      btn.disabled = false;
      isSubmitting = false;
    }, 800);
  });
})();

/* ========== FOOTER YEAR ========== */
const footerYear = document.querySelector(".footer-year");
if (footerYear) footerYear.textContent = new Date().getFullYear();

/* ========== WATERMARK VISIBILITY (only near skills section) ========== */
(function initWatermark() {
  const watermark = document.querySelector(".watermark");
  const section = document.getElementById("skills");
  if (!watermark || !section) return;

  watermark.style.opacity = "0";
  watermark.style.visibility = "hidden";

  let targetOpacity = 0;
  let currentOpacity = 0;
  let raf = null;

  function animate() {
    currentOpacity += (targetOpacity - currentOpacity) * 0.08;
    if (Math.abs(currentOpacity - targetOpacity) < 0.001)
      currentOpacity = targetOpacity;
    watermark.style.opacity = currentOpacity;
    watermark.style.visibility = currentOpacity > 0 ? "visible" : "hidden";
    if (currentOpacity !== targetOpacity) raf = requestAnimationFrame(animate);
    else raf = null;
  }

  function checkBounds() {
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;
    const inView = rect.top < vh * 0.3 && rect.bottom > vh * 0.7;
    targetOpacity = inView ? 1 : 0;
    if (!raf) raf = requestAnimationFrame(animate);
  }

  checkBounds();
  window.addEventListener("scroll", checkBounds, { passive: true });
})();
