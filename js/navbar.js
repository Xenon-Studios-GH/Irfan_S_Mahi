function initPixelPerfectNavbar() {
  const navbar = document.querySelector(".dynamic-island");
  if (!navbar) return;

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
      navbar.classList.remove("visible");
      isAnimating = false;
    }, 450);
  }

  function handleScroll() {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const threshold = viewportHeight * 0.8;

    const footer = document.getElementById("footer");
    const footerInView = footer && footer.getBoundingClientRect().top < viewportHeight;

    if (scrollY > threshold && !footerInView) {
      expandNavbar();
    } else {
      collapseNavbar();
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
}

document.addEventListener("DOMContentLoaded", initPixelPerfectNavbar);
