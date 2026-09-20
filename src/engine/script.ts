import { Cue, ChapterInfo } from './types';

export const CHAPTERS: ChapterInfo[] = [
  { index: 0, year: "2021", title: "The Empty Canvas", theme: "Before code, before architecture, every portfolio begins with an empty document.", startTime: 0, endTime: 37.0 },
  { index: 1, year: "Profile", title: "The Engineer", theme: "Bui The Thuat — Backend Developer & DevOps Engineer based in Hanoi.", startTime: 37.0, endTime: 69.0 },
  { index: 2, year: "Index", title: "Navigation & Overview", theme: "Quick links connecting education, skills, architecture, and projects.", startTime: 69.0, endTime: 93.5 },
  { index: 3, year: "2021–2025", title: "Education & Honors", theme: "UET-VNU B.S. in IT (GPA 3.72 / 4.0) — 4 consecutive years Excellent Student.", startTime: 93.5, endTime: 144.0 },
  { index: 4, year: "Architecture", title: "Distributed System Architecture", theme: "Event-driven microservices engineered with Dapr, Kafka, and Kubernetes.", startTime: 144.0, endTime: 186.5 },
  { index: 5, year: "Tech Stack", title: "Core Technical Arsenal", theme: "Full-stack backend mastery, cloud-native DevOps, and distributed streaming.", startTime: 186.5, endTime: 228.0 },
  { index: 6, year: "2024–2025", title: "Enterprise Experience", theme: "Production systems for securities cashflow (FSS) and omnichannel messaging (DHTE).", startTime: 228.0, endTime: 263.0 },
  { index: 7, year: "Philosophy", title: "Principles & Quick Connect", theme: "Clean Architecture, system resilience, and native contact modal dialog.", startTime: 263.0, endTime: 289.5 },
  { index: 8, year: "Projects", title: "Featured Engineering Projects", theme: "PhoBERT ML Thesis (99.44% Acc), Securities Cashflow, Omnichannel Chat.", startTime: 289.5, endTime: 329.0 },
  { index: 9, year: "Design System", title: "CSS Arrives: The Masterpiece", theme: "Editorial typography and executive layout awaken the portfolio.", startTime: 329.0, endTime: 397.0 },
  { index: 10, year: "Micro-Interactions", title: "Motion & Polish", theme: "Fluid transitions, hover elevation, and accessibility compliance.", startTime: 397.0, endTime: 425.5 },
  { index: 11, year: "Runtime", title: "JavaScript: Living DOM", theme: "Native modal dialog wiring and interactive event execution.", startTime: 425.5, endTime: 449.5 },
  { index: 12, year: "Complete", title: "Bui The Thuat — Portfolio Complete", theme: "Everything you saw was the document. The portfolio builds itself.", startTime: 449.5, endTime: 463.0 }
];

export const TOTAL_DURATION = 463; // 7m 43s at 1x; 3m 51.5s at 2x default speed

