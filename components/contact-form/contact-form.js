/* CarbonWeb Contact Form — inline validation + success state */
(function () {
  'use strict';

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function init(form) {
    var nameField = form.querySelector('[data-field="name"]');
    var emailField = form.querySelector('[data-field="email"]');

    function setError(field, message) {
      field.classList.add('contact-form__field--error');
      var msg = field.querySelector('.contact-form__error-msg');
      if (msg && message) msg.textContent = message;
      var input = field.querySelector('input, textarea');
      if (input) input.setAttribute('aria-invalid', 'true');
    }

    function clearError(field) {
      field.classList.remove('contact-form__field--error');
      var input = field.querySelector('input, textarea');
      if (input) input.removeAttribute('aria-invalid');
    }

    function validate() {
      var valid = true;

      var nameInput = nameField.querySelector('input');
      if (!nameInput.value.trim()) {
        setError(nameField, 'Please enter your name.');
        valid = false;
      } else {
        clearError(nameField);
      }

      var emailInput = emailField.querySelector('input');
      var email = emailInput.value.trim();
      if (!email) {
        setError(emailField, 'Please enter your email.');
        valid = false;
      } else if (!EMAIL_RE.test(email)) {
        setError(emailField, 'Please enter a valid email address.');
        valid = false;
      } else {
        clearError(emailField);
      }

      return valid;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.classList.remove('contact-form--success');
      if (validate()) {
        form.classList.add('contact-form--success');
        form.reset();
      }
    });

    // Clear errors as the user types
    [nameField, emailField].forEach(function (field) {
      var input = field.querySelector('input');
      input.addEventListener('input', function () {
        clearError(field);
        form.classList.remove('contact-form--success');
      });
    });
  }

  document.querySelectorAll('form.contact-form').forEach(init);
})();
