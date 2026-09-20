import { Cue, ChapterInfo } from './types';

export const CHAPTERS: ChapterInfo[] = [
  { index: 0, year: "1991", title: "Empty Document", theme: "At CERN, Tim Berners-Lee invents the World Wide Web with an empty document.", startTime: 0, endTime: 40 },
  { index: 1, year: "1991", title: "The First Idea", theme: "Before apps, feeds, and interfaces, the web begins with a document.", startTime: 40, endTime: 100 },
  { index: 2, year: "1993", title: "Connections", theme: "The anchor tag connects human knowledge across the globe.", startTime: 100, endTime: 150 },
  { index: 3, year: "1993–1995", title: "The Article", theme: "HTML tells the browser what something means, not how it appears.", startTime: 150, endTime: 220 },
  { index: 4, year: "1993", title: "Image / Figure", theme: "The browser is a canvas, but the document comes first.", startTime: 220, endTime: 270 },
  { index: 5, year: "1996", title: "Structured Information", theme: "Tables and structured data organize the evolution of human knowledge.", startTime: 270, endTime: 320 },
  { index: 6, year: "1995", title: "The Page Listens", theme: "Forms give the reader a voice. The document becomes a two-way street.", startTime: 320, endTime: 380 },
  { index: 7, year: "2014", title: "Native Interaction", theme: "What can HTML do without JavaScript? Quite a lot.", startTime: 380, endTime: 420 },
  { index: 8, year: "2001", title: "Vector Graphics", theme: "Inline SVG transforms markup into resolution-independent artwork.", startTime: 420, endTime: 460 },
  { index: 9, year: "1996–Today", title: "CSS Arrives: The Transformation", theme: "Structure separates from style. The document awakens.", startTime: 460, endTime: 530 },
  { index: 10, year: "Modern", title: "Motion & Micro-Interactions", theme: "Transitions and keyframes bring responsive life to the page.", startTime: 530, endTime: 570 },
  { index: 11, year: "Modern", title: "JavaScript: The Living DOM", theme: "A few lines of JavaScript turn documents into reactive software.", startTime: 570, endTime: 600 },
  { index: 12, year: "2026", title: "The Web Builds Itself", theme: "Everything you saw was the document. The web builds itself.", startTime: 600, endTime: 620 }
];

export const TOTAL_DURATION = 620; // 10 minutes 20 seconds at 1x; 2m 04s at 5x; 1m 02s at 10x

