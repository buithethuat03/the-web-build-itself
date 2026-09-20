import { Cue, ChapterInfo } from './types';

export const CHAPTERS: ChapterInfo[] = [
  { index: 0, year: "1991", title: "The Spark: Hello World", theme: "At CERN, Tim Berners-Lee invents the World Wide Web.", startTime: 0, endTime: 22 },
  { index: 1, year: "1993", title: "Hypertext & Anchors", theme: "The <a> tag connects human knowledge across the globe.", startTime: 22, endTime: 48 },
  { index: 2, year: "1996", title: "The Wild 90s: Tables & Chaos", theme: "Before CSS, layouts were hacked using nested tables and marquee.", startTime: 48, endTime: 85 },
  { index: 3, year: "2001", title: "CSS Revolution: Zen Garden", theme: "Structure separates from style. Markup is liberated.", startTime: 85, endTime: 130 },
  { index: 4, year: "2008", title: "HTML5: Semantic Awakening", theme: "Goodbye Flash. The web gains native semantics, audio & canvas.", startTime: 130, endTime: 170 },
  { index: 5, year: "2015", title: "Flexbox & Grid: Fluid Layouts", theme: "Responsive design transforms the web into an adaptive canvas.", startTime: 170, endTime: 210 },
  { index: 6, year: "1995-2015", title: "JavaScript: The Living DOM", theme: "Created in 10 days, JavaScript turns documents into software.", startTime: 210, endTime: 245 },
  { index: 7, year: "2024", title: "Reactive Canvas & Micro-Interactions", theme: "Generative 60fps graphics, state management, and real-time reactivity.", startTime: 245, endTime: 285 },
  { index: 8, year: "2026", title: "The Complete Living Web Platform", theme: "From a solitary 'Hello World' to the world's universal application runtime.", startTime: 285, endTime: 325 }
];

export const TOTAL_DURATION = 325; // 5m 25s at 1x; 65s at 5x; 32s at 10x

export const RAW_CUES: Cue[] = [
  // ==========================================
  // CHAPTER 0: 1991 · THE SPARK: HELLO WORLD (00:00 - 00:22)
  // Tim Berners-Lee at CERN, stark Line-Mode terminal canvas
  // ==========================================
  { id: 'c0-init', start: 0, duration: 1.0, type: 'chapter', chapterIndex: 0, year: "1991", title: "The Spark: Hello World", theme: "At CERN, Tim Berners-Lee invents the World Wide Web." },
  { id: 'c0-layout-init', start: 0, duration: 1.0, type: 'layout', mode: 'blank' },
  { id: 'c0-pause-1', start: 1.0, duration: 0.8, type: 'pause' },

  { id: 'c0-t1', start: 1.8, duration: 2.2, type: 'type', buffer: 'html', code: `<!doctype html>\n` },
  { id: 'c0-t2', start: 4.0, duration: 2.2, type: 'type', buffer: 'html', code: `<html lang="en">\n` },
  { id: 'c0-t3', start: 6.2, duration: 1.8, type: 'type', buffer: 'html', code: `<head>\n` },
  { id: 'c0-t4', start: 8.0, duration: 2.5, type: 'type', buffer: 'html', code: `  <meta charset="UTF-8">\n  <title>The World Wide Web Project (1991)</title>\n` },
  { id: 'c0-t5', start: 10.5, duration: 1.8, type: 'type', buffer: 'html', code: `</head>\n<body>\n` },
  { id: 'c0-t6', start: 12.3, duration: 3.5, type: 'type', buffer: 'html', code: `  <h1>Hello, World!</h1>\n` },
  { id: 'c0-t7', start: 15.8, duration: 5.2, type: 'type', buffer: 'html', code: `  <p>The WorldWideWeb (W3) is a wide-area hypermedia information retrieval initiative aiming to give universal access to a large universe of documents.</p>\n` },
  { id: 'c0-end-pause', start: 21.0, duration: 1.0, type: 'pause' },

  // ==========================================
  // CHAPTER 1: 1993 · HYPERTEXT & ANCHORS (00:22 - 00:48)
  // Blue links, Mosaic browser, knowledge linking
  // ==========================================
  { id: 'c1-init', start: 22.0, duration: 1.0, type: 'chapter', chapterIndex: 1, year: "1993", title: "Hypertext & Anchors", theme: "The <a> tag connects human knowledge across the globe." },
  { id: 'c1-layout', start: 22.0, duration: 1.0, type: 'layout', mode: 'split' },
  { id: 'c1-cam-1', start: 22.5, duration: 1.0, type: 'camera', zoom: 1.0, panX: 0, panY: 0 },

  { id: 'c1-t1', start: 23.5, duration: 3.5, type: 'type', buffer: 'html', code: `  <hr>\n  <h2>Everything is Hyperlinked</h2>\n` },
  { id: 'c1-t2', start: 27.0, duration: 4.5, type: 'type', buffer: 'html', code: `  <p>A document becomes infinitely more powerful when it can point to another world.</p>\n` },
  { id: 'c1-t3', start: 31.5, duration: 7.5, type: 'type', buffer: 'html', code: `  <ul class="cern-links">\n    <li><a href="#about">What is HyperText?</a></li>\n    <li><a href="#mosaic">NCSA Mosaic Browser (1993)</a></li>\n    <li><a href="#cern">CERN High Energy Physics Lab</a></li>\n  </ul>\n` },
  { id: 'c1-cam-links', start: 39.5, duration: 1.5, type: 'camera', focusSelector: '.cern-links' },
  { id: 'c1-interact-link', start: 42.0, duration: 2.0, type: 'interaction', action: 'click', selector: '.cern-links a' },
  { id: 'c1-pause', start: 44.5, duration: 3.5, type: 'pause' },

  // ==========================================
  // CHAPTER 2: 1996 · THE WILD 90s: TABLES & CHAOS (00:48 - 01:25)
  // Marquee, Geocities, nested tables, visitor counter
  // ==========================================
  { id: 'c2-init', start: 48.0, duration: 1.0, type: 'chapter', chapterIndex: 2, year: "1996", title: "The Wild 90s: Tables & Chaos", theme: "Before CSS, layouts were hacked using nested tables and marquee." },
  { id: 'c2-layout', start: 48.0, duration: 1.0, type: 'layout', mode: 'stage-dominant' },

  { id: 'c2-t1', start: 49.5, duration: 8.0, type: 'type', buffer: 'html', code: `  <!-- 1996: The Wild Geocities & Table Layout Era -->\n  <center>\n    <marquee class="retro-marquee" scrollamount="4">\n      *** WELCOME TO CYBERSPACE · BEST VIEWED IN NETSCAPE NAVIGATOR 3.0 ***\n    </marquee>\n    <font size="+2" color="#ff0055" face="Comic Sans MS, Arial"><b>THE WILD 90s WEB</b></font>\n  </center>\n` },

  { id: 'c2-t2', start: 58.0, duration: 12.0, type: 'type', buffer: 'html', code: `  <table class="retro-table" width="100%" border="2" cellpadding="8" bgcolor="#ffffcc">\n    <tr>\n      <td width="30%" bgcolor="#00ffff" valign="top">\n        <b>NAVIGATION</b><br>\n        • <a href="#home">Home</a><br>\n        • <a href="#guestbook">Sign Guestbook</a><br>\n        • <a href="#webring">Join WebRing</a><br>\n        • <a href="#midi">Under Construction</a>\n      </td>\n      <td width="70%" bgcolor="#ffffff">\n        <p>Before CSS, entire web page layouts were built by hacking <code>&lt;table&gt;</code> tags!</p>\n        <div class="visitor-counter">VISITOR NO. 004291</div>\n      </td>\n    </tr>\n  </table>\n` },
  { id: 'c2-cam-marquee', start: 71.0, duration: 2.0, type: 'camera', focusSelector: '.retro-marquee' },
  { id: 'c2-pause', start: 73.5, duration: 11.5, type: 'pause' },

  // ==========================================
  // CHAPTER 3: 2001 · CSS REVOLUTION: ZEN GARDEN (01:25 - 02:10)
  // Stripping table hacks, CSS Zen Garden, Box Model, Typography
  // ==========================================
  { id: 'c3-init', start: 85.0, duration: 1.0, type: 'chapter', chapterIndex: 3, year: "2001", title: "CSS Revolution: Zen Garden", theme: "Structure separates from style. Markup is liberated." },
  { id: 'c3-layout', start: 85.0, duration: 1.0, type: 'layout', mode: 'code-focus' },

  // Switch to CSS buffer!
  { id: 'c3-t1', start: 86.5, duration: 11.0, type: 'type', buffer: 'css', code: `/* 2001: The CSS Revolution (CSS Zen Garden) */\n/* Separation of Concerns: Structure in HTML, Style in CSS */\n:root {\n  --font-serif: 'Newsreader', Georgia, serif;\n  --font-sans: 'Instrument Sans', -apple-system, sans-serif;\n  --paper: #faf9f6;\n  --ink: #141416;\n  --terracotta: #c84b31;\n}\n\nbody {\n  font-family: var(--font-sans);\n  background: var(--paper);\n  color: var(--ink);\n  line-height: 1.7;\n  margin: 0;\n  padding: 3rem 2rem;\n}\n` },
  { id: 'c3-cam-css1', start: 98.0, duration: 1.5, type: 'camera', zoom: 1.0, panX: 0, panY: 0 },

  { id: 'c3-t2', start: 100.0, duration: 12.0, type: 'type', buffer: 'css', code: `/* Eradicate the 90s table hacks cleanly */\n.retro-marquee, .retro-table, .visitor-counter { display: none !important; }\n\nh1, h2 {\n  font-family: var(--font-serif);\n  font-weight: 400;\n  letter-spacing: -0.025em;\n}\n\nh1 {\n  font-size: 2.8rem;\n  border-bottom: 2px solid var(--terracotta);\n  padding-bottom: 0.75rem;\n}\n` },
  { id: 'c3-layout-split', start: 113.0, duration: 1.0, type: 'layout', mode: 'split' },
  { id: 'c3-pause-zen', start: 115.0, duration: 15.0, type: 'pause' },

  // ==========================================
  // CHAPTER 4: 2008 · HTML5: SEMANTIC AWAKENING (02:10 - 02:50)
  // Goodbye Flash. Native <header>, <main>, <article>, <canvas>
  // ==========================================
  { id: 'c4-init', start: 130.0, duration: 1.0, type: 'chapter', chapterIndex: 4, year: "2008", title: "HTML5: Semantic Awakening", theme: "Goodbye Flash. The web gains native semantics, audio & canvas." },
  { id: 'c4-layout', start: 130.0, duration: 1.0, type: 'layout', mode: 'split' },

  // Back to HTML buffer for modern semantics
  { id: 'c4-t1', start: 131.5, duration: 13.0, type: 'type', buffer: 'html', code: `  <!-- 2008-2014: HTML5 Semantic Era -->\n  <main class="platform-surface">\n    <header class="showcase-header">\n      <div class="pill-badge">HTML5 · CSS3 · Modern JavaScript</div>\n      <h2>The Living Web Platform</h2>\n      <p class="summary-line">A universal, self-contained application runtime accessible on every screen.</p>\n    </header>\n` },

  { id: 'c4-t2', start: 145.0, duration: 14.0, type: 'type', buffer: 'html', code: `    <section class="metrics-deck">\n      <article class="stat-card" id="card-fps">\n        <div class="card-icon">⚡</div>\n        <h4>Hardware Graphics</h4>\n        <div class="stat-number">60.0 FPS</div>\n        <p>Native GPU acceleration replacing third-party plugins.</p>\n      </article>\n\n      <article class="stat-card" id="card-standards">\n        <div class="card-icon">🌐</div>\n        <h4>Universal Standards</h4>\n        <div class="stat-number">W3C / WHATWG</div>\n        <p>Unbreakable backwards compatibility since 1991.</p>\n      </article>\n    </section>\n` },
  { id: 'c4-cam-cards', start: 160.0, duration: 2.0, type: 'camera', focusSelector: '.metrics-deck' },
  { id: 'c4-pause-html5', start: 162.5, duration: 7.5, type: 'pause' },

  // ==========================================
  // CHAPTER 5: 2015 · FLEXBOX & GRID: FLUID LAYOUTS (02:50 - 03:30)
  // Modern CSS Grid, Glassmorphism, Micro-shadows
  // ==========================================
  { id: 'c5-init', start: 170.0, duration: 1.0, type: 'chapter', chapterIndex: 5, year: "2015", title: "Flexbox & Grid: Fluid Layouts", theme: "Responsive design transforms the web into an adaptive canvas." },
  { id: 'c5-layout', start: 170.0, duration: 1.0, type: 'layout', mode: 'stage-dominant' },

  // Switch to CSS buffer for modern grid & glass
  { id: 'c5-t1', start: 171.5, duration: 14.0, type: 'type', buffer: 'css', code: `/* 2015+: Responsive Grid, Flexbox & Glassmorphism */\n.platform-surface {\n  max-width: 900px;\n  margin: 2rem auto;\n}\n\n.metrics-deck {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));\n  gap: 1.5rem;\n  margin: 2rem 0;\n}\n\n.stat-card {\n  background: rgba(255, 255, 255, 0.85);\n  backdrop-filter: blur(12px);\n  border: 1px solid rgba(20, 20, 22, 0.08);\n  border-radius: 16px;\n  padding: 1.5rem;\n  box-shadow: 0 10px 30px -8px rgba(0, 0, 0, 0.06);\n  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n}\n\n.stat-card:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 20px 40px -10px rgba(200, 75, 49, 0.15);\n}\n` },
  { id: 'c5-cam-grid', start: 187.0, duration: 2.0, type: 'camera', focusSelector: '.metrics-deck' },

  { id: 'c5-t2', start: 190.0, duration: 11.0, type: 'type', buffer: 'css', code: `/* Neo-Modern Interactive Controls & Accents */\n.pill-badge {\n  display: inline-block;\n  background: var(--terracotta);\n  color: white;\n  font-size: 0.75rem;\n  font-family: var(--font-sans);\n  font-weight: 600;\n  padding: 0.35rem 0.9rem;\n  border-radius: 9999px;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n}\n` },
  { id: 'c5-layout-balanced', start: 202.0, duration: 1.0, type: 'layout', mode: 'split' },
  { id: 'c5-pause-grid', start: 203.5, duration: 6.5, type: 'pause' },

  // ==========================================
  // CHAPTER 6: 1995-2015 · JAVASCRIPT: THE LIVING DOM (03:30 - 04:05)
  // Brendan Eich, DOM events, reactivity, interactive state
  // ==========================================
  { id: 'c6-init', start: 210.0, duration: 1.0, type: 'chapter', chapterIndex: 6, year: "2015", title: "JavaScript: The Living DOM", theme: "Created in 10 days, JavaScript turns documents into software." },
  { id: 'c6-layout', start: 210.0, duration: 1.0, type: 'layout', mode: 'split' },

  // Switch to JS buffer!
  { id: 'c6-t1', start: 211.5, duration: 12.0, type: 'type', buffer: 'js', code: `// 1995: Brendan Eich writes JavaScript in 10 days at Netscape\n// 2015+: The DOM becomes a dynamic reactive application runtime\nconsole.log('[WebEngine] JavaScript Engine initialized.');\n\nconst state = {\n  dispatches: 1991,\n  theme: 'modern',\n  particlesActive: true\n};\n` },

  { id: 'c6-t2', start: 224.5, duration: 12.0, type: 'type', buffer: 'js', code: `function dispatchPulse() {\n  state.dispatches += 1;\n  const badge = document.getElementById('stat-dispatch');\n  if (badge) {\n    badge.innerText = state.dispatches.toLocaleString();\n  }\n}\n\n// Trigger continuous state update\nsetInterval(dispatchPulse, 1200);\n` },
  { id: 'c6-interaction-pulse1', start: 238.0, duration: 1.5, type: 'interaction', action: 'trigger-button', selector: '#stat-dispatch' },
  { id: 'c6-pause-js', start: 240.0, duration: 5.0, type: 'pause' },

  // ==========================================
  // CHAPTER 7: 2024 · REACTIVE CANVAS & MICRO-INTERACTIONS (04:05 - 04:45)
  // Generative 60fps HTML5 Canvas particles & dynamic theme toggling
  // ==========================================
  { id: 'c7-init', start: 245.0, duration: 1.0, type: 'chapter', chapterIndex: 7, year: "2024", title: "Reactive Canvas & Micro-Interactions", theme: "Generative 60fps graphics, state management, and real-time reactivity." },
  { id: 'c7-layout', start: 245.0, duration: 1.0, type: 'layout', mode: 'stage-dominant' },

  // Add interactive canvas & interactive controls to HTML buffer
  { id: 'c7-t1', start: 246.5, duration: 13.0, type: 'type', buffer: 'html', code: `    <!-- 2024: Generative Canvas & Interactive Controls -->\n    <div class="interactive-stage-card">\n      <div class="interactive-controls-row">\n        <button type="button" class="era-btn active" id="btn-era-modern">2026 Neo-Glass</button>\n        <button type="button" class="era-btn" id="btn-era-zen">2001 Zen</button>\n        <button type="button" class="era-btn" id="btn-era-cern">1991 CERN</button>\n      </div>\n      <div class="dispatch-counter-wrap">\n        <span class="live-dot"></span>\n        <span id="stat-dispatch">1,991</span> Live Dispatches Synchronized\n      </div>\n    </div>\n` },

  // Interactive cues for theme and era toggle
  { id: 'c7-interact-era-zen', start: 261.0, duration: 3.0, type: 'interaction', action: 'toggle-theme', selector: '#btn-era-zen', value: 'zen' },
  { id: 'c7-interact-era-cern', start: 265.0, duration: 3.0, type: 'interaction', action: 'toggle-theme', selector: '#btn-era-cern', value: 'cern' },
  { id: 'c7-interact-era-modern', start: 269.0, duration: 3.0, type: 'interaction', action: 'toggle-theme', selector: '#btn-era-modern', value: 'modern' },
  { id: 'c7-cam-canvas', start: 273.0, duration: 2.0, type: 'camera', focusSelector: '.interactive-stage-card' },
  { id: 'c7-pause-canvas', start: 275.5, duration: 9.5, type: 'pause' },

  // ==========================================
  // CHAPTER 8: 2026 · THE COMPLETE LIVING WEB PLATFORM (04:45 - 05:25)
  // Full stage takeover, closing HTML tags, majestic culmination
  // ==========================================
  { id: 'c8-init', start: 285.0, duration: 1.0, type: 'chapter', chapterIndex: 8, year: "2026", title: "The Complete Living Web Platform", theme: "From a solitary 'Hello World' to the world's universal application runtime." },
  { id: 'c8-layout', start: 285.0, duration: 1.5, type: 'layout', mode: 'full-stage' },

  { id: 'c8-t1', start: 287.0, duration: 5.0, type: 'type', buffer: 'html', code: `  </main>\n  <footer class="final-colophon">\n    <p>1991: Hello World · 2026: The Web Builds Itself · View Source</p>\n  </footer>\n</body>\n</html>\n` },
  { id: 'c8-cam-finale', start: 293.0, duration: 2.0, type: 'camera', zoom: 1.0, panX: 0, panY: 0 },
  { id: 'c8-hold', start: 295.5, duration: 29.5, type: 'pause' },
];
