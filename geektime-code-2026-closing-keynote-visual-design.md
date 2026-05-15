# GeekTime Code 2026 Closing Keynote — Visual Design Plan

This document defines the slide visualization and layout plan for `geektime-code-2026-closing-keynote-he.md`.

The direction is optimized for a technical keynote about reverse engineering a 180M-line legacy codebase, while staying generic enough to become reusable layout primitives in the presentation builder project. It is aligned with the Applied Materials brand reference in `applied-materials-color-showcase.html`.

---

## Evidence Base

### Presentation and technical storytelling research

ArguSeek research surfaced the following best practices:

- **One idea per slide** reduces cognitive load and improves retention.
- **Progressive disclosure** is especially important for technical systems: reveal complexity layer by layer instead of showing full diagrams at once.
- **High signal-to-noise** improves comprehension. Remove visual decoration that does not explain the point.
- **Visual hierarchy** should use size, contrast, position, and restrained color.
- **Technical architecture diagrams** should move from broad context to components, flows, and sequences, similar to C4-style thinking.
- **Labels should be spatially close to the elements they describe**; detached legends should be avoided when labels can be integrated.
- **Consistency across slides** lowers audience effort and lets the story, not the slide mechanics, carry attention.

### Presentation framework runtime/export research

The presentation builder should use a deliberate dual layout model:

- **Live runtime:** fully responsive for desktop, tablet, and phone; Safari/WebKit is the first-class compatibility target.
- **Speaker/print canonical frame:** a fixed 16:9 composition used for presenter view and deterministic PDF export.
- **PDF export:** Chrome/Chromium only, rendered through a dedicated print route with fixed 16:9 pages and no live controls.
- **Responsive slide primitives:** adapt layout structure at phone/tablet breakpoints instead of only scaling desktop slides down.
- **Animation strategy:** prefer CSS/WAAPI `transform` and `opacity`, feature-detect enhancements, and always support `prefers-reduced-motion`.
- **Touch support:** every keyboard/click action also needs large, visible tap targets and swipe alternatives where useful.

### Local project design guides

The local guides reinforce the same direction:

- `COLOR_GUIDE.md`: semantic tokens, restrained color use, high contrast, avoid color-only encoding.
- `SPATIAL_GUIDE.md`: 8px grid, Gestalt grouping, low radius for institutional/professional brands, flat hierarchy through spacing and borders.
- `ILLUSTRATION_GUIDE.md`: Mayer multimedia learning principles, especially spatial contiguity and coherence; every shape should serve communication.

### Applied Materials brand reference

From `applied-materials-color-showcase.html`:

- **Primary blue:** `#347DA2`
- **Dark blue:** `#0F4880`
- **Action yellow:** `#F9C642`
- **Neutral text gray:** `#53565A`
- **Typography:** Open Sans
- **Geometry:** square / near-square corners, flat cards, thin borders
- **Composition:** blue fields, yellow action/highlight, neutral surfaces, corporate clarity

---

## Global Deck Direction

Use a **corporate technical keynote** style:

- Dark blue hero slides for major story beats.
- White/neutral slides for explanation and architecture.
- Yellow only for insight, turning points, active paths, and calls to action.
- Square cards, thin borders, minimal/no shadows.
- Diagrams built from rectangles, arrows, indexed grids, system layers, and process loops.
- Avoid cartoonish AI or robot imagery. Prefer abstract technical forms: code blocks, graph nodes, wafer/fab geometry, vector fields, indexed shards.

### Narrative visual arc

The deck should visually progress through six stages:

1. **Scale** — the codebase is impossibly large.
2. **Failure** — human knowledge and naive RAG both break.
3. **Method** — deep research for code.
4. **Proof** — local/private architecture and real impact.
5. **Meaning** — agents amplify engineering fundamentals.
6. **Invitation** — join the private/open code intelligence future.

The core visual formula:

> Clean corporate layout + simple technical diagram + one emphasized insight in yellow.

### Rendering targets

