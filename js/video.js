document.addEventListener('DOMContentLoaded', () => {
    const player = new Plyr('#player', {
        controls: ['play-large', 'play', 'rewind', 'fast-forward', 'progress', 'current-time', 'duration', 'mute', 'volume', 'captions', 'settings', 'pip', 'fullscreen'],
        settings: ['quality', 'speed'],
        speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] },
        keyboard: { focused: true, global: true },
        tooltips: { controls: true, seek: true },
        captions: { active: false },
        invertTime: false,
        toggleInvert: true,
    });

    const videoSection = document.getElementById('work');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                player.media.play();
            } else {
                player.media.pause();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(videoSection);
});