/* ===================================
   UTILITY FUNCTIONS
   =================================== */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/* ===================================
   VIDEO CONFIG
   =================================== */
const VIDEO_CONFIG = {
    320: { maxWidth: 'calc(100% - 8px)', padding: '0 4px', inset: -10, blur: 20, radius: 6 },
    360: { maxWidth: 'calc(100% - 12px)', padding: '0 6px', inset: -12, blur: 24, radius: 8 },
    400: { maxWidth: 'calc(100% - 16px)', padding: '0 8px', inset: -16, blur: 28, radius: 10 },
    440: { maxWidth: 'calc(100% - 20px)', padding: '0 10px', inset: -18, blur: 30, radius: 12 },
    480: { maxWidth: 'calc(100% - 24px)', padding: '0 12px', inset: -20, blur: 35, radius: 14 },
    520: { maxWidth: 'calc(100% - 32px)', padding: '0 12px', inset: -24, blur: 40, radius: 16 },
    600: { maxWidth: 'calc(100% - 40px)', padding: '0 20px', inset: -28, blur: 45, radius: 18 },
    660: { maxWidth: 'calc(100% - 48px)', padding: '0 24px', inset: -32, blur: 50, radius: 20 },
    720: { maxWidth: 'calc(100% - 56px)', padding: '0 28px', inset: -36, blur: 55, radius: 22 },
    780: { maxWidth: 'calc(100% - 64px)', padding: '0 32px', inset: -40, blur: 55, radius: 24 },
    840: { maxWidth: '720px', padding: '0', inset: -44, blur: 60, radius: 26 },
    900: { maxWidth: '800px', padding: '0', inset: -48, blur: 60, radius: 28 },
    960: { maxWidth: '900px', padding: '0', inset: -52, blur: 60, radius: 28 },
    1024: { maxWidth: '1100px', padding: '0', inset: -60, blur: 60, radius: 30 },
    default: { maxWidth: '1100px', padding: '0', inset: -60, blur: 60, radius: 24 }
};

/* ===================================
   PLYR VIDEO PLAYER
   =================================== */
function initPlyrVideo() {
    const playerElement = document.getElementById('player');
    if (!playerElement) {
        console.log('Player element not found');
        return;
    }
    
    let player;
    try {
        player = new Plyr('#player', {
            controls: ['play-large', 'play', 'rewind', 'fast-forward', 'progress', 'current-time', 'duration', 'mute', 'volume', 'captions', 'settings', 'pip', 'fullscreen'],
            settings: ['quality', 'speed'],
            speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] },
            keyboard: { focused: true, global: true },
            tooltips: { controls: true, seek: true },
            captions: { active: false },
            invertTime: false,
            toggleInvert: true,
        });
    } catch (e) {
        console.error('Plyr initialization failed:', e);
        return;
    }

    const videoSection = document.getElementById('work');
    if (!videoSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (player && player.media && typeof player.media.play === 'function') {
                    player.media.play().catch(() => {});
                }
            } else {
                if (player && player.media && typeof player.media.pause === 'function') {
                    player.media.pause();
                }
            }
        });
    }, { threshold: 0.5 });

    observer.observe(videoSection);
}

/* ===================================
   PIXEL PERFECT VIDEO
   =================================== */
function getVideoConfig(width) {
    const keys = Object.keys(VIDEO_CONFIG).map(Number);
    for (let i = keys.length - 1; i >= 0; i--) {
        if (width <= keys[i]) {
            return VIDEO_CONFIG[keys[i]];
        }
    }
    return VIDEO_CONFIG.default;
}

function initPixelPerfectVideo() {
    const videoWrappers = document.querySelectorAll('.video-wrapper');
    if (!videoWrappers.length) return;
    
    function updateVideos() {
        const width = window.innerWidth;
        const config = getVideoConfig(width);
        
        videoWrappers.forEach(wrapper => {
            wrapper.style.maxWidth = config.maxWidth;
            wrapper.style.padding = config.padding;
            
            const glow = wrapper.querySelector('.video-glow');
            if (glow) {
                glow.style.inset = `-${config.inset}px`;
                glow.style.filter = `blur(${config.blur}px)`;
            }
            
            const frame = wrapper.querySelector('.video-frame');
            if (frame) {
                frame.style.borderRadius = config.radius + 'px';
            }
        });
    }
    
    updateVideos();
    window.addEventListener('resize', debounce(updateVideos, 50));
}

/* ===================================
   INIT ON DOM READY
   =================================== */
document.addEventListener('DOMContentLoaded', () => {
    initPlyrVideo();
    initPixelPerfectVideo();
});