/* CarbonWeb Glowing Cards — overlay + radial-gradient mask approach */

(function() {
  document.querySelectorAll('.glow-cards').forEach(function(container) {
    var overlay = document.createElement('div');
    overlay.className = 'glow-cards__overlay';
    overlay.setAttribute('aria-hidden', 'true');

    var cs = getComputedStyle(container);
    overlay.style.padding = cs.padding;
    overlay.style.gap = cs.gap;

    var cards = container.querySelectorAll(':scope > .glow-card');
    cards.forEach(function(card) {
      var clone = card.cloneNode(true);
      clone.removeAttribute('id');
      overlay.appendChild(clone);
    });

    container.style.position = 'relative';
    container.appendChild(overlay);

    container.addEventListener('mousemove', function(e) {
      var rect = container.getBoundingClientRect();
      overlay.style.setProperty('--glow-x', (e.clientX - rect.left) + 'px');
      overlay.style.setProperty('--glow-y', (e.clientY - rect.top) + 'px');
    });
  });
})();
