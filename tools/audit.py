#!/usr/bin/env python3
"""CarbonWeb Design System — conformance audit.

Checks every component against the contribution standard and prints a report.
Run from the repo root:   python3 tools/audit.py            (whole library)
                          python3 tools/audit.py --changed  (staged components only)
Exit code 1 if any ERROR-level check fails, so it can gate a commit or CI.

  E1  folder exists
  E2  required files present (css, html, preview, rules)
  E3  registry fields present (ref, summary, category, level, variants, version, modified)
  E4  ref / alias uniqueness across the whole library
  E5  preview linked in index.html sidebar
  E6  rules.md has frontmatter with component/variants/version
  E7  rules variants match registry variants
Baseline
  Failures recorded in .audit-baseline.json are pre-existing debt: they are
  reported as KNOWN and do not block. A new failure, or an existing one that
  gets worse, still fails. Refresh with:  python3 tools/audit.py --update-baseline

Checks
  E8  no raw hex / rgba() in CSS outside comments (tokens-only rule).
      A line may opt out with an inline  /* token-exception: reason */  marker.
  E9  CSS base class matches the folder slug (BEM)
  W1  depends_on empty
  W2  preview does not link the token stylesheets
  W3  <slug>.js on disk but not declared in registry
  W4  no figma mapping recorded
"""
import json, os, re, sys, glob, subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

# --changed : only audit components with staged changes. Used by the pre-commit
# hook so pre-existing debt elsewhere never blocks unrelated work — you just
# can't add new debt to whatever you touched.
ONLY_CHANGED = '--changed' in sys.argv
UPDATE_BASELINE = '--update-baseline' in sys.argv
BASELINE_FILE = '.audit-baseline.json'
baseline = {}
if os.path.isfile(BASELINE_FILE):
    baseline = json.load(open(BASELINE_FILE))
changed_slugs = set()
if ONLY_CHANGED:
    staged = subprocess.run(['git', 'diff', '--cached', '--name-only'],
                            capture_output=True, text=True).stdout.split()
    for f in staged:
        m = re.match(r'components/([^/]+)/', f)
        if m:
            changed_slugs.add(m.group(1))

TOKEN_FILES = ('colors', 'typography', 'spacing', 'grid', 'radii', 'shadows')
REQUIRED_FIELDS = ('ref', 'summary', 'category', 'level', 'variants', 'version', 'modified')
LEVELS = {'atom', 'molecule', 'section'}
CATEGORIES = {'basics', 'inputs', 'content', 'sections'}

reg = json.load(open('registry.json'))
comps = reg['components']
index_html = open('index.html').read()

errors, warnings = [], []
def err(slug, code, msg, metric=1):
    errors.append((slug, code, msg, metric))
def warn(slug, code, msg): warnings.append((slug, code, msg))

def is_known(slug, code, metric):
    """True if this failure already existed at baseline and has not grown."""
    b = baseline.get(slug, {})
    return code in b and metric <= b[code]

def strip_comments(css):
    return re.sub(r'/\*.*?\*/', '', css, flags=re.S)

# E4 — name uniqueness
seen = {}
for slug, v in comps.items():
    for name in [v.get('ref')] + (v.get('aliases') or []):
        if not name:
            continue
        if name in seen:
            err(slug, 'E4', f'name "{name}" already used by {seen[name]}')
        seen[name] = slug

