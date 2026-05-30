document.addEventListener("DOMContentLoaded", () => {
  initBrandCarousel();
});

function initBrandCarousel() {
  const carousels = document.querySelectorAll(".carousel-track");

  carousels.forEach((track) => {
    const items = track.querySelectorAll(".carousel-item");

    if (items.length > 0) {
      const itemsCopy = Array.from(items).map((item) => item.cloneNode(true));
      itemsCopy.forEach((item) => track.appendChild(item));
    }
  });
}
