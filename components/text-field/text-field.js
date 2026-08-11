/* CarbonWeb Text Field — Optional JS for floating label and validation
   TODO: Finalize after design review
*/

/**
 * Initialize floating label behavior on a text-field--floating container.
 * Adds/removes an 'active' class when the input has a value.
 */
function initFloatingLabel(container) {
  const input = container.querySelector('.text-field__input')
  if (!input) return

  function update() {
    container.classList.toggle('text-field--has-value', input.value.length > 0)
  }

  input.addEventListener('input', update)
  input.addEventListener('blur', update)
  update()
}

/**
 * Show or clear an error on a text-field container.
 * @param {HTMLElement} container - The .text-field element
 * @param {string|null} message - Error message, or null to clear
 */
function setFieldError(container, message) {
  const input = container.querySelector('.text-field__input')
  let errorEl = container.querySelector('.text-field__error-msg')

  if (message) {
    container.classList.add('text-field--error')
    input.setAttribute('aria-invalid', 'true')

    if (!errorEl) {
      errorEl = document.createElement('p')
      errorEl.className = 'text-field__error-msg'
      errorEl.id = input.id + '-error'
      container.appendChild(errorEl)
    }
    errorEl.textContent = message
    input.setAttribute('aria-describedby', errorEl.id)
  } else {
    container.classList.remove('text-field--error')
    input.removeAttribute('aria-invalid')
    input.removeAttribute('aria-describedby')
    if (errorEl) errorEl.remove()
  }
}

// Auto-init all floating labels on page load
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.text-field--floating').forEach(initFloatingLabel)
})
