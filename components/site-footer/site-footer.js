/* CarbonWeb Site Footer
   Newsletter validation + success/error messaging (mirrors Brevo form behavior) */

(function () {
  document.querySelectorAll('.site-footer__newsletter-form').forEach(function (form) {
    var input = form.querySelector('.site-footer__newsletter-input');
    var card = form.closest('.site-footer__newsletter');
    var success = card.querySelector('.site-footer__newsletter-message--success');
    var error = card.querySelector('.site-footer__newsletter-message--error');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var email = input.value.trim();
      var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      success.classList.remove('is-visible');
      error.classList.remove('is-visible');

      if (valid) {
        success.classList.add('is-visible');
        input.value = '';
      } else {
        error.classList.add('is-visible');
      }
    });

    // typing clears messages
    input.addEventListener('input', function () {
      success.classList.remove('is-visible');
      error.classList.remove('is-visible');
    });
  });
})();

/* V2: staggered scroll-reveal for footer sections */
(function () {
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('.site-footer--v2').forEach(function (footer) {
    var targets = footer.querySelectorAll(
      '.site-footer__cta, .site-footer__row > div, .site-footer__bottom, .site-footer__legal'
    );

    if (reduceMotion || !('IntersectionObserver' in window)) {
      targets.forEach(function (t) { t.classList.add('is-revealed'); });
      return;
    }

    // stagger siblings within each row
    targets.forEach(function (t, i) {
      t.style.setProperty('--reveal-delay', (i % 4) * 90 + 'ms');
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    targets.forEach(function (t) { io.observe(t); });
  });
})();
