---
component: tabs
variants: [underline, pill, vertical, contained, details, collapsible, collapsible-dark, pane, logos, products]
states: [default, active, hover, focus, expanded]
depends_on: [colors, typography]
version: 1.1.0
last_updated: 2026-08-04
---

# Tabs

Switchable content panels with a single visible panel at a time.

## Variants

| Variant | Class | Description |
|---------|-------|-------------|
| Underline | (default) | Bottom border indicator on active tab |
| Pill | `tabs--pill` | Rounded background highlight on active tab |
| Vertical | `tabs--vertical` | Side-stacked tabs with right border indicator |
| Contained | `tabs--contained` | Solid filled background on active tab, rounded top corners |
| Details | `tabs--details` | Vertical card tabs (title + description); active card fills teal-500. Right side shows a rich detail panel (icon header, checklist, price, CTA). Figma: "Tab Details" / "tab details section" |
| Collapsible | `tabs--collapsible` | Vertical accordion rows with icon, label, chevron; active row fills teal-500 and expands its description with a max-height transition. Panels typically hold a graphic. Figma: "Tab set" / "Vertical Light Section" |
| Collapsible Dark | `tabs--collapsible tabs--dark` | Same as collapsible, styled for dark section backgrounds (rows use translucent white fills). Figma: "Vertical Dark Section" |
| Pane | `tabs--pane` | Slim white collapsible rows with a dot-chip uppercase label; active row expands an inline checklist. Panels may be empty/hidden. Figma: "Vertical Collapsible Pane" |
| Logos | `tabs--logos` | Client-logo tabs: greyscale (`filter: grayscale(1)`) and faded by default, full color + gradient underline bar when active. Add `tabs--on-dark` inside dark sections. Figma: "Logos" / "Logos Section" |
| Products | `tabs--products` | Horizontal product-logo strip on a light bar; inactive logos greyscale/faded, active full color. Figma: "Products set" / "Products Cards section" |

## Anatomy

```
.tabs [data-tabs]
  .tabs__list [role="tablist"]
    .tabs__tab [role="tab"]
  .tabs__panels
    .tabs__panel [role="tabpanel"]
```

## States

| State | Behavior |
|-------|----------|
| Default | Muted text, no indicator |
| Hover | Text color shifts to ink |
| Active | Teal indicator (border or background depending on variant), semibold weight |
| Focus | 2px teal-400 outline via `:focus-visible` |

## Accessibility

- The tab list container must have `role="tablist"`.
- Each tab button must have `role="tab"`.
- Active tab: `aria-selected="true"`, inactive tabs: `aria-selected="false"`.
- Each tab must have `aria-controls` pointing to its panel's `id`.
- Each panel must have `role="tabpanel"` and `aria-labelledby` pointing to its tab's `id`.
- Vertical tab lists must include `aria-orientation="vertical"` on the tablist.
- Only the active tab is in the tab order (`tabindex="0"`); inactive tabs use `tabindex="-1"`.

### Keyboard navigation

| Key | Action |
|-----|--------|
| `ArrowRight` | Move to next tab (horizontal variants) |
| `ArrowLeft` | Move to previous tab (horizontal variants) |
| `ArrowDown` | Move to next tab (vertical variant) |
| `ArrowUp` | Move to previous tab (vertical variant) |
| `Home` | Move to first tab |
| `End` | Move to last tab |

Arrow keys wrap around (last to first, first to last).

## Usage

### HTML

```html
<div class="tabs" data-tabs>
  <div class="tabs__list" role="tablist" aria-label="Label">
    <button class="tabs__tab tabs__tab--active" role="tab"
      aria-selected="true" data-tab="t1" aria-controls="p1" id="t1">
      Tab One
    </button>
    <button class="tabs__tab" role="tab"
      aria-selected="false" data-tab="t2" aria-controls="p2" id="t2">
      Tab Two
    </button>
  </div>
  <div class="tabs__panels">
    <div class="tabs__panel tabs__panel--active" role="tabpanel"
      id="p1" aria-labelledby="t1">
      Content one.
    </div>
    <div class="tabs__panel" role="tabpanel"
      id="p2" aria-labelledby="t2">
      Content two.
    </div>
  </div>
</div>
```

### Applying variants

Add the modifier class to the `.tabs` container:

- `tabs--pill` for pill style
- `tabs--vertical` for vertical layout
- `tabs--contained` for contained style
- `tabs--details` for card tabs + rich detail panel
- `tabs--collapsible` for accordion rows (add `tabs--dark` on dark backgrounds)
- `tabs--pane` for slim collapsible rows with dot-chip labels
- `tabs--logos` for logo tabs (add `tabs--on-dark` on dark backgrounds)
- `tabs--products` for the product-logo strip

### Rich variant anatomy

```
.tabs--details
  .tabs__tab > .tabs__tab-title + .tabs__tab-desc
  .tabs__panel > .tabs__detail-header (.tabs__detail-icon + .tabs__detail-title)
               + .tabs__detail-body + .tabs__checklist
               + .tabs__detail-footer (.tabs__price-label/.tabs__price-value + .tabs__cta)

.tabs--collapsible / .tabs--pane
  .tabs__tab > .tabs__tab-row (.tabs__tab-icon|.tabs__pane-chip + .tabs__tab-title + .tabs__chevron)
             + .tabs__tab-desc   (expands via max-height when active)
  .tabs__panel > .tabs__media    (optional graphic slot)

.tabs--logos    .tabs__tab > .tabs__logo (img or svg; greyscaled until active)
.tabs--products .tabs__tab > .tabs__product-icon + .tabs__product-name
```

Collapsible variants: `tabs.js` toggles `aria-expanded` on tabs automatically. Include `aria-expanded` in the initial markup. Vertical-layout variants (`details`, `collapsible`, `pane`) use ArrowUp/ArrowDown navigation and need `aria-orientation="vertical"` on the tablist. `.tabs__price-value` renders in Montserrat per the numeric-display convention.

### JavaScript

Include `tabs.js` after the markup. It auto-initializes on `DOMContentLoaded` for all `[data-tabs]` elements. For dynamically added tabs, call:

```js
CarbonTabs.init();           // Re-init all
CarbonTabs.initTabs(element); // Init a single container
```

## Design tokens used

- `--color-muted` -- default tab text
- `--color-ink` -- hover tab text
- `--color-teal-500` -- active underline/text (underline, vertical)
- `--color-teal-100` -- active background (pill)
- `--color-teal-700` -- active text (pill)
- `--color-teal-400` -- focus outline
- `--color-teal-600` -- active details card hover
- `--color-teal-hover` -- CTA button hover
- `--color-latam-teal-100/300/500/800` -- hover fills, media frame, pane dot/badge, collapsible icons
- `--color-slate` -- descriptions, price label, pane chip text
- `--gradient-global` -- active logo-tab underline bar
- `--font-family` -- Raleway (Montserrat for `.tabs__price-value` numerals)
