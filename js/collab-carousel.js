document.addEventListener("DOMContentLoaded", () => {
  initDualCarousel();
});

function initDualCarousel() {
  const carousels = document.querySelectorAll(".carousel-track");

  carousels.forEach((track) => {
    const content = track.textContent.trim();
    track.textContent = content + " " + content;
  });
}
