# Changelog

## 2026-07-21 — Full Infrastructure Build

### Tokens (CSS + JSON)
- Added `tokens/colors.css` — all color scales (Global + LATAM), neutrals, interaction states, gradients
- Added `tokens/spacing.css` — 8px-base spacing scale + semantic layout spacing
- Added `tokens/typography.css` — Raleway type classes (Display, Heading, Body, UI)
- Added `tokens/radii.css` — border radius scale (sm through full)
- Added `tokens/shadows.css` — box shadow elevation scale
- Added `tokens/tokens.json` — machine-readable version of all tokens

### Components (HTML/CSS/JS + rules.md)
- Added `components/button/` — button.html, button.css, rules.md (4 variants × 4 colors × 2 sizes)
- Added `components/typography/` — typography.css, rules.md
- Added `components/card/` — card.html, card.css, rules.md (template — needs design review)
- Added `components/text-field/` — text-field.html, text-field.css, text-field.js, rules.md (template — needs design review)
- Added `components/section/` — section.html, section.css, rules.md (hero, feature-grid, cta-band templates)
- Added `components/footer/` — footer.html, footer.css, rules.md
- Added `components/icons/` — rules.md (SVG inventory, usage guide)
- Added `components/nav/` — nav.html, nav.css, nav.js, rules.md (sidebar navigation)

### Infrastructure
- Added `registry.json` — master index of all tokens, components, and pages
- Added `SKILL.md` — agent entry point for design system usage
- Added `CHANGELOG.md`

## Pre-infrastructure (initial build)

- React tokens: src/tokens/colors.ts, typography.ts, logos.ts, footer.ts
- Tailwind theme tokens in src/index.css
- React components: Button.tsx, Footer.tsx, icons.tsx, RocketIllustration.tsx, Layout.tsx
- Pages: ColorsPage, TypographyPage, LogosPage, ButtonsPage, FooterPage

## 2.0.0 — Figma parity + Component Reference

- Restructured library into 4 categories mirroring the Figma design system: 1·Basics, 2·Inputs, 3·Content, 4·Sections. Sidebar nav regenerated from registry.
- Added 17 new components for full Figma parity: chip, partner-badge, text-link, label, app-icons (Basics); checkbox, search-bar, language-switcher, contact-form (Inputs); stats, pricing-card, team-member, feature-checklist, video-embed (Content); hero, cta-banner, section-divider (Sections). All token-driven, Raleway + Montserrat numerics, subtle 200ms hover/focus interactions, reduced-motion safe.
- New docs.html — Component Reference: per component reference name, import lines, code snippet, variants, and rules, each with a copy button. Search filter + category sidebar. Linked from main preview nav.
- registry.json: every component now carries `category` and (where applicable) `figma` mapping to its page in the Figma file. 51 components total.

## 2.1.0 — Tracking chips, inline reference, full Figma parity

- preview.html: NEW / UPD chips in the sidebar per component + "Last modified" date in the header (auto-derived from file mtimes, stored in registry).
- Component Reference moved inline: collapsible panel below every component preview with reference name, imports, code, variants, rules — each with copy buttons. (docs.html remains as the standalone all-in-one page.)
- Added booking-calendar (Calendly-style date & time picker) — last missing Figma component. Every Figma page now has a codebase counterpart.
- Exported hero illustration from Figma at 2x PNG (components/hero/assets/hero-monday-service@2x.png), wired into the hero --columns media slot at 1x display size.

## 2.2.0 — Figma variant parity: CTA Banner, Cards, Tabs

Cross-checked ~70 Figma nodes against the codebase; every node is now covered, skipped only where an existing variant already matched (rationale in each rules file).

- cta-banner v1.1.0 — 9 new variants (subscribe, glow, glow-avatar, quiz, quiz-highlight, vertical, products, blog-s/m/l) + 2 exported assets (envelope, avatar cluster @2x).
- card v1.1.0 — 14 new variants (icon, borderless, square/rectangle graphic, illustration, carousel + nav, blog family incl. tint/wide, note, service-price, price-horizontal, selector, directory) + card-grid wrappers + 5 exported assets @2x. Reuses chip, text-link, button atoms.
- tabs v1.1.0 — 6 new variants (details, collapsible, collapsible-dark, pane, logos, products) with aria-expanded handling and keyboard nav in tabs.js.
- All variant previews labeled with their source Figma node; registry variants/flags/dates updated.

