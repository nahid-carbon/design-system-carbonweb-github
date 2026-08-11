#!/usr/bin/env python3
"""CarbonWeb Design System — scaffold a new component.

    python3 tools/new-component.py <slug> --category content --level molecule \
        --summary "One line describing it." [--variants a,b,c] [--ref name] \
        [--aliases x,y] [--figma "3. Content / Thing"] [--js]

Creates the folder with all four required files pre-wired to the tokens,
registers it, and regenerates the index.html sidebar. Then run:

    python3 tools/derive-deps.py     # fill in depends_on from the real CSS
    python3 tools/audit.py           # must pass before you commit
"""
import argparse, json, collections, os, re, sys, datetime, subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

CATEGORIES = ['basics', 'inputs', 'content', 'sections']
LEVELS = ['atom', 'molecule', 'section']

ap = argparse.ArgumentParser()
ap.add_argument('slug', help='folder name, kebab-case, e.g. metric-tile')
ap.add_argument('--category', required=True, choices=CATEGORIES)
ap.add_argument('--level', required=True, choices=LEVELS)
ap.add_argument('--summary', required=True, help='one line, shown in the reference index')
ap.add_argument('--variants', default='', help='comma separated, without "default"')
ap.add_argument('--ref', default=None, help='reference name (defaults to slug)')
ap.add_argument('--aliases', default='')
ap.add_argument('--figma', default='')
ap.add_argument('--js', action='store_true', help='also create <slug>.js')
a = ap.parse_args()

slug = a.slug.strip().lower()
if not re.fullmatch(r'[a-z][a-z0-9-]*', slug):
    sys.exit(f'! slug must be kebab-case: {slug}')

ref = (a.ref or slug).strip()
aliases = [x.strip() for x in a.aliases.split(',') if x.strip()]
variants = [x.strip() for x in a.variants.split(',') if x.strip()]
today = datetime.date.today().isoformat()
path = f'components/{slug}'

reg = json.load(open('registry.json'), object_pairs_hook=collections.OrderedDict)
comps = reg['components']

if slug in comps or os.path.exists(path):
    sys.exit(f'! {slug} already exists')

taken = {}
for s, v in comps.items():
    for n in [v.get('ref')] + (v.get('aliases') or []):
        if n: taken[n] = s
for n in [ref] + aliases:
    if n in taken:
        sys.exit(f'! name "{n}" is already used by {taken[n]} — pick another (see reference.html)')

os.makedirs(path)
Title = slug.replace('-', ' ').title()

# ── <slug>.css ───────────────────────────────────────────────────────
open(f'{path}/{slug}.css', 'w').write(f"""/* CarbonWeb {Title} — {a.summary}

   Tokens only: every colour via var(--color-*), every gap via var(--space-*),
   corners via var(--radius-*), widths via var(--container-*). A raw value needs
   an inline  /* token-exception: reason *{'/'}  marker or the audit will fail. */

.{slug} {{
  display: block;
  font-family: var(--font-family);
  color: var(--color-ink);
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  transition: background-color 200ms ease, border-color 200ms ease,
    box-shadow 200ms ease, transform 200ms ease;
}}

.{slug}__title {{
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  line-height: var(--leading-tight);
}}

.{slug}__body {{
  margin-top: var(--space-2);
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--color-slate);
}}

/* Interactive elements only */
.{slug}:focus-visible {{
  outline: 2px solid var(--color-teal-500);
  outline-offset: 2px;
}}
""" + ''.join(f"""
/* ── Variant: --{v} ── */

.{slug}--{v} {{
  /* TODO */
}}
""" for v in variants) + f"""
@media (prefers-reduced-motion: reduce) {{
  .{slug} {{ transition: none; }}
}}
""")

# ── <slug>.html ──────────────────────────────────────────────────────
open(f'{path}/{slug}.html', 'w').write(
    f'<!-- CarbonWeb {Title} — Markup Examples -->\n\n'
    f'<!-- Default -->\n<div class="{slug}">\n'
    f'  <p class="{slug}__title">Title</p>\n'
    f'  <p class="{slug}__body">Supporting copy.</p>\n</div>\n'
    + ''.join(f'\n<!-- {v} -->\n<div class="{slug} {slug}--{v}">\n'
              f'  <p class="{slug}__title">Title</p>\n'
              f'  <p class="{slug}__body">Supporting copy.</p>\n</div>\n' for v in variants)
    + (f'\n<script src="{slug}.js"></script>\n' if a.js else ''))

# ── <slug>-preview.html ──────────────────────────────────────────────
def demo(cls, label):
    return (f'<div class="section">\n  <h3>{label}</h3>\n'
            f'  <div class="{cls}">\n    <p class="{slug}__title">Title</p>\n'
            f'    <p class="{slug}__body">Supporting copy goes here.</p>\n  </div>\n</div>\n')