The visual design is shared, but runtime behavior is not one-size-fits-all:

1. **Live responsive mode** — mobile-first web layout for audience links, tablets, phones, and desktop browsers. Safari/iOS must be treated as the baseline, not an afterthought.
2. **Speaker/canonical mode** — fixed 16:9 stage for rehearsed delivery and predictable presenter composition.
3. **PDF export mode** — Chrome-only deterministic print rendering from the canonical 16:9 state.

Do not make phone users read a shrunken 16:9 screenshot. Each primitive should reflow content into a readable mobile/tablet composition while preserving the same story beat.

---

## Brand Styling Rules

```css
--am-blue: #347DA2;
--am-dark-blue: #0F4880;
--am-yellow: #F9C642;
--am-gray: #53565A;
--am-neutral-bg: #f7f7f7;
--am-border: #d9d9d6;
--font-family: "Open Sans", Arial, sans-serif;
--radius: 0px; /* 2px max where needed */
```

### Color usage

- **Dark blue**: title slides, strategic slides, major section headers.
- **Corporate blue**: primary diagram structures.
- **Yellow**: turning points, active paths, CTAs, insight markers.
- **Neutral gray**: inactive diagram elements, secondary text.
- **Red/error**: only for explicit failure; never as a major brand color.

### Typography

Use Open Sans throughout.

Recommended canonical 16:9 scale:

- H1: 44–56px
- H2: 32–40px
- Body/callouts: 22–28px
- Captions: 14–18px

Responsive live layouts should use `clamp()` and container-aware sizing so typography remains readable on phones and tablets without horizontal scrolling.

Slides should avoid paragraph text. Speaker notes carry detail; slides carry visual memory.

### Geometry

- Square or near-square cards.
- Thin borders.
- Flat surfaces.
- No heavy shadows.
- Yellow skew/slash accents are allowed because they match the Applied Materials corporate visual language.

---

## Reusable Presentation Builder Layout Primitives

These components serve this specific keynote while remaining generic for other technical presentations.

| Component | Purpose | Used by slides |
|---|---|---:|
| `HeroTitleWithBrandAccent` | Branded keynote opener with dark field and accent geometry | 1 |
| `MetricTriptychWithBackdrop` | Three key stats over optional contextual backdrop | 2 |
| `QuoteWithFragmentedMap` | Emotional/problem quote plus supporting fragmented evidence | 3 |
| `DecisionFunnel` | Requirements/filtering decision visual | 4 |
| `PipelineWithFailureOverlay` | Show a process, then mark where/why it breaks | 5 |
| `IterativeResearchLoop` | Circular research/agent/process loop | 6 |
| `OrchestratedParallelResearch` | Hub-and-spoke parallel calls at multiple zoom levels | 7 |
| `ProblemSolutionArchitectureSplit` | Technical problem/solution split with stack diagram | 8 |
| `ImpactDashboard` | Outcomes, metrics, community proof | 9 |
| `PrincipleWithContrastCards` | Meta-lesson with good/bad contrast cards | 10 |
| `PrivateKnowledgeMoat` | Protected internal knowledge / private infrastructure concept | 11 |
| `ClosingCTAWithLinks` | Final links, QR codes, thank-you, Q&A | 12 |

### Primitive implementation contract

Each primitive should expose:

- **Typed content schema** for text, metrics, links, images, fragments, and speaker notes.
- **Token-only styling** using the deck/theme variables; no hardcoded brand colors inside primitive internals.
- **Responsive variants** for phone portrait, phone landscape, tablet portrait/landscape, and desktop.
- **Canonical print fallback** that renders the final intended 16:9 state for PDF.
- **Motion plan** defining fragment order, animated properties, reduced-motion behavior, and Safari-safe fallbacks.
- **Touch/a11y plan** covering focus order, tap targets, swipe/keyboard parity, labels, and non-color encodings.
- **Asset requirements** declaring local fonts/images/SVGs needed for deterministic export.

---

# Slide-by-Slide Visual Design

