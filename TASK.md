# TASK.md — HTML Showcase / The Web Builds Itself

## 0. Mission

Build a highly polished, cinematic, browser-native interactive experience that feels like a 10-minute short film about HTML and the Web.

The experience starts on a completely white screen.

A code editor gradually appears and begins typing real HTML. As each meaningful piece of code completes, the corresponding HTML appears live in a visual stage. The viewer watches a webpage construct itself in real time.

This should feel like:

- a live coding performance,
- a kinetic typography film,
- a design/animation showcase,
- and an interactive “video” that is actually generated from real HTML/CSS/JS in the browser.

It must NOT feel like:

- a coding tutorial,
- a code playground,
- a SaaS landing page,
- a generic developer portfolio,
- a default shadcn/Tailwind demo,
- or an AI-generated UI.

The core emotional arc is:

> A blank document becomes structure.  
> Structure becomes meaning.  
> Meaning becomes interaction.  
> Interaction becomes experience.

The final result should feel intentional, authored, cinematic, restrained, and surprising.

---

# 1. Primary Goal

Create a roughly 8–10 minute deterministic live HTML performance.

The “show” must:

1. Start from a blank white viewport.
2. Introduce code progressively.
3. Render the HTML as it is completed.
4. Use cinematic camera/layout transitions.
5. Demonstrate the expressive range of HTML.
6. Introduce CSS only later in the performance.
7. Introduce motion after CSS.
8. Introduce small JavaScript interactions near the end.
9. End with a polished final page built entirely from the code the user just watched being written.
10. Be scrub-able like a video timeline.
11. Reconstruct correctly when seeking backward or forward.
12. Be desktop-first, but responsive enough to remain coherent on tablet/mobile.
13. Use real HTML/CSS/JS in a sandboxed stage.
14. Maintain strong typographic and visual taste throughout.

---

# 2. Creative Direction

## 2.1 Working title

Use one of these as the temporary internal project name:

- HTML: Live
- The HTML Show
- Markup
- The Web Builds Itself
- Document → Experience

Do NOT spend excessive time on naming. The visual system matters more.

Recommended temporary title:

**The Web Builds Itself**

---

## 2.2 Tone

The tone is:

- quiet,
- precise,
- elegant,
- curious,
- slightly theatrical,
- never childish,
- never corporate,
- never “hacker terminal cliché”.

Avoid:

- neon cyberpunk,
- matrix green,
- fake terminal gimmicks,
- glowing gradients everywhere,
- random glassmorphism,
- giant rounded rectangles,
- excessive pills,
- generic AI purple/blue gradients,
- dashboard aesthetics.

---

## 2.3 Visual philosophy

The design should begin extremely minimal and gradually gain complexity.

At minute 0:
- pure white,
- no chrome,
- no visible controls,
- no border,
- no logo,
- no header.

As the performance progresses:
- the interface reveals itself gradually,
- the code panel becomes visible,
- the stage emerges,
- the timeline appears only when useful,
- controls remain subtle,
- the page grows into a full composition.

The UI should feel like a film player disguised as a design artifact.

---

# 3. Critical Anti-AI-Slop Rules

This section is mandatory.

## 3.1 Typography

DO NOT use the usual default AI website font choices as the primary UI font.

Avoid defaulting to:
- Inter,
- Arial,
- system-ui,
- Roboto,
- Open Sans,
- Poppins,
- Montserrat,
- Manrope,
- DM Sans,
- Space Grotesk,
- Sora,
- Plus Jakarta Sans,
- Geist,
- generic “modern sans” stacks.

If any of those are used, it must be because there is a specific typographic reason, not convenience.

Prefer a more editorial, intentional pairing.

Recommended direction:

### UI / interface sans
Choose one distinctive grotesk / humanist / neo-grotesk such as:
- IBM Plex Sans
- Public Sans
- Source Sans 3
- Archivo
- Work Sans
- Atkinson Hyperlegible
- Recursive Sans
- Bricolage Grotesque
- Instrument Sans
- Figtree only if styled carefully
- or another non-generic family with visible personality

### Display / editorial face
Use a serif or unusual display face sparingly for chapter statements:
- Source Serif 4
- Libre Caslon
- Cormorant Garamond
- Literata
- IBM Plex Serif
- Fraunces
- Newsreader
- EB Garamond
- or another tasteful editorial serif

