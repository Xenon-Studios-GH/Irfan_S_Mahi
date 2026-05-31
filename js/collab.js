document.addEventListener("DOMContentLoaded", () => {
  initCollabAnimations();
});

function initCollabAnimations() {
  const cards = document.querySelectorAll(".collab-card");
  if (!cards.length) return;

  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Array.from(cards).indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, index * 150);
          cardObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
  );

  cards.forEach((card) => cardObserver.observe(card));
}