## 2.3.0 — Avatar Library

- New avatar-library component (1 · Basics), imported from the "Carbon Avatar Library" claude.ai/design project.
- Two hex avatar atoms: .photo-frame (teal hex cutout photos, SVG-mask clipped) and .illus-frame (Carbon C-hex illustrated avatars, border/borderless) + initials-on-gradient fallback.
- Full library app: search (⌘K), filters (All/Photos/Illustrated/Pairs), sort, size slider, border toggle, detail dialog with Download PNG / Copy path / Copy img tag.
- 145-person manifest (60 photos + 85 illustrations); 7 complete pairs synced locally (NahidHasan, AmyMorales, CarsonButcher, DarrenArbuckle, EdwinPecato, HeatherGray, JackKubicek) — unsynced people render initials fallbacks labeled "not synced".

## 2.3.1 — GitHub Pages ready

- Renamed root preview.html → index.html so the library can be hosted directly on GitHub Pages (repo root or /docs). All nav links are relative; no other changes required.

## 2.4.0 — Chip Figma parity + Product Tag

Cross-checked six Figma Chip nodes against the codebase. Only Chip/Filter was partly covered (light theme only); the rest were missing. All six are now built.

### Tokens
- `tokens/colors.css` + `tokens.json`: added `--color-white`, the System Grey scale (`--color-grey-100/200/300/700/900`, mapping 1:1 to Figma's Carbon/Brand/Colors/System/Gray steps; 300 and 700 duplicate the existing `--color-grey-base` / `--color-grey-dark` values), `--color-border-light` (#D0D5DD), `--color-surface-dark` (#102D30), and the monday product brand fills `--color-monday-wm` / `-dev` / `-service` (CRM's #007682 is identical to teal-800 and reuses that token).

### chip v1.1.0
- `.chip--filter` — Chip/Filter (689:21718), all 8 symbols: Style Light/Dark × Selected × Default/Hover. 16/6 padding, 22px radius, 20px label. Dark style is a two-stop translucent teal gradient with a white hairline; selected is solid teal in both styles.
- `.chip-row--dark` — Chip/Filter Row (690:4): Surface Dark fill, 24px padding, 16px radius, 10px gap.
- `.chip--tag` family — Blog Category (735:4410), Blog Product (735:4385) and App (735:4429) chips: 13px label, 4/10 padding, pill radius. Theme=Dark is the brand fill + white label; `.chip--tag-light` is the shared Gray 200 surface + ink label.
- `.chip--category`, `.chip--app` (Teal 800) and `.chip--product-wm/-dev/-crm/-service` (monday brand fills).
- `.chip__logo` — 14px trailing brand logo slot (`order: 1`), alongside the existing 16px leading `.chip__icon`.
- Removed the last raw `rgba()` / `#ffffff` literals from chip.css; the selected glow is now `color-mix()`.
- 10 logos exported from Figma to `components/chip/assets/` (6 apps, 4 monday products).
- Registry: variants list rewritten to match the CSS, `figma_nodes` map added, rules frontmatter synced.

### product-tag v1.0.0 (new, 1 · Basics)
- Chip/Products (848:61721) is not a pill — it's a 32px, 4px-radius tag with a 24px brand logo — so it ships as its own component rather than a chip variant.
- State=Light (170:40805) and State=Hover (848:61719, Gray 900 fill), plus a `--static` non-interactive form and `.product-tag-row` wrapper.
- 5 logos exported to `components/product-tag/assets/` (monday, Work Management, CRM, Dev, Service).

### Known gap
- Blog cards in `components/card/` still tag with generic `.chip--outline` / `.chip` where Figma's blog nodes use category/product tag chips. Not swapped here — the card blog nodes need their own theme check first.

## 2.5.0 — Accordion + Hero Figma parity

Crosschecked 25 more Figma nodes across the Accordion and Hero sets. Two were covered, seven partly, sixteen not at all. All are now built.

### accordion v1.1.0
- `.accordion--faq` rebuilt to Figma spec (Accordion/FAQ `842:13274`): 20px-radius card, 32px padding, chevron in a 40px puck, Heading 5 (SB) 20/1.3 question, Body Large 20/1.7 answer.
- `.accordion--dark` — the Theme=Dark half of the FAQ set (white-10% card, white label). Composes with any accordion variant.
- `.accordion--service` — Accordion/Item `882:9057` inside Container `918:47005`: flat white collapsed rows with hairlines, and an open row that becomes a teal-outlined tinted card carrying a Montserrat price, a scope note and a CTA. Adds `.accordion__heading` / `__title` / `__subtitle` / `__desc` / `__cta` / `__price` / `__price-note` / `__eyebrow`.
- `.accordion__icon--chevron` — chevron icon that rotates 180° on open, alongside the existing rotating plus.
- Remaining raw `rgba()` values replaced with `color-mix()`.

### faq-section v1.0.0 (new, 4 · Sections)
- Accordion/FAQ Section Light `99:20113` and Dark `99:20114`: centred header, 1111px card column, 20px gaps, 210px top padding.
- `--wedge-top` / `--wedge-bottom` / `--wedge-both` clip the section so the page behind shows through as a 90px diagonal corner — the section-divider notch at page scale.
- `--dark` uses System Black `#000000` (documented exception: the white-10% cards are calibrated against pure black) plus an optional two-wash blur ambience, hidden under reduced motion.

### hero v1.1.0
- New composable modifiers: `--grid` (rule grid), `--grain` (SVG turbulence), `--glass` (light-streak gradient), and four `--wedge-*` corner cuts.
- New variants: `--service` (eyebrow chip, teal lead phrase, single CTA, illustration), `--partner` (partner lockups, two CTAs, meta line), `--compact`, `--search`, `--brief`, `--newsletter`, `--apps` (floating tiles), `--blog-cta` (category chip, byline, embedded CTA card, 810×490 graphic slot).
- New slots: `.hero__partners`, `.hero__meta`, `.hero__search`, `.hero__logo`, `.hero__date`, `.hero__tiles`/`__tile`, `.hero__byline*`, `.hero__cta-card*`, `.hero__graphic`, `.hero__accent--solid`.
- `--dark` already composed with `--columns`, so the dark service hero needed no new layout.
- Four hero illustrations exported from Figma at @2x: workflow-development (`918:48367`), consultation (`918:47631`), training (`918:47101`), custom-scoped (`918:49256`).
- Registry now records all 20 hero Figma nodes.

### Known gap
- Five product-page heroes (`170:3394`, `170:3395`, `170:3396`, `170:3399`, `170:3400`) have their layout covered but their illustrations are not yet exported. Drop @2x exports into `components/hero/assets/` and point the media slot at them.

## 2.5.1 — Partner Badge rebuilt from the official Figma lockups

The component previously approximated the monday.com badges with a hand-built card and three coloured dots — not a real monday.com mark. Replaced with the issued artwork.

- Exported five SVGs from Figma to `components/partner-badge/assets/`: Platinum borderless (`439:101`), Platinum bordered (`527:6235`), Advanced Delivery (`439:100`), Solutions (`395:6827`), Channel (`395:6826`). Each had its `#F5F5F5` page-background rect stripped so the badges are transparent.
- partner-badge v2.0.0 — the component now only controls size, alignment and interaction: `--sm` 40px / `--md` 56px / `--lg` 72px driven by `--partner-badge-height`, width follows each badge's own aspect ratio. Hover lift, active and focus-ring apply to `a`/`button` only. `.partner-badge-row` wraps pairs. All raw `rgba()`/hex removed.
- Removed the invented `--dark` and `--compact` card variants and the placeholder dot SVGs; the artwork is monday.com-issued and must not be rebuilt in CSS.
- Hero `--partner` now uses the real badges instead of chip stand-ins; `.hero__partners > img` is scoped to direct children so nested badges keep their own sizing.

### Known source defect
`Partner Badge/Solutions` and `Partner Badge/Channel` are 176px-wide symbols whose medal graphic extends to 207px, so the circular mark is clipped at the right edge in Figma — and therefore in these exports. Widening both symbols to ~208px (matching the 2026 badges) and re-exporting will fix it. Flagged in the rules file and the preview.

## 2.6.0 — Reference Names

Every component and variant now has one unique, memorable name, so a page can be specified by naming parts: *"build a services page with `hero/service`, `icon-tile`, `faq-section/dark`, `site-footer/v2`"*.

- **Format `ref/variant`.** A bare ref means the default form (`card` == `card/default`); variant names are namespaced because `default` appears in eight components and `dark` in many. 55 components, 295 addressable names.
- **`registry.json`** gains `ref`, `aliases` and `summary` per component, plus a top-level `naming` block. Folder slugs and CSS classes are unchanged — the names are a layer on top, so nothing broke.
- **17 ambiguous names disambiguated** via canonical ref + alias: `header`→`navbar`, `nav`→`sidebar-nav`, `footer`→`footer-basic` (with `footer` aliasing to the real `site-footer`), `counter`→`stat-counter`, `divider`→`divider-line`, `section`→`page-section`, `icon-box`→`icon-tile`, `image-box`→`image-tile`, `glowing-cards`→`glow-card`, `liquid-glass-cards`→`glass-card`, `feature-checklist`→`checklist-panel`, `monday-partner-card`→`partner-card`, `process-card`→`process-step`, `avatar-library`→`avatar-gallery`, `announcement-banner`→`announcement-bar`, `icons`→`icon`, `app-icons`→`app-icon`.
- **New `reference.html`** — searchable index of all 295 names grouped by category, click any name to copy, with a worked example at the top. Linked from the library sidebar under a new *Reference* section alongside the Component Reference.
- **New `NAMING.md`** — the convention, the disambiguation table and the rules for naming a new component.
- `docs.html` now shows the canonical ref (and any aliases) as the reference name instead of the folder slug.

## 2.7.0 — Foundations, layers and the built-from trail

Formalised the building blocks the whole library rests on, and made every component show what it is made of.

### New foundation: grid
- `tokens/grid.css` — the one building block that was missing. Columns (12), gutters, page margins (150px desktop, matching the 1440 Figma artboard), container widths (`--container` 1140, `--container-wide` 1288, `--container-narrow` 1024, `--container-header` 800, `--container-text` 640), section rhythm and breakpoints. Ships with `.container`, `.grid`, `.grid--2/3/4`, `.grid--split` and `.section-pad` helpers so sections stop hand-rolling widths.
- Added to the import list the library shell generates.

### Layer model
- Six foundations registered as first-class, addressable refs: `color`, `type`, `space`, `grid`, `radius`, `shadow` — each with its token file and a summary, in a new `foundations` block in `registry.json`.
- Every component tagged with `level`: **16 atoms**, **28 molecules**, **11 sections**. A component may only be built from levels below it.

### Built from — derived, not hand-written
- `depends_on` was missing on 46 of 55 components and inconsistent on the rest (some listed token names, some listed CSS file paths). It is now **derived by scanning each component's real CSS and markup**: foundations from which `var(--…)` prefixes the CSS actually uses, atoms from which atom classes the markup actually contains.
- 14 components are confirmed to reuse atoms — e.g. `card` → `color type space radius shadow` + `button chip text-link`.
- Only `icon` has no detected tokens; it is a rules-only SVG inventory with no stylesheet.

### Names beside every element, with a copy icon
- **reference.html** — foundations now lead the page, every card shows a level badge, a *built from* trail (foundations teal, atoms green) and copy-icon buttons on the component name and each `ref/variant`. New level filters and a copy toast. 301 names.
- **docs.html** — component name is a copy-icon button, plus level badge and *built from* row.
- **index.html** — a `ref` + copy-icon badge sits in the bar directly above the previewed component, and the reference panel gained *Built from*.

### Docs
- `NAMING.md` — new "layer model" section: the four levels, the foundation table, and how `depends_on` is derived.
- `CLAUDE.md` — layer model recorded as a hard convention, with the rule never to hardcode a value a foundation covers.

### Re-deriving depends_on
Scan `components/<slug>/*.css` for `var(--color-|--gradient-)` → `color`, `var(--font-|--text-|--leading-)` → `type`, `var(--space-)` → `space`, `var(--radius-)` → `radius`, `var(--shadow-)` → `shadow`, `var(--grid-|--container|--section-py)` → `grid`; scan `components/<slug>/*.html` for atom class names (`btn`, `chip`, `badge`, `text-link`, `avatar`, `partner-badge`, `product-tag`, `tooltip`, `app-icon`, `accordion`, `search-bar`, `booking-calendar`) excluding the component itself.

## 2.8.0 — Conformance audit + contributor tooling

Made the contribution process enforceable rather than remembered, so collaborators produce the same structure every time.

### Audit (`tools/audit.py`)
Checks all 55 components against the standard and exits 1 on any error, so it can gate a commit or CI. Nine error checks (folder, required files, registry fields, name uniqueness, sidebar link, rules frontmatter, variant agreement between rules and registry, tokens-only CSS, BEM base class) and four warnings.

**Baseline was 7/55 clean.** After this pass: **34 error-free, 24 fully clean.**

Fixes applied:
- `#fff`/`#ffffff` → `var(--color-white)` across 37 files.
- `rgba(0,0,0,a)` / `rgba(255,255,255,a)` → `color-mix()` across 25 files.
- Rules frontmatter variants synced from the registry in 12 components; frontmatter added to the 6 rules files that had none.
- `css_prefix` recorded for the 7 components whose base class intentionally differs (`button` → `.btn`, `avatar-library` → `.avlib`, …) so the audit stops flagging deliberate choices.
- `kind: "reference"` for `icons` and `typography`, which document a token layer and legitimately ship without a stylesheet or markup snippet.
- New `/* token-exception: reason */` inline marker lets a line opt out of the tokens-only rule with a stated reason.

Remaining: 21 components still carry raw colours predating the rule — bespoke greys and brand fills that need a design decision, not a mechanical swap. Listed by the audit.

### Tooling
| Tool | Does |
|------|------|
| `tools/new-component.py` | scaffolds a conformant component (css/html/preview/rules, pre-wired to tokens), registers it, regenerates nav, derives deps. **Output passes the audit before a line is written.** Refuses duplicate ref/alias names. |
| `tools/derive-deps.py` | rebuilds `depends_on` from the real CSS/markup |
| `tools/regen-nav.py` | rebuilds the `index.html` sidebar from the registry |
| `tools/audit.py` | the conformance check |

### Docs
- **`CONTRIBUTING.md`** (new) — the human-facing guide: quick start, the four-step add flow, the token substitution table, atom reuse, the layer rule, what every audit code means, naming, and a conventions cheat sheet.
- `CLAUDE.md` — the hand-written checklist replaced by the tooled process; now points at `CONTRIBUTING.md` and `tools/`.

## 2.9.0 — Enforcement + contributor prompt library

Closed the last soft spot (the audit was a command you had to remember) and gave contributors ready-made prompts for the tasks this system actually involves.

### Enforcement
- **Pre-commit hook** — `python3 tools/install-hooks.py` installs it. Runs `tools/audit.py --changed`, which audits only the components you staged. Pre-existing debt elsewhere never blocks unrelated work, but you cannot add new debt to what you touched. Bypass once with `git commit --no-verify`.
- **New `--changed` mode** in the audit: reads staged paths, maps them to components, scopes the run, and prints how to bypass when it blocks.
- **CI** (`.github/workflows/audit.yml`) — runs the full audit (advisory while the 21 legacy raw-colour components remain; flip `continue-on-error` once it hits zero), a blocking `--changed` audit on PRs, and a staleness check that re-runs every generator and fails if the committed output differs.
- Verified: generators are idempotent (two consecutive runs produce byte-identical `registry.json`, `index.html`, `PROMPTS.md`), and the hook does block a commit that introduces a raw colour.

### Prompt library — 14 prompts, 4 groups
`prompts.json` is the source; `tools/gen-prompts.py` generates `PROMPTS.md`; `prompts.html` renders it with search, expandable cards, copy buttons and highlighted `⟨placeholders⟩`. Linked from the library sidebar.

- **Building from Figma** — build a component from a Figma link · crosscheck nodes against the library · export assets
- **Everyday work** — add a variant · build a page from reference names · fix audit failures · write a rules file
- **Maintenance** — audit the library · add a foundation token · rename/disambiguate · reconcile overlapping components
- **Quality** — accessibility pass · responsive pass · port a section from the live site

Each encodes the real workflow: read Figma properly before building, check for an existing component first, scaffold with the tool, tokens only, reuse atoms, run the pipeline, verify in the browser, and say something rather than guess when the source is ambiguous.

### Docs
- **`README.md`** rewritten as the front door: start-here commands, the four surfaces, the layer model, how to use reference names, contributing in one command, the five rules that matter, the tool table and a repo map. (It previously contained a single URL.)
- `CONTRIBUTING.md` and `CLAUDE.md` cross-linked to the prompts and the enforcement setup.

## 2.9.1 — The four pages work without a server

`reference.html`, `docs.html`, `prompts.html` and the `index.html` shell all read their data with `fetch()`. Over http that is fine, but opened straight from the filesystem Chrome blocks `fetch()` of a local file as a cross-origin request, so every one of them rendered empty with no explanation.

- **`tools/gen-data.py`** generates `data.js`, which embeds `registry.json` and `prompts.json` as `window.__CW_REGISTRY__` / `window.__CW_PROMPTS__`.
- All four pages now try `fetch()` first (so http always gets fresh data) and fall back to the embedded copy — they work opened directly from Finder.
- If both fail, the page shows a red panel explaining how to fix it instead of silently rendering nothing.
- CI regenerates `data.js` in the staleness check, so it cannot drift from the JSON.

Verified over http and inside the shell iframe: reference 61 cards, docs 55, prompts 14, no error panel.

## 2.10.0 — Start Here page

A 4-minute visual overview for anyone meeting the system for the first time. It is now the landing page of the library shell and the first item in the sidebar, under a new **Start** section.

`start.html` covers, in order:
1. **What it is** — one paragraph, plus a live stat row (components, foundations, names, prompts) read from the registry so it can never go stale.
2. **How it's organised** — the foundation → atom → molecule → section ladder as a stacked diagram with real examples at each level, and the one rule that holds it together.
3. **How to read a component** — an annotated `card` showing what the name, the *built from* trail and the variant chips each mean.
4. **Using it** — find it / name it / ask for it, with a worked page request.
5. **Adding a component** — the four steps and the scaffold command.
6. **The five rules** — the whole contract on one screen.
7. **Where to go next** — links to the other three surfaces and the contributing guide.

Everything is built from the design system's own tokens. Inside the shell, the "next" links route through the sidebar so the active state stays in sync; standalone they behave as ordinary links.

## 2.9.2 — Audit baseline (the hook was blocking work it shouldn't)

The pre-commit hook was scoped to changed *components*, but not to *new* failures — so editing any file that already carried pre-tokens-era raw colours blocked the commit for problems the contributor did not cause. Staging `avatar` and `avatar-library` was enough to be stopped.

- **`.audit-baseline.json`** records the 21 known failures with a metric (for E8, how many raw values). Generated by `python3 tools/audit.py --update-baseline`.
- A failure that is in the baseline and has not grown is reported as **KNOWN** and does not block. A new failure, or a known one that gets worse, still fails.
- Fixing debt is therefore always allowed; adding it never is. Refresh the baseline after clearing some.
- The full audit still reports everything, so the backlog stays visible rather than being silently forgiven.

Verified: the blocked commit now passes (exit 0, 2 known issues ignored); adding one `#ff0000` to `avatar.css` blocks again (exit 1); removing it unblocks.

## 3.0.0 — Tokens-only, for real: zero audit errors

The 21 components carrying raw colours from before the tokens-only rule are now clean. `.audit-baseline.json` is empty: **55 of 55 components error-free, 39 fully clean**, with nothing suppressed.

### What was done
- **120 values swapped with zero visual change** — every `rgba()`/`rgb()` and hex that already matched a token exactly. 105 of the 107 `rgba()` calls in the library turned out to be brand colours written longhand (`rgba(0,176,194,…)` = teal-500, 33 times).
- **Missing tokens added rather than exceptions granted.** The leftovers were greys and status colours the system never named, so they became tokens at their observed values:
  - System Neutrals — `--color-black`, `--color-neutral-50/100/200/300/400/600/700/800`, `--color-surface-night`
  - Semantic status — `--color-success`, `--color-success-dark`, `--color-success-tint`, `--color-danger`, `--color-danger-dark`, `--color-danger-tint`
- **50 more values adopted those tokens**, most at their exact original value.
- **One documented exception**: `glowing-cards` keeps `#111113`, a bespoke near-black that has to sit between `--color-ink` and `--color-neutral-800` so the card separates from the page behind it.

### Two deliberate colour changes (flagged, not hidden)
Every other consolidation is imperceptible (≤7/255, or higher deltas only at ≤18% alpha). These two shift a visible solid colour, on purpose — the library had two different colours meaning the same thing:
- `avatar` online dot `#22C55E` → `--color-success` `#13CE66`
- `site-footer` error border `#FF4949` → `--color-danger` `#EF4444`

Revert either by giving it its own token if the exact shade matters.

### Baseline
Kept as a mechanism but now empty. Any new error is one you just introduced.