### Monospace for code
Avoid defaulting blindly to JetBrains Mono.

Prefer:
- IBM Plex Mono
- Recursive Mono
- Source Code Pro
- Fira Code only if ligatures are restrained
- Commit Mono
- Geist Mono only if justified
- or another high-quality monospace with distinct texture

Typography must be deliberately tuned:
- font size,
- line-height,
- tracking,
- width,
- weight,
- optical hierarchy,
- punctuation rhythm,
- and code line spacing.

No heading should look like a generic AI landing page hero.

---

## 3.2 Shape language

Avoid “everything is a rounded card”.

Use:
- flat planes,
- hairline dividers,
- editorial spacing,
- asymmetric composition,
- restrained radii,
- shape variation.

Do NOT use:
- 24px radius everywhere,
- giant floating cards,
- excessive shadow blur,
- glass panes for no reason.

If a card is used, it must have a structural purpose.

---

## 3.3 Color

Start monochrome.

Primary palette:
- white,
- near-black,
- grayscale,
- subtle warm/cool neutrals.

Color should arrive later in the performance.

When color appears:
- introduce it narratively,
- use a small curated palette,
- no rainbow gradients,
- no default indigo-to-violet AI gradient.

The strongest early visual contrast should come from typography and motion, not color.

---

## 3.4 Layout

Avoid generic:
- centered hero,
- feature card grids,
- 3-column marketing sections,
- icon + title + body components,
- typical SaaS patterns.

Use:
- editorial compositions,
- stage direction,
- controlled asymmetry,
- whitespace,
- dynamic resizing between editor and preview,
- cinematic framing.

---

## 3.5 Motion

No “fade-up everything with 200ms ease-out”.

Every major motion should have a reason.

Motion categories:

1. **Birth** — element enters existence.
2. **Reflow** — document structure changes.
3. **Focus** — camera or emphasis shifts.
4. **Demonstration** — a native element shows its behavior.
5. **Transformation** — CSS dramatically changes the document.
6. **Finale** — the built page becomes a complete composition.

Avoid random stagger effects unless they serve narrative rhythm.

---

# 4. Product Experience

## 4.1 Initial state

The page loads into:

- full viewport,
- pure white,
- hidden mouse controls,
- no visible player chrome.

Wait approximately 1.5–2.5 seconds.

Then:
- a subtle insertion caret appears,
- first code characters begin.

The first visible line:

```html
<!doctype html>
```

Do not show a fake IDE immediately.

The environment should emerge gradually.

---

## 4.2 Core visual layout modes

The experience should support multiple stage compositions.

### Mode A — Blank / code-only

Used at the opening.

Code sits in a generous editorial composition with lots of whitespace.

### Mode B — Split

Code and visual output share the viewport.

Example proportions:
- 40% code / 60% stage,
- 35% / 65%,
- or animated ratios.

### Mode C — Stage dominant

Code collapses to 20–30%.

Used when demonstrating:
- media,
- layout,
- SVG,
- forms,
- motion.

### Mode D — Full stage

Code disappears temporarily.

Used for:
- major reveal,
- transition,
- finale.

### Mode E — Code focus

The visual stage recedes and the code becomes the protagonist.

Useful before major conceptual shifts.

Transitions between modes must feel directed, not just resized.

---

# 5. Narrative Structure

The show should feel like one continuous document, not disconnected examples.

Recommended narrative arc:

## Chapter 0 — Nothing

Theme:
> Before a page, there is a document.

Elements:
- doctype
- html
- head
- meta
- title
- body

Visual approach:
- nearly nothing on screen
- quiet
- slow
- strong use of whitespace

---

## Chapter 1 — Words

Theme:
> A document becomes meaningful when it contains words.

Elements:
- h1
- h2
- p
- strong
- em
- mark
- small
- abbr
- code
- pre
- blockquote

Visual choreography:
- headline appears with strong typographic hierarchy
- paragraph enters gently
- `<strong>` visibly changes weight at the exact completion moment
- `<em>` shifts texture
- `<mark>` appears like a deliberate highlight
- `<blockquote>` introduces a new visual rhythm

Do NOT over-animate every inline element.

---

## Chapter 2 — Lists and Connections

Theme:
> Words organize. Then they connect.

Elements:
- ul
- ol
- li
- a
- nav

