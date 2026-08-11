---
component: app-icons
variants: [sm, md, lg, grid]
states: [default, hover, active, focus-visible]
depends_on: [colors, typography]
version: 1.0.0
last_updated: 2026-08-04
---

## When to use

- **Integration walls:** Show the apps/tools CarbonWeb integrates with (monday.com marketplace apps, third-party services).
- **Feature callouts:** A single hexagonal icon anchoring a service or app description.

## Structure

- `.app-icon` — hexagonal container (CSS `clip-path` polygon), white bg. Because `clip-path` clips `box-shadow`, elevation uses `filter: drop-shadow(...)`.
- Child `img`/`svg` — the app logo, centered at 60% of the container size.
- `.app-icon-grid` — `auto-fill` grid with 16px gap for icon walls.

## Sizes

| Size | Dimensions |
|------|------------|
| `--sm` | 40px |
| default (md) | 64px |
| `--lg` | 96px |

## Interaction

- Hover: scale 1.08 + stronger drop-shadow, 200ms ease.
- Active: settles to 1.02 with a teal-tinted shadow. Focus: 2px teal-500 outline (add `tabindex="0"` if the icon is interactive).

## Do

- Keep logos on transparent backgrounds so the white hexagon reads cleanly.
- Use one size per grid for a uniform wall.
- Provide `alt` text on `img` logos (or `role="img"` + `aria-label` on inline SVG).

## Don't

- Don't put `box-shadow` on `.app-icon` — it gets clipped by `clip-path`; use `filter: drop-shadow`.
- Don't exceed 60% logo size; logos must not touch the hexagon edges.
- Don't hardcode container colors — placeholder logo fills are demo-only; real logos keep their own brand colors.

## Markup reference

```html
<div class="app-icon">
  <img src="/logos/services/workflow-icon-color.svg" alt="Workflow" />
</div>

<div class="app-icon app-icon--sm">…</div>
<div class="app-icon app-icon--lg">…</div>

<div class="app-icon-grid">
  <div class="app-icon">…</div>
  <div class="app-icon">…</div>
</div>
```
