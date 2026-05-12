/* ===================================
   NAVBAR CONFIG
   =================================== */
const EXPANDED_CONFIG = {
    320: { width: '60px', padding: '6px 10px', borderRadius: '24px' },
    360: { width: '60px', padding: '8px 12px', borderRadius: '28px' },
    400: { width: '60px', padding: '10px 14px', borderRadius: '32px' },
    440: { width: '60px', padding: '10px 16px', borderRadius: '36px' },
    480: { width: '60px', padding: '12px 18px', borderRadius: '40px' },
    520: { width: '60px', padding: '12px 18px', borderRadius: '40px' },
    600: { width: '60px', padding: '12px 18px', borderRadius: '40px' },
    660: { width: '60px', padding: '12px 18px', borderRadius: '40px' },
    720: { width: '60px', padding: '12px 20px', borderRadius: '44px' },
    780: { width: '60px', padding: '12px 20px', borderRadius: '44px' },
    840: { width: '60px', padding: '14px 22px', borderRadius: '48px' },
    900: { width: '60px', padding: '14px 24px', borderRadius: '50px' },
    960: { width: '60px', padding: '16px 28px', borderRadius: '50px' },
    1024: { width: '60px', padding: '16px 28px', borderRadius: '50px' },
    default: { width: '60px', padding: '12px 16px', borderRadius: '50px' }
};

const EXPANDED_WIDTHS = {
    320: { width: 'calc(100% - 16px)', maxWidth: '300px' },
    360: { width: 'calc(100% - 24px)', maxWidth: '320px' },
    400: { width: 'calc(100% - 32px)', maxWidth: '340px' },
    440: { width: 'calc(100% - 32px)', maxWidth: '360px' },
    480: { width: '90%', maxWidth: '400px' },
    520: { width: '88%', maxWidth: '440px' },
    600: { width: '85%', maxWidth: '480px' },
    660: { width: '80%', maxWidth: '520px' },
    720: { width: '75%', maxWidth: '560px' },
    780: { width: '70%', maxWidth: '600px' },
    840: { width: '65%', maxWidth: '640px' },
    900: { width: '600px', maxWidth: null },
    960: { width: '640px', maxWidth: null },
    1024: { width: '680px', maxWidth: null },
    default: { width: '600px', maxWidth: null }
};

/* ===================================
   HELPERS
   =================================== */
function getWidthConfig(width) {
    const keys = Object.keys(EXPANDED_WIDTHS).map(Number);
    for (let i = keys.length - 1; i >= 0; i--) {
        if (width <= keys[i]) {
            return EXPANDED_WIDTHS[keys[i]];
        }
    }
    return EXPANDED_WIDTHS.default;
}

/* ===================================
   NAVBAR LOGIC
   =================================== */
function initPixelPerfectNavbar() {
    const navbar = document.querySelector('.dynamic-island');
    if (!navbar) return;
    
    let isVisible = false;
    let isExpanded = false;
    let hideTimeout = null;
    
    function expandNavbar() {
        const width = window.innerWidth;
        
        const breakpoints = Object.keys(EXPANDED_CONFIG).map(Number).sort((a, b) => a - b);
        const matchedBreakpoint = breakpoints.find(k => width <= k);
        const paddingConfig = EXPANDED_CONFIG[matchedBreakpoint] || EXPANDED_CONFIG.default;
        const sizeConfig = EXPANDED_WIDTHS[matchedBreakpoint] || EXPANDED_WIDTHS.default;
        
        navbar.classList.add('visible');
        
        setTimeout(() => {
            navbar.classList.add('expand');
            navbar.style.width = sizeConfig.width;
            if (sizeConfig.maxWidth) {
                navbar.style.maxWidth = sizeConfig.maxWidth;
            }
            navbar.style.padding = paddingConfig.padding;
            navbar.style.borderRadius = paddingConfig.borderRadius;
        }, 250);
        
        isVisible = true;
        isExpanded = true;
    }
    
    function collapseNavbar() {
        navbar.classList.remove('expand');
        navbar.style.width = '';
        navbar.style.maxWidth = '';
        navbar.style.padding = '';
        navbar.style.borderRadius = '';
        
        setTimeout(() => {
            navbar.classList.remove('visible');
        }, 250);
        
        isExpanded = false;
        isVisible = false;
    }
    
    function handleScroll() {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        const threshold = viewportHeight * 0.8;
        
        if (scrollY > threshold) {
            if (hideTimeout) {
                clearTimeout(hideTimeout);
                hideTimeout = null;
            }
            if (!isVisible) {
                expandNavbar();
            }
        } else {
            if (isVisible && !hideTimeout) {
                hideTimeout = setTimeout(() => {
                    collapseNavbar();
                    hideTimeout = null;
                }, 50);
            }
        }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', () => {
        if (isExpanded) {
            const width = window.innerWidth;
            const sizeConfig = getWidthConfig(width);
            navbar.style.width = sizeConfig.width;
            if (sizeConfig.maxWidth) {
                navbar.style.maxWidth = sizeConfig.maxWidth;
            }
        }
    });
}

/* ===================================
   INIT
   =================================== */
document.addEventListener('DOMContentLoaded', initPixelPerfectNavbar);