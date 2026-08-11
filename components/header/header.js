/* CarbonWeb Header — Scroll detection, mobile toggle, active link highlight */

(function () {
  'use strict';

  var header = document.getElementById('header');
  if (!header) return;

  var toggle = header.querySelector('.header__mobile-toggle');
  var SCROLL_THRESHOLD = 10;
  var lastScrollY = 0;
  var ticking = false;

  /* ── Scroll Detection ── */

  function onScroll() {
    var scrollY = window.scrollY || window.pageYOffset;

    /* Add/remove --scrolled modifier */
    if (scrollY > SCROLL_THRESHOLD) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }

    lastScrollY = scrollY;
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  /* ── Mobile Toggle ── */

  if (toggle) {
    toggle.addEventListener('click', function () {
      var isOpen = header.classList.toggle('header--mobile-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    /* Close mobile menu on Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && header.classList.contains('header--mobile-open')) {
        header.classList.remove('header--mobile-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* ── Active Link Highlight ── */

  function highlightActiveLink() {
    var path = window.location.pathname;
    var links = header.querySelectorAll('.header__nav-link[data-path]');

    for (var i = 0; i < links.length; i++) {
      var linkPath = links[i].getAttribute('data-path');
      if (path === linkPath || (linkPath !== '/' && path.indexOf(linkPath) === 0)) {
        links[i].classList.add('header__nav-link--active');
      } else {
        links[i].classList.remove('header__nav-link--active');
      }
    }
  }

  highlightActiveLink();

  /* Re-check on popstate (back/forward navigation) */
  window.addEventListener('popstate', highlightActiveLink);

  /* ── Close mobile menu on window resize past breakpoint ── */

  var mql = window.matchMedia('(min-width: 769px)');
  function onBreakpoint(e) {
    if (e.matches && header.classList.contains('header--mobile-open')) {
      header.classList.remove('header--mobile-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
  }

  if (mql.addEventListener) {
    mql.addEventListener('change', onBreakpoint);
  } else if (mql.addListener) {
    mql.addListener(onBreakpoint);
  }

  /* ── Initial scroll check (in case page loads scrolled) ── */
  onScroll();

})();
