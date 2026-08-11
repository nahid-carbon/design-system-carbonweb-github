/* CarbonWeb Chip — toggle behavior
   Any .chip with [data-toggle] (or inside a .chip-row[data-toggle]) toggles .chip--selected on click. */

(function () {
  function toggleChip(chip) {
    var selected = chip.classList.toggle('chip--selected');
    chip.setAttribute('aria-pressed', selected ? 'true' : 'false');
  }

  document.addEventListener('click', function (e) {
    var chip = e.target.closest('.chip');
    if (!chip) return;
    if (chip.hasAttribute('data-toggle') || chip.closest('.chip-row[data-toggle]')) {
      toggleChip(chip);
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var chip = e.target.closest('.chip');
    if (!chip || chip.tagName === 'BUTTON') return;
    if (chip.hasAttribute('data-toggle') || chip.closest('.chip-row[data-toggle]')) {
      e.preventDefault();
      toggleChip(chip);
    }
  });
})();
