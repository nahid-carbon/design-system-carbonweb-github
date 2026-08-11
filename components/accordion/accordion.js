/**
 * CarbonWeb Accordion
 *
 * Toggle logic for .accordion components.
 * - Click trigger toggles --open class on parent item.
 * - Sets panel max-height to scrollHeight for smooth animation.
 * - Single-open mode: add data-single="true" on .accordion container.
 *
 * Auto-initializes all .accordion elements on DOMContentLoaded.
 */

(function () {
  'use strict';

  function initAccordion(accordion) {
    var singleOpen = accordion.getAttribute('data-single') === 'true';
    var triggers = accordion.querySelectorAll('.accordion__trigger');

    triggers.forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var item = trigger.closest('.accordion__item');
        var panel = item.querySelector('.accordion__panel');
        var isOpen = item.classList.contains('accordion__item--open');

        // In single-open mode, close all other items first
        if (singleOpen && !isOpen) {
          var openItems = accordion.querySelectorAll('.accordion__item--open');
          openItems.forEach(function (openItem) {
            closeItem(openItem);
          });
        }

        if (isOpen) {
          closeItem(item);
        } else {
          openItem(item, panel);
        }
      });
    });
  }

  function openItem(item, panel) {
    var trigger = item.querySelector('.accordion__trigger');
    item.classList.add('accordion__item--open');
    panel.style.maxHeight = panel.scrollHeight + 'px';
    trigger.setAttribute('aria-expanded', 'true');
  }

  function closeItem(item) {
    var panel = item.querySelector('.accordion__panel');
    var trigger = item.querySelector('.accordion__trigger');
    item.classList.remove('accordion__item--open');
    panel.style.maxHeight = '0';
    trigger.setAttribute('aria-expanded', 'false');
  }

  function initAll() {
    var accordions = document.querySelectorAll('.accordion');
    accordions.forEach(function (accordion) {
      initAccordion(accordion);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
