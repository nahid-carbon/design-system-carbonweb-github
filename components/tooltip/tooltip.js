/**
 * CarbonWeb Tooltip / Hotspot
 *
 * Hotspot: click to toggle open/close, close on Escape, close on outside click.
 * Tooltip: show on mouseenter, hide on mouseleave with 100ms delay.
 *
 * Auto-initializes all .hotspot and .tooltip elements on DOMContentLoaded.
 */

(function () {
  'use strict';

  /* ── Hotspot ── */

  function initHotspot(hotspot) {
    var dot = hotspot.querySelector('.hotspot__dot');
    if (!dot) return;

    dot.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = hotspot.classList.contains('hotspot--open');

      // Close all other open hotspots
      closeAllHotspots();

      if (!isOpen) {
        hotspot.classList.add('hotspot--open');
        dot.setAttribute('aria-expanded', 'true');
      }
    });
  }

  function closeAllHotspots() {
    var openHotspots = document.querySelectorAll('.hotspot--open');
    openHotspots.forEach(function (h) {
      h.classList.remove('hotspot--open');
      var d = h.querySelector('.hotspot__dot');
      if (d) d.setAttribute('aria-expanded', 'false');
    });
  }

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.hotspot')) {
      closeAllHotspots();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeAllHotspots();
    }
  });

  /* ── Simple Tooltip ── */

  function initTooltip(tooltip) {
    var trigger = tooltip.querySelector('.tooltip__trigger');
    if (!trigger) return;

    var hideTimer = null;

    trigger.addEventListener('mouseenter', function () {
      if (hideTimer) {
        clearTimeout(hideTimer);
        hideTimer = null;
      }
      tooltip.classList.add('tooltip--visible');
    });

    trigger.addEventListener('mouseleave', function () {
      hideTimer = setTimeout(function () {
        tooltip.classList.remove('tooltip--visible');
      }, 100);
    });

    // Also support focus for keyboard users
    trigger.addEventListener('focus', function () {
      tooltip.classList.add('tooltip--visible');
    });

    trigger.addEventListener('blur', function () {
      tooltip.classList.remove('tooltip--visible');
    });
  }

  /* ── Init ── */

  function initAll() {
    document.querySelectorAll('.hotspot').forEach(initHotspot);
    document.querySelectorAll('.tooltip').forEach(initTooltip);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