for slug, v in sorted(comps.items()):
    if ONLY_CHANGED and slug not in changed_slugs:
        continue
    path = v.get('path', f'components/{slug}')

    # E1
    if not os.path.isdir(path):
        err(slug, 'E1', f'folder missing: {path}')
        continue

    # E2
    files = {
        'css':     f'{path}/{slug}.css',
        'html':    f'{path}/{slug}.html',
        'preview': f'{path}/{slug}-preview.html',
        'rules':   f'{path}/{slug}-rules.md',
    }
    # kind: "reference" components document a token layer / asset inventory and
    # legitimately ship without a stylesheet or markup snippet.
    required = ('preview', 'rules') if v.get('kind') == 'reference' else files.keys()
    for kind in required:
        if not os.path.isfile(files[kind]):
            err(slug, 'E2', f'missing {kind}: {files[kind]}')

    # E3
    for field in REQUIRED_FIELDS:
        if not v.get(field):
            err(slug, 'E3', f'registry field missing/empty: {field}')
    if v.get('level') and v['level'] not in LEVELS:
        err(slug, 'E3', f'bad level: {v["level"]}')
    if v.get('category') and v['category'] not in CATEGORIES:
        err(slug, 'E3', f'bad category: {v["category"]}')

    # E5
    if f'data-slug="{slug}"' not in index_html:
        err(slug, 'E5', 'not linked in index.html sidebar')

    # E6 / E7
    if os.path.isfile(files['rules']):
        rules = open(files['rules']).read()
        fm = re.match(r'^---\n(.*?)\n---', rules, re.S)
        if not fm:
            err(slug, 'E6', 'rules.md has no frontmatter block')
        else:
            block = fm.group(1)
            for key in ('component', 'variants', 'version'):
                if not re.search(rf'^{key}:', block, re.M):
                    err(slug, 'E6', f'rules frontmatter missing: {key}')
            m = re.search(r'^variants:\s*\[(.*?)\]', block, re.M | re.S)
            if m:
                rules_vars = {x.strip() for x in m.group(1).split(',') if x.strip()}
                reg_vars = set(v.get('variants') or [])
                only_rules = rules_vars - reg_vars
                only_reg = reg_vars - rules_vars
                if only_rules or only_reg:
                    bits = []
                    if only_reg:   bits.append('registry only: ' + ', '.join(sorted(only_reg)))
                    if only_rules: bits.append('rules only: '   + ', '.join(sorted(only_rules)))
                    err(slug, 'E7', 'variants disagree — ' + '; '.join(bits))

    # E8 / E9
    if os.path.isfile(files['css']):
        raw = open(files['css']).read()
        css = strip_comments(raw)
        # A line carrying an inline exception marker is allowed a raw value.
        # Format:  background: #3D3DA1; /* token-exception: monday brand fill */
        kept = [ln for ln in css.split('\n') if 'token-exception:' not in ln]
        # (the marker itself lives in a comment, which raw-strip removed, so
        #  re-read the original file line-by-line to honour it)
        kept = [ln for ln, orig_ln in zip(kept, raw.split('\n')[:len(kept)])]
        scan = '\n'.join(l for l in raw.split('\n') if 'token-exception:' not in l)
        scan = strip_comments(scan)
        hexes = re.findall(r'#[0-9a-fA-F]{3,8}\b', scan)
        rgbas = re.findall(r'\brgba?\(', scan)
        if hexes or rgbas:
            bits = []
            if hexes: bits.append(f'{len(hexes)} hex ({", ".join(sorted(set(hexes))[:4])})')
            if rgbas: bits.append(f'{len(rgbas)} rgb()/rgba()')
            err(slug, 'E8', 'raw colour values outside comments: ' + '; '.join(bits),
                len(hexes) + len(rgbas))
        prefix = v.get('css_prefix', slug)
        base = re.findall(r'^\.([a-z0-9-]+)', css, re.M)
        if base:
            roots = {b.split('--')[0].split('__')[0] for b in base}
            if not any(r == prefix or r.startswith(prefix) for r in roots):
                err(slug, 'E9', f'no .{prefix} base class (found: {", ".join(sorted(roots)[:4])})'
                                ' — set css_prefix in the registry if this is intentional')

    # W1
    if not v.get('depends_on'):
        warn(slug, 'W1', 'depends_on empty — run the derive step')

    # W2
    if os.path.isfile(files['preview']):
        prev = open(files['preview']).read()
        linked = [t for t in TOKEN_FILES if f'tokens/{t}.css' in prev]
        if not linked:
            warn(slug, 'W2', 'preview links no token stylesheets')

    # W3
    if os.path.isfile(f'{path}/{slug}.js') and not v.get('js'):
        warn(slug, 'W3', f'{slug}.js exists but is not declared in registry')

    # W4
    if not v.get('figma'):
        warn(slug, 'W4', 'no figma mapping recorded')

# ── report ───────────────────────────────────────────────────────────
def group(items):
    out = {}
    for slug, code, msg, *_ in items:
        out.setdefault(slug, []).append((code, msg))
    return out

if UPDATE_BASELINE:
    new_baseline = {}
    for slug, code, msg, metric in errors:
        new_baseline.setdefault(slug, {})[code] = max(metric, new_baseline.get(slug, {}).get(code, 0))
    json.dump(dict(sorted(new_baseline.items())), open(BASELINE_FILE, 'w'), indent=2)
    open(BASELINE_FILE, 'a').write('\n')
    print(f'baseline written — {sum(len(v) for v in new_baseline.values())} known issues '
          f'across {len(new_baseline)} components')
    print('These no longer block commits. New or worsening issues still do.')
    sys.exit(0)

known  = [e for e in errors if is_known(e[0], e[1], e[3])]
errors = [e for e in errors if not is_known(e[0], e[1], e[3])]

scope = f'{len(changed_slugs)} changed component(s)' if ONLY_CHANGED else f'{len(comps)} components'
if ONLY_CHANGED and not changed_slugs:
    print('audit: no component changes staged — nothing to check')
    sys.exit(0)
print(f'CarbonWeb DS audit — {scope}\n' + '=' * 62)
ge, gw = group(errors), group(warnings)

if known:
    print(f'\nKNOWN     {len(known)} pre-existing issue(s) ignored '
          f'(recorded in {BASELINE_FILE}; run --update-baseline after fixing)')

if errors:
    print(f'\nERRORS  {len(errors)} across {len(ge)} components')
    for slug in sorted(ge):
        print(f'\n  {slug}')
        for code, msg in ge[slug]:
            print(f'    [{code}] {msg}')
else:
    print('\nERRORS  none')

if warnings:
    print(f'\n\nWARNINGS  {len(warnings)} across {len(gw)} components')
    counts = {}
    for _, code, _ in warnings:
        counts[code] = counts.get(code, 0) + 1
    for code in sorted(counts):
        who = sorted(s for s, c, _ in warnings if c == code)
        print(f'  [{code}] x{counts[code]}: ' + ', '.join(who[:12]) + (' …' if len(who) > 12 else ''))

checked = changed_slugs if ONLY_CHANGED else set(comps)
clean = [s for s in checked if s not in ge and s not in gw]
print(f'\n\nFully clean: {len(clean)}/{len(checked)}')
print(f'Error-free:  {len(checked) - len(ge)}/{len(checked)}')
if errors and ONLY_CHANGED:
    print('\nCommit blocked. Fix the above, or bypass once with: git commit --no-verify')
sys.exit(1 if errors else 0)
