(function () {
  const CHARS =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

  function randomChar() {
    return CHARS[Math.floor(Math.random() * CHARS.length)];
  }

  function decodeText(element, text, totalDuration) {
    element.textContent = text;
    if (totalDuration <= 0 || !text) return;
    element.textContent = "";
    const chars = text.split("");
    let currentIndex = 0;
    const perCharTime = Math.max(totalDuration / chars.length, 16);
    const intervals = [];

    function updateFrame(index) {
      const displayText = chars
        .map((ch, i) => {
          if (i < currentIndex) return ch;
          if (i === currentIndex) return randomChar();
          return "";
        })
        .join("");
      element.textContent = displayText;
    }

    function revealNext() {
      if (currentIndex >= chars.length) {
        intervals.forEach(clearInterval);
        intervals.length = 0;
        element.textContent = text;
        return;
      }

      const charInterval = setInterval(() => {
        updateFrame(currentIndex);
      }, perCharTime / 4);

      intervals.push(charInterval);

      setTimeout(() => {
        clearInterval(charInterval);
        currentIndex++;
        revealNext();
      }, perCharTime);
    }

    revealNext();
  }

  function typeText(element, text, speed = 3) {
    element.textContent = "";
    let i = 0;
    function typeChar() {
      if (i < text.length) {
        element.textContent += text[i];
        i++;
        setTimeout(typeChar, speed);
      } else {
        element.classList.add("typing-done");
      }
    }
    typeChar();
    return text.length * speed;
  }

  function initTextEffects() {
    const rows = document.querySelectorAll("#skills .skill-item");
    if (!rows.length) return;

    const descriptions = [];
    const skillNames = [];

    rows.forEach((row) => {
      const desc = row.querySelector("td:last-child div");
      const name = row.querySelector("td:first-child");

      if (desc) {
        desc.dataset.original = desc.dataset.text;
        delete desc.dataset.text;
        descriptions.push(desc);
      }

      if (name) {
        name.dataset.original = name.textContent.trim();
        name.innerHTML = '<span class="decoder-text"></span>';
        skillNames.push(name.querySelector(".decoder-text"));
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.disconnect();
            let delay = 0;
            rows.forEach((_, index) => {
              setTimeout(() => {
                const duration = descriptions[index]
                  ? typeText(
                      descriptions[index],
                      descriptions[index].dataset.original,
                    )
                  : 0;
                if (skillNames[index])
                  decodeText(
                    skillNames[index],
                    skillNames[index].closest("td").dataset.original,
                    duration,
                  );
              }, delay);
              delay += 800;
            });
          }
        });
      },
      { threshold: 0.3 },
    );

    const skillsSection = document.getElementById("skills");
    if (skillsSection) observer.observe(skillsSection);
  }

  function initWatermark(selector, sectionId) {
    const watermark = document.querySelector(selector);
    const section = document.getElementById(sectionId);
    if (!watermark || !section) return;

    watermark.style.opacity = "0";
    watermark.style.visibility = "hidden";

    let targetOpacity = 0;
    let currentOpacity = 0;
    let raf = null;

    function animate() {
      currentOpacity += (targetOpacity - currentOpacity) * 0.08;
      if (Math.abs(currentOpacity - targetOpacity) < 0.001)
        currentOpacity = targetOpacity;
      watermark.style.opacity = currentOpacity;
      watermark.style.visibility = currentOpacity > 0 ? "visible" : "hidden";
      if (currentOpacity !== targetOpacity) raf = requestAnimationFrame(animate);
      else raf = null;
    }

    function checkBounds() {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const inView = rect.top < vh * 0.3 && rect.bottom > vh * 0.7;
      targetOpacity = inView ? 1 : 0;
      if (!raf) raf = requestAnimationFrame(animate);
    }

    checkBounds();
    window.addEventListener("scroll", checkBounds, { passive: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      initTextEffects();
      initWatermark(".watermark", "skills");
    });
  } else {
    initTextEffects();
    initWatermark(".watermark", "skills");
  }
})();
