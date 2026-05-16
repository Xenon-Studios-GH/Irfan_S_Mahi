/* ============================================================
   PLYR VIDEO PLAYER INTEGRATION
   ============================================================
   This initializes the Plyr video player library and handles:
   - Custom controls configuration
   - Auto-play when section is visible
   - Auto-pause when scrolling away
   
   Plyr is a accessible, customizable HTML5 media player
   ============================================================ */

/**
 * Initialize Plyr video player with custom settings
 */
function initPlyrVideo() {
  const playerElement = document.getElementById("player");
  if (!playerElement) return;

  let player;
  try {
    // Create Plyr instance with custom configuration
    player = new Plyr("#player", {
      // Show all major controls
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
        "pip", // Picture-in-picture
        "fullscreen",
      ],
      // Settings panel options
      settings: ["quality", "speed"],
      // Playback speed options
      speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] },
      // Keyboard controls
      keyboard: { focused: true, global: true },
      // Show tooltips on controls
      tooltips: { controls: true, seek: true },
      // Caption settings
      captions: { active: false },
      // Time display options
      invertTime: false,
      toggleInvert: true,
    });
  } catch (e) {
    // Exit if Plyr fails to initialize
    return;
  }

  // Get the work/video section
  const videoSection = document.getElementById("about");
  if (!videoSection) return;

  // Create observer to auto-play/pause based on visibility
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // When section comes into view, play video
        if (entry.isIntersecting) {
          if (
            player &&
            player.media &&
            typeof player.media.play === "function"
          ) {
            player.media.play().catch(() => {}); // Catch autoplay restrictions
          }
        }
        // When section leaves view, pause video
        else {
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
    { threshold: 0.5 }, // Trigger when 50% visible
  );

  // Start observing the video section
  observer.observe(videoSection);
}

/* ============================================================
   INITIALIZATION
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  initPlyrVideo();
});
