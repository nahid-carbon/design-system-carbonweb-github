---
component: language-switcher
variants: [closed, open]
states: [default, hover, open, selected, focus-visible]
depends_on: [tokens/colors.css, tokens/spacing.css, tokens/radii.css, tokens/typography.css]
version: 1.0.0
last_updated: 2026-08-04
status: stable
---

## When to use

Footer (or header) language selection between site locales. Currently English 🇺🇸 and Español 🇪🇸 with emoji flags.

## Structure

- `.language-switcher` — relative wrapper; `--open` modifier toggles the menu.
- `.language-switcher__trigger` — pill button: flag emoji + language name + chevron. Chevron rotates 180° on open (200ms).
- `.language-switcher__menu` — floating listbox above the trigger (footer placement): radius-lg, shadow-lg, fades/slides in 200ms.
- `.language-switcher__option` — flag + name + `.language-switcher__radio` (teal circle check, visible only on `--selected`). Selected row gets a teal-50-ish tint.

## Behavior (language-switcher.js)

- Click trigger → toggles `--open` and `aria-expanded`.
- Click option → moves `--selected` + `aria-selected`, copies flag + name into the trigger, closes menu, refocuses trigger.
- Outside click and Escape close the menu.
- Script auto-initializes every `.language-switcher` on the page.

## Do / Don't

- Do keep `aria-haspopup="listbox"` on the trigger and `role="listbox"`/`role="option"` on the menu.
- Do use emoji flags with `aria-hidden="true"` — the language name carries meaning.
- Don't hardcode colors — use token variables.
- Don't open the menu with CSS hover; it is click-driven.

## Markup reference

See `language-switcher.html`. Load `language-switcher.js` after the markup.
