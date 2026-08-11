# CarbonWeb Design System — Project Memory

Vanilla HTML/CSS/JS component library (NO React, no build tools). This file is the session memory: conventions, structure, and history. Follow it exactly.

## What this is

- Component library for CarbonWeb (carbonweb.co) + Carbon LATAM, mirroring the Figma design system file `tA0Y5j2fkTBqjG427Tltn8` ("Carbon Web Design System").
- **55 components** across 4 categories matching Figma's page structure: **1 · Basics → 2 · Inputs → 3 · Content → 4 · Sections**.
- Hosted-ready: root `index.html` is the library shell (GitHub Pages compatible). `docs.html` is the standalone all-component reference.

## Layer model (foundations → atoms → molecules → sections)

Four levels, recorded as `level` in `registry.json`. A component may only be built
from levels **below** it.

- **foundation** — `color` `type` `space` `grid` `radius` `shadow` (the `tokens/*.css` files).
  Never hardcode a value a foundation covers: widths come from `--container-*`,
  gaps from `--space-*`, corners from `--radius-*`.
- **atom** (16) — `button` `chip` `badge` `label` `text-link` `icon` `avatar` … built only from foundations.
- **molecule** (28) — composed from foundations + atoms (`card`, `accordion`, `tabs` …).
- **section** (11) — full-width page blocks (`hero`, `faq-section`, `site-footer` …).

`depends_on` in the registry is **derived from the real CSS/markup**, not hand-written,
and is surfaced as the "built from" line in `reference.html`, `docs.html` and the shell.
Re-derive it whenever a component changes.

## Reference names

Every component has a unique `ref` in `registry.json` plus optional `aliases`;
variants are addressed as `ref/variant` (`hero/service`, `chip/tag-category`).
A bare ref means the default form. When the user names components this way, resolve
through `registry.json` — do not guess folder paths. Full convention + the
disambiguation table: `NAMING.md`. Browsable index: `reference.html`.
New components MUST get a `ref`, `aliases`, `summary` and `variants` in the registry.

## Structure

```
start.html            ← Start Here: short visual overview for new contributors (landing page)
index.html            ← library shell: category sidebar (NEW/UPD chips, last-modified),
                        iframe preview + collapsible Component Reference panel below
                        (name / imports / code / variants / rules, all with copy buttons)
docs.html             ← same reference for ALL components on one page, search + copy buttons
reference.html        ← Reference Names index: every ref + ref/variant, searchable, click-to-copy
NAMING.md             ← naming convention + disambiguation table
registry.json         ← single source of truth: every component's paths, variants, category,
                        figma mapping, flag (new/updated), modified date, depends_on
CHANGELOG.md          ← versioned history of all changes
CONTRIBUTING.md       ← how to add/change a component (the tooled process)
README.md             ← front door: how to use the system
PROMPTS.md            ← contributor prompt library (generated from prompts.json)
prompts.html          ← same, browsable with copy buttons
tools/                ← new-component.py, derive-deps.py, regen-nav.py, gen-prompts.py,
                        audit.py, install-hooks.py
tokens/               ← colors.css, spacing.css, typography.css, grid.css, radii.css, shadows.css + tokens.json
components/<slug>/    ← <slug>.css, <slug>.html (usage snippet), <slug>-preview.html (demo),
                        <slug>-rules.md, optional <slug>.js, optional assets/ subfolder
```

## Hard conventions

- **Tokens only**: all colors via `var(--color-*)` from tokens/colors.css. Translucent tints via `color-mix(in srgb, var(--color-*) N%, transparent)` — never raw rgba/hex. Documented exceptions get a CSS comment.
- **Fonts**: Raleway (`var(--font-family)`) for everything; **Montserrat for all numbers/metrics** (prices, stats, day numbers).
- **BEM naming** matching existing style: `.card`, `.card--blog`, `.card__title`.
- **Interactions**: 200ms ease transitions; hover = teal-500 tint / 1–2px lift + shadow; `:active` = teal-700; `:focus-visible` = 2px teal outline; `prefers-reduced-motion` guards on all animation.
- Light mode only. White/light backgrounds.
- Reuse atoms: Button (`btn btn--primary btn--teal btn--lg`), Chip, Text Link — link their css in previews, record in registry `depends_on`.
- Cards used as `<a>` wrappers: `.card` base sets `text-decoration: none; color: inherit` — never re-add underlines.

## Adding/updating a component

**The process is tooled — use the scripts, don't do it by hand.** Full contributor
guide (for humans and for you): `CONTRIBUTING.md`.

```bash
python3 tools/new-component.py <slug> --category content --level molecule \
    --summary "One line." [--variants a,b] [--ref name] [--figma "3. Content / X"] [--js]
python3 tools/derive-deps.py     # rebuild depends_on from the real CSS/markup
python3 tools/regen-nav.py       # rebuild the index.html sidebar
python3 tools/audit.py           # MUST pass — exit 1 on any error
```

The scaffold emits an audit-clean component (css / html / preview / rules), registers
it, regenerates the nav and derives dependencies. Then: build it with tokens, fill in
the rules TODOs, label preview sections with their Figma node, verify in the browser
(`python3 -m http.server 8765`), add a CHANGELOG entry.

Never hand-edit `depends_on`, the `index.html` sidebar, or `PROMPTS.md` — all generated.
Raw colour values fail the audit unless marked `/* token-exception: reason */`.
The audit runs on pre-commit (`tools/install-hooks.py`) and in CI
(`.github/workflows/audit.yml`), which also fails if generated files are stale.
Pre-existing failures live in `.audit-baseline.json` and are reported as KNOWN
without blocking; new or worsening ones block. Refresh with
`python3 tools/audit.py --update-baseline` after clearing some debt.

