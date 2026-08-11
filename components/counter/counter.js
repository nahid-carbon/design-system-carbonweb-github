/**
 * CarbonWeb Counter — Animate count-up on scroll
 *
 * Usage:
 *   <span class="counter__number" data-to="10">0</span>
 *
 * Attributes:
 *   data-to       — Target number (required, integer)
 *   data-duration — Animation duration in ms (optional, default 2000)
 *
 * The counter animates from 0 to data-to when it enters the viewport.
 * Each element only animates once.
 */
(function () {
  'use strict';

  var DURATION_DEFAULT = 2000;

  /**
   * Ease-out cubic: fast start, slow finish.
   */
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  /**
   * Animate a single counter element from 0 to its data-to value.
   */
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-to'), 10);
    if (isNaN(target)) return;

    var duration = parseInt(el.getAttribute('data-duration'), 10) || DURATION_DEFAULT;
    var start = null;

    // Mark as animating so the observer ignores it
    el.setAttribute('data-animating', 'true');

    // Update aria-live region for accessibility
    var counterRoot = el.closest('.counter');
    if (counterRoot) {
      counterRoot.setAttribute('aria-live', 'polite');
    }

    function step(timestamp) {
      if (!start) start = timestamp;
      var elapsed = timestamp - start;
      var progress = Math.min(elapsed / duration, 1);
      var eased = easeOutCubic(progress);
      var current = Math.round(eased * target);

      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        // Ensure exact final value
        el.textContent = target;
        el.setAttribute('data-complete', 'true');
      }
    }

    requestAnimationFrame(step);
  }

  /**
   * Set up IntersectionObserver to trigger animations on scroll.
   */
  function init() {
    var counters = document.querySelectorAll('.counter__number[data-to]');
    if (!counters.length) return;

    // Fallback for browsers without IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      counters.forEach(function (el) {
        animateCounter(el);
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !entry.target.getAttribute('data-animating')) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    counters.forEach(function (el) {
      observer.observe(el);
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
