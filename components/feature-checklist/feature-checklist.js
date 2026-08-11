/* CarbonWeb Feature Checklist — stagger fade-in on scroll into view.
   Auto-initializes all [data-feature-checklist] containers.
   Respects prefers-reduced-motion. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function reveal(container) {
    var items = container.querySelectorAll('.feature-checklist__item');
    items.forEach(function (item, i) {
      item.style.setProperty('--stagger-delay', (i * 80) + 'ms');
      item.classList.add('is-visible');
    });
  }

  function init(container) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      reveal(container);
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });
    observer.observe(container);
  }

  document.querySelectorAll('[data-feature-checklist]').forEach(init);
})();
