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
            entry.target.classList.add("collab-card-visible");
          }, index * 100);
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
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = (y - centerY) / 20;
  const rotateY = (centerX - x) / 20;

  e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.02)`;
}

function handleCardMouseLeave(e) {
  e.currentTarget.style.transform = "";
}

document.querySelectorAll(".collab-card").forEach((card) => {
  card.addEventListener("click", () => {
    const title = card.querySelector("h3").textContent;
    console.log(`Opening collaboration: ${title}`);
  });
});
