document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.dynamic-island');
    let isVisible = false;
    
    function updateNavbar() {
        const inHero = window.scrollY < window.innerHeight - 100;
        if (inHero && isVisible) {
            navbar.classList.remove('expand');
            isVisible = false;
        } else if (!inHero && !isVisible) {
            navbar.classList.add('expand');
            isVisible = true;
        }
    }
    
    window.addEventListener('scroll', updateNavbar);
    updateNavbar();
});