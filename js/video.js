/* ===================================
    PLYR VIDEO PLAYER
    =================================== */
function initPlyrVideo() {
  const playerElement = document.getElementById("player");
  if (!playerElement) return;

  let player;
  try {
    player = new Plyr("#player", {
      controls: [
        "play-large",
        "play",
        "rewind",
        "fast-forward",
        "progress",
        "current-time",
        "duration",
        "mute",
        "volume",
        "captions",
        "settings",
        "pip",
        "fullscreen",
      ],
      settings: ["quality", "speed"],
      speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] },
      keyboard: { focused: true, global: true },
      tooltips: { controls: true, seek: true },
      captions: { active: false },
      invertTime: false,
      toggleInvert: true,
    });
  } catch (e) {
    return;
  }

  const videoSection = document.getElementById("work");
  if (!videoSection) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (
            player &&
            player.media &&
            typeof player.media.play === "function"
          ) {
            player.media.play().catch(() => {});
          }
        } else {
          if (
            player &&
            player.media &&
            typeof player.media.pause === "function"
          ) {
            player.media.pause();
          }
        }
      });
    },
    { threshold: 0.5 },
  );

  observer.observe(videoSection);
}

/* ===================================
    INIT ON DOM READY
    =================================== */
document.addEventListener("DOMContentLoaded", () => {
  initPlyrVideo();
});
