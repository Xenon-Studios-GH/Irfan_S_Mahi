/* ===================================
   NAVBAR LOGIC
   =================================== */
function initPixelPerfectNavbar() {
    const navbar = document.querySelector('.dynamic-island');
    if (!navbar) return;
    
    let isVisible = false;
    let isExpanded = false;
    let isAnimating = false;
    
    function expandNavbar() {
        if (isAnimating || isExpanded) return;
        isAnimating = true;
        
        navbar.classList.add('visible');
        
        setTimeout(() => {
            navbar.classList.add('expand');
            isVisible = true;
            isExpanded = true;
            isAnimating = false;
        }, 250);
    }
    
    function collapseNavbar() {
        if (isAnimating || !isExpanded) return;
        isAnimating = true;
        
        navbar.classList.remove('expand');
        
        setTimeout(() => {
            navbar.classList.remove('visible');
            isExpanded = false;
            isVisible = false;
            isAnimating = false;
        }, 450);
    }
    
    function handleScroll() {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        const threshold = viewportHeight * 0.8;
        
        if (scrollY > threshold) {
            expandNavbar();
        } else {
            collapseNavbar();
        }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
}

/* ===================================
   INIT
   =================================== */
document.addEventListener('DOMContentLoaded', initPixelPerfectNavbar);