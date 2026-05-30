function initTypewriter() {
  const descriptionWraps = document.querySelectorAll("#skills .skill-item td:first-child div");
  if (!descriptionWraps.length) return;

  descriptionWraps.forEach((el) => {
    el.dataset.original = el.dataset.text;
    delete el.dataset.text;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          let delay = 0;
          descriptionWraps.forEach((el) => {
            setTimeout(() => {
              const text = el.dataset.original;
              el.textContent = "";
              let i = 0;
              function typeChar() {
                if (i < text.length) {
                  el.textContent += text[i];
                  i++;
                  setTimeout(typeChar, 20);
                } else {
                  el.classList.add("typing-done");
                }
              }
              typeChar();
            }, delay);
            delay += 2000;
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(document.getElementById("skills"));
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTypewriter);
} else {
  initTypewriter();
}