Choreography:
- list items enter sequentially but not with a generic stagger preset
- anchor receives subtle underline motion
- navigation becomes spatial structure
- cursor briefly demonstrates hover state

---

## Chapter 3 — Images and Meaning

Theme:
> Documents learned to hold images.

Elements:
- img
- picture
- figure
- figcaption

Choreography:
- image begins as a soft unresolved block
- resolves into sharpness
- figure caption settles below
- picture source change may be demonstrated via responsive viewport change

Use tasteful placeholder / generated visual assets, not cheesy stock photography.

---

## Chapter 4 — Structure

Theme:
> Meaning needs structure.

Elements:
- header
- nav
- main
- section
- article
- aside
- footer

This is a major transition.

Visual idea:
- prior content physically reorganizes into semantic regions
- code panel shrinks
- stage zooms out slightly
- content now visibly behaves like a real page

This chapter should make semantic HTML feel visually meaningful without being didactic.

---

## Chapter 5 — Data

Theme:
> The web is not only stories. It is also information.

Elements:
- table
- caption
- thead
- tbody
- tr
- th
- td
- progress
- meter

Choreography:
- table grid draws progressively
- rows become legible one by one
- progress animates once
- meter demonstrates state

Keep the table visually elegant.

Do NOT make it look like an admin dashboard.

---

## Chapter 6 — Input

Theme:
> Then documents began to listen.

Elements:
- form
- label
- input
- textarea
- select
- option
- checkbox
- radio
- range
- button
- fieldset
- legend

Choreography:
- label and input relationships are visible
- text field receives input automatically
- checkbox toggles once
- range slider moves smoothly
- select opens or simulates focus state if native dropdown cannot be styled safely
- button receives press state

Use authentic native behavior where possible.

---

## Chapter 7 — Native Interaction

Theme:
> HTML can already do more than many people remember.

Elements:
- details
- summary
- dialog
- popover API if browser support is acceptable
- maybe disclosure patterns

Choreography:
- `<details>` opens and closes
- `<dialog>` appears and captures focus
- background dims
- dialog closes elegantly

This section should subtly communicate:
“HTML itself is surprisingly powerful.”

---

## Chapter 8 — Media

Theme:
> The document learns time.

Elements:
- audio
- video
- track
- source

The media does not need long playback.

Use:
- waveform-like visualization if helpful,
- short silent / ambient media snippet,
- native controls only if they fit the aesthetic.

Avoid making this a “video demo”.

---

## Chapter 9 — Graphics

Theme:
> A document can draw.

Use:
- inline svg
- path
- circle
- rect
- text
- gradients only if restrained

Create a memorable visual moment here.

Example:
- a line drawing grows from an SVG path,
- then folds into part of the final page composition.

Canvas is optional but not necessary. Prefer SVG for the HTML narrative.

---

## Chapter 10 — CSS Arrives

This is one of the most important moments.

Theme:
> Structure becomes style.

The show has been intentionally restrained before this.

Type a `<style>` block.

As CSS properties are completed, the page changes visibly.

Examples:
- font-family changes
- width constraints appear
- margins settle
- grid/flex layout activates
- background tone changes
- border styles appear
- color enters
- spacing becomes elegant

This should feel transformational.

Important:
Do not instantly apply the whole final stylesheet.

Apply CSS in meaningful steps.

The viewer should visually understand the transformation from raw document to designed interface.

---

## Chapter 11 — Motion

Theme:
> Style learns movement.

Introduce:
- transition
- transform
- animation
- keyframes
- prefers-reduced-motion handling

Demonstrate:
- hover transitions
- element shifts
- subtle looping micro-motion
- one authored keyframe sequence

Do NOT turn the entire page into a motion demo.

This chapter should be refined and restrained.

---

## Chapter 12 — JavaScript

Theme:
> And then the document responds.

Introduce a very small script.

Potential interactions:
- toggle theme
- open one custom panel
- update a counter
- respond to a button
- mutate one line of text
- activate one stateful interaction

Keep JavaScript small.

The point is:
HTML + CSS already created most of the experience.
JS adds state and behavior, not everything.

---

## Chapter 13 — Finale

The entire page now exists.

The code editor slowly recedes.

The stage expands to fill the viewport.

All pieces from earlier chapters now make sense as one finished composition.

Hold the final page for approximately 8–15 seconds.