export const RAW_CUES: Cue[] = [
  // ==========================================
  // CHAPTER 0: EMPTY DOCUMENT (00:00 - 00:40)
  // Pure white stillness. Doctype, html, head, title, body.
  // ==========================================
  { id: 'c0-init', start: 0, duration: 1.0, type: 'chapter', chapterIndex: 0, year: "1991", title: "Empty Document", theme: "At CERN, Tim Berners-Lee invents the World Wide Web with an empty document." },
  { id: 'c0-layout-init', start: 0, duration: 1.0, type: 'layout', mode: 'blank' },
  { id: 'c0-pause-start', start: 1.0, duration: 2.0, type: 'pause' },

  { id: 'c0-t1', start: 3.0, duration: 4.0, type: 'type', buffer: 'html', code: `<!doctype html>\n` },
  { id: 'c0-t2', start: 7.5, duration: 3.5, type: 'type', buffer: 'html', code: `<html lang="en">\n` },
  { id: 'c0-t3', start: 11.5, duration: 3.0, type: 'type', buffer: 'html', code: `<head>\n` },
  { id: 'c0-t4', start: 15.0, duration: 4.5, type: 'type', buffer: 'html', code: `  <meta charset="UTF-8">\n` },
  { id: 'c0-t5', start: 20.0, duration: 5.5, type: 'type', buffer: 'html', code: `  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n` },
  { id: 'c0-t6', start: 26.0, duration: 5.0, type: 'type', buffer: 'html', code: `  <title>The Web Builds Itself</title>\n` },
  { id: 'c0-t7', start: 31.5, duration: 3.0, type: 'type', buffer: 'html', code: `</head>\n<body>\n` },
  { id: 'c0-pause-stillness', start: 35.0, duration: 5.0, type: 'pause' },

  // ==========================================
  // CHAPTER 1: THE FIRST IDEA (00:40 - 01:40)
  // Stage smoothly curtains open (blank -> split)! Hero header arrives.
  // ==========================================
  { id: 'c1-init', start: 40.0, duration: 1.0, type: 'chapter', chapterIndex: 1, year: "1991", title: "The First Idea", theme: "Before apps, feeds, and interfaces, the web begins with a document." },
  { id: 'c1-layout', start: 40.0, duration: 1.0, type: 'layout', mode: 'split' },
  { id: 'c1-pause-intro', start: 41.5, duration: 2.5, type: 'pause' },

  { id: 'c1-t1', start: 44.0, duration: 5.0, type: 'type', buffer: 'html', code: `  <header class="hero">\n    <p class="eyebrow">A document for the browser</p>\n` },
  { id: 'c1-t2', start: 50.0, duration: 9.0, type: 'type', buffer: 'html', code: `    <h1>The web begins with a document.</h1>\n` },
  { id: 'c1-t3', start: 60.0, duration: 12.0, type: 'type', buffer: 'html', code: `    <p class="lead">Before apps, feeds, and interfaces, there was structure.</p>\n  </header>\n` },
  { id: 'c1-pause-gaze', start: 73.0, duration: 27.0, type: 'pause' },

  // ==========================================
  // CHAPTER 2: CONNECTIONS (01:40 - 02:30)
  // Nav links and anchors connecting the publication.
  // ==========================================
  { id: 'c2-init', start: 100.0, duration: 1.0, type: 'chapter', chapterIndex: 2, year: "1993", title: "Connections", theme: "The anchor tag connects human knowledge across the globe." },
  { id: 'c2-layout', start: 100.0, duration: 1.0, type: 'layout', mode: 'split' },

  { id: 'c2-t1', start: 102.0, duration: 8.0, type: 'type', buffer: 'html', code: `  <nav class="main-nav">\n    <a href="#story">Story</a>\n    <a href="#principles">Principles</a>\n` },
  { id: 'c2-t2', start: 111.0, duration: 8.0, type: 'type', buffer: 'html', code: `    <a href="#timeline">Timeline</a>\n    <a href="#join">Join</a>\n  </nav>\n` },
  { id: 'c2-t3', start: 120.0, duration: 3.5, type: 'type', buffer: 'html', code: `  <hr class="divider">\n` },
  { id: 'c2-cam-nav', start: 124.0, duration: 2.0, type: 'camera', focusSelector: '.main-nav' },
  { id: 'c2-pause', start: 126.5, duration: 23.5, type: 'pause' },

  // ==========================================
  // CHAPTER 3: THE ARTICLE (02:30 - 03:40)
  // Substantial editorial article: meaning, strong, em, blockquote, code.
  // ==========================================
  { id: 'c3-init', start: 150.0, duration: 1.0, type: 'chapter', chapterIndex: 3, year: "1993–1995", title: "The Article", theme: "HTML tells the browser what something means, not how it appears." },
  { id: 'c3-layout', start: 150.0, duration: 1.0, type: 'layout', mode: 'split' },

  { id: 'c3-t1', start: 152.0, duration: 5.0, type: 'type', buffer: 'html', code: `  <main>\n    <article id="story">\n      <h2>A language of structure</h2>\n` },
  { id: 'c3-t2', start: 158.0, duration: 16.0, type: 'type', buffer: 'html', code: `      <p>The World Wide Web began not as a visual canvas, but as a system of universal hyperlinked documents. Tim Berners-Lee envisioned a space where any piece of information could point to any other, anywhere on Earth.</p>\n` },
  { id: 'c3-t3', start: 175.0, duration: 12.0, type: 'type', buffer: 'html', code: `      <p>HTML tells the browser what something <strong>means</strong>. It separates pure semantic architecture from ephemeral decoration.</p>\n` },
  { id: 'c3-t4', start: 188.0, duration: 10.0, type: 'type', buffer: 'html', code: `      <blockquote>Structure comes before appearance. Without meaning, styling is merely noise.</blockquote>\n` },
  { id: 'c3-t5', start: 199.0, duration: 12.0, type: 'type', buffer: 'html', code: `      <p>By nesting elements like <code>&lt;header&gt;</code>, <code>&lt;article&gt;</code>, and <code>&lt;section&gt;</code>, we give the browser an outline that survives across devices and decades.</p>\n    </article>\n` },
  { id: 'c3-pause', start: 212.0, duration: 8.0, type: 'pause' },

  // ==========================================
  // CHAPTER 4: IMAGE / FIGURE (03:40 - 04:30)
  // Authored editorial SVG illustration and semantic caption.
  // ==========================================
  { id: 'c4-init', start: 220.0, duration: 1.0, type: 'chapter', chapterIndex: 4, year: "1993", title: "Image / Figure", theme: "The browser is a canvas, but the document comes first." },
  { id: 'c4-layout', start: 220.0, duration: 1.0, type: 'layout', mode: 'split' },

  { id: 'c4-t1', start: 222.0, duration: 6.0, type: 'type', buffer: 'html', code: `    <figure class="editorial-figure">\n      <svg class="figure-illustration" viewBox="0 0 680 200" xmlns="http://www.w3.org/2000/svg">\n` },
  { id: 'c4-t2', start: 229.0, duration: 12.0, type: 'type', buffer: 'html', code: `        <rect width="680" height="200" rx="10" fill="#f4f1ea" stroke="#d5d0c7" stroke-width="1.5"/>\n        <circle cx="340" cy="100" r="65" fill="none" stroke="#c84b31" stroke-width="1.5" stroke-dasharray="4 4"/>\n        <circle cx="340" cy="100" r="28" fill="#c84b31" fill-opacity="0.12"/>\n` },
  { id: 'c4-t3', start: 242.0, duration: 11.0, type: 'type', buffer: 'html', code: `        <text x="340" y="105" text-anchor="middle" font-family="Newsreader, serif" font-size="16" font-style="italic" fill="#141416">Hypertext Core</text>\n        <line x1="120" y1="100" x2="260" y2="100" stroke="#141416" stroke-width="1"/>\n        <line x1="420" y1="100" x2="560" y2="100" stroke="#141416" stroke-width="1"/>\n      </svg>\n` },
  { id: 'c4-t4', start: 254.0, duration: 8.0, type: 'type', buffer: 'html', code: `      <figcaption>Figure 1.0 — The browser is a canvas, but the document comes first.</figcaption>\n    </figure>\n` },
  { id: 'c4-pause', start: 263.0, duration: 7.0, type: 'pause' },

  // ==========================================
  // CHAPTER 5: STRUCTURED INFORMATION (04:30 - 05:20)
  // Table of web evolution 1991-2026.
  // ==========================================
  { id: 'c5-init', start: 270.0, duration: 1.0, type: 'chapter', chapterIndex: 5, year: "1996", title: "Structured Information", theme: "Tables and structured data organize the evolution of human knowledge." },
  { id: 'c5-layout', start: 270.0, duration: 1.0, type: 'layout', mode: 'stage-dominant' },

  { id: 'c5-t1', start: 272.0, duration: 7.0, type: 'type', buffer: 'html', code: `    <section id="timeline">\n      <h2>How the document evolved</h2>\n      <table class="data-table">\n` },
  { id: 'c5-t2', start: 280.0, duration: 6.0, type: 'type', buffer: 'html', code: `        <thead>\n          <tr><th>Year</th><th>Milestone</th><th>Platform Capability</th></tr>\n        </thead>\n        <tbody>\n` },
  { id: 'c5-t3', start: 287.0, duration: 12.0, type: 'type', buffer: 'html', code: `          <tr><td>1991</td><td>Line-Mode Browser</td><td>Pure Hypertext Documents</td></tr>\n          <tr><td>1993</td><td>NCSA Mosaic</td><td>Inline Images &amp; Visual Web</td></tr>\n          <tr><td>1995</td><td>Netscape Navigator</td><td>Dynamic Client-Side Scripting</td></tr>\n` },
  { id: 'c5-t4', start: 300.0, duration: 11.0, type: 'type', buffer: 'html', code: `          <tr><td>1996</td><td>CSS1 Specification</td><td>Separation of Style from Content</td></tr>\n          <tr><td>2026</td><td>The Open Web</td><td>Universal Application Platform</td></tr>\n        </tbody>\n      </table>\n    </section>\n` },
  { id: 'c5-pause', start: 312.0, duration: 8.0, type: 'pause' },

  // ==========================================
  // CHAPTER 6: THE PAGE LISTENS (05:20 - 06:20)
  // Newsletter subscription form with input, fieldset, checkboxes.
  // ==========================================
  { id: 'c6-init', start: 320.0, duration: 1.0, type: 'chapter', chapterIndex: 6, year: "1995", title: "The Page Listens", theme: "Forms give the reader a voice. The document becomes a two-way street." },
  { id: 'c6-layout', start: 320.0, duration: 1.0, type: 'layout', mode: 'split' },

  { id: 'c6-t1', start: 322.0, duration: 8.0, type: 'type', buffer: 'html', code: `    <section id="join">\n      <h2>Stay curious.</h2>\n      <p>Subscribe to quarterly dispatches on web architecture, craft, and open standards.</p>\n` },
  { id: 'c6-t2', start: 331.0, duration: 10.0, type: 'type', buffer: 'html', code: `      <form class="join-form" onsubmit="return false;">\n        <label for="reader-email">Your email</label>\n        <input id="reader-email" type="email" placeholder="you@example.com" required>\n` },
  { id: 'c6-t3', start: 342.0, duration: 12.0, type: 'type', buffer: 'html', code: `        <fieldset>\n          <legend>Reading preferences</legend>\n          <label><input type="checkbox" checked> Architecture essays</label>\n          <label><input type="checkbox" checked> Standards updates</label>\n        </fieldset>\n` },
  { id: 'c6-t4', start: 355.0, duration: 7.0, type: 'type', buffer: 'html', code: `        <button type="submit" id="btn-submit">Join the publication</button>\n      </form>\n    </section>\n` },
  { id: 'c6-pause', start: 363.0, duration: 17.0, type: 'pause' },

  // ==========================================
  // CHAPTER 7: NATIVE INTERACTION (06:20 - 07:00)
  // details/summary & native HTML dialog. "Still no JavaScript!"
  // ==========================================
  { id: 'c7-init', start: 380.0, duration: 1.0, type: 'chapter', chapterIndex: 7, year: "2014", title: "Native Interaction", theme: "What can HTML do without JavaScript? Quite a lot." },
  { id: 'c7-layout', start: 380.0, duration: 1.0, type: 'layout', mode: 'split' },

  { id: 'c7-t1', start: 382.0, duration: 9.0, type: 'type', buffer: 'html', code: `    <section id="interactive">\n      <h2>Native Interactivity</h2>\n      <details open>\n        <summary>What can HTML do without JavaScript?</summary>\n` },
  { id: 'c7-t2', start: 392.0, duration: 10.0, type: 'type', buffer: 'html', code: `        <p>Quite a lot. Native disclosure widgets, client-side validation, accessible dialogs, and popovers exist directly in the browser platform.</p>\n      </details>\n` },
  { id: 'c7-t3', start: 403.0, duration: 12.0, type: 'type', buffer: 'html', code: `      <div class="dialog-demo">\n        <button type="button" id="btn-open-manifest" class="manifest-btn">Inspect Platform Manifest</button>\n        <dialog id="manifest-dialog">\n          <h3>The Open Platform Manifest</h3>\n          <p>The web is the only software system built on unbreakable backwards compatibility. Code written in 1991 still runs in every browser today.</p>\n          <button type="button" id="btn-close-manifest">Close</button>\n        </dialog>\n      </div>\n    </section>\n` },
  { id: 'c7-pause', start: 416.0, duration: 4.0, type: 'pause' },

  // ==========================================
  // CHAPTER 8: VECTOR GRAPHICS (07:00 - 07:40)
  // Inline SVG architectural pipeline diagram.
  // ==========================================
  { id: 'c8-init', start: 420.0, duration: 1.0, type: 'chapter', chapterIndex: 8, year: "2001", title: "Vector Graphics", theme: "Inline SVG transforms markup into resolution-independent artwork." },
  { id: 'c8-layout', start: 420.0, duration: 1.0, type: 'layout', mode: 'split' },

  { id: 'c8-t1', start: 422.0, duration: 7.0, type: 'type', buffer: 'html', code: `    <section id="principles">\n      <h2>Foundational Architecture</h2>\n      <svg class="pipeline-diagram" viewBox="0 0 680 90" xmlns="http://www.w3.org/2000/svg">\n` },
  { id: 'c8-t2', start: 430.0, duration: 12.0, type: 'type', buffer: 'html', code: `        <g transform="translate(10, 15)">\n          <rect x="0" y="0" width="130" height="46" rx="8" fill="#f4f1ea" stroke="#d5d0c7"/>\n          <text x="65" y="28" text-anchor="middle" font-family="monospace" font-size="12" fill="#141416">Document</text>\n          <line x1="135" y1="23" x2="175" y2="23" stroke="#c84b31" stroke-width="2"/>\n` },
  { id: 'c8-t3', start: 443.0, duration: 12.0, type: 'type', buffer: 'html', code: `          <rect x="180" y="0" width="130" height="46" rx="8" fill="#f4f1ea" stroke="#d5d0c7"/>\n          <text x="245" y="28" text-anchor="middle" font-family="monospace" font-size="12" fill="#141416">Structure</text>\n          <line x1="315" y1="23" x2="355" y2="23" stroke="#c84b31" stroke-width="2"/>\n` },
  { id: 'c8-t4', start: 456.0, duration: 3.5, type: 'type', buffer: 'html', code: `        </g>\n      </svg>\n    </section>\n` },

  // ==========================================
  // CHAPTER 9: CSS ARRIVES: THE TRANSFORMATION (07:40 - 08:50)
  // THE BIG PAYOFF! Progressive styling transforms the SAME document!
  // Typography -> Measure -> Spacing -> Flex/Grid -> Palette -> Form -> Responsive
  // ==========================================
  { id: 'c9-init', start: 460.0, duration: 1.0, type: 'chapter', chapterIndex: 9, year: "1996–Today", title: "CSS Arrives: The Transformation", theme: "Structure separates from style. The document awakens." },
  { id: 'c9-layout-focus', start: 460.0, duration: 1.0, type: 'layout', mode: 'code-focus' },

  // Step 1: Design Tokens & Typography
  { id: 'c9-t1', start: 462.0, duration: 12.0, type: 'type', buffer: 'css', code: `/* 1996+: Separation of Concerns (CSS Zen Garden) */\n:root {\n  --font-serif: 'Newsreader', Georgia, serif;\n  --font-sans: 'Instrument Sans', -apple-system, sans-serif;\n  --font-mono: 'JetBrains Mono', monospace;\n  --bg-page: #faf9f6;\n  --text-main: #141416;\n  --text-muted: #57606a;\n  --terracotta: #c84b31;\n  --border-light: rgba(20, 20, 22, 0.1);\n}\n\n` },

  // Step 2: Measure & Page Rhythm
  { id: 'c9-t2', start: 475.0, duration: 10.0, type: 'type', buffer: 'css', code: `body {\n  font-family: var(--font-sans);\n  background-color: var(--bg-page);\n  color: var(--text-main);\n  line-height: 1.7;\n  margin: 0;\n  padding: 3.5rem 2rem;\n}\n\nheader, main, footer {\n  max-width: 740px;\n  margin: 0 auto;\n}\n\n` },

  // Step 3: Typography Hierarchy & Accents
  { id: 'c9-t3', start: 486.0, duration: 11.0, type: 'type', buffer: 'css', code: `h1, h2, h3 {\n  font-family: var(--font-serif);\n  font-weight: 400;\n  letter-spacing: -0.025em;\n}\n\nh1 {\n  font-size: 3.2rem;\n  line-height: 1.15;\n}\n\n.eyebrow {\n  font-family: var(--font-mono);\n  font-size: 0.75rem;\n  letter-spacing: 0.15em;\n  text-transform: uppercase;\n  color: var(--terracotta);\n  font-weight: 600;\n}\n\n` },

  // Step 4: Layout & Elements (Return to split to watch transformation)
  { id: 'c9-layout-split', start: 497.0, duration: 1.0, type: 'layout', mode: 'split' },
  { id: 'c9-t4', start: 498.0, duration: 14.0, type: 'type', buffer: 'css', code: `nav.main-nav {\n  display: flex;\n  gap: 1.5rem;\n  padding-bottom: 1.2rem;\n  border-bottom: 1px solid var(--border-light);\n  margin-bottom: 2.5rem;\n}\nnav.main-nav a {\n  color: var(--text-main);\n  text-decoration: none;\n  font-weight: 500;\n  font-size: 0.9rem;\n}\n\nblockquote {\n  border-left: 3px solid var(--terracotta);\n  padding-left: 1.5rem;\n  font-family: var(--font-serif);\n  font-style: italic;\n  font-size: 1.2rem;\n  margin: 2rem 0;\n}\n\n` },

  // Step 5: Data Table & Form Polish
  { id: 'c9-t5', start: 513.0, duration: 14.0, type: 'type', buffer: 'css', code: `table.data-table {\n  width: 100%;\n  border-collapse: collapse;\n  margin: 2rem 0;\n  font-size: 0.9rem;\n}\ntable.data-table th, table.data-table td {\n  padding: 0.85rem 1rem;\n  border-bottom: 1px solid var(--border-light);\n}\n\n.join-form {\n  background: #ffffff;\n  border: 1px solid var(--border-light);\n  border-radius: 12px;\n  padding: 1.8rem;\n  box-shadow: 0 10px 30px -10px rgba(0,0,0,0.05);\n}\n#btn-submit {\n  background: var(--terracotta);\n  color: white;\n  border: none;\n  padding: 0.75rem 1.6rem;\n  border-radius: 8px;\n  font-weight: 600;\n  cursor: pointer;\n}\n` },
  { id: 'c9-pause', start: 528.0, duration: 2.0, type: 'pause' },

  // ==========================================
  // CHAPTER 10: MOTION & MICRO-INTERACTIONS (08:50 - 09:30)
  // Subtle transitions, hover lift, reduced motion.
  // ==========================================
  { id: 'c10-init', start: 530.0, duration: 1.0, type: 'chapter', chapterIndex: 10, year: "Modern", title: "Motion & Micro-Interactions", theme: "Transitions and keyframes bring responsive life to the page." },
  { id: 'c10-layout', start: 530.0, duration: 1.0, type: 'layout', mode: 'split' },

  { id: 'c10-t1', start: 532.0, duration: 12.0, type: 'type', buffer: 'css', code: `\n/* Subtle Fluid Motion & Micro-Interactions */\nnav.main-nav a, #btn-submit, .manifest-btn {\n  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);\n}\n\nnav.main-nav a:hover {\n  color: var(--terracotta);\n}\n\n#btn-submit:hover, .manifest-btn:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 20px rgba(200, 75, 49, 0.3);\n}\n\n` },
  { id: 'c10-t2', start: 546.0, duration: 12.0, type: 'type', buffer: 'css', code: `figure.editorial-figure svg {\n  transition: transform 0.4s ease;\n}\nfigure.editorial-figure:hover svg {\n  transform: scale(1.015);\n}\n\n@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after {\n    animation-duration: 0.01ms !important;\n    transition-duration: 0.01ms !important;\n  }\n}\n` },
  { id: 'c10-pause', start: 559.0, duration: 11.0, type: 'pause' },

  // ==========================================
  // CHAPTER 11: JAVASCRIPT: THE LIVING DOM (09:30 - 10:00)
  // Real native modal dialog wiring and event listener execution!
  // ==========================================
  { id: 'c11-init', start: 570.0, duration: 1.0, type: 'chapter', chapterIndex: 11, year: "Modern", title: "JavaScript: The Living DOM", theme: "A few lines of JavaScript turn documents into reactive software." },
  { id: 'c11-layout', start: 570.0, duration: 1.0, type: 'layout', mode: 'split' },

  { id: 'c11-t1', start: 572.0, duration: 14.0, type: 'type', buffer: 'js', code: `// 1995: Brendan Eich invents JS in 10 days\n// Today: The DOM becomes a living, accessible application runtime\nconst openBtn = document.getElementById('btn-open-manifest');\nconst closeBtn = document.getElementById('btn-close-manifest');\nconst dialog = document.getElementById('manifest-dialog');\n\nif (openBtn && dialog && closeBtn) {\n  openBtn.addEventListener('click', () => dialog.showModal());\n  closeBtn.addEventListener('click', () => dialog.close());\n}\n` },
  { id: 'c11-open-dialog', start: 588.0, duration: 3.0, type: 'interaction', action: 'open-dialog', selector: '#btn-open-manifest' },
  { id: 'c11-close-dialog', start: 593.0, duration: 2.0, type: 'interaction', action: 'close-dialog', selector: '#btn-close-manifest' },
  { id: 'c11-pause', start: 596.0, duration: 4.0, type: 'pause' },

  // ==========================================
  // CHAPTER 12: THE WEB BUILDS ITSELF (10:00 - 10:20)
  // Full stage takeover. The completed editorial publication!
  // Code editor returns briefly to close the document.
  // ==========================================
  { id: 'c12-init', start: 600.0, duration: 1.0, type: 'chapter', chapterIndex: 12, year: "2026", title: "The Web Builds Itself", theme: "Everything you saw was the document. The web builds itself." },
  { id: 'c12-layout', start: 600.0, duration: 1.5, type: 'layout', mode: 'full-stage' },

  // Brief return of code editor at 610 to type final closing tags
  { id: 'c12-layout-brief-code', start: 608.0, duration: 1.0, type: 'layout', mode: 'stage-dominant' },
  { id: 'c12-t1', start: 609.5, duration: 5.5, type: 'type', buffer: 'html', code: `  </main>\n  <footer class="final-colophon">\n    <p>1991: Hello World · 2026: The Web Builds Itself · View Source</p>\n  </footer>\n</body>\n</html>\n` },
  { id: 'c12-layout-final-stage', start: 615.5, duration: 1.0, type: 'layout', mode: 'full-stage' },
  { id: 'c12-hold', start: 616.5, duration: 3.5, type: 'pause' }
];