Common contributor tasks have ready-made prompts in `prompts.json` → `PROMPTS.md`.
If the user's request matches one (build from a Figma link, crosscheck nodes, add a
variant, fix audit failures, a11y pass…), follow that prompt's steps.

## Key components & their quirks

- **site-footer**: faithful carbonweb.co footer. Variants: base, `--v2` (animated: gradient hairline, scroll-reveal — reveal selectors need `div.is-revealed` specificity), `--v3` (liquid glass surfaces, needs `#liquidGlassLens` SVG filter once per page), `--dark` (composes). CTA uses the DS Button with card-wide teal→green hover flip.
- **monday-partner-card**: WebGL fluid gradient shine (domain-warp shader remapped to teal/green, `iMouse`/`iRipples` uniforms). `--interactive` variant = faster + cursor warp + click ripples. CSS blob fallback, reduced-motion safe.
- **liquid-glass-cards**: Den Dionigi recipe — `color-mix()` 10-layer box-shadow specular stack + `backdrop-filter blur(8px) url(#liquidGlassLens)`; glow border = 1px inset box-shadow on JS-cloned overlay.
- **card / cta-banner / tabs** v1.1.0: full variant parity with ~70 Figma nodes (see rules files for node→variant mapping + skip rationale). Exported Figma graphics live in each `assets/` at @2x, displayed at half size.
- **avatar-library**: imported from claude.ai/design project `019dd5b4-6d10-738a-b80d-b09f27922901`. Hex atoms (`.photo-frame` teal-hex cutout via SVG mask; `.illus-frame` C-hex) + full app (search/filter/sort/detail dialog). 7 pairs synced; missing people render initials-on-gradient fallbacks; drop more PNGs into `avatars/`/`photos-cutout/` to light them up.
- **chip** v1.1.0: full parity with all 6 Figma Chip nodes. `--filter` (8 symbols, Light/Dark styles; dark = translucent teal gradient + white hairline), `chip-row--dark` surface, and the `--tag` family (`--category`, `--app`, `--product-{wm,dev,crm,service}`, `--tag-light`) with a 14px trailing `.chip__logo`. 10 logos in `assets/`.
- **product-tag**: Figma `Chip/Products` is a 32px 4px-radius logo tag, **not** a pill — lives in its own component, not as a chip variant. 5 monday product logos in `assets/`.
- **accordion** v1.1.0 / **faq-section**: FAQ card rebuilt to Figma (20px radius, chevron puck), `--dark` theme, and `--service` priced rows (teal-outlined open card + Montserrat price + CTA). `faq-section` wraps them with the header, black surface and angled `--wedge-*` corner cuts.
- **hero** v1.1.0: 8 new variants (service, partner, compact, search, brief, newsletter, apps, blog-cta) + composable `--grid` / `--grain` / `--glass` textures and four `--wedge-*` corner cuts. 4 new illustrations in `assets/`.
- **partner-badge** v2.0.0: the five official monday.com lockups as exported SVGs in `assets/` (Platinum borderless/bordered, Advanced Delivery, Solutions, Channel). Artwork is monday.com-issued — **never rebuild it in CSS or recolour it**; the component only sizes by height (`--sm/--md/--lg`) and handles interaction. The pre-2.0 card-with-dots markup was invented and has been removed.
- **booking-calendar**: Calendly-style; weekday availability is demo logic.
- **hero**: `assets/hero-monday-service@2x.png` exported from Figma node 918:51030.

## External references

- Figma file: `tA0Y5j2fkTBqjG427Tltn8` — pages renamed/sorted to `1. Basics / X`…`4. Sections / X`; component sets normalized to `Component/Variant`; variant props semantic (no more "Property 1"). Ignore pages: Cover, Design system tracker, Component template -- V2.
- Figma value-layer audit findings (not yet fixed): file has ZERO local styles/variables; ~49% raw hex fills; `#333333` used where DS ink is `#0A0A0A`; radii 4/5/6 inconsistent; stray fonts (Roboto/Figtree/Poppins). Remediation staged: create local variable collections + text styles (safe), then rebind fills + normalize radii (visual changes — needs user sign-off).
- Live site: https://www.carbonweb.co (source of truth for section recreations).
- Avatar source: claude.ai/design project `019dd5b4-6d10-738a-b80d-b09f27922901` ("Carbon Avatar Library.html").

## Known open items

- Figma: `Feature Tile/Monday Products` variant value typo `Tlies` (rename collides — manual fix); `Logo Wall/Cards Light Alt` possible duplicate.
- Figma: `Partner Badge/Solutions` (395:6827) and `/Channel` (395:6826) are 176px symbols whose medal graphic runs to 207px, so the circular mark is clipped on export. Widen both to ~208px (matching the 2026 badges) and re-export `components/partner-badge/assets/`.
- Figma token/text-style creation + rebinding (step 1–2 safe, 3–4 need approval).
- Avatar library: 131 of 145 people not yet synced locally.
- Hero illustrations for 5 product-page nodes (170:3394/3395/3396/3399/3400) still unexported — layout is covered, media slots are empty.
- Blog cards in `components/card/` still tag with generic `.chip--outline` / `.chip`; Figma's blog nodes use the category/product tag chips. Needs a theme check on the card blog nodes before swapping.
- Repo contains team photos + client logos — check before making the GitHub repo public.