Then reveal:

```html
</body>
</html>
```

Potential final text:

> The web starts with a document.

or

> Everything you saw was the page.

or

> View source.

Do not over-explain.

End with a graceful fade to white.

---

# 6. Recommended Timeline

Target runtime:
**8:30 to 10:30**

Suggested pacing:

- 00:00–00:30 — Nothing
- 00:30–01:20 — Words
- 01:20–02:00 — Lists + links
- 02:00–02:45 — Images
- 02:45–03:40 — Semantic structure
- 03:40–04:25 — Data
- 04:25–05:30 — Forms
- 05:30–06:10 — Native interaction
- 06:10–06:50 — Media
- 06:50–07:30 — SVG
- 07:30–08:30 — CSS transformation
- 08:30–09:10 — Motion
- 09:10–09:40 — JavaScript
- 09:40–10:00 — Finale

The exact timing can vary.

The quality of rhythm is more important than hitting exactly 10 minutes.

---

# 7. Architecture

Build the system as a reusable performance engine.

Recommended stack:

- React
- TypeScript
- Vite or Next.js
- CSS Modules / vanilla CSS / Tailwind only if used tastefully
- Framer Motion / Motion One / Web Animations API
- optional Zustand for timeline/player state
- sandboxed iframe for rendered document

Do not over-engineer.

---

## 7.1 High-level modules

```txt
src/
  app/
  components/
  player/
    ShowPlayer.tsx
    Timeline.tsx
    TransportControls.tsx
  engine/
    showEngine.ts
    timelineEngine.ts
    checkpointEngine.ts
    cueExecutor.ts
  code/
    CodePanel.tsx
    tokenizer.ts
    typingEngine.ts
  stage/
    PreviewStage.tsx
    iframeBridge.ts
    stageDirector.ts
  motion/
    presets.ts
    camera.ts
  show/
    script.ts
    scenes/
  styles/
```

---

## 7.2 Timeline model

Use a declarative timeline.

Example:

```ts
type Cue =
  | {
      at: number;
      type: "type";
      code: string;
      speed?: number;
      target?: "html" | "css" | "js";
    }
  | {
      at: number;
      type: "pause";
      duration: number;
    }
  | {
      at: number;
      type: "layout";
      mode: "code" | "split" | "stage" | "fullscreen";
    }
  | {
      at: number;
      type: "focus";
      selector?: string;
      line?: number;
    }
  | {
      at: number;
      type: "animate";
      selector: string;
      preset: string;
    }
  | {
      at: number;
      type: "interaction";
      action: string;
      selector: string;
    }
  | {
      at: number;
      type: "camera";
      action: string;
    };
```

The show script should be human-readable.

The show content should be editable without changing the engine.

---

# 8. Deterministic Playback

This requirement is critical.

The experience must behave like a video player.

User can:
- play
- pause
- seek
- restart
- drag timeline

Seeking to any time must reconstruct the show correctly.

Do NOT depend only on forward-running mutable DOM state.

Implement one of:

### Option A — Checkpoint model
Create full state checkpoints every N seconds / scene boundaries.

When seeking:
1. restore nearest previous checkpoint
2. replay cues until target time

### Option B — Pure derived state
Derive stage state from timeline time.

Use if practical.

Checkpoint model is probably easier.

---

# 9. Code Typing Engine

Typing must feel authored, not robotic.

Requirements:
- per-character timing variation
- punctuation can type faster
- line breaks may pause slightly
- tags can have a rhythm
- important phrases can slow down
- long boilerplate can accelerate

Avoid fake typo/correction gimmicks unless extremely subtle.

Typing should never become annoying.

Code must remain readable.

---

## 9.1 Syntax highlighting

Use restrained syntax highlighting.

Avoid rainbow token coloring.

Suggested:
- tags: dark neutral
- attributes: muted accent
- values: a second muted accent
- comments: gray
- punctuation: subdued

The code editor is part of the visual composition, not a VS Code clone.

No fake tabs/sidebar/minimap unless they have narrative value.

---

# 10. Preview Stage

Render user-facing document in a sandboxed `<iframe>`.

Reasons:
- CSS isolation
- script isolation
- realistic browser rendering
- easier DOM reconstruction
- no contamination of host app styles

Use `srcdoc` or controlled document writes.

If JavaScript is introduced:
- keep sandbox permissions minimal
- use postMessage bridge if needed

