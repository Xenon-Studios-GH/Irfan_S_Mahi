document.addEventListener("DOMContentLoaded", () => {
  window.lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });
  function raf(time) {
    window.lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  gsap.registerPlugin(ScrollTrigger);
  window.lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.lagSmoothing(0);
});
