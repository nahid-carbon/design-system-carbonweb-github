/* CarbonWeb Stats — count-up animation on scroll into view.
   Auto-initializes all [data-stats] containers.
   Respects prefers-reduced-motion. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function parseValue(text) {
    // Extract the numeric part, keep prefix/suffix (e.g. "+", ",", "1,200+", "4.9-5")
    var match = text.match(/[\d][\d.,]*/);
    if (!match) return null;
    var raw = match[0];
    var value = parseFloat(raw.replace(/,/g, ''));
    if (isNaN(value)) return null;
    return {
      value: value,
      decimals: (raw.split('.')[1] || '').length,
      grouped: raw.indexOf(',') !== -1,
      prefix: text.slice(0, match.index),
      suffix: text.slice(match.index + raw.length)
    };
  }

  function format(n, parsed) {
    var s = n.toFixed(parsed.decimals);
    if (parsed.grouped) {
      var parts = s.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      s = parts.join('.');
    }
    return parsed.prefix + s + parsed.suffix;
  }

  function animate(el) {
    var text = el.textContent.trim();
    var parsed = parseValue(text);
    if (!parsed || reduceMotion) return;

    var duration = 1200;
    var start = null;

    function step(ts) {
      if (start === null) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); /* easeOutCubic */
      el.textContent = format(parsed.value * eased, parsed);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = text;
      }
    }
    el.textContent = format(0, parsed);
    requestAnimationFrame(step);
  }

  function init(container) {
    var numbers = container.querySelectorAll('.stats__number');
    if (!('IntersectionObserver' in window) || reduceMotion) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    numbers.forEach(function (n) { observer.observe(n); });
  }

  document.querySelectorAll('[data-stats]').forEach(init);
})();