---

# 11. Camera Direction

The stage should have cinematic direction.

Supported camera actions:
- focus element
- zoom out
- zoom in slightly
- pan
- center composition
- reveal margins
- transition between layout ratios
- temporary full-stage takeover

Do NOT use fake 3D camera movement.

Keep transformations subtle and editorial.

---

# 12. Animation Grammar

Define reusable animation primitives.

Suggested presets:

### Birth
- `fade`
- `rise`
- `reveal-line`
- `resolve-blur`
- `scale-subtle`
- `clip-reveal`

### Reflow
- FLIP layout transition
- margin expansion
- section settling
- content redistribution

### Focus
- surrounding opacity reduction
- subtle scale / camera emphasis
- code line highlight

### Demonstration
- checkbox toggle
- details open
- dialog open
- range movement
- hover
- link underline
- focus ring

### Finale
- panel retreat
- stage expansion
- ambient hold
- final closure

Keep the library small and coherent.

---

# 13. Sound Design

Optional, but encouraged if tasteful.

Possible sound elements:
- extremely soft typing texture
- subtle page / interface ticks
- tiny mechanical cue on structural transitions
- low ambient tone
- no loud key-click ASMR

Sound must have:
- mute button
- default volume restrained
- no autoplay violation

The experience must still work perfectly without sound.

---

# 14. Timeline UI

The timeline should not appear immediately.

Reveal it after the first major chapter.

Visual style:
- very thin line
- small current-time marker
- chapter names
- minimal controls

Example:

```txt
Nothing ─ Words ─ Links ─ Structure ─ Forms ─ Media ─ CSS ─ Motion ─ JS
━━━━━━━━━━━━━━━━━━━━━━●━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                   03:42 / 10:00
```

Controls:
- play / pause
- restart
- current time
- optional mute
- optional fullscreen

Avoid a giant video-player control bar.

---

# 15. Chapter Transitions

Each chapter should have a distinct transition motif.

Examples:

Nothing → Words:
- caret expands into text

Words → Links:
- underline travels across the composition

Links → Structure:
- content physically rearranges

Structure → Data:
- horizontal rule becomes table grid

Data → Input:
- grid cell turns into text field

Input → Interaction:
- button press becomes dialog reveal

Interaction → Media:
- dialog edge becomes media frame

Media → SVG:
- frame outline becomes SVG path

SVG → CSS:
- line expands into stylesheet bracket

CSS → Motion:
- static line begins moving

Motion → JS:
- moving element reacts to input

Finale:
- interface chrome disappears

These do not all need literal morphs, but continuity should be considered.

---

# 16. Content Quality

The written text shown inside the demo should be concise and intentional.

Avoid lorem ipsum.

Use short editorial phrases.

Example tone:

```html
<h1>The web begins with a document.</h1>

<p>
  Before interfaces, dashboards, feeds, and apps,
  there was structure.
</p>
```

Later:

```html
<blockquote>
  Structure gives meaning before style gives appearance.
</blockquote>
```

Use a coherent narrative voice throughout.

Do not turn the page into marketing copy.

---

# 17. Accessibility

Must include:

- semantic controls
- keyboard navigation
- visible focus
- prefers-reduced-motion mode
- sufficient contrast
- captions/text alternatives where relevant
- timeline controls accessible by keyboard
- aria labels for player controls

For `prefers-reduced-motion`:
- preserve narrative,
- reduce camera travel,
- reduce large transforms,
- keep logical state changes.

---

# 18. Performance

Target:
- smooth 60fps on a reasonable modern laptop
- no major layout jank
- no memory leaks during 10-minute playback
- seeking should feel responsive

Avoid:
- huge particle systems
- unnecessary WebGL
- hundreds of continuously animated elements
- full-document rerender on every frame if avoidable

Use requestAnimationFrame carefully.

---

# 19. Responsive Behavior

Primary target:
- 1440x900
- 1920x1080

Also support:
- 1366x768
- tablet landscape
- mobile fallback

Mobile does NOT need the exact cinematic composition.

On small screens:
- stack code and preview
- simplify camera movement
- keep playback functional
- preserve readability

Do not waste excessive project time on perfect mobile choreography before desktop is excellent.

---

# 20. Suggested Visual System

## Base background
- warm white or pure white

