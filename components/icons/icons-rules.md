---
component: icons
variants: [24x24, 16x16]
states: [default]
depends_on: []
version: 1.0.0
last_updated: 2026-07-21
---

## Inventory

### 24x24 (Button icons)

| Icon | Usage | Style |
|------|-------|-------|
| ArrowRight | Navigation, CTA trailing icon | Stroke |
| Send | Submit, send action | Fill |
| LoaderCircle | Square button loading spinner | Fill |
| Spinner | Pill button loading spinner (ray pattern) | Stroke |

### 16x16 (Footer / contact icons)

| Icon | Usage | Style |
|------|-------|-------|
| Phone | Phone contact | Stroke |
| Chat | Chat/message contact | Stroke |
| Whatsapp | WhatsApp contact | Fill |
| Mail | Email contact | Stroke |
| Linkedin | LinkedIn social | Stroke |
| Instagram | Instagram social | Stroke |

## Do / Don't

- Do import from `src/components/ui/icons.tsx` (React) or copy SVG markup for vanilla HTML.
- Do NOT install icon libraries (lucide-react, heroicons, react-icons, etc.).
- Don't hardcode SVG paths inline in other components — add new icons to icons.tsx.
- Do use `currentColor` inheritance — icons take their parent's text color.

## Adding new icons

1. Add a new exported function component to `src/components/ui/icons.tsx`.
2. Use `SVGProps<SVGSVGElement>` for props.
3. Set `fill="none"` on the SVG, use `stroke="currentColor"` or `fill="currentColor"`.
4. Match existing size conventions: 24x24 for button icons, 16x16 for footer/small icons.
5. Update this rules.md with the new icon's name, usage, and style.

## Markup reference (vanilla HTML)

```html
<!-- ArrowRight 24x24 -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5 12H19M12 19L19 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

<!-- Phone 16x16 -->
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- ... see icons.tsx for full paths -->
</svg>
```
