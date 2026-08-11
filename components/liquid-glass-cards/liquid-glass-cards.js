/* CarbonWeb Liquid Glass Cards
   Single-element glass + glow border overlay + mouse specular */

(function() {
  document.querySelectorAll('.liquid-glass-cards').forEach(function(container) {
    var cards = container.querySelectorAll(':scope > .liquid-glass-card');

    // Ensure content wrapper exists
    cards.forEach(function(card) {
      if (!card.querySelector('.liquid-glass-card__content')) {
        var content = document.createElement('div');
        content.className = 'liquid-glass-card__content';
        while (card.firstChild) {
          content.appendChild(card.firstChild);
        }
        card.appendChild(content);
      }
    });

    // Create glow border overlay
    var glow = document.createElement('div');
    glow.className = 'liquid-glass-cards__glow';
    glow.setAttribute('aria-hidden', 'true');

    var cs = getComputedStyle(container);
    glow.style.padding = cs.padding;
    glow.style.gap = cs.gap;

    cards.forEach(function(card) {
      var clone = card.cloneNode(true);
      clone.removeAttribute('id');
      glow.appendChild(clone);
    });

    container.style.position = 'relative';
    container.appendChild(glow);

    // Mouse tracking
    container.addEventListener('mousemove', function(e) {
      var rect = container.getBoundingClientRect();
      var cx = e.clientX - rect.left;
      var cy = e.clientY - rect.top;

      // Glow border position
      glow.style.setProperty('--glow-x', cx + 'px');
      glow.style.setProperty('--glow-y', cy + 'px');

      // Per-card specular highlight
      cards.forEach(function(card) {
        var cardRect = card.getBoundingClientRect();
        var x = e.clientX - cardRect.left;
        var y = e.clientY - cardRect.top;
        card.style.setProperty('--glass-x', x + 'px');
        card.style.setProperty('--glass-y', y + 'px');
      });
    });
  });
})();
