/* CarbonWeb Toggle Card — click toggle, single-open optional */

(function () {
  'use strict';

  function initToggleCards(container) {
    var root = container || document;
    var headers = root.querySelectorAll('.toggle-card__header');

    headers.forEach(function (header) {
      header.addEventListener('click', function () {
        var card = header.closest('.toggle-card');
        if (!card) return;

        var isOpen = card.classList.contains('toggle-card--open');
        var group = card.parentElement;

        // If the parent has data-single, close siblings first
        if (group && group.hasAttribute('data-single')) {
          var siblings = group.querySelectorAll('.toggle-card--open');
          siblings.forEach(function (sibling) {
            if (sibling !== card) {
              closeCard(sibling);
            }
          });
        }

        if (isOpen) {
          closeCard(card);
        } else {
          openCard(card);
        }
      });
    });
  }

  function openCard(card) {
    var body = card.querySelector('.toggle-card__body');
    if (!body) return;

    card.classList.add('toggle-card--open');
    body.style.maxHeight = body.scrollHeight + 'px';
  }

  function closeCard(card) {
    var body = card.querySelector('.toggle-card__body');
    if (!body) return;

    card.classList.remove('toggle-card--open');
    body.style.maxHeight = '0';
  }

  // Auto-init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { initToggleCards(); });
  } else {
    initToggleCards();
  }

  // Expose for manual init
  window.initToggleCards = initToggleCards;
})();
