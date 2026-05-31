document.addEventListener("DOMContentLoaded", () => {
  initCollabAnimations();
});

function initCollabAnimations() {
  const cards = document.querySelectorAll(".collab-card");

  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, index * 150);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
  );

  cards.forEach((card) => cardObserver.observe(card));


