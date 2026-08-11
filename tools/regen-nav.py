#!/usr/bin/env python3
"""Regenerate the index.html sidebar from registry.json. Idempotent."""
import json, re, os
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__))); os.chdir(ROOT)

reg=json.load(open('registry.json'))['components']
src=open('index.html').read()
labels={v:k for k,v in dict(re.findall(r'data-label="([^"]+)"[^>]*data-slug="([^"]+)"', src)).items()}

CATS=[('basics','1 · Basics'),('inputs','2 · Inputs'),('content','3 · Content'),('sections','4 · Sections')]
FLAG={'new':('new','NEW'),'updated':('upd','UPD')}

out=[]
for key,label in CATS:
    out.append('    <div class="nav-section">')
    out.append(f'      <div class="nav-section__label">{label}</div>')
    items=[(s,v) for s,v in reg.items() if v.get('category')==key]
    items.sort(key=lambda kv: labels.get(kv[0], kv[0].replace('-',' ').title()).lower())
    for slug,v in items:
        lab=labels.get(slug, slug.replace('-',' ').title())
        chip=''
        if v.get('flag') in FLAG:
            cls,txt=FLAG[v['flag']]
            chip=f'<span class="nav-link__flag nav-link__flag--{cls}">{txt}</span>'
        out.append(f'      <button class="nav-link" data-src="components/{slug}/{slug}-preview.html" '
                   f'data-label="{lab}" data-slug="{slug}" data-modified="{v.get("modified","")}">')
        out.append(f'        <span class="nav-link__dot nav-link__dot--component"></span> {lab}{chip}')
        out.append('      </button>')
    out.append('    </div>'); out.append('')

lines=src.split('\n')
start=next(i for i,l in enumerate(lines) if l.strip()=='<div class="nav-section__label">1 · Basics</div>')-1
end=next(i for i,l in enumerate(lines) if l.strip()=='<div class="nav-section__label">Templates</div>')-1
open('index.html','w').write('\n'.join(lines[:start]+out+lines[end:]))
print(f'sidebar regenerated — {sum(1 for l in out if "data-slug" in l)} components')
