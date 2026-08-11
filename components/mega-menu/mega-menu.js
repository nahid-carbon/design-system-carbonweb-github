/* CarbonWeb Design System — Mega Menu behavior
   Hover intent with delays. Touch/click toggle. Escape to close. Outside click to close.
   Only one dropdown open at a time.
*/

(function () {
  'use strict';

  var OPEN_DELAY = 100;   // ms before opening on mouseenter
  var CLOSE_DELAY = 200;  // ms before closing on mouseleave (allows moving to dropdown)

  var items = document.querySelectorAll('[data-mega-item]');
  var openTimers = new Map();
  var closeTimers = new Map();

  function openItem(item) {
    // Close all others first
    items.forEach(function (other) {
      if (other !== item) closeItem(other);
    });
    item.classList.add('mega-menu__item--open');
    var trigger = item.querySelector('.mega-menu__trigger');
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
  }

  function closeItem(item) {
    item.classList.remove('mega-menu__item--open');
    var trigger = item.querySelector('.mega-menu__trigger');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
  }

  function closeAll() {
    items.forEach(function (item) {
      closeItem(item);
    });
  }

  function clearTimers(item) {
    if (openTimers.has(item)) {
      clearTimeout(openTimers.get(item));
      openTimers.delete(item);
    }
    if (closeTimers.has(item)) {
      clearTimeout(closeTimers.get(item));
      closeTimers.delete(item);
    }
  }

  // Detect touch device
  var isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  items.forEach(function (item) {
    var trigger = item.querySelector('.mega-menu__trigger');

    if (!isTouch) {
      // ── Hover intent (mouse) ──

      item.addEventListener('mouseenter', function () {
        clearTimers(item);
        openTimers.set(item, setTimeout(function () {
          openItem(item);
        }, OPEN_DELAY));
      });

      item.addEventListener('mouseleave', function () {
        clearTimers(item);
        closeTimers.set(item, setTimeout(function () {
          closeItem(item);
        }, CLOSE_DELAY));
      });
    }

    // ── Click / touch toggle ──
    if (trigger) {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        var isOpen = item.classList.contains('mega-menu__item--open');
        if (isOpen) {
          closeItem(item);
        } else {
          openItem(item);
        }
      });
    }
  });

  // ── Close on Escape ──
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeAll();
    }
  });

  // ── Close on outside click ──
  document.addEventListener('click', function (e) {
    var megaMenu = document.querySelector('.mega-menu');
    if (megaMenu && !megaMenu.contains(e.target)) {
      closeAll();
    }
  });
})();
