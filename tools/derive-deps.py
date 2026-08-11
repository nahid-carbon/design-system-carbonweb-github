#!/usr/bin/env python3
"""Derive depends_on for every component from its real CSS and markup.

Foundations come from which var(--…) prefixes the CSS uses; atoms from which
atom class names appear in the component's markup. Never hand-edit depends_on —
run this instead.
"""
import json, collections, re, os, glob
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__))); os.chdir(ROOT)

TOKENS=collections.OrderedDict([
 ('color',  re.compile(r'var\(--color-|var\(--gradient-')),
 ('type',   re.compile(r'var\(--font-|var\(--text-|var\(--leading-')),
 ('space',  re.compile(r'var\(--space-')),
 ('radius', re.compile(r'var\(--radius-')),
 ('shadow', re.compile(r'var\(--shadow-')),
 ('grid',   re.compile(r'var\(--grid-|var\(--container|var\(--section-py')),
])
ATOM_CLASS={r'\bbtn\b':'button', r'\bchip\b':'chip', r'\bbadge\b':'badge', r'\btext-link\b':'text-link',
 r'\blabel--':'label', r'\bavatar\b':'avatar', r'\bpartner-badge\b':'partner-badge',
 r'\bproduct-tag\b':'product-tag', r'\btooltip\b':'tooltip', r'\bapp-icon\b':'app-icons',
 r'\baccordion\b':'accordion', r'\bsearch-bar\b':'search-bar', r'\bbooking-calendar\b':'booking-calendar'}

reg=json.load(open('registry.json'), object_pairs_hook=collections.OrderedDict)
c=reg['components']
for slug,v in c.items():
    folder=v.get('path', 'components/'+slug)
    css=''.join(open(f).read() for f in glob.glob(folder+'/*.css'))
    markup=''.join(open(f).read() for f in glob.glob(folder+'/*.html'))
    deps=[n for n,pat in TOKENS.items() if pat.search(css)]
    for pat,ref in ATOM_CLASS.items():
        if ref!=slug and re.search(r'class="[^"]*'+pat, markup) and ref in c and ref not in deps:
            deps.append(ref)
    v['depends_on']=deps
json.dump(reg, open('registry.json','w'), indent=2); open('registry.json','a').write('\n')
print('depends_on derived for', len(c), 'components')
