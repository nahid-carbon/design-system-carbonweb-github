# Contributor Prompt Library

<!-- GENERATED from prompts.json by tools/gen-prompts.py — do not edit by hand. -->

Copy a prompt, fill in the ⟨angle brackets⟩, paste it to your AI assistant. Every prompt ends with the same acceptance bar: tools/audit.py must pass. Prompts assume the assistant can read the repo — start a session at the repo root so it picks up CLAUDE.md.

Browsable version with copy buttons: **`prompts.html`** (also in the library sidebar).

---

## Contents

**Building from Figma**  
- [Build a new component from a Figma link](#figma-new-component) — You have a Figma node for something the library doesn't have yet.
- [Crosscheck Figma nodes against the library](#figma-crosscheck) — You want to know whether a set of Figma nodes is already covered, before committing build time.
- [Export assets from Figma into a component](#figma-assets) — A component needs logos, icons or illustrations from Figma.

**Everyday component work**  
- [Add a variant to an existing component](#add-variant) — The component exists; you need one more form of it.
- [Build a page from reference names](#build-page) — Composing a page out of existing components.
- [Fix audit failures in a component](#fix-audit) — tools/audit.py is reporting errors.
- [Write or refresh a rules file](#rules-file) — A component's rules file is thin, stale, or full of TODOs.

**Library maintenance**  
- [Audit the whole library](#full-audit) — Periodic health check.
- [Add or change a foundation token](#new-token) — A value is needed repeatedly and no token covers it.
- [Rename or disambiguate a component](#rename) — A name is confusing or collides with another.
- [Reconcile overlapping components](#duplicates) — Two components do nearly the same job.

**Quality passes**  
- [Accessibility pass](#a11y) — Before shipping a component, or as a periodic sweep.
- [Responsive pass](#responsive) — A component only looks right at desktop width.
- [Port a section from the live site](#site-port) — Recreating something from carbonweb.co that isn't in Figma.

---

## Building from Figma

### Build a new component from a Figma link
<a id="figma-new-component"></a>

*You have a Figma node for something the library doesn't have yet.*

```text
Add a new component to this design system from Figma.

Figma node: ⟨paste the ?node-id= URL⟩

Do this in order:
1. Read the node with the Figma MCP tools (get_metadata for the variant set, then get_design_context for exact values). Tell me the Figma component name and every variant before you build.
2. Check reference.html / registry.json first — if we already have something that covers this, say so and stop rather than building a near-duplicate.
3. Scaffold it:  python3 tools/new-component.py ⟨slug⟩ --category ⟨basics|inputs|content|sections⟩ --level ⟨atom|molecule|section⟩ --summary "⟨one line⟩" --variants ⟨a,b,c⟩ --figma "⟨Figma page / Name⟩"
4. Build the CSS from tokens only — colours via var(--color-*), gaps via var(--space-*), corners via var(--radius-*), widths via var(--container-*). If Figma uses a value no token covers, either add the token or mark the line /* token-exception: reason */.
5. Reuse existing atoms rather than restyling them (button, chip, badge, text-link…). Link their CSS in the preview.
6. Export any logos or graphics with download_assets — SVG where possible, otherwise PNG at @2x — into components/⟨slug⟩/assets/. Strip the #F5F5F5 page-background rect that Figma adds to SVG exports.
7. Label each preview section with its source Figma node id.
8. Fill in the rules file TODOs — when to use, when not to, variant guidance, any token exception.
9. Run: python3 tools/derive-deps.py && python3 tools/regen-nav.py && python3 tools/audit.py
10. Verify in the browser at http://localhost:8765 and show me a screenshot.
11. Add a CHANGELOG entry.

If anything in the Figma node is ambiguous or looks like a source defect, tell me instead of guessing.
```

### Crosscheck Figma nodes against the library
<a id="figma-crosscheck"></a>

*You want to know whether a set of Figma nodes is already covered, before committing build time.*

```text
Crosscheck these Figma nodes against the design system. Do NOT build anything yet.

Nodes:
⟨paste one URL per line⟩

For each node:
1. Identify it with get_metadata — give me the real Figma component name, not a guess.
2. Map it to a component in registry.json, or say it's missing.
3. Verdict: covered / partial / missing. For partial, name exactly which variants or states are absent.

Then give me:
- a table of node → Figma name → repo counterpart → verdict
- a count (x of y covered)
- the root causes behind the gaps, grouped, so I can see what one fix would unlock
- your recommended build order

If there are more than ~25 nodes, tell me the realistic scope before starting and record findings to a file as you go so nothing is lost.
```

### Export assets from Figma into a component
<a id="figma-assets"></a>

*A component needs logos, icons or illustrations from Figma.*

```text
Export assets from Figma into ⟨component ref⟩.

Nodes: ⟨paste URLs⟩

1. Use download_assets with defaultFormat svg for flat artwork; use png with defaultScale 4 for anything with gradients, shadows or raster fills.
2. Save to components/⟨slug⟩/assets/ with descriptive kebab-case names — no export1.svg.
3. Figma SVG exports include a full-canvas page-background rect (often #F5F5F5). Strip it so the asset is transparent.
4. Wire them into the component markup and preview. Size by height, let width follow, so different aspect ratios don't distort.
5. Give every img a meaningful alt, or alt="" if the adjacent text already names it.
6. If the artwork is third-party (monday.com, a client logo), note in the rules file that it must not be recoloured or rebuilt in CSS.
7. Run the audit and show me the result.
```

## Everyday component work

### Add a variant to an existing component
<a id="add-variant"></a>

*The component exists; you need one more form of it.*

```text
Add a ⟨variant-name⟩ variant to ⟨component ref⟩.

What it should do: ⟨describe, or paste a Figma node URL⟩

1. Read the component's CSS and rules file first, and match the existing structure and naming.
2. Add the variant as .⟨slug⟩--⟨variant⟩ — tokens only, no raw values.
3. Add it to variants in registry.json AND to the rules frontmatter. The audit fails if they disagree.
4. Add a labelled demo to the preview file.
5. Document it in the rules variant table.
6. Bump modified to today and set "flag": "updated".
7. Run: python3 tools/derive-deps.py && python3 tools/regen-nav.py && python3 tools/audit.py
8. Show me a screenshot of the new variant.
```

### Build a page from reference names
<a id="build-page"></a>

*Composing a page out of existing components.*

```text
Build a ⟨page purpose⟩ page using this design system.

Use these components, in this order:
⟨e.g. hero/service, chip/tag-category, icon-tile, accordion/service, faq-section/dark, cta-banner/glow, site-footer/v2⟩

Rules:
- Resolve every name through registry.json — don't guess folder paths. reference.html lists them all.
- Link only the token stylesheets and the CSS of the components actually used.
- Copy the markup from each component's ⟨slug⟩.html snippet; don't reinvent the markup.
- Don't write new component CSS. If something's missing, tell me and we'll add it as a proper component rather than a one-off.
- Use the grid foundation for layout: .container, .grid, .section-pad — no hardcoded widths.
- Save it to ⟨path⟩ and show me a screenshot at desktop and mobile widths.
```

### Fix audit failures in a component
<a id="fix-audit"></a>

*tools/audit.py is reporting errors.*

```text
Fix the audit failures for ⟨component ref, or "all E8 failures"⟩.

1. Run python3 tools/audit.py and show me what's failing.
2. For each raw colour: replace it with the token that matches, or — if it is genuinely bespoke (a brand fill, a calibrated surface) — keep the value and add /* token-exception: reason */ on that line with a real reason.
3. Do NOT mass-replace colours that would visibly change the design. If a value is close to a token but not equal, ask me before swapping.
4. Re-run the audit and show me before/after screenshots of anything whose appearance could have shifted.
5. Report which failures you fixed, which you marked as exceptions, and which you left alone and why.
```

### Write or refresh a rules file
<a id="rules-file"></a>

*A component's rules file is thin, stale, or full of TODOs.*

```text
Write the rules file for ⟨component ref⟩.

Read the component's CSS, markup and preview first — document what it actually does, not what it should do.

Cover:
- frontmatter: component, variants (must match registry.json exactly), states, depends_on, version, last_updated
- When to use — and explicitly when to use something else instead
- Structure — the BEM tree
- Variant guidance table
- Specification notes — exact sizes/colours where they matter, plus any token exception and why
- Interaction — hover, active, focus-visible, reduced-motion
- Accessibility — roles, aria, keyboard
- Do / Don't
- Markup reference

Then run python3 tools/audit.py to confirm the frontmatter matches the registry.
```

## Library maintenance

### Audit the whole library
<a id="full-audit"></a>

*Periodic health check.*

```text
Audit this design system and report on its health.

1. Run python3 tools/audit.py and summarise: how many components are clean, error-free, and failing, grouped by error code.
2. Flag structural problems the audit can't see: near-duplicate components, components with no Figma mapping, variants that exist in CSS but aren't registered, previews that don't demo every variant.
3. Check the foundations are actually being used — find components hardcoding values that a token already covers.
4. Give me a prioritised fix list: what's cheap and high value first.

Don't fix anything yet. I'll pick from the list.
```

### Add or change a foundation token
<a id="new-token"></a>

*A value is needed repeatedly and no token covers it.*

```text
Add ⟨token name and value⟩ to the ⟨color|type|space|grid|radius|shadow⟩ foundation.

1. Check it isn't already covered under another name — show me the closest existing tokens first.
2. Add it to the matching tokens/*.css file, in the right group, with a comment saying what it's for.
3. Mirror it into tokens/tokens.json.
4. Find components currently hardcoding this value and switch them over.
5. If it's a new colour, state where it came from (Figma style name or node) in the comment.
6. Run python3 tools/audit.py — the switch-over should reduce E8 failures, not add any.
7. CHANGELOG entry.
```

### Rename or disambiguate a component
<a id="rename"></a>

*A name is confusing or collides with another.*

```text
The name ⟨current name⟩ is ⟨confusing / colliding with X⟩.

1. Check reference.html and registry.json for what's taken — the new name must be unique across all refs AND aliases.
2. Default to the safe path: change the canonical ref and keep the old name as an alias, leaving the folder and CSS classes alone. Tell me if you think a true rename is worth the breakage instead.
3. Update ref/aliases in registry.json and the disambiguation table in NAMING.md.
4. Run python3 tools/regen-nav.py && python3 tools/audit.py
5. CHANGELOG entry explaining why the old name was a problem.
```

### Reconcile overlapping components
<a id="duplicates"></a>

*Two components do nearly the same job.*

```text
⟨component A⟩ and ⟨component B⟩ overlap. Work out what to do.

1. Read both — CSS, markup, rules, and their Figma mappings.
2. Tell me concretely how they differ and whether the difference is real or historical.
3. Recommend one: merge B into A as variants / keep both with sharper names and rules / deprecate B.
4. Show me the plan and the blast radius (what references B today) before changing anything.

Don't start until I've picked an option.
```

## Quality passes

### Accessibility pass
<a id="a11y"></a>

*Before shipping a component, or as a periodic sweep.*

```text
Do an accessibility pass on ⟨component ref, or "all inputs components"⟩.

Check and fix:
- semantic elements (button vs div, nav, headings in order)
- keyboard: everything interactive reachable and operable, visible :focus-visible, no traps
- aria-expanded / aria-pressed / aria-controls kept in sync by the JS
- images: meaningful alt, or alt="" when decorative
- decorative layers marked aria-hidden and pointer-events: none
- colour contrast against the surface the component actually sits on — flag anything under 4.5:1 for body text
- prefers-reduced-motion guards on every animation

Report what you found and what you changed. Update the Accessibility section of the rules file. Run the audit.
```

### Responsive pass
<a id="responsive"></a>

*A component only looks right at desktop width.*

```text
Do a responsive pass on ⟨component ref⟩.

1. Screenshot it at 1440, 992, 768 and 375 and show me what breaks.
2. Fix using the grid foundation breakpoints (--bp-sm 480, --bp-md 768, --bp-lg 992, --bp-xl 1280 — copy the value into the media query; CSS vars don't work inside @media).
3. Multi-column layouts collapse, oversized type steps down, fixed widths become fluid, decorative layers can hide below 992.
4. Nothing may scroll horizontally at 375.
5. Re-screenshot all four widths to prove it, and note the behaviour in the rules file.
```

### Port a section from the live site
<a id="site-port"></a>

*Recreating something from carbonweb.co that isn't in Figma.*

```text
Recreate ⟨section name⟩ from ⟨https://www.carbonweb.co/...⟩ as a design system component.

1. Open the page and study the section — layout, type scale, colours, spacing, interaction.
2. Map every value onto existing tokens. List anything with no token and propose either the nearest token or a new one — don't silently hardcode.
3. Scaffold with tools/new-component.py, category sections, level section.
4. Reuse existing atoms; don't restyle buttons or chips inline.
5. Match the live behaviour including hover and scroll effects, all reduced-motion safe.
6. Note in the rules file that the live site is the source of truth for this one.
7. Audit, screenshot, CHANGELOG.
```
