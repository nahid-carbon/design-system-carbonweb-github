/**
 * CarbonWeb Newsletter Form
 *
 * Basic email validation, success/error state management.
 * - Validates email on submit with regex pattern.
 * - Shows success message on valid submit.
 * - Shows error with shake animation on invalid.
 * - Prevents actual form submission (e.preventDefault).
 *
 * Auto-initializes all .newsletter-form elements on DOMContentLoaded.
 */

(function () {
  'use strict';

  var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function initForm(form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var input = form.querySelector('.newsletter-form__input');
      var value = input ? input.value.trim() : '';

      // Clear previous states
      form.classList.remove('newsletter-form--show-error', 'newsletter-form--shake', 'newsletter-form--show-success');

      if (!value || !EMAIL_PATTERN.test(value)) {
        // Show error with shake
        form.classList.add('newsletter-form--show-error', 'newsletter-form--shake');

        // Remove shake class after animation completes so it can re-trigger
        setTimeout(function () {
          form.classList.remove('newsletter-form--shake');
        }, 400);

        if (input) input.focus();
        return;
      }

      // Valid — show success
      form.classList.add('newsletter-form--show-success');
    });

    // Clear error state when user starts typing
    var input = form.querySelector('.newsletter-form__input');
    if (input) {
      input.addEventListener('input', function () {
        form.classList.remove('newsletter-form--show-error');
      });
    }
  }

  function initAll() {
    document.querySelectorAll('.newsletter-form').forEach(initForm);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
