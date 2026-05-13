/**
 * ========================================
 * PREMIUM ODOMETER COUNTER SYSTEM
 * Scroll-Triggered Rolling Number Animation
 * ======================================== */

(function () {
  "use strict";

  const CONFIG = {
    digitHeight: 50,
    animationDuration: 2500,
    staggerDelay: 150,
    rootMargin: "0px 0px -50px 0px",
    threshold: 0.1,
  };

  function initCounters() {
    const counters = document.querySelectorAll(".stat-number");

    if (!counters.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: CONFIG.rootMargin,
        threshold: CONFIG.threshold,
      },
    );

    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target")) || 0;
      const suffix = counter.getAttribute("data-suffix") || "";

      buildDigitStructure(counter, target, suffix);
      observer.observe(counter);
    });
  }

  function buildDigitStructure(counter, target, suffix) {
    counter.innerHTML = "";

    const targetStr = target.toString();
    const digits = targetStr.split("");

    digits.forEach((digit, index) => {
      const digitStack = createDigitStack(parseInt(digit));
      counter.appendChild(digitStack);
    });

    if (targetStr.includes(".")) {
      const decimalPoint = document.createElement("span");
      decimalPoint.className = "decimal-point";
      decimalPoint.textContent = ".";
      counter.appendChild(decimalPoint);
    }

    if (suffix) {
      const suffixEl = document.createElement("span");
      suffixEl.className = "counter-suffix";
      suffixEl.textContent = suffix;
      counter.appendChild(suffixEl);
    }
  }

  function createDigitStack(finalDigit) {
    const stack = document.createElement("div");
    stack.className = "digit-stack";

    const outer = document.createElement("div");
    outer.className = "digit-outer";

    const inner = document.createElement("div");
    inner.className = "digit-inner";

    for (let i = 0; i <= 9; i++) {
      const digitSpan = document.createElement("span");
      digitSpan.textContent = i;
      inner.appendChild(digitSpan);
    }

    const targetPercent = finalDigit * 10;
    inner.style.setProperty("--target-percent", targetPercent + "%");

    outer.appendChild(inner);
    stack.appendChild(outer);

    return stack;
  }

  function animateCounter(counter) {
    counter.classList.add("is-visible");

    const digitInners = counter.querySelectorAll(".digit-inner");
    digitInners.forEach((inner, index) => {
      inner.style.animationDuration = CONFIG.animationDuration + "ms";
      inner.style.animationDelay = index * CONFIG.staggerDelay + "ms";
    });

    setTimeout(
      () => {
        counter.classList.add("animation-complete");
      },
      CONFIG.animationDuration + digitInners.length * CONFIG.staggerDelay,
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCounters);
  } else {
    initCounters();
  }
})();
