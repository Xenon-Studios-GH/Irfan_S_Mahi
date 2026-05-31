function throttle(fn, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

function initPixelPerfectNavbar() {
  const navbar = document.querySelector(".dynamic-island");
  if (!navbar) return;

  let isAnimating = false;
  let lastFooterTop = null;

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
      navbar.classList.remove("visible");
      isAnimating = false;
    }, 450);
  }

  function handleScroll() {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const threshold = viewportHeight * 0.8;

    const footer = document.getElementById("footer");
    let footerInView = false;
    if (footer) {
      const rect = footer.getBoundingClientRect();
      lastFooterTop = rect.top;
      footerInView = rect.top < viewportHeight;
    } else if (lastFooterTop !== null) {
      footerInView = lastFooterTop < viewportHeight;
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

document.addEventListener("DOMContentLoaded", initPixelPerfectNavbar);
