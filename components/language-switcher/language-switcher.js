/* CarbonWeb Language Switcher — toggle open/close + selection */
(function () {
  'use strict';

  function init(root) {
    var trigger = root.querySelector('.language-switcher__trigger');
    var label = root.querySelector('.language-switcher__label');
    var flag = root.querySelector('.language-switcher__trigger .language-switcher__flag');
    var options = root.querySelectorAll('.language-switcher__option');

    function setOpen(open) {
      root.classList.toggle('language-switcher--open', open);
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      setOpen(!root.classList.contains('language-switcher--open'));
    });

    options.forEach(function (option) {
      option.addEventListener('click', function () {
        options.forEach(function (o) {
          o.classList.remove('language-switcher__option--selected');
          o.setAttribute('aria-selected', 'false');
        });
        option.classList.add('language-switcher__option--selected');
        option.setAttribute('aria-selected', 'true');

        var name = option.querySelector('.language-switcher__option-name');
        var optFlag = option.querySelector('.language-switcher__flag');
        if (label && name) label.textContent = name.textContent;
        if (flag && optFlag) flag.textContent = optFlag.textContent;

        setOpen(false);
        trigger.focus();
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!root.contains(e.target)) setOpen(false);
    });

    // Close on Escape
    root.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        setOpen(false);
        trigger.focus();
      }
    });
  }

  document.querySelectorAll('.language-switcher').forEach(init);
})();
