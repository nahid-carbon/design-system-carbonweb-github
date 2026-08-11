---
name: carbonweb-design-system
description: Use whenever building, editing, or referencing any CarbonWeb.co webpage or UI element. Covers buttons, typography, cards, text fields, page sections, footer, logos, and icons.
---

# CarbonWeb Design System

Before writing any markup or styling for a CarbonWeb page:

1. Read `registry.json` to see what tokens and components exist.
2. For each UI element you need, read that component's `rules.md` (path in registry)
   in full before writing code — it defines which variant fits the context.
3. Reference the existing token files — import from `src/tokens/*.ts` and use
   Tailwind classes from `src/index.css` — do not re-write equivalent CSS inline
   and do not hardcode colors/spacing/radii values that exist as tokens.
4. Import and use existing components (`Button`, `Footer`, icons) directly.
   Do not duplicate their styles or markup.
5. If no existing component fits, say so explicitly rather than
   inventing a one-off pattern silently.
6. If you must add a genuinely new component, follow the same pattern:
   - Component file in `src/components/ui/`
   - Rules file as `ComponentName.rules.md` alongside it
   - Add an entry to `registry.json`
   - Add a line to `CHANGELOG.md`

## Token system

- Colors: `src/tokens/colors.ts` + Tailwind theme in `src/index.css`
- Typography: `src/tokens/typography.ts` (Raleway, all weights/sizes)
- Logos: `src/tokens/logos.ts` (asset paths for Global, LATAM, Services)
- Footer content: `src/tokens/footer.ts` (link columns, contacts, legal)

## Key rules

- Never hardcode hex colors — use Tailwind token classes (`text-teal-500`, `bg-green-700`).
- Font is always Raleway. Never substitute.
- Do not install icon libraries — all icons are inline SVG components in `icons.tsx`.
- Light-mode only. No dark mode variants.
- Two brands exist: Global (Teal + Green) and LATAM (Yellow, Gold, Pink, Teal, WineRed).
  Confirm which brand context applies before choosing colors.
