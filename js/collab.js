document.addEventListener('DOMContentLoaded', () => {
    initCollabAnimations();
});

function initCollabAnimations() {
    const cards = document.querySelectorAll('.collab-card');
    const timelineItems = document.querySelectorAll('.collab-timeline-item');

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('collab-card-visible');
                }, index * 100);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    cards.forEach(card => cardObserver.observe(card));

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('collab-timeline-visible');
                }, index * 150);
            }
        });
    }, { threshold: 0.1 });

    timelineItems.forEach(item => timelineObserver.observe(item));

    const statsNumbers = document.querySelectorAll('.collab-stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsNumbers.forEach(stat => statsObserver.observe(stat));

    cards.forEach(card => {
        card.addEventListener('mousemove', handleCardMouseMove);
        card.addEventListener('mouseleave', handleCardMouseLeave);
    });
}

function handleCardMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.02)`;
}

function handleCardMouseLeave(e) {
    e.currentTarget.style.transform = '';
}

function animateCounter(element) {
    const text = element.textContent;
    const match = text.match(/(\d+)/);
    
    if (!match) return;
    
    const target = parseInt(match[0]);
    const prefix = text.substring(0, text.indexOf(match[0]));
    const suffix = text.substring(text.indexOf(match[0]) + match[0].length);
    
    let current = 0;
    const increment = target / 40;
    const duration = 1500;
    const stepTime = duration / 40;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.innerHTML = `${prefix}${target}${suffix}`;
            clearInterval(timer);
        } else {
            element.innerHTML = `${prefix}${Math.floor(current)}${suffix}`;
        }
    }, stepTime);
}

document.querySelectorAll('.collab-card').forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('h3').textContent;
        console.log(`Opening collaboration: ${title}`);
    });
});