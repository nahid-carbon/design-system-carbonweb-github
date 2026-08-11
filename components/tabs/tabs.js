/**
 * CarbonWeb Design System — Tabs Component
 * Handles click and keyboard interaction for all tab variants.
 * Supports: underline, pill, vertical, contained, details,
 * collapsible (light/dark), pane, logos, products.
 * Collapsible variants (collapsible, pane) also get aria-expanded toggling.
 */

(function () {
  'use strict';

  /**
   * Initialize a single tabs instance.
   * @param {HTMLElement} container - Element with [data-tabs]
   */
  function initTabs(container) {
    var tablist = container.querySelector('[role="tablist"]');
    if (!tablist) return;

    var tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
    var panels = Array.from(container.querySelectorAll('[role="tabpanel"]'));
    var isVertical =
      container.classList.contains('tabs--vertical') ||
      container.classList.contains('tabs--details') ||
      container.classList.contains('tabs--collapsible') ||
      container.classList.contains('tabs--pane');
    var isCollapsible =
      container.classList.contains('tabs--collapsible') ||
      container.classList.contains('tabs--pane');

    /**
     * Activate a tab by index.
     * @param {number} index
     * @param {boolean} focus - Whether to move focus to the tab
     */
    function activateTab(index, focus) {
      // Deactivate all
      tabs.forEach(function (tab) {
        tab.classList.remove('tabs__tab--active');
        tab.setAttribute('aria-selected', 'false');
        tab.setAttribute('tabindex', '-1');
        if (isCollapsible) tab.setAttribute('aria-expanded', 'false');
      });
      panels.forEach(function (panel) {
        panel.classList.remove('tabs__panel--active');
      });

      // Activate selected
      var activeTab = tabs[index];
      activeTab.classList.add('tabs__tab--active');
      activeTab.setAttribute('aria-selected', 'true');
      activeTab.setAttribute('tabindex', '0');
      if (isCollapsible) activeTab.setAttribute('aria-expanded', 'true');

      var panelId = activeTab.getAttribute('aria-controls');
      var activePanel = container.querySelector('#' + panelId);
      if (activePanel) {
        activePanel.classList.add('tabs__panel--active');
      }

      if (focus) {
        activeTab.focus();
      }
    }

    // Set initial tabindex values
    tabs.forEach(function (tab, i) {
      var isActive = tab.classList.contains('tabs__tab--active');
      tab.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    // Click handler
    tablist.addEventListener('click', function (e) {
      var target = e.target.closest('[role="tab"]');
      if (!target) return;
      var index = tabs.indexOf(target);
      if (index !== -1) {
        activateTab(index, false);
      }
    });

    // Keyboard handler (arrow navigation)
    tablist.addEventListener('keydown', function (e) {
      var currentIndex = tabs.indexOf(document.activeElement);
      if (currentIndex === -1) return;

      var nextKey = isVertical ? 'ArrowDown' : 'ArrowRight';
      var prevKey = isVertical ? 'ArrowUp' : 'ArrowLeft';
      var newIndex;

      switch (e.key) {
        case nextKey:
          e.preventDefault();
          newIndex = (currentIndex + 1) % tabs.length;
          activateTab(newIndex, true);
          break;

        case prevKey:
          e.preventDefault();
          newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
          activateTab(newIndex, true);
          break;

        case 'Home':
          e.preventDefault();
          activateTab(0, true);
          break;

        case 'End':
          e.preventDefault();
          activateTab(tabs.length - 1, true);
          break;
      }
    });
  }

  /**
   * Initialize all tab groups on the page.
   */
  function initAll() {
    var containers = document.querySelectorAll('[data-tabs]');
    containers.forEach(initTabs);
  }

  // Auto-init on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  // Expose for manual init
  window.CarbonTabs = { init: initAll, initTabs: initTabs };
})();