open(f'{path}/{slug}-preview.html', 'w').write(f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{Title} — CarbonWeb DS</title>
  <link rel="stylesheet" href="../../tokens/colors.css" />
  <link rel="stylesheet" href="../../tokens/typography.css" />
  <link rel="stylesheet" href="../../tokens/spacing.css" />
  <link rel="stylesheet" href="../../tokens/radii.css" />
  <link rel="stylesheet" href="../../tokens/shadows.css" />
  <link rel="stylesheet" href="../../tokens/grid.css" />
  <link rel="stylesheet" href="{slug}.css" />
  <style>
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{ font-family: var(--font-family); background: #fff; color: var(--color-ink);
           padding: 48px 60px; -webkit-font-smoothing: antialiased; }}
    h2 {{ font-size: var(--text-4xl); font-weight: var(--font-bold); margin-bottom: 6px; }}
    .desc {{ font-size: 15px; color: var(--color-muted); margin-bottom: 32px; max-width: var(--container-text); }}
    .section {{ margin-bottom: 36px; }}
    .section h3 {{ font-size: var(--text-lg); font-weight: var(--font-semibold); margin-bottom: 14px; }}
    .label {{ font-size: 13px; color: var(--color-muted); margin-bottom: 10px; }}
  </style>
</head>
<body>

<h2>{Title}</h2>
<p class="desc">{a.summary}</p>

{demo(slug, 'Default')}{''.join(demo(f'{slug} {slug}--{v}', v) for v in variants)}
{f'<script src="{slug}.js"></script>' if a.js else ''}
</body>
</html>
""")

# ── <slug>-rules.md ──────────────────────────────────────────────────
open(f'{path}/{slug}-rules.md', 'w').write(f"""---
component: {slug}
variants: [{', '.join(variants)}]
states: [default, hover, focus-visible]
depends_on: [colors, typography, spacing, radii]
version: 1.0.0
last_updated: {today}
---

## When to use

- **TODO:** the situation this is the right answer for.
- **TODO:** a second one.

Say what to use *instead* when it is the wrong fit.

## Structure

```
.{slug}
  .{slug}__title
  .{slug}__body
```

## Variant guidance

| Variant | Typical use |
|---------|-------------|
{chr(10).join(f'| `--{v}` | TODO |' for v in variants) if variants else '| default | TODO |'}

## Specification notes

- Sizes, spacing and colours all come from tokens — record any deviation here
  and mark it in the CSS with `/* token-exception: reason */`.

## Interaction

- 200ms ease transitions.
- `:focus-visible` = 2px teal-500 outline at 2px offset.
- Guarded by `prefers-reduced-motion`.

## Do

- TODO

## Don't

- Don't hardcode colours, spacing or widths — use the tokens.
- TODO

## Markup reference

```html
<div class="{slug}">
  <p class="{slug}__title">Title</p>
  <p class="{slug}__body">Supporting copy.</p>
</div>
```
""")

if a.js:
    open(f'{path}/{slug}.js', 'w').write(f"""/**
 * CarbonWeb {Title}
 * Auto-initialises every .{slug} on DOMContentLoaded.
 */
(function () {{
  'use strict';
  function init(el) {{ /* TODO */ }}
  function initAll() {{ document.querySelectorAll('.{slug}').forEach(init); }}
  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', initAll);
  else initAll();
}})();
""")

# ── register ─────────────────────────────────────────────────────────
entry = collections.OrderedDict([
    ('path', path),
    ('html', f'{path}/{slug}.html'),
    ('css', f'{path}/{slug}.css'),
    ('rules', f'{path}/{slug}-rules.md'),
    ('preview', f'{path}/{slug}-preview.html'),
    ('ref', ref), ('aliases', aliases), ('summary', a.summary),
    ('variants', variants or ['default']),
    ('level', a.level), ('category', a.category),
    ('version', '1.0.0'), ('modified', today), ('flag', 'new'),
    ('depends_on', []),
])
if a.figma: entry['figma'] = a.figma
if a.js: entry['js'] = f'{path}/{slug}.js'
comps[slug] = entry
json.dump(reg, open('registry.json', 'w'), indent=2)
open('registry.json', 'a').write('\n')

print(f'created {path}/  ({ref}, {a.level}, {a.category})')
for step in ('tools/regen-nav.py', 'tools/derive-deps.py'):
    if os.path.isfile(step):
        subprocess.run([sys.executable, step], check=False)
print('\nnext:\n  1. build the component in the CSS/HTML\n'
      '  2. python3 tools/derive-deps.py\n  3. python3 tools/audit.py')
