/**
 * ========================================
 * PREMIUM ODOMETER COUNTER SYSTEM
 * Scroll-Triggered Rolling Number Animation
 * ========================================
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        digitHeight: 50,
        animationDuration: 2500,
        staggerDelay: 150,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    /**
     * Initialize all premium counters on the page
     */
    function initCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        if (!counters.length) return;

        // Create Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: CONFIG.rootMargin,
            threshold: CONFIG.threshold
        });

        // Observe each counter
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target')) || 0;
            const suffix = counter.getAttribute('data-suffix') || '';
            
            // Build the HTML structure for odometer effect
            buildDigitStructure(counter, target, suffix);
            
            // Start observing
            observer.observe(counter);
        });
    }

    /**
     * Build the digit stack structure for odometer effect
     */
    function buildDigitStructure(counter, target, suffix) {
        // Clear existing content
        counter.innerHTML = '';
        
        // Convert target to string and handle decimals
        const targetStr = target.toString();
        const digits = targetStr.split('');
        
        // Create digit stacks for each position
        digits.forEach((digit, index) => {
            const digitStack = createDigitStack(parseInt(digit));
            counter.appendChild(digitStack);
        });

        // Add decimal point if target has decimal (e.g., 99.9)
        if (targetStr.includes('.')) {
            const decimalPoint = document.createElement('span');
            decimalPoint.className = 'decimal-point';
            decimalPoint.textContent = '.';
            counter.appendChild(decimalPoint);
        }

        // Add suffix if exists
        if (suffix) {
            const suffixEl = document.createElement('span');
            suffixEl.className = 'counter-suffix';
            suffixEl.textContent = suffix;
            counter.appendChild(suffixEl);
        }
    }

    /**
     * Create a single digit stack with all digits 0-9
     */
    function createDigitStack(finalDigit) {
        const stack = document.createElement('div');
        stack.className = 'digit-stack';

        const outer = document.createElement('div');
        outer.className = 'digit-outer';

        const inner = document.createElement('div');
        inner.className = 'digit-inner';

        // Add all digits 0-9
        for (let i = 0; i <= 9; i++) {
            const digitSpan = document.createElement('span');
            digitSpan.textContent = i;
            inner.appendChild(digitSpan);
        }

        // Calculate target position (each digit is 10% = multiply by 10)
        const targetPercent = finalDigit * 10;
        
        // Set CSS custom property for animation
        inner.style.setProperty('--target-percent', targetPercent + '%');

        outer.appendChild(inner);
        stack.appendChild(outer);

        return stack;
    }

    /**
     * Trigger the counter animation
     */
    function animateCounter(counter) {
        // Add visible class to trigger CSS animations
        counter.classList.add('is-visible');

        // Set animation duration via JS to match CSS
        const digitInners = counter.querySelectorAll('.digit-inner');
        digitInners.forEach((inner, index) => {
            inner.style.animationDuration = CONFIG.animationDuration + 'ms';
            inner.style.animationDelay = (index * CONFIG.staggerDelay) + 'ms';
        });

        // Mark as complete after animation finishes
        setTimeout(() => {
            counter.classList.add('animation-complete');
        }, CONFIG.animationDuration + (digitInners.length * CONFIG.staggerDelay));
    }

    /**
     * Re-animate counters (for testing/debugging)
     */
    function replayCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            counter.classList.remove('is-visible', 'animation-complete');
            
            const digitInners = counter.querySelectorAll('.digit-inner');
            digitInners.forEach(inner => {
                inner.style.animationDelay = '0ms';
            });
            
            // Re-trigger animation
            requestAnimationFrame(() => {
                counter.classList.add('is-visible');
                
                const digits = counter.querySelectorAll('.digit-stack');
                digitInners.forEach((inner, index) => {
                    inner.style.animationDelay = (index * CONFIG.staggerDelay) + 'ms';
                });
                
                setTimeout(() => {
                    counter.classList.add('animation-complete');
                }, CONFIG.animationDuration + (digits.length * CONFIG.staggerDelay));
            });
        });
    }

    /**
     * Manual trigger for testing (call in console: window.replayPremiumCounters())
     */
    window.replayPremiumCounters = replayCounters;

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCounters);
    } else {
        initCounters();
    }

})();