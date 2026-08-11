/* CarbonWeb Nav — Collapsible group toggle for vanilla HTML usage */

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav__group-toggle').forEach((toggle) => {
    const group = toggle.parentElement
    group.classList.add('nav__group--open')

    toggle.addEventListener('click', () => {
      group.classList.toggle('nav__group--open')
    })
  })

  // Mark active link based on current URL
  const current = window.location.pathname + window.location.hash
  document.querySelectorAll('.nav__link').forEach((link) => {
    if (link.getAttribute('href') === current) {
      link.classList.add('nav__link--active')
    }
  })
})