## Slide 1 — Title

### Story role

Establish scale, credibility, and intrigue.

### Layout

`HeroTitleWithBrandAccent`

### Visual composition

- Full dark blue background: `#0F4880`.
- Large white title:
  - **Reverse Engineering 180M Lines of Code**
- Subtitle:
  - `Ofri Wolfus · Applied Materials · GeekTime Code 2026`
- Yellow geometric skew/slash accent in top-right or bottom-right.
- Optional abstract ChunkHound/code-search mark:
  - magnifying glass over a code grid, or
  - vector nodes forming a subtle hound-like silhouette.

### Design notes

- Minimal and cinematic.
- Do not show implementation detail yet.
- Yellow should create energy, not clutter.

---

## Slide 2 — The Beast

### Story role

Make the audience feel the scale.

### Layout

`MetricTriptychWithBackdrop`

### Visual composition

Three large stat cards:

1. **180M+ LoC**
   - caption: `top 0.001%`
2. **24 years**
   - caption: `of accumulated history`
3. **Mission critical**
   - caption: `software meets physics`

Below or behind the cards:

- subtle cleanroom / semiconductor fab / machine silhouette in monochrome blue.

### Design notes

- Use white or neutral background with blue stat cards, or dark blue with white cards.
- Highlight `180M+` in yellow.
- Keep all cards square/flat with thin borders.

---

## Slide 3 — The Problem

### Story role

Define the human and organizational failure.

### Layout

`QuoteWithFragmentedMap`

### Visual composition

Main quote, large:

> “Nobody knows what this code actually does.”

Supporting visual:

- central faded codebase rectangle.
- three disconnected knowledge islands:
  - `Before my time`
  - `My changes`
  - `No current snapshot`

Bottom verdict:

> Previous refactoring attempts: failed

### Design notes

- Make fragmentation visible through spacing and disconnection.
- Use neutral gray for fragmented knowledge.
- Use restrained error/warning styling for failure; avoid melodrama.

---

## Slide 4 — The AI Bet

### Story role

Introduce the turning point from problem to experiment.

### Layout

`DecisionFunnel`

### Visual composition

Left:

- many generic tool cards entering a funnel.

Funnel filters:

- **Scale** — 180M+ LoC
- **Privacy** — on-prem / air-gapped
- **Price** — cannot send millions of tokens per query

Right:

- conclusion card:
  - **So we built our own.**
  - `ChunkHound`

### Design notes

- Use yellow for the decision point.
- Failed tools should be generic blue-gray cards unless specific logos are legally/brand-safe.
- Keep the funnel simple and readable.

---

## Slide 5 — v1: The Obvious Approach

### Story role

Explain naive RAG and why it fails.

### Layout

`PipelineWithFailureOverlay`

### Visual composition

Horizontal pipeline:

```text
Code → Chunks → Embeddings → Vector DB → Top-K → LLM
```

Then show failure around:

```text
Top-K → LLM
```

Bottom verdict:

> Doesn’t work at this scale.

Small supporting callout:

> One feature can span hundreds of files and thousands of chunks.

### Design notes

- The pipeline should initially look reasonable.
- The failure overlay should make the scale problem obvious.
- Use yellow to mark the bottleneck; red only for the final failure mark.

---

## Slide 6 — Deep Research for Code

### Story role

Present the core solution pattern.

### Layout

`IterativeResearchLoop`

### Visual composition

Central box:

> ChunkHound Orchestration Layer

Circular loop around it:

1. Query
2. Search
3. Extract facts
4. Add leads
5. Ask next question
6. Summarize / reduce

Side capability cards:

- LLM-guided exploration
- Facts ledger
- Multi-hop semantic search
- Map-reduce summarization
- Adaptive token budgets

### Design notes

- This is the conceptual heart of the talk.
- Prefer progressive reveal if the presentation builder supports it.
- Yellow should highlight the `facts ledger` as the memory mechanism.

---

## Slide 7 — How We Actually Use It

### Story role

Show orchestration at multiple zoom levels.

### Layout

`OrchestratedParallelResearch`

### Visual composition

Hub:

```text
Claude Code → ChunkHound MCP Tool
```

Fan out to three parallel research cards:

- **Algorithm details** — zoom in
- **Test coverage** — zoom mid
- **Architecture** — zoom out

Backdrop:

- faint large codebase block or node field.

Optional lower strip:

```text
Vacuum → Voltage → E-beam → Cooling → Interlocks → Ready
```

This strip represents the power-up sequence story.

### Design notes

- Make parallelism visually obvious.
- Use yellow for active zoom indicators or active research paths.
- Avoid overcrowding. This slide can be richer, but it still needs one dominant idea: orchestrated research.

---

## Slide 8 — The Local Vector DB Problem

### Story role

Technical deep dive; prove serious engineering depth.

### Layout

`ProblemSolutionArchitectureSplit`

### Visual composition

Left panel: **Problem**

- Local-first
- Millions of vectors
- Laptop constraints
- Cloud assumptions fail

Right panel: **Solution**

Architecture stack:

- DuckDB — metadata + chunks
- Sharded vector index
- USearch
- Semantic search path bypasses DB

Additional visual:

- shard grid: many small blue blocks grouped into local index shards.

### Design notes

- Use dark blue headers.
- Use yellow to mark the key insight:
  - **semantic search doesn’t touch DB**
- Keep arrows clear and labeled.

---

## Slide 9 — One Year In

### Story role

Show evidence, traction, and impact.

### Layout

`ImpactDashboard`

### Visual composition

Four stat cards:

- **32+ languages**
- **20+ contributors**
- **3 months → 3 days**
- **Local-first / private / MCP**

Below:

```text
Kimara AI · Riot Games · US Gov contractors · growing…
```

Footer:

```text
github.com/chunkhound/chunkhound
```

### Design notes

- The biggest visual emphasis should be **3 months → 3 days**.
- Use a before/after compressed timeline for that metric.
- This should feel like proof, not marketing fluff.

---

## Slide 10 — The Meta-Lesson

### Story role

Move from ChunkHound to the broader lesson about AI engineering.

### Layout

`PrincipleWithContrastCards`

### Visual composition

Large centered statement:

> Agents don’t replace engineers.  
> They amplify them.

Two contrast cards:

Card 1: **Good fundamentals**

- architecture
- testing
- grounding
- validation
- result: `10x leverage`

Card 2: **Bad fundamentals**

- vague specs
- weak tests
- no context control
- result: `10x chaos`

Footer:

```text
agenticoding.ai
```

### Design notes

- Use yellow for `amplify`.
- Avoid robot imagery.
- Keep this slide clean and reflective.

---

## Slide 11 — The Future Is Private

### Story role

Strategic conclusion.

### Layout

`PrivateKnowledgeMoat`

### Visual composition

Central protected knowledge vault containing:

- code
- commits
- docs
- tribal memory
- specs
- architecture

Boundary line around it:

- local/private/open infrastructure boundary.

Main statement:

> Your advantage is the knowledge you already have.

Below or side cards:

- Hundreds of devs trained
- Claude cowork for management
- AI-native DNA

Right/bottom:

- QR placeholder for ChunkHound
- QR placeholder for Agenticoding

### Design notes

- Use dark blue field for strategic importance.
- Use yellow outline for the private moat.
- The metaphor should be protected knowledge infrastructure, not fear/security lockdown.

---

## Slide 12 — Call to Action

### Story role

Invite participation and close.

### Layout

`ClosingCTAWithLinks`

### Visual composition

Large title:

> Join us

Two large link/QR cards:

1. `github.com/chunkhound/chunkhound`
2. `agenticoding.ai`

Small humorous rule:

> One rule: all code must be AI-generated 😉

Final line:

> Thank you. Questions?

### Design notes

- Dark blue or white background both work.
- If dark blue, QR cards should be white with blue borders.
- Use yellow for the CTA accent.

---

## Suggested Progressive Disclosure Beats

If the presentation builder supports staged reveals, use these moments:

### Slide 5

1. Show normal RAG pipeline.
2. Highlight `Top-K`.
3. Reveal fracture/failure overlay.
4. Reveal “Doesn’t work at this scale.”

### Slide 6

1. Show central ChunkHound orchestration.
2. Reveal loop one step at a time.
3. Reveal facts ledger.
4. Reveal map-reduce/token budget support cards.

### Slide 7

1. Show Claude Code.
2. Reveal ChunkHound MCP.
3. Fan out parallel research cards.
4. Reveal power-up sequence example.

### Slide 8

1. Show local-first constraint.
2. Reveal problem card.
3. Reveal architecture stack.
4. Highlight decoupled search path.

---

## Framework Runtime Requirements

### Live responsive runtime

- Start mobile-first, then enhance for tablet and desktop.
- Use the viewport meta tag with `viewport-fit=cover` and respect `env(safe-area-inset-*)`.
- Use CSS Grid/Flexbox, container queries, responsive SVG/images, and `dvh/svh` fallbacks for browser chrome changes.
- Prefer reflowing diagrams into stacked cards, accordions, or simplified paths on phones over shrinking the full desktop diagram.
- Safari/WebKit must be part of the normal development loop, including iPhone/iPad orientation changes.
- Controls must support keyboard, click, tap, and optional swipe; coarse-pointer targets should be 44–48 CSS px where practical.

### Animation and progressive disclosure

- Use a single app/document surface for live slide transitions.
- Animate `transform` and `opacity`; avoid layout-triggering animation for core transitions.
- Use CSS/WAAPI as the cross-browser baseline; feature-detect View Transitions or other enhancements.
- Make every fragment state addressable so speaker mode, deep links, and export can choose the intended state.
- Honor `prefers-reduced-motion` by replacing motion with instant state changes or subtle fades.

### Chrome-only PDF export

- Export from a dedicated route/state, not the interactive live UI.
- Render one fixed 16:9 slide per page with `@media print`, `@page { size: 16in 9in; margin: 0; }`, and page breaks between slides.
- Use Chrome/Chromium with `printBackground`, `preferCSSPageSize`, and font readiness (`document.fonts.ready` / `waitForFonts`).
- Hide navigation, cursors, timers, speaker controls, and live-only affordances.
- Self-host fonts/assets and avoid network-dependent rendering during export.
- Export the final fragment state unless a slide explicitly asks for separate build-step pages.

### Testing matrix

Verify the presentation builder against:

- Chrome PDF export: page count, 16:9 size, backgrounds, fonts, and deterministic screenshots.
- Safari/WebKit live runtime: desktop Safari, iPad portrait/landscape, iPhone portrait/landscape.
- Chromium/Firefox live smoke tests for broad compatibility.
- Reduced motion, keyboard-only navigation, coarse pointer/touch, safe-area devices, and orientation changes.
- Visual regression for canonical 16:9 plus representative tablet and phone breakpoints.

---

## Accessibility and Clarity Rules

- Do not rely on color alone. Pair color with labels, icons, or position.
- Keep diagram labels adjacent to their elements.
- Avoid separate legends unless absolutely necessary.
- Maintain strong contrast for all text.
- Avoid dense paragraph text.
- Use consistent arrow direction: left-to-right for process, circular for iteration, outward fan for parallelism.
- Use yellow sparingly; if everything is yellow, nothing is emphasized.
- Keep all interactive controls reachable by keyboard and touch.
- Provide visible alternatives to gestures; swipes are enhancements, not the only path.
- Preserve focus outlines and readable labels in every responsive variant.

---

## Final Recommendation

This deck should not look like an AI hype deck. It should look like an Applied Materials technical keynote: precise, industrial, private, local, and credible.

The strongest reusable design direction is:

> **Flat corporate technical diagrams, blue structural hierarchy, yellow insight accents, and one clear visual idea per slide.**