export const RAW_CUES: Cue[] = [
  // ==========================================
  // CHAPTER 0: THE EMPTY CANVAS (00:00 - 00:37)
  // Pure stillness. Doctype, html, head, title, body.
  // ==========================================
  { id: 'c0-init', start: 0, duration: 1.0, type: 'chapter', chapterIndex: 0, year: "2021", title: "The Empty Canvas", theme: "Before code, before architecture, every portfolio begins with an empty document." },
  { id: 'c0-layout-init', start: 0, duration: 1.0, type: 'layout', mode: 'blank' },
  { id: 'c0-pause-start', start: 1.0, duration: 2.0, type: 'pause' },

  { id: 'c0-t1', start: 3.0, duration: 4.0, type: 'type', buffer: 'html', code: `<!doctype html>\n` },
  { id: 'c0-t2', start: 7.5, duration: 3.5, type: 'type', buffer: 'html', code: `<html lang="en">\n` },
  { id: 'c0-t3', start: 11.5, duration: 3.0, type: 'type', buffer: 'html', code: `<head>\n` },
  { id: 'c0-t4', start: 15.0, duration: 4.5, type: 'type', buffer: 'html', code: `  <meta charset="UTF-8">\n` },
  { id: 'c0-t5', start: 20.0, duration: 5.5, type: 'type', buffer: 'html', code: `  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n` },
  { id: 'c0-t6', start: 26.0, duration: 5.0, type: 'type', buffer: 'html', code: `  <title>Bui The Thuat — Backend Developer &amp; DevOps</title>\n` },
  { id: 'c0-t7', start: 31.5, duration: 3.0, type: 'type', buffer: 'html', code: `</head>\n<body>\n` },
  { id: 'c0-pause-stillness', start: 34.5, duration: 2.5, type: 'pause' },

  // ==========================================
  // CHAPTER 1: THE ENGINEER (00:37 - 01:09)
  // Stage curtains open (blank -> split)! Hero header arrives.
  // ==========================================
  { id: 'c1-init', start: 37.0, duration: 1.0, type: 'chapter', chapterIndex: 1, year: "Profile", title: "The Engineer", theme: "Bui The Thuat — Backend Developer & DevOps Engineer based in Hanoi." },
  { id: 'c1-layout', start: 37.0, duration: 1.0, type: 'layout', mode: 'split' },
  { id: 'c1-pause-intro', start: 38.0, duration: 1.5, type: 'pause' },

  { id: 'c1-t1', start: 39.5, duration: 5.0, type: 'type', buffer: 'html', code: `  <header id="about" class="hero">\n    <p class="eyebrow">Backend Developer &amp; DevOps · HaNoi, Vietnam</p>\n` },
  { id: 'c1-t2', start: 45.0, duration: 9.0, type: 'type', buffer: 'html', code: `    <h1>Bui The Thuat</h1>\n` },
  { id: 'c1-t3', start: 54.5, duration: 12.0, type: 'type', buffer: 'html', code: `    <p class="lead">Crafting high-throughput distributed backends, event-driven architectures, and resilient Kubernetes infrastructure.</p>\n    <div class="contact-badges">\n      <span class="badge">📱 (+84) 339350174</span>\n      <span class="badge">✉ thuatdk@gmail.com</span>\n      <span class="badge">📍 CauGiay, HaNoi</span>\n      <span class="badge highlight">🎓 UET-VNU · GPA 3.72 / 4.0</span>\n    </div>\n  </header>\n` },
  { id: 'c1-pause-gaze', start: 66.5, duration: 2.5, type: 'pause' },

  // ==========================================
  // CHAPTER 2: NAVIGATION & OVERVIEW (01:09 - 01:33.5)
  // Nav links and anchors connecting the portfolio.
  // ==========================================
  { id: 'c2-init', start: 69.0, duration: 1.0, type: 'chapter', chapterIndex: 2, year: "Index", title: "Navigation & Overview", theme: "Quick links connecting education, skills, architecture, and projects." },
  { id: 'c2-layout', start: 69.0, duration: 1.0, type: 'layout', mode: 'split' },

  { id: 'c2-t1', start: 70.5, duration: 8.0, type: 'type', buffer: 'html', code: `  <nav class="main-nav">\n    <a href="#about">About</a>\n    <a href="#education">Education</a>\n    <a href="#architecture">Architecture</a>\n` },
  { id: 'c2-t2', start: 79.0, duration: 8.0, type: 'type', buffer: 'html', code: `    <a href="#skills">Skills</a>\n    <a href="#experience">Experience</a>\n    <a href="#projects">Projects</a>\n    <a href="#contact">Contact</a>\n  </nav>\n` },
  { id: 'c2-t3', start: 87.5, duration: 3.5, type: 'type', buffer: 'html', code: `  <hr class="divider">\n` },
  { id: 'c2-pause', start: 91.0, duration: 2.5, type: 'pause' },

  // ==========================================
  // CHAPTER 3: EDUCATION & HONORS (01:33.5 - 02:24)
  // UET-VNU B.S. in IT, GPA 3.72/4.0, academic excellence honors.
  // ==========================================
  { id: 'c3-init', start: 93.5, duration: 1.0, type: 'chapter', chapterIndex: 3, year: "2021–2025", title: "Education & Honors", theme: "UET-VNU B.S. in IT (GPA 3.72 / 4.0) — 4 consecutive years Excellent Student." },
  { id: 'c3-layout', start: 93.5, duration: 1.0, type: 'layout', mode: 'split' },

  { id: 'c3-t1', start: 95.0, duration: 5.0, type: 'type', buffer: 'html', code: `  <main>\n    <section id="education">\n      <h2>Education &amp; Academic Honors</h2>\n` },
  { id: 'c3-t2', start: 100.5, duration: 14.0, type: 'type', buffer: 'html', code: `      <div class="edu-card">\n        <div class="edu-header">\n          <h3>UET-VNU (University of Engineering and Technology)</h3>\n          <span class="period">Sep 2021 – June 2025</span>\n        </div>\n` },
  { id: 'c3-t3', start: 115.0, duration: 12.0, type: 'type', buffer: 'html', code: `        <p class="degree">B.S. IN INFORMATION TECHNOLOGY · <strong>GPA: 3.72 / 4.0</strong> · HaNoi, Vietnam</p>\n` },
  { id: 'c3-t4', start: 127.5, duration: 14.0, type: 'type', buffer: 'html', code: `        <ul class="honors-list">\n          <li><strong>2025:</strong> Certificate of Merit for Excellent Student throughout the course, UET</li>\n          <li><strong>2021–2025:</strong> Certificate of Merit for Excellent Student (4 consecutive academic years)</li>\n          <li><strong>2022:</strong> Academic Encouragement Scholarship – Semester 2, UET</li>\n        </ul>\n      </div>\n    </section>\n` },
  { id: 'c3-pause', start: 141.5, duration: 2.5, type: 'pause' },

  // ==========================================
  // ==========================================
  // CHAPTER 4: DISTRIBUTED ARCHITECTURE (02:24 - 03:06.5)
  // Authored SVG diagram: Dapr, Kafka, MQTT, K8s, ScyllaDB.
  // ==========================================
  { id: 'c4-init', start: 144.0, duration: 1.0, type: 'chapter', chapterIndex: 4, year: "Architecture", title: "Distributed System Architecture", theme: "Event-driven microservices engineered with Dapr, Kafka, and Kubernetes." },
  { id: 'c4-layout', start: 144.0, duration: 1.0, type: 'layout', mode: 'split' },

  { id: 'c4-t1', start: 145.5, duration: 6.0, type: 'type', buffer: 'html', code: `    <section id="architecture">\n      <h2>Distributed System Architecture</h2>\n      <figure class="editorial-figure">\n        <svg class="pipeline-diagram" viewBox="0 0 680 180" xmlns="http://www.w3.org/2000/svg">\n` },
  { id: 'c4-t2', start: 152.0, duration: 12.0, type: 'type', buffer: 'html', code: `          <rect width="680" height="180" rx="12" fill="#f4f1ea" stroke="#d5d0c7" stroke-width="1.5"/>\n          <!-- Client Layer -->\n          <rect x="25" y="65" width="105" height="50" rx="8" fill="#ffffff" stroke="#141416" stroke-width="1.2"/>\n          <text x="77" y="88" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="600" fill="#141416">Omnichannel</text>\n          <text x="77" y="103" text-anchor="middle" font-family="monospace" font-size="9" fill="#57606a">FB · Zalo · WA</text>\n          <line x1="130" y1="90" x2="175" y2="90" stroke="#c84b31" stroke-width="2" stroke-dasharray="3 3"/>\n` },
  { id: 'c4-t3', start: 164.5, duration: 11.0, type: 'type', buffer: 'html', code: `          <!-- Services Layer -->\n          <rect x="180" y="45" width="135" height="90" rx="8" fill="#ffffff" stroke="#141416" stroke-width="1.2"/>\n          <text x="247" y="70" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="600" fill="#141416">NestJS / Spring</text>\n          <text x="247" y="86" text-anchor="middle" font-family="monospace" font-size="9" fill="#57606a">Clean Arch · DDD</text>\n          <text x="247" y="102" text-anchor="middle" font-family="monospace" font-size="9" fill="#c84b31">gRPC · Dapr Runtime</text>\n          <line x1="315" y1="90" x2="360" y2="90" stroke="#c84b31" stroke-width="2"/>\n` },
  { id: 'c4-t4', start: 176.0, duration: 8.0, type: 'type', buffer: 'html', code: `          <!-- Event Mesh & Storage -->\n          <rect x="365" y="45" width="135" height="90" rx="8" fill="#ffffff" stroke="#141416" stroke-width="1.2"/>\n          <text x="432" y="70" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="600" fill="#141416">Event Mesh</text>\n          <text x="432" y="86" text-anchor="middle" font-family="monospace" font-size="9" fill="#57606a">Kafka · MQTT Pub/Sub</text>\n          <text x="432" y="102" text-anchor="middle" font-family="monospace" font-size="9" fill="#57606a">ScyllaDB · MongoDB</text>\n          <line x1="500" y1="90" x2="540" y2="90" stroke="#c84b31" stroke-width="2"/>\n          <!-- Cloud Infra -->\n          <rect x="545" y="65" width="110" height="50" rx="8" fill="#ffffff" stroke="#c84b31" stroke-width="1.5"/>\n          <text x="600" y="88" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="600" fill="#c84b31">K8s Cluster</text>\n          <text x="600" y="103" text-anchor="middle" font-family="monospace" font-size="9" fill="#57606a">Prometheus·Grafana</text>\n        </svg>\n        <figcaption>Figure 1.0 — Event-Driven Microservices Architecture with Dapr Pub/Sub, Kafka, and Kubernetes Observability.</figcaption>\n      </figure>\n    </section>\n` },
  { id: 'c4-pause', start: 184.0, duration: 2.5, type: 'pause' },

  // ==========================================
  // CHAPTER 5: TECHNICAL ARSENAL (03:06.5 - 03:48)
  // Structured table of backend, devops, database, streaming skills.
  // ==========================================
  { id: 'c5-init', start: 186.5, duration: 1.0, type: 'chapter', chapterIndex: 5, year: "Tech Stack", title: "Core Technical Arsenal", theme: "Full-stack backend mastery, cloud-native DevOps, and distributed streaming." },
  { id: 'c5-layout', start: 186.5, duration: 1.0, type: 'layout', mode: 'stage-dominant' },

  { id: 'c5-t1', start: 188.0, duration: 7.0, type: 'type', buffer: 'html', code: `    <section id="skills">\n      <h2>Core Technical Skills</h2>\n      <div class="table-container">\n      <table class="data-table">\n` },
  { id: 'c5-t2', start: 195.5, duration: 6.0, type: 'type', buffer: 'html', code: `        <thead>\n          <tr><th>Domain</th><th>Primary Technologies</th><th>Architecture &amp; Observability</th></tr>\n        </thead>\n        <tbody>\n` },
  { id: 'c5-t3', start: 202.0, duration: 12.0, type: 'type', buffer: 'html', code: `          <tr><td><strong>Back-end</strong></td><td>Node.js, NestJS, Spring Boot, Laravel</td><td>GraphQL, REST, gRPC, Clean Architecture</td></tr>\n          <tr><td><strong>DevOps &amp; Cloud</strong></td><td>Docker, Kubernetes, Dapr, GCP, AWS</td><td>Prometheus, Grafana, Loki Monitoring</td></tr>\n          <tr><td><strong>DBMS &amp; Cache</strong></td><td>MySQL, MongoDB, ScyllaDB, Redis</td><td>Multi-tenant Schemas, Scalable Partitioning</td></tr>\n` },
  { id: 'c5-t4', start: 214.5, duration: 11.0, type: 'type', buffer: 'html', code: `          <tr><td><strong>Streaming</strong></td><td>Apache Kafka, MQTT</td><td>Distributed Event Handling, Pub/Sub</td></tr>\n          <tr><td><strong>Languages &amp; OS</strong></td><td>C/C++, Java, TS/JS, PHP, Python</td><td>Git, Postman, Nx, pnpm, Linux, English B1</td></tr>\n        </tbody>\n      </table>\n      </div>\n    </section>\n` },
  { id: 'c5-pause', start: 225.5, duration: 2.5, type: 'pause' },

  // ==========================================
  // CHAPTER 6: ENTERPRISE EXPERIENCE (03:48 - 04:23)
  // Work experience at FSS and DHTE.
  // ==========================================
  { id: 'c6-init', start: 228.0, duration: 1.0, type: 'chapter', chapterIndex: 6, year: "2024–2025", title: "Enterprise Experience", theme: "Production systems for securities cashflow (FSS) and omnichannel messaging (DHTE)." },
  { id: 'c6-layout', start: 228.0, duration: 1.0, type: 'layout', mode: 'split' },

  { id: 'c6-t1', start: 229.5, duration: 8.0, type: 'type', buffer: 'html', code: `    <section id="experience">\n      <h2>Work Experience</h2>\n      <div class="exp-item">\n        <div class="exp-header">\n          <h3>Financial Software Solution — FSS</h3>\n          <span class="exp-period">July 2024 – Sep 2024</span>\n        </div>\n        <p class="role-title">JAVA DEVELOPER INTERN</p>\n` },
  { id: 'c6-t2', start: 238.0, duration: 10.0, type: 'type', buffer: 'html', code: `        <ul class="exp-points">\n          <li>Developed and maintained cash flow management system (cash-in/out, reconciliation) for securities firms using Spring Boot.</li>\n          <li>Deployed and monitored services on Kubernetes clusters, utilizing Prometheus and Grafana for observability.</li>\n        </ul>\n      </div>\n` },
  { id: 'c6-t3', start: 248.5, duration: 12.0, type: 'type', buffer: 'html', code: `      <div class="exp-item">\n        <div class="exp-header">\n          <h3>DH Technology &amp; Education — DHTE</h3>\n          <span class="exp-period">June 2025 – Aug 2025</span>\n        </div>\n        <p class="role-title">BACKEND DEVELOPER FRESHER</p>\n        <ul class="exp-points">\n          <li>Built omnichannel messaging backend integrating Facebook, Zalo, Instagram, WhatsApp, TikTok Shop.</li>\n          <li>Developed microservices with NestJS (Nx monorepo + pnpm) applying Clean Architecture and Domain-Driven Design (DDD).</li>\n          <li>Implemented Dapr pub/sub (Kafka, MQTT) and gRPC for distributed message processing; designed multi-tenant chat schemas in ScyllaDB.</li>\n        </ul>\n      </div>\n    </section>\n` },
  { id: 'c6-pause', start: 260.5, duration: 2.5, type: 'pause' },

  // ==========================================
  // CHAPTER 7: PRINCIPLES & PHILOSOPHY (04:23 - 04:49.5)
  // Clean Architecture philosophy & system design values.
  // ==========================================
  { id: 'c7-init', start: 263.0, duration: 1.0, type: 'chapter', chapterIndex: 7, year: "Philosophy", title: "Engineering Principles", theme: "Clean Architecture, system resilience, and high-throughput reliability." },
  { id: 'c7-layout', start: 263.0, duration: 1.0, type: 'layout', mode: 'split' },

  { id: 'c7-t1', start: 264.5, duration: 10.0, type: 'type', buffer: 'html', code: `    <section id="philosophy">\n      <h2>Engineering Principles</h2>\n      <details class="principles-card" open>\n        <summary>Clean Architecture &amp; System Resilience</summary>\n` },
  { id: 'c7-t2', start: 275.0, duration: 12.0, type: 'type', buffer: 'html', code: `        <p>Software excellence lies in high cohesion, loose coupling, and proactive observability. By decoupling business logic from frameworks and isolating distributed events with Dapr &amp; Kafka, systems scale gracefully across cloud clusters.</p>\n      </details>\n    </section>\n` },
  { id: 'c7-pause', start: 287.0, duration: 2.5, type: 'pause' },

  // ==========================================
  // CHAPTER 8: FEATURED PROJECTS & CONTACT (04:49.5 - 05:29)
  // AI/NLP Thesis, Securities Cashflow, and Quick Connect.
  // ==========================================
  { id: 'c8-init', start: 289.5, duration: 1.0, type: 'chapter', chapterIndex: 8, year: "Projects", title: "Featured Engineering Projects", theme: "PhoBERT ML Thesis (99.44% Acc), Securities Cashflow, and Direct Connect." },
  { id: 'c8-layout', start: 289.5, duration: 1.0, type: 'layout', mode: 'split' },

  { id: 'c8-t1', start: 291.0, duration: 7.0, type: 'type', buffer: 'html', code: `    <section id="projects">\n      <h2>Featured Projects</h2>\n      <div class="project-card">\n        <div class="proj-head">\n          <h3>Automatic Classification of Multiple-Choice Questions</h3>\n          <span class="badge">ML Thesis · 2025</span>\n        </div>\n        <p>Fine-tuned PhoBERT into specialized models (SGDModel &amp; ChapterModel) using a semi-supervised training loop on ~19k labeled and ~32k unlabeled questions. Applied focal loss and early stopping.</p>\n` },
  { id: 'c8-t2', start: 298.5, duration: 9.0, type: 'type', buffer: 'html', code: `        <div class="metric-row">\n          <div class="metric-box"><span>Subject Acc</span><strong>99.44%</strong></div>\n          <div class="metric-box"><span>Grade Acc</span><strong>95.96%</strong></div>\n          <div class="metric-box"><span>Chapter Acc</span><strong>94.09%</strong></div>\n          <div class="metric-box"><span>Difficulty Acc</span><strong>77.20%</strong></div>\n        </div>\n      </div>\n` },
  { id: 'c8-t3', start: 308.0, duration: 8.0, type: 'type', buffer: 'html', code: `      <div class="project-card">\n        <div class="proj-head">\n          <h3>Cash Flow Management System for Securities Companies</h3>\n          <span class="badge">Backend &amp; DevOps</span>\n        </div>\n        <p>Securities cash-in/out and reconciliation microservices built with Spring Boot, Kafka, MySQL, Docker, K8s, Prometheus, and Grafana.</p>\n        <p class="proj-link">🔗 <a href="https://github.com/buithethuat03/cashflow-management-system" target="_blank">github.com/buithethuat03/cashflow-management-system</a></p>\n      </div>\n    </section>\n` },
  { id: 'c8-t4', start: 316.5, duration: 10.0, type: 'type', buffer: 'html', code: `    <section id="contact">\n      <div class="contact-banner">\n        <div class="banner-text">\n          <h3>Let's build resilient backends together</h3>\n          <p>Available for Backend, DevOps &amp; Distributed Systems engineering.</p>\n        </div>\n        <button type="button" id="btn-open-contact" class="btn-primary">Get in Touch →</button>\n      </div>\n      <dialog id="contact-dialog" class="contact-modal">\n        <div class="modal-header">\n          <div>\n            <h3>Get in Touch · Bui The Thuat</h3>\n            <p class="modal-subtitle">Backend Developer &amp; DevOps Engineer · Hanoi, Vietnam</p>\n          </div>\n          <button type="button" id="btn-close-icon" class="modal-close-icon" aria-label="Close">✕</button>\n        </div>\n        <div class="modal-grid">\n          <a href="tel:+84339350174" class="modal-card"><span class="card-icon">📱</span><div class="card-info"><span class="card-label">Phone</span><span class="card-val">(+84) 339350174</span></div></a>\n          <a href="mailto:thuatdk@gmail.com" class="modal-card"><span class="card-icon">✉</span><div class="card-info"><span class="card-label">Email</span><span class="card-val">thuatdk@gmail.com</span></div></a>\n          <a href="https://github.com/buithethuat03" target="_blank" rel="noreferrer" class="modal-card"><span class="card-icon">💻</span><div class="card-info"><span class="card-label">GitHub</span><span class="card-val">github.com/buithethuat03</span></div></a>\n          <div class="modal-card"><span class="card-icon">🎓</span><div class="card-info"><span class="card-label">Education</span><span class="card-val">UET-VNU (GPA 3.72/4.0)</span></div></div>\n        </div>\n        <div class="modal-footer">\n          <button type="button" id="btn-close-contact" class="btn-ghost">Close</button>\n          <a href="mailto:thuatdk@gmail.com" class="btn-primary">Send Direct Email</a>\n        </div>\n      </dialog>\n    </section>\n` },
  { id: 'c8-pause', start: 326.5, duration: 2.5, type: 'pause' },

  // ==========================================
  // CHAPTER 9: CSS ARRIVES: THE MASTERPIECE (05:29 - 06:37)
  // THE BIG TRANSFORMATION! Editorial typography, terracotta accents, executive cards.
  // ==========================================
  { id: 'c9-init', start: 329.0, duration: 1.0, type: 'chapter', chapterIndex: 9, year: "Design System", title: "CSS Arrives: The Masterpiece", theme: "Editorial typography and executive layout awaken the portfolio." },
  { id: 'c9-layout-focus', start: 329.0, duration: 1.0, type: 'layout', mode: 'code-focus' },

  // Step 1: Design Tokens & Typography
  { id: 'c9-t1', start: 330.5, duration: 12.0, type: 'type', buffer: 'css', code: `/* Executive Developer Portfolio Theme */\n:root {\n  --font-serif: 'Newsreader', Georgia, serif;\n  --font-sans: 'Instrument Sans', -apple-system, sans-serif;\n  --font-mono: 'JetBrains Mono', monospace;\n  --bg-page: #faf9f6;\n  --text-main: #141416;\n  --text-muted: #57606a;\n  --terracotta: #c84b31;\n  --border-light: rgba(20, 20, 22, 0.1);\n  --card-bg: #ffffff;\n}\n\n` },

  // Step 2: Page Measure & Section Rhythm
  { id: 'c9-t2', start: 343.0, duration: 10.0, type: 'type', buffer: 'css', code: `html {\n  scroll-behavior: smooth;\n  scroll-padding-top: 4.5rem;\n}\nbody {\n  font-family: var(--font-sans);\n  background-color: var(--bg-page);\n  color: var(--text-main);\n  line-height: 1.7;\n  margin: 0;\n  padding: 3.5rem 2rem;\n}\n\nheader, nav.main-nav, main, footer {\n  max-width: 740px;\n  margin: 0 auto;\n}\n\nheader, section, .project-card, .edu-card, .exp-item, .contact-banner {\n  scroll-margin-top: 4.5rem;\n}\n\n` },

  // Step 3: Typography Hierarchy & Hero Badges
  { id: 'c9-t3', start: 353.5, duration: 11.0, type: 'type', buffer: 'css', code: `h1, h2, h3 {\n  font-family: var(--font-serif);\n  font-weight: 400;\n  letter-spacing: -0.025em;\n}\n\nh1 {\n  font-size: 3.2rem;\n  line-height: 1.15;\n  margin: 0.5rem 0;\n}\n\n.eyebrow {\n  font-family: var(--font-mono);\n  font-size: 0.75rem;\n  letter-spacing: 0.15em;\n  text-transform: uppercase;\n  color: var(--terracotta);\n  font-weight: 600;\n}\n\n.contact-badges {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.6rem;\n  margin: 1.2rem 0 2rem;\n}\n.badge {\n  font-family: var(--font-mono);\n  font-size: 0.8rem;\n  background: #f4f1ea;\n  border: 1px solid var(--border-light);\n  padding: 0.3rem 0.75rem;\n  border-radius: 6px;\n}\n.badge.highlight {\n  background: #fff3f0;\n  border-color: rgba(200, 75, 49, 0.3);\n  color: var(--terracotta);\n  font-weight: 600;\n}\n\n` },

  // Step 4: Layout & Elements (Return to split to watch transformation)
  { id: 'c9-layout-split', start: 365.0, duration: 1.0, type: 'layout', mode: 'split' },
  { id: 'c9-t4', start: 366.0, duration: 14.0, type: 'type', buffer: 'css', code: `nav.main-nav {\n  position: sticky;\n  top: 0;\n  background: rgba(250, 249, 246, 0.95);\n  backdrop-filter: blur(8px);\n  z-index: 25;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.75rem 1.4rem;\n  padding: 0.85rem 0;\n  border-bottom: 1px solid var(--border-light);\n  margin-bottom: 2.5rem;\n  width: 100%;\n}\nhr.divider {\n  display: none;\n}\nnav.main-nav a {\n  color: var(--text-muted);\n  text-decoration: none;\n  font-weight: 500;\n  font-size: 0.88rem;\n  letter-spacing: 0.01em;\n  transition: color 0.2s ease;\n}\nnav.main-nav a:hover {\n  color: var(--terracotta);\n}\n\n.edu-card, .exp-item, .project-card, .principles-card {\n  background: var(--card-bg);\n  border: 1px solid var(--border-light);\n  border-radius: 12px;\n  padding: 1.6rem;\n  margin: 1.5rem 0;\n  box-shadow: 0 4px 20px -4px rgba(0,0,0,0.04);\n}\n.period, .exp-period {\n  font-family: var(--font-mono);\n  font-size: 0.8rem;\n  color: var(--text-muted);\n}\n.role-title {\n  font-family: var(--font-mono);\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: var(--terracotta);\n}\n\ndetails.principles-card summary {\n  list-style: none;\n  font-weight: 600;\n  font-size: 1.05rem;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  color: var(--text-main);\n}\ndetails.principles-card summary::-webkit-details-marker {\n  display: none;\n}\ndetails.principles-card summary::before {\n  content: '▸';\n  color: var(--terracotta);\n  font-size: 1.1rem;\n  transition: transform 0.2s ease;\n}\ndetails.principles-card[open] summary::before {\n  transform: rotate(90deg);\n}\ndetails.principles-card p {\n  margin-top: 1rem;\n  color: var(--text-muted);\n  line-height: 1.7;\n  border-left: 2px solid var(--terracotta);\n  padding-left: 1rem;\n}\n\n.contact-banner {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1.2rem;\n  background: linear-gradient(135deg, #ffffff 0%, #faf6f0 100%);\n  border: 1px solid rgba(200, 75, 49, 0.25);\n  border-radius: 14px;\n  padding: 1.6rem 2rem;\n  margin: 2rem 0;\n  box-shadow: 0 10px 30px -10px rgba(200, 75, 49, 0.1);\n}\n.banner-text h3 {\n  margin: 0 0 0.3rem;\n  font-size: 1.25rem;\n}\n.banner-text p {\n  margin: 0;\n  color: var(--text-muted);\n  font-size: 0.9rem;\n}\n\n` },

  // Step 5: Data Table & Metric Grid
  { id: 'c9-t5', start: 380.5, duration: 14.0, type: 'type', buffer: 'css', code: `svg.pipeline-diagram {\n  max-width: 100%;\n  height: auto;\n  display: block;\n}\n\n.table-container {\n  width: 100%;\n  overflow-x: auto;\n  -webkit-overflow-scrolling: touch;\n}\n\ntable.data-table {\n  width: 100%;\n  border-collapse: collapse;\n  margin: 2rem 0;\n  font-size: 0.9rem;\n}\ntable.data-table th, table.data-table td {\n  padding: 0.85rem 1rem;\n  border-bottom: 1px solid var(--border-light);\n}\ntable.data-table th {\n  background: #f4f1ea;\n  text-align: left;\n}\n\n.metric-row {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));\n  gap: 0.75rem;\n  margin-top: 1rem;\n}\n.metric-box {\n  background: #fdfcfb;\n  border: 1px solid var(--border-light);\n  border-radius: 8px;\n  padding: 0.75rem;\n  text-align: center;\n}\n.metric-box span {\n  display: block;\n  font-size: 0.75rem;\n  color: var(--text-muted);\n  font-family: var(--font-mono);\n}\n.metric-box strong {\n  font-size: 1.25rem;\n  color: var(--terracotta);\n}\n\n.btn-primary {\n  background: var(--terracotta);\n  color: white;\n  border: none;\n  padding: 0.75rem 1.6rem;\n  border-radius: 8px;\n  font-weight: 600;\n  cursor: pointer;\n  font-size: 0.9rem;\n  text-decoration: none;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.btn-ghost {\n  background: transparent;\n  border: 1px solid var(--border-light);\n  color: var(--text-muted);\n  padding: 0.7rem 1.4rem;\n  border-radius: 8px;\n  font-weight: 500;\n  cursor: pointer;\n}\n\n/* Modern Contact Modal */\ndialog.contact-modal {\n  border: 1px solid rgba(20, 20, 22, 0.12);\n  border-radius: 20px;\n  padding: 2.2rem;\n  max-width: 520px;\n  width: 92vw;\n  box-shadow: 0 30px 70px -15px rgba(0, 0, 0, 0.3);\n  background: #ffffff;\n  color: var(--text-main);\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  margin: 0;\n}\ndialog::backdrop {\n  background: rgba(20, 20, 22, 0.55);\n  backdrop-filter: blur(8px);\n}\n.modal-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 1.5rem;\n}\n.modal-header h3 {\n  margin: 0 0 0.3rem;\n  font-size: 1.4rem;\n}\n.modal-subtitle {\n  margin: 0;\n  font-family: var(--font-mono);\n  font-size: 0.8rem;\n  color: var(--text-muted);\n}\n.modal-close-icon {\n  background: none;\n  border: 1px solid transparent;\n  font-size: 1.1rem;\n  color: var(--text-muted);\n  cursor: pointer;\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-close-icon:hover {\n  background: #f4f1ea;\n  border-color: var(--border-light);\n  color: var(--text-main);\n}\n.modal-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.75rem;\n  margin: 1.5rem 0;\n}\n.modal-card {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  background: #faf9f6;\n  border: 1px solid var(--border-light);\n  border-radius: 10px;\n  padding: 0.85rem 1rem;\n  text-decoration: none;\n  color: inherit;\n  transition: all 0.2s ease;\n}\n.modal-card:hover {\n  border-color: var(--terracotta);\n  background: #fffbf9;\n  transform: translateY(-2px);\n}\n.card-icon {\n  font-size: 1.25rem;\n}\n.card-label {\n  display: block;\n  font-family: var(--font-mono);\n  font-size: 0.7rem;\n  color: var(--text-muted);\n  text-transform: uppercase;\n}\n.card-val {\n  font-size: 0.85rem;\n  font-weight: 500;\n  word-break: break-all;\n}\n.modal-footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  margin-top: 1.5rem;\n  padding-top: 1.2rem;\n  border-top: 1px solid var(--border-light);\n}\n` },
  { id: 'c9-pause', start: 394.5, duration: 2.5, type: 'pause' },

  // ==========================================
  // CHAPTER 10: MOTION & MICRO-INTERACTIONS (06:37 - 07:05.5)
  // Subtle transitions, card elevation, reduced motion.
  // ==========================================
  { id: 'c10-init', start: 397.0, duration: 1.0, type: 'chapter', chapterIndex: 10, year: "Micro-Interactions", title: "Motion & Polish", theme: "Fluid transitions, hover elevation, and accessibility compliance." },
  { id: 'c10-layout', start: 397.0, duration: 1.0, type: 'layout', mode: 'split' },

  { id: 'c10-t1', start: 398.5, duration: 12.0, type: 'type', buffer: 'css', code: `\n/* Subtle Fluid Motion & Elevation */\nnav.main-nav a, .btn-primary, .btn-ghost, .project-card, .edu-card, .exp-item, .principles-card, .contact-banner {\n  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);\n}\n\nnav.main-nav a:hover {\n  color: var(--terracotta);\n}\n\n.project-card:hover, .edu-card:hover, .exp-item:hover, .principles-card:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 12px 30px -8px rgba(0, 0, 0, 0.08);\n}\n\n.btn-primary:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 20px rgba(200, 75, 49, 0.3);\n}\n\n` },
  { id: 'c10-t2', start: 411.0, duration: 12.0, type: 'type', buffer: 'css', code: `figure.editorial-figure svg {\n  transition: transform 0.4s ease;\n}\nfigure.editorial-figure:hover svg {\n  transform: scale(1.01);\n}\n\n@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after {\n    animation-duration: 0.01ms !important;\n    transition-duration: 0.01ms !important;\n  }\n}\n` },
  { id: 'c10-pause', start: 423.0, duration: 2.5, type: 'pause' },

  // ==========================================
  // CHAPTER 11: JAVASCRIPT: THE LIVING DOM (07:05.5 - 07:29.5)
  // Real native modal dialog wiring and event listener execution!
  // ==========================================
  { id: 'c11-init', start: 425.5, duration: 1.0, type: 'chapter', chapterIndex: 11, year: "Runtime", title: "JavaScript: Living DOM", theme: "Native modal dialog wiring and interactive event execution." },
  { id: 'c11-layout', start: 425.5, duration: 1.0, type: 'layout', mode: 'split' },

  { id: 'c11-t1', start: 427.0, duration: 14.0, type: 'type', buffer: 'js', code: `// Reactive DOM: Contact Modal Controller\nconst openBtn = document.getElementById('btn-open-contact');\nconst closeBtn = document.getElementById('btn-close-contact');\nconst closeIcon = document.getElementById('btn-close-icon');\nconst dialog = document.getElementById('contact-dialog');\n\nif (openBtn && dialog) {\n  openBtn.addEventListener('click', () => dialog.showModal());\n}\nif (closeBtn && dialog) {\n  closeBtn.addEventListener('click', () => dialog.close());\n}\nif (closeIcon && dialog) {\n  closeIcon.addEventListener('click', () => dialog.close());\n}\n` },
  { id: 'c11-open-dialog', start: 441.5, duration: 3.0, type: 'interaction', action: 'open-dialog', selector: '#btn-open-contact' },
  { id: 'c11-close-dialog', start: 445.0, duration: 2.0, type: 'interaction', action: 'close-dialog', selector: '#btn-close-contact' },
  { id: 'c11-pause', start: 447.0, duration: 2.5, type: 'pause' },

  // ==========================================
  // CHAPTER 12: THE FINISHED CV (07:29.5 - 07:43)
  // Full stage takeover. The completed interactive CV of Bui The Thuat!
  // Code editor returns briefly to close the document.
  // ==========================================
  { id: 'c12-init', start: 449.5, duration: 1.0, type: 'chapter', chapterIndex: 12, year: "Complete", title: "Bui The Thuat — Portfolio Complete", theme: "Everything you saw was the document. The portfolio builds itself." },
  { id: 'c12-layout', start: 449.5, duration: 1.5, type: 'layout', mode: 'full-stage' },

  // Brief return of code editor at 452 to type final closing tags
  { id: 'c12-layout-brief-code', start: 452.0, duration: 1.0, type: 'layout', mode: 'stage-dominant' },
  { id: 'c12-t1', start: 453.5, duration: 5.5, type: 'type', buffer: 'html', code: `    <footer class="final-colophon">\n      <p>Bui The Thuat · Backend Developer &amp; DevOps · UET-VNU (GPA 3.72/4.0) · Hanoi, Vietnam</p>\n    </footer>\n  </main>\n</body>\n</html>\n` },
  { id: 'c12-layout-final-stage', start: 459.5, duration: 1.0, type: 'layout', mode: 'full-stage' },
  { id: 'c12-hold', start: 460.5, duration: 2.5, type: 'pause' }
];
