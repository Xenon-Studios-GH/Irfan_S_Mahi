/* ============================================================
   CALL TO ACTION FORM HANDLING
   ============================================================
   This handles the contact form on the CTA section:
   - Form validation (email format)
   - Visual feedback on submit
   - Mock submission (no actual backend)
   
   NOTE: This is a frontend-only implementation.
   To make functional, connect to a service like:
   - Formspree
   - Netlify Forms
   - EmailJS
   ============================================================ */

/**
 * Initialize CTA form handling
 */
document.addEventListener("DOMContentLoaded", () => {
  initCTAForm();
});

/**
 * Sets up form submission handler with validation
 */
function initCTAForm() {
  const form = document.getElementById("ctaForm");
  if (!form) return;

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Stop actual form submission

    const input = form.querySelector(".cta-input"); // Get email input
    const btn = form.querySelector(".cta-submit");
    const email = input.value.trim();

    // Validate email format
    if (!email || !isValidEmail(email)) {
      // Show error state (red border)
      input.style.borderColor = "rgba(255, 100, 100, 0.5)";
      setTimeout(() => {
        input.style.borderColor = "";
      }, 1500);
      return;
    }

    // Show sending state
    btn.textContent = "Sending...";
    btn.disabled = true;

    // Simulate sending (replace with actual API call in production)
    setTimeout(() => {
      // Show success state
      btn.textContent = "Sent ✓";
      input.value = "";

      // Reset button after 2 seconds
      setTimeout(() => {
        btn.textContent = "Send →";
        btn.disabled = false;
      }, 2000);
    }, 1000);
  });
}

/**
 * Validates email format using regex
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid email format
 */
function isValidEmail(email) {
  // Simple regex: checks for characters@characters.domain
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
