#!/usr/bin/env python3
"""Generate PROMPTS.md from prompts.json. Edit the JSON, never the markdown."""
import json, os
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__))); os.chdir(ROOT)

d=json.load(open('prompts.json'))
out=["# Contributor Prompt Library",
     "",
     "<!-- GENERATED from prompts.json by tools/gen-prompts.py — do not edit by hand. -->",
     "", d['intro'], "",
     "Browsable version with copy buttons: **`prompts.html`** (also in the library sidebar).",
     "", "---", ""]

# table of contents
out.append("## Contents\n")
for g in d['groups']:
    out.append(f"**{g['name']}**  ")
    for p in g['prompts']:
        out.append(f"- [{p['title']}](#{p['id']}) — {p['when']}")
    out.append("")
out.append("---\n")

for g in d['groups']:
    out.append(f"## {g['name']}\n")
    for p in g['prompts']:
        out.append(f"### {p['title']}")
        out.append(f'<a id="{p["id"]}"></a>\n')
        out.append(f"*{p['when']}*\n")
        out.append("```text")
        out.append(p['body'])
        out.append("```\n")

open('PROMPTS.md','w').write('\n'.join(out).rstrip()+'\n')
n=sum(len(g['prompts']) for g in d['groups'])
print(f'PROMPTS.md generated — {n} prompts in {len(d["groups"])} groups')
