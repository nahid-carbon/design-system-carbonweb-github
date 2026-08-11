# Contributing to the CarbonWeb Design System

Everything here is vanilla HTML/CSS/JS. No build step, no framework, no npm.
If you can edit a `.css` file you can contribute.

**The one rule that matters:** `python3 tools/audit.py` must pass for whatever
you touched. Everything below exists to make that easy.

The pre-commit hook runs `--changed`, so it only audits components you edited.
Anything already recorded in `.audit-baseline.json` is treated as **known debt**
and reported without blocking — so touching an old file doesn't punish you for
problems you didn't cause. Adding a new issue, or making a known one worse, still
fails.

After you fix some known debt, refresh the record:

```bash
python3 tools/audit.py --update-baseline
```

---

## Quick start

```bash
python3 tools/install-hooks.py     # once — commits will now run the audit
python3 -m http.server 8765        # then open http://localhost:8765
python3 tools/audit.py             # check the whole library
```

**Not sure how to phrase a task to an AI assistant?** `prompts.html` (or
[`PROMPTS.md`](PROMPTS.md)) has 14 ready-made prompts — building from a Figma
link, crosschecking nodes, adding a variant, fixing audit failures, accessibility
and responsive passes. Copy one, fill in the ⟨brackets⟩, paste.

| Page | What it is |
|------|-----------|
| `start.html` | **new here?** a 4-minute visual overview |
| `index.html` | the library shell — sidebar, live preview, per-component reference |
| `reference.html` | every reference name, searchable, click to copy |
| `docs.html` | all components on one page |

---

## Adding a component

### 1. Scaffold it

```bash
python3 tools/new-component.py metric-tile \
  --category content --level molecule \
  --summary "Compact tile showing a single metric with a label." \
  --variants teal,dark
```

That one command creates the folder with all four required files pre-wired to
the tokens, registers it, regenerates the sidebar, and derives its
dependencies. **The scaffold passes the audit before you write a line** — so
any failure later is something you introduced, which makes it easy to find.

Flags: `--ref` (if the reference name should differ from the folder),
`--aliases`, `--figma "3. Content / Thing"`, `--js` (adds a behaviour file).

The script refuses to run if the name is already taken — including aliases.

### 2. Build it

Open `components/<slug>/<slug>.css` and fill it in. Two hard rules:

**Use the foundations.** Never hardcode something a token covers:

| Need | Use | Not |
|------|-----|-----|
| a colour | `var(--color-teal-500)` | `#00B0C2` |
| a translucent tint | `color-mix(in srgb, var(--color-ink) 8%, transparent)` | `rgba(0,0,0,.08)` |
| a gap or padding | `var(--space-4)` | `16px` |
| a corner | `var(--radius-lg)` | `12px` |
| a width | `var(--container)` | `1140px` |
| a shadow | `var(--shadow-sm)` | a hand-rolled `box-shadow` |
| type | `var(--text-lg)`, `var(--font-semibold)` | `18px`, `600` |

If you genuinely need a raw value, declare it inline and the audit will accept it:

```css
background: #3D3DA1; /* token-exception: monday Work Management brand fill */
```

**Reuse atoms.** A molecule or section should compose existing atoms rather than
restyle them. Need a button inside your card? Use
`<a class="btn btn--primary btn--teal">`, link `button.css` in your preview, and
`derive-deps.py` will record the dependency automatically.

Only build from **below** your level — see the layer model in `NAMING.md`:

```
foundation  →  atom  →  molecule  →  section
```

### 3. Write the rules file

The scaffold leaves `TODO`s in `<slug>-rules.md`. Fill them in — this is the file
that stops the next person misusing your component. Cover *when to use*, *when
not to*, variant guidance, interaction, and any token exception you made.

### 4. Finish the pipeline

```bash
python3 tools/derive-deps.py    # re-read the CSS/markup, update depends_on
python3 tools/audit.py          # must pass
```

Then check it in the browser at `http://localhost:8765`, and add a `CHANGELOG.md`
entry.

---

## Changing an existing component

1. Edit the CSS/markup.
2. Update `variants` in `registry.json` **and** the rules frontmatter — the audit
   compares them and fails if they drift.
3. Set `"flag": "updated"` and bump `modified` to today.
4. `python3 tools/derive-deps.py && python3 tools/regen-nav.py && python3 tools/audit.py`

---

## The tools

| Tool | Does |
|------|------|
| `tools/new-component.py` | scaffolds a conformant component and registers it |
| `tools/derive-deps.py` | rebuilds `depends_on` from the real CSS/markup |
| `tools/regen-nav.py` | rebuilds the `index.html` sidebar from the registry |
| `tools/gen-prompts.py` | rebuilds `PROMPTS.md` from `prompts.json` |
| `tools/gen-data.py` | rebuilds `data.js`, the offline fallback for the HTML pages |
| `tools/audit.py` | checks all 55 components; exit 1 on any error |
| `tools/install-hooks.py` | installs the pre-commit hook |
| `tools/audit.py --update-baseline` | re-records known debt in `.audit-baseline.json` |

The audit also runs in CI (`.github/workflows/audit.yml`), which additionally
re-runs the generators and fails if the committed output is stale.

Never hand-edit `depends_on` or the sidebar — both are generated, and hand edits
get overwritten.

---

## What the audit checks

| Code | Check |
|------|-------|
| E1 | folder exists at the registered path |
| E2 | all four required files present (`kind: reference` components are exempt from css/html) |
| E3 | registry has ref, summary, category, level, variants, version, modified |
| E4 | reference name and aliases unique across the whole library |
| E5 | component is linked in the `index.html` sidebar |
| E6 | rules.md has frontmatter with component/variants/version |
| E7 | rules variants match registry variants |
| E8 | no raw hex or `rgba()` in CSS, unless marked `/* token-exception: … */` |
| E9 | CSS base class matches the slug, or a declared `css_prefix` |
| W1–W4 | empty `depends_on`, preview missing token links, undeclared `.js`, no Figma mapping |

Warnings won't block you. Errors will.

---

## Naming

Reference names are how people ask for components — *"build a page with
`hero/service`, `icon-tile`, `faq-section/dark`"*. The full convention, the
disambiguation table and the rules for coining a new name are in
[`NAMING.md`](NAMING.md). In short:

- format is `component/variant`; a bare name means the default form
- pick something unique across **all** refs *and* aliases (`reference.html` lists them)
- prefer singular, two words max, and avoid the loaded words — `card`, `box`,
  `banner`, `list` are already heavily used

---

## Conventions cheat sheet

- **BEM**: `.thing`, `.thing--variant`, `.thing__part`
- **Fonts**: Raleway everywhere; **Montserrat for all numbers** (prices, stats, dates)
- **Interaction**: 200ms ease; hover = teal tint or 1–2px lift; `:active` teal-700;
  `:focus-visible` = 2px teal-500 outline at 2px offset
- **Motion**: every animation guarded by `@media (prefers-reduced-motion: reduce)`
- **Light mode only** — white and light surfaces
- **Cards as links**: `.card` already sets `text-decoration: none; color: inherit`
  — don't re-add underlines
- **Assets**: component-owned files go in `components/<slug>/assets/`; export
  Figma graphics at `@2x` PNG or SVG and display at half size

---

## Current state

`python3 tools/audit.py` is the source of truth.
**55 of 55 error-free, 39 fully clean.** `.audit-baseline.json` is empty — there
is no known debt, so any error you see is one you just introduced.

16 warnings remain and are advisory: `icons` has no stylesheet, and 15
components have no Figma mapping recorded. Adding those mappings is a good
first contribution.
