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

  cards.forEach((card) => {
    card.addEventListener("mousemove", handleCardMouseMove);
    card.addEventListener("mouseleave", handleCardMouseLeave);
  });
}

function handleCardMouseMove(e) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const rotateX = (y - centerY) / 20;
  const rotateY = (centerX - x) / 20;

  card.style.setProperty("--rotate-x", rotateX + "deg");
  card.style.setProperty("--rotate-y", rotateY + "deg");
  card.style.transform = [
    "perspective(1000px)",
    `rotateX(${rotateX}deg)`,
    `rotateY(${rotateY}deg)`,
    "translateY(-12px)",
    "scale(1.02)",
  ].join(" ");
}

function handleCardMouseLeave(e) {
  const card = e.currentTarget;
  card.style.removeProperty("--rotate-x");
  card.style.removeProperty("--rotate-y");
  card.style.transform = "";
}