## Text
- deep graphite / near black

## Muted
- medium gray

## Accent
Introduce only after CSS chapter.

Use one primary accent and optionally one secondary.

No excessive gradients.

## Borders
- 1px hairlines
- subtle
- low contrast

## Shadows
Use rarely.

Prefer:
- separation by whitespace
- border
- tonal plane

---

# 21. Code Panel Visual Rules

The code panel should feel designed.

Avoid:
- fake Mac traffic-light dots unless essential
- fake VS Code chrome
- giant glowing code cards
- neon syntax

Use:
- minimal line numbers or none
- clear active line
- subtle caret
- excellent monospace typography
- generous spacing

The code itself should feel beautiful.

---

# 22. Microinteraction Details

Polish these carefully:

- caret blink cadence
- line highlight transition
- scroll follow behavior
- timeline hover
- play/pause morph
- chapter label transitions
- focus ring
- cursor state
- scrub feedback
- code panel resize
- iframe stage scaling

These tiny details will determine whether the project feels authored or AI-generated.

---

# 23. Suggested Scene Script Skeleton

Create something like:

```ts
export const show = [
  scene("nothing", [
    type(`<!doctype html>`),
    pause(500),
    type(`
<html lang="en">`),
    type(`
<head>`),
    type(`
  <meta charset="UTF-8">`),
    type(`
  <title>The Web Builds Itself</title>`),
    type(`
</head>`),
    type(`
<body>`),
  ]),

  scene("words", [
    type(`
  <h1>The web begins with a document.</h1>`),
    focus("h1"),
    ...
  ]),

  ...
];
```

Use helpers to keep the script readable.

---

# 24. Final Page Concept

The final composition should reuse everything introduced earlier.

Possible structure:

- editorial header
- statement / hero
- short article
- figure
- semantic nav
- data fragment
- compact form
- interactive details
- subtle SVG illustration
- footer

Do NOT create an overloaded kitchen-sink final page.

The final page should feel elegant enough that someone would believe it was designed first and reverse-engineered into a showcase.

---

# 25. Important UX Principle

The viewer should never feel:

> “Now I am being shown every HTML tag.”

Instead they should feel:

> “I am watching a webpage evolve.”

The HTML coverage should emerge naturally from the story.

Do not force obscure tags just to check boxes.

---

# 26. Technical Milestones

## Milestone 1 — Skeleton
- app boots
- show engine
- play/pause
- basic timeline
- iframe stage

## Milestone 2 — Typing
- code types
- source state updates
- preview updates

## Milestone 3 — Seeking
- checkpoint system
- deterministic reconstruction

## Milestone 4 — 3 polished scenes
Build:
- Nothing
- Words
- Structure

Do not proceed until these feel excellent.

## Milestone 5 — Remaining chapters
Add:
- media
- forms
- table
- details/dialog
- svg

## Milestone 6 — CSS reveal
Make this exceptional.

## Milestone 7 — Motion + JS
Keep restrained.

## Milestone 8 — Finale

## Milestone 9 — Polish
Run all design and verification passes.

---

# 27. Agent Skill Usage

If `mblode/agent-skills` is installed, actively use relevant skills rather than ignoring them.

Recommended passes:

1. **product-design**
   - refine experience concept
   - validate interaction model

2. **ui-design**
   - establish visual system
   - critique layout
   - remove generic patterns

3. **ui-animation**
   - define motion grammar
   - tune easing
   - improve scene transitions

4. **ui-verification**
   - verify visual correctness
   - check overflow / layout bugs
   - inspect viewport states

5. **typography-audit**
   - aggressively audit:
     - type scale
     - line height
     - font pairing
     - tracking
     - code readability
     - hierarchy

6. **tidy**
   - remove visual noise
   - remove unnecessary UI
   - simplify component structure
   - remove duplicated styling

Run these as iterative passes, not only once at the end.

---

# 28. Typography Review Checklist

Before considering the project done, explicitly inspect:

- Does the main font feel generic?
- Does the headline feel like a SaaS hero?
- Is every section using the same weight?
- Are line lengths too wide?
- Is body copy too light?
- Is code too small?
- Is code line-height too tight?
- Are serif/display moments overused?
- Does the type hierarchy survive without color?
- Are there unnecessary all-caps labels?
- Does the page resemble a typical AI portfolio template?

If yes to any bad pattern:
fix it.

