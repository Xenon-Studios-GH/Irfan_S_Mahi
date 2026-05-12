document.addEventListener('DOMContentLoaded', () => {
    initDualCarousel();
    initActivityCarousel();
});

function initDualCarousel() {
    const carousels = document.querySelectorAll('.carousel-track');
    
    carousels.forEach(track => {
        const content = track.textContent.trim();
        track.textContent = content + ' ' + content;
    });
}

function initActivityCarousel() {
    const track = document.getElementById('activityTrack');
    
    if (!track) return;

    const cards = track.querySelectorAll('.activity-card');
    const totalCards = cards.length;

    for (let i = 0; i < totalCards; i++) {
        const clone = cards[i].cloneNode(true);
        track.appendChild(clone);
    }
}