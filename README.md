# CarbonWeb Design System

The component library behind [carbonweb.co](https://www.carbonweb.co) and Carbon LATAM.
Vanilla HTML/CSS/JS — no framework, no build step, no npm.

**Live:** https://nahid-carbon.github.io/design-system-carbonweb-github/

---

## Start here

```bash
git clone <repo> && cd carbonweb-design-system-github
python3 tools/install-hooks.py     # once — makes commits run the audit
python3 -m http.server 8765        # open http://localhost:8765
```

| Page | Use it for |
|------|-----------|
| **`start.html`** | **start here** — 4-minute visual overview of the whole system |
| **`index.html`** | the library — sidebar, live preview, per-component reference |
| **`reference.html`** | every name in the system, searchable, click to copy |
| **`prompts.html`** | ready-made prompts for common tasks |
| **`docs.html`** | all components on one page |

---

## How it fits together

```
foundation  →  atom  →  molecule  →  section
```

**Foundations** are the raw design decisions as CSS custom properties — `color`,
`type`, `space`, `grid`, `radius`, `shadow`. Everything else is built from them,
and a component may only use levels *below* its own. Each component's *built
from* trail is shown in the UI and derived from its real CSS, so it can't drift.

`registry.json` is the single source of truth: paths, variants, category, level,
reference name, dependencies, Figma mapping. Every page reads it at runtime.

---

## Using components

Each component has one **reference name**. Variants are `name/variant`:

```
hero/service   chip/tag-category   accordion/faq-dark   site-footer/v2
```

A bare name means the default form. That's all you need to ask for a page:

> Build a services page with `hero/service`, `chip/tag-category`, `icon-tile`,
> `accordion/service`, `faq-section/dark`, `cta-banner/glow`, `site-footer/v2`

Browse and copy names in `reference.html`. Full convention: [`NAMING.md`](NAMING.md).

To use one directly, copy the imports and markup from its panel in `index.html`,
or from `components/<slug>/<slug>.html`.

---

## Contributing

Adding a component is one command:

```bash
python3 tools/new-component.py metric-tile \
  --category content --level molecule \
  --summary "Compact tile showing a single metric." --variants teal,dark
```

It scaffolds all four required files pre-wired to the tokens, registers it, and
regenerates the sidebar — **the output passes the audit before you write a
line**. Then build it, fill in the rules file, and run:

```bash
python3 tools/derive-deps.py && python3 tools/audit.py
```

Full guide: [`CONTRIBUTING.md`](CONTRIBUTING.md). Prompts you can hand to an AI
assistant for this and 13 other tasks: [`PROMPTS.md`](PROMPTS.md) or `prompts.html`.

### The rules that matter

- **Tokens only.** No raw hex, no `rgba()`. A genuine exception needs an inline
  `/* token-exception: reason */` marker.
- **Reuse atoms.** Compose `button`, `chip`, `text-link` — don't restyle them.
- **Unique names.** Every ref and alias must be unique across the whole library.
- **Rules and registry agree.** Variants are listed in both; the audit compares them.
- **The audit passes** for what you touched. The pre-commit hook runs
  `python3 tools/audit.py --changed`; pre-existing issues listed in
  `.audit-baseline.json` are known debt and don't block. New ones do.

---

## Tools

| Tool | Does |
|------|------|
| `tools/new-component.py` | scaffolds and registers a conformant component |
| `tools/derive-deps.py` | rebuilds `depends_on` from the real CSS and markup |
| `tools/regen-nav.py` | rebuilds the `index.html` sidebar from the registry |
| `tools/gen-prompts.py` | rebuilds `PROMPTS.md` from `prompts.json` |
| `tools/gen-data.py` | rebuilds `data.js` so the pages work offline (`file://`) |
| `tools/audit.py` | conformance check; exit 1 on any error |
| `tools/install-hooks.py` | installs the pre-commit hook |

`depends_on`, the sidebar, `PROMPTS.md` and `data.js` are **generated** — never hand-edit them.
CI re-runs the generators and fails if the committed output is stale.

---

## Repo map

```
start.html  index.html  reference.html  prompts.html  docs.html   ← the surfaces
registry.json          single source of truth
tokens/                the six foundations + tokens.json
components/<slug>/     <slug>.css / .html / -preview.html / -rules.md [/ .js / assets/]
tools/                 scaffold, generators, audit, hooks
README.md              this file
CONTRIBUTING.md        how to add or change a component
NAMING.md              reference names + the layer model
PROMPTS.md             prompt library (generated from prompts.json)
CHANGELOG.md           versioned history
CLAUDE.md              project memory for AI assistants
```

---

## Current state

55 components · 6 foundations · 301 reference names.

`python3 tools/audit.py` is the source of truth for health.
**55 of 55 error-free, 39 fully clean — zero errors, with an empty baseline.**

The remaining 16 warnings are advisory: `icons` has no stylesheet to derive
dependencies from, and 15 components have no Figma mapping recorded yet.