---

# 29. Anti-Slop Visual Review

Reject the design if it contains too many of:

- gradient blobs
- cards with giant radii
- pill buttons everywhere
- floating glass panels
- oversized AI-style hero heading
- purple/blue accent gradient
- star/sparkle icons
- generic “Made with AI” visual language
- 3-column card layouts
- excessive shadows
- decorative noise with no narrative role
- random blobs/orbs
- repetitive fade-up animations
- fake metrics/stat cards

The design should look like a strong human art director deliberately removed everything unnecessary.

---

# 30. Quality Bar

The project is successful only if:

1. Someone can watch the full show without interacting and enjoy it like a short film.
2. Someone can scrub the timeline and the state reconstructs correctly.
3. The source code being typed is real and produces the stage.
4. The page evolves as one continuous document.
5. Typography feels intentional and non-generic.
6. The CSS reveal creates a strong emotional/visual payoff.
7. The final page looks polished enough to stand alone.
8. Motion is restrained and coherent.
9. The experience does not look like a default AI-generated frontend.
10. The app works without backend services.

---

# 31. Definition of Done

The final deliverable must include:

- complete working app
- deterministic 8–10 minute show
- play / pause
- seek / scrub
- restart
- chapter markers
- sandboxed live rendering
- polished code typing
- at least:
  - text elements
  - links
  - semantic structure
  - image/figure
  - table
  - form controls
  - details/summary
  - dialog or popover
  - media
  - inline SVG
  - CSS reveal
  - motion reveal
  - small JS interaction
- reduced-motion support
- responsive fallback
- no console errors
- no obvious layout overflow
- no broken seek state
- no generic default typography

---

# 32. Final Polish Pass

When feature-complete:

### Pass 1 — Remove
Delete:
- redundant labels
- extra buttons
- decorative containers
- unnecessary borders
- useless animation

### Pass 2 — Typography
Tune:
- font size
- line-height
- measure
- tracking
- weight
- code font
- headline composition

### Pass 3 — Motion
Tune:
- durations
- easing
- pauses
- chapter transitions
- camera changes

### Pass 4 — Rhythm
Watch the entire show from beginning to end.

Mark:
- boring sections
- overly fast sections
- repetitive motion
- visual overload

Adjust timing.

### Pass 5 — Verification
Test:
- 1920x1080
- 1440x900
- 1366x768
- tablet
- mobile fallback
- reduced motion
- seeking repeatedly
- pause/resume
- refresh
- fullscreen if implemented

---

# 33. Optional Nice-to-Haves

Only implement after the core experience is excellent.

Possible extras:

- chapter navigation
- autoplay intro button
- fullscreen mode
- shareable timestamp
- keyboard shortcuts
- “View final source”
- export final HTML
- performance stats in dev mode
- soundtrack toggle
- alternate dark performance mode
- CSS Showcase sequel support

Do NOT sacrifice polish for these.

---

# 34. Recommended Keyboard Controls

- Space — play / pause
- Left Arrow — seek -5s
- Right Arrow — seek +5s
- Shift + Left — previous chapter
- Shift + Right — next chapter
- R — restart
- M — mute
- F — fullscreen
- Esc — exit fullscreen / modal state

---

# 35. Final Creative Instruction

Do not optimize for “feature completeness”.

Optimize for:
- pacing,
- surprise,
- typography,
- narrative continuity,
- restraint,
- polish.

If a choice exists between:
- adding one more tag demo
and
- making an existing scene dramatically better,

choose the better scene.

If a choice exists between:
- generic modern UI
and
- a more editorial, opinionated composition,

choose the editorial composition.

If a choice exists between:
- more animation
and
- stronger stillness,

use stillness when it creates contrast.

The first 30 seconds and the CSS reveal should receive disproportionate attention.

The final experience should make the viewer think:

> “I know this is just HTML, but I did not expect it to feel like this.”

---

# 36. Final Instruction to the Coding Agent

Before writing the implementation, define:

1. visual direction,
2. typography choice,
3. spacing system,
4. motion grammar,
5. chapter pacing,
6. stage/editor composition rules.

Then implement.

Do not begin by scaffolding a generic UI kit and filling it with components.

Do not use a prebuilt dashboard template.

Do not settle for browser-default typography.

Do not stop at “working”.

Iterate until it feels designed.
