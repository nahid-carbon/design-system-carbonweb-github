# Reference Names

Every component and variant in this library has exactly one name. Use these names
to ask for a page to be built — nothing else needs describing.

Browse and copy them at **`reference.html`** (also in the library sidebar under
*Reference → Reference Names*).

## Format

```
<component>/<variant>
```

- A bare component name means its **default** form: `card` == `card/default`.
- Variant names are only unique *inside* their component, so always namespace
  them: `hero/dark`, never just `dark`. Eight components have a variant called
  `default` and many have `dark`.
- Some components carry an **alias** — an older or more obvious name that
  resolves to the same component. `footer` → `site-footer`, `nav` → `sidebar-nav`.


## The layer model

Everything in the library sits on one of four levels. A component may only be
built from things **below** it — never sideways or above.

| Level | What it is | Names |
|-------|-----------|-------|
| **foundation** | Raw design decisions as CSS custom properties. No markup. | `color` `type` `space` `grid` `radius` `shadow` |
| **atom** | Smallest usable element. Built only from foundations. | `button` `chip` `badge` `label` `text-link` `icon` `avatar` `tooltip` `product-tag` `partner-badge` … (16) |
| **molecule** | Composed from foundations plus atoms. | `card` `accordion` `pricing-card` `tabs` `testimonial` … (28) |
| **section** | Full-width page block, composed from anything below. | `hero` `faq-section` `cta-banner` `site-footer` `navbar` … (11) |

### Foundations

| Ref | File | Holds |
|-----|------|-------|
| `color` | `tokens/colors.css` | brand scales, LATAM, neutrals, system greys, monday product fills |
| `type` | `tokens/typography.css` | Raleway ramp, Montserrat numerics, sizes, weights, line heights |
| `space` | `tokens/spacing.css` | the 8px spacing scale |
| `grid` | `tokens/grid.css` | columns, gutters, page margins, container widths, section rhythm, breakpoints |
| `radius` | `tokens/radii.css` | corner radius scale |
| `shadow` | `tokens/shadows.css` | elevation scale |

Never hardcode a value a foundation already covers. If a component needs a
width, take it from a `--container-*` token; if it needs a gap, take it from
`--space-*`.

### Built from

Every component records what it is made of in `registry.json` → `depends_on`.
That list is **derived from the actual CSS and markup**, not written by hand:
foundations come from which `var(--…)` prefixes the CSS uses, atoms from which
atom classes the markup contains. It is shown as the *built from* line on every
card in `reference.html`, `docs.html` and the library shell, so the trail from a
section down to its tokens is always visible.

Re-derive it after changing a component — see the script in the CHANGELOG entry
for 2.7.0.

## Using them

> Build a services page with `hero/service`, `chip/tag-category`, `icon-tile`,
> `accordion/service`, `faq-section/dark`, `cta-banner/glow`, `site-footer/v2`.

That is enough to compose the page. Each name resolves through `registry.json`
to a folder, a CSS file, a markup snippet and a rules file.

## Where the names live

`registry.json` is the source of truth. Each component carries:

| Field | Meaning |
|-------|---------|
| `ref` | the canonical reference name |
| `aliases` | other accepted names for the same component |
| `summary` | one line describing what it is |
| `variants` | variant names, addressed as `ref/variant` |

The registry key (the folder slug) stays as-is — `ref` is a naming layer on top,
so no CSS class or file path changed when the names were introduced.

## Disambiguated names

These components had names that collided or misled. The folder and CSS classes
are unchanged; only the reference name differs.

| Folder | Reference name | Why |
|--------|----------------|-----|
| `header` | `navbar` | `nav` was a sidebar, `header` read like a page header |
| `nav` | `sidebar-nav` | it is a vertical sidebar, not the top nav |
| `footer` | `footer-basic` | the real site footer is `site-footer` |
| `site-footer` | `site-footer` (alias `footer-full`) | typing `footer` resolves here |
| `counter` | `stat-counter` | one animated number, vs the `stats` block |
| `divider` | `divider-line` | a hairline rule, vs the angled `section-divider` |
| `section` | `page-section` | generic shell, its variants duplicated real components |
| `icon-box` | `icon-tile` | vs `image-tile` |
| `image-box` | `image-tile` | vs `icon-tile` |
| `icons` | `icon` | singular reads better in a list |
| `app-icons` | `app-icon` | same |
| `glowing-cards` | `glow-card` | vs the `glow-effect` wash |
| `liquid-glass-cards` | `glass-card` | shorter, still unambiguous |
| `feature-checklist` | `checklist-panel` | vs the generic `feature-list` |
| `monday-partner-card` | `partner-card` | vs the `partner-badge` lockups |
| `process-card` | `process-step` | matches Figma's `Process Step` |
| `avatar-library` | `avatar-gallery` | vs the single `avatar` |
| `announcement-banner` | `announcement-bar` | vs `cta-banner` |

## Rules for adding a component

1. Pick a `ref` that is unique across **all** refs *and* aliases.
2. Prefer singular, two words max, and avoid a word already used by another
   component (`card`, `box`, `banner`, `list` are heavily loaded).
3. Add `ref`, `aliases`, `summary` and `variants` to `registry.json`.
4. `reference.html` and `docs.html` pick it up automatically — both read the
   registry at runtime.
