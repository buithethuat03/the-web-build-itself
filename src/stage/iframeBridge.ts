import { ShowSnapshot } from '../engine/types';

/**
 * Safely cleans any in-progress tags or unclosed attribute quotes
 * so live streaming characters never flash '<>' or '</>' on the preview stage.
 */
function cleanPartialHtml(rawHtml: string): string {
  if (!rawHtml) return '';

  let sanitized = rawHtml;

  // 1. If there is an unclosed '<' (tag or comment in progress), strip it
  // so incomplete tags never produce '<>' or '</>' or broken elements.
  const lastOpen = sanitized.lastIndexOf('<');
  const lastClose = sanitized.lastIndexOf('>');

  if (lastOpen > lastClose) {
    sanitized = sanitized.slice(0, lastOpen);
  }

  // 2. Prevent stray orphaned '>' if no '<' preceded it
  const firstClose = sanitized.indexOf('>');
  const firstOpen = sanitized.indexOf('<');
  if (firstClose !== -1 && (firstOpen === -1 || firstClose < firstOpen)) {
    sanitized = sanitized.slice(firstClose + 1);
  }

  return sanitized;
}

/**
 * Generates the complete, self-contained HTML document for the sandboxed iframe stage.
 */
export function buildStageDocument(snapshot: ShowSnapshot): string {
  const { htmlBuffer, cssBuffer, jsBuffer, interactiveState } = snapshot;

  // Extract title if present in htmlBuffer
  const titleMatch = htmlBuffer.match(/<title[^>]*>([^<]*)<\/title>/i);
  const docTitle = titleMatch ? titleMatch[1] : 'The History of the World Wide Web';

  // Extract inner body content if htmlBuffer has reached <body>
  let bodyContent = '';
  const bodyMatch = htmlBuffer.match(/<body[^>]*>([\s\S]*)$/i);
  if (bodyMatch) {
    bodyContent = bodyMatch[1].replace(/<\/body>[\s\S]*$/i, '');
  }
  const safeBody = cleanPartialHtml(bodyContent);

  // Google fonts included inside sandbox
  const fontsSnippet = `
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
  `;

  // Base raw styling before CSS arrives + responsive adaptations + 90s retro support
  const basePreCssStyle = `
    <style id="stage-pristine-base">
      html, body {
        margin: 0;
        padding: 2rem 1.5rem;
        min-height: 100vh;
        box-sizing: border-box;
        font-family: 'Times New Roman', Times, serif;
        background-color: #fcfbf9;
        color: #111111;
        transition: background-color 0.5s ease, color 0.5s ease;
      }
      *, *:before, *:after {
        box-sizing: inherit;
      }
      
      /* Classic 1991 CERN Hyperlink styles */
      a {
        color: #0000ee;
        text-decoration: underline;
      }
      a:visited {
        color: #551a8b;
      }
      a:hover {
        color: #c84b31;
      }

      /* 1996 The Wild 90s Web Styles */
      .retro-marquee {
        background: #111827;
        color: #fbbf24;
        font-family: 'Courier New', monospace;
        font-size: 0.85rem;
        font-weight: bold;
        padding: 6px 12px;
        border: 2px ridge #f59e0b;
        margin-bottom: 12px;
      }
      .visitor-counter {
        display: inline-block;
        background: #000000;
        color: #22c55e;
        font-family: 'JetBrains Mono', 'Courier New', monospace;
        font-size: 0.8rem;
        font-weight: bold;
        letter-spacing: 0.15em;
        padding: 4px 10px;
        border: 2px inset #9ca3af;
        margin-top: 10px;
        box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.25);
      }
      .retro-table {
        margin: 1rem 0;
        box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.1);
      }

      /* 2024 Living Canvas & Interactive Controls */
      #ambient-canvas {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        opacity: 0.45;
      }

      .interactive-stage-card {
        position: relative;
        z-index: 10;
        background: rgba(255, 255, 255, 0.85);
        backdrop-filter: blur(16px);
        border: 1px solid rgba(20, 20, 22, 0.1);
        border-radius: 16px;
        padding: 1.5rem;
        margin: 2rem 0;
        box-shadow: 0 12px 32px -8px rgba(0, 0, 0, 0.08);
      }

      .interactive-controls-row {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        margin-bottom: 1rem;
      }

      .era-btn {
        background: #f4f3ef;
        color: #141416;
        border: 1px solid rgba(20, 20, 22, 0.15);
        padding: 0.5rem 1.1rem;
        border-radius: 9999px;
        font-family: 'Instrument Sans', sans-serif;
        font-size: 0.82rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .era-btn:hover, .era-btn.active {
        background: #c84b31;
        color: #ffffff;
        border-color: #c84b31;
        box-shadow: 0 4px 12px rgba(200, 75, 49, 0.3);
      }

      .dispatch-counter-wrap {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.85rem;
        color: #4b5563;
      }

      .live-dot {
        width: 8px;
        height: 8px;
        background: #10b981;
        border-radius: 50%;
        box-shadow: 0 0 8px #10b981;
        animation: pulse-dot 1.5s infinite;
      }
      @keyframes pulse-dot {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.4; transform: scale(0.85); }
      }

      .final-colophon {
        margin-top: 3rem;
        padding-top: 1.5rem;
        border-top: 1px solid rgba(20, 20, 22, 0.1);
        text-align: center;
        font-family: 'Newsreader', serif;
        font-style: italic;
        color: #6b7280;
        font-size: 0.95rem;
      }

      /* Era Themes (Living Runtime Switcher) */
      body.theme-cern {
        background: #18191c !important;
        color: #38bdf8 !important;
        font-family: 'Courier New', monospace !important;
      }
      body.theme-cern a { color: #34d399 !important; }
      body.theme-cern .stat-card, body.theme-cern .interactive-stage-card {
        background: #22242a !important;
        border-color: #38bdf8 !important;
        color: #f1f5f9 !important;
      }

      body.theme-zen {
        background: #faf8f5 !important;
        color: #292524 !important;
        font-family: 'Newsreader', serif !important;
      }

      body.theme-modern {
        background: #0f172a !important;
        color: #f8fafc !important;
      }
      body.theme-modern .stat-card, body.theme-modern .interactive-stage-card {
        background: rgba(30, 41, 59, 0.85) !important;
        border-color: rgba(255, 255, 255, 0.15) !important;
        color: #f8fafc !important;
      }
      body.theme-modern h1, body.theme-modern h2, body.theme-modern h3, body.theme-modern h4 {
        color: #ffffff !important;
      }
      body.theme-modern .dispatch-counter-wrap {
        color: #94a3b8 !important;
      }
      body.theme-modern .final-colophon {
        border-top-color: rgba(255, 255, 255, 0.15) !important;
        color: #94a3b8 !important;
      }

      /* Responsive Adaptations for Mobile Screens */
      @media (max-width: 768px) {
        html, body {
          padding: 1.25rem 0.85rem !important;
        }
        h1 {
          font-size: 1.9rem !important;
          line-height: 1.2 !important;
        }
        .metrics-deck {
          grid-template-columns: 1fr !important;
          gap: 1rem !important;
        }
        .interactive-controls-row {
          gap: 0.5rem !important;
        }
        .era-btn {
          font-size: 0.75rem !important;
          padding: 0.4rem 0.8rem !important;
        }
      }
    </style>
  `;

  // Injected CSS buffer from Chapter 3+
  const injectedStyle = cssBuffer.trim().length > 0 ? `
    <style id="showcase-injected-style">
      ${cssBuffer}
    </style>
  ` : '';

  // Synchronizer script for live interactive inputs, details, dialog states, and canvas particles
  const stateSyncScript = `
    <script>
      (function() {
        const state = ${JSON.stringify(interactiveState)};
        
        // Sync era theme
        if (state.theme) {
          document.body.className = 'theme-' + state.theme;
        }

        // Sync dispatch counter
        const dispatchEl = document.getElementById('stat-dispatch');
        if (dispatchEl && state.dispatches) {
          dispatchEl.innerText = Number(state.dispatches).toLocaleString();
        }

        // Highlight active era button
        const activeBtnId = 'btn-era-' + (state.theme || 'modern');
        document.querySelectorAll('.era-btn').forEach(btn => {
          if (btn.id === activeBtnId) btn.classList.add('active');
          else btn.classList.remove('active');
        });

        // Wire interactive era buttons for direct user clicking
        document.querySelectorAll('.era-btn').forEach(btn => {
          btn.onclick = function() {
            const era = this.id.replace('btn-era-', '');
            document.body.className = 'theme-' + era;
            document.querySelectorAll('.era-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
          };
        });

        // Canvas Generative Particles Background (Chapter 7+)
        let canvas = document.getElementById('ambient-canvas');
        if (!canvas && ${snapshot.chapterIndex} >= 6) {
          canvas = document.createElement('canvas');
          canvas.id = 'ambient-canvas';
          document.body.appendChild(canvas);
        }

        if (canvas) {
          const ctx = canvas.getContext('2d');
          let width = canvas.width = window.innerWidth;
          let height = canvas.height = window.innerHeight;
          window.onresize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
          };

          const particles = [];
          const numParticles = 35;
          for (let i = 0; i < numParticles; i++) {
            particles.push({
              x: Math.random() * width,
              y: Math.random() * height,
              vx: (Math.random() - 0.5) * 0.8,
              vy: (Math.random() - 0.5) * 0.8,
              radius: Math.random() * 2.5 + 1
            });
          }

          let animId;
          function render() {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = document.body.classList.contains('theme-modern') ? 'rgba(56, 189, 248, 0.7)' : 'rgba(200, 75, 49, 0.6)';
            ctx.strokeStyle = document.body.classList.contains('theme-modern') ? 'rgba(56, 189, 248, 0.15)' : 'rgba(200, 75, 49, 0.15)';

            for (let i = 0; i < numParticles; i++) {
              const p = particles[i];
              p.x += p.vx;
              p.y += p.vy;
              if (p.x < 0 || p.x > width) p.vx *= -1;
              if (p.y < 0 || p.y > height) p.vy *= -1;

              ctx.beginPath();
              ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
              ctx.fill();

              for (let j = i + 1; j < numParticles; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                  ctx.beginPath();
                  ctx.moveTo(p.x, p.y);
                  ctx.lineTo(p2.x, p2.y);
                  ctx.stroke();
                }
              }
            }
            animId = requestAnimationFrame(render);
          }
          render();
        }

        // Chapter 8 Finale Majestic Vertical Glide
        const chIdx = ${snapshot.chapterIndex};
        const currentTime = ${snapshot.time};
        if (chIdx === 8 && currentTime >= 290) {
          const glideProgress = Math.min(1, Math.max(0, (currentTime - 290) / 10));
          const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
          window.scrollTo({ top: glideProgress * maxScroll, behavior: 'auto' });
        } else {
          // Smoothly center focused element if camera specifies one
          const focusSel = ${JSON.stringify(snapshot.camera.focusSelector)};
          if (focusSel) {
            try {
              const targetEl = document.querySelector(focusSel);
              if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'auto', block: 'center' });
              }
            } catch (e) {}
          }
        }
      })();
    </script>
  `;

  // Injected JS buffer from Chapter 6+
  const injectedJs = jsBuffer.trim().length > 0 ? `
    <script>
      try {
        ${jsBuffer}
      } catch (err) {
        console.warn('Sandbox script execution:', err);
      }
    </script>
  ` : '';

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${docTitle}</title>
  ${fontsSnippet}
  ${basePreCssStyle}
  ${injectedStyle}
</head>
<body>
  <div id="showcase-body-content">${safeBody}</div>
  ${stateSyncScript}
  ${injectedJs}
</body>
</html>`;
}

/**
 * Direct synchronous DOM update for 60fps flicker-free performance.
 * Eliminates iframe reloads, font flashing, and layout jitter during live typing and timeline seeking.
 */
export function updateStageDocumentDirectly(iframe: HTMLIFrameElement, snapshot: ShowSnapshot): void {
  try {
    const doc = iframe.contentDocument;
    if (!doc || !doc.body) return;

    const { htmlBuffer, cssBuffer, interactiveState, camera, chapterIndex, time } = snapshot;

    // 1. Extract and update body content
    let bodyContent = '';
    const bodyMatch = htmlBuffer.match(/<body[^>]*>([\s\S]*)$/i);
    if (bodyMatch) {
      bodyContent = bodyMatch[1].replace(/<\/body>[\s\S]*$/i, '');
    }
    const safeBody = cleanPartialHtml(bodyContent);

    const bodyContainer = doc.getElementById('showcase-body-content') || doc.body;
    if (bodyContainer.getAttribute('data-raw') !== safeBody) {
      bodyContainer.innerHTML = safeBody;
      bodyContainer.setAttribute('data-raw', safeBody);
    }

    // 2. Update Injected CSS
    let styleEl = doc.getElementById('showcase-injected-style');
    if (!styleEl) {
      styleEl = doc.createElement('style');
      styleEl.id = 'showcase-injected-style';
      doc.head.appendChild(styleEl);
    }
    if (styleEl.textContent !== cssBuffer) {
      styleEl.textContent = cssBuffer;
    }

    // 3. Sync Interactive State & Era Theme
    if (interactiveState.theme) {
      doc.body.className = 'theme-' + interactiveState.theme;
      const activeBtnId = 'btn-era-' + interactiveState.theme;
      doc.querySelectorAll('.era-btn').forEach(btn => {
        if (btn.id === activeBtnId) btn.classList.add('active');
        else btn.classList.remove('active');
      });
    }

    const dispatchEl = doc.getElementById('stat-dispatch');
    if (dispatchEl && interactiveState.dispatches) {
      dispatchEl.innerText = Number(interactiveState.dispatches).toLocaleString();
    }

    // Ensure interactive click handlers stay active on DOM updates
    doc.querySelectorAll('.era-btn').forEach(btn => {
      const buttonEl = btn as HTMLButtonElement;
      buttonEl.onclick = function() {
        const era = buttonEl.id.replace('btn-era-', '');
        doc.body.className = 'theme-' + era;
        doc.querySelectorAll('.era-btn').forEach(b => b.classList.remove('active'));
        buttonEl.classList.add('active');
      };
    });

    // 4. Camera Scrolling / Chapter 8 Finale Glide
    const win = iframe.contentWindow;
    if (win) {
      if (chapterIndex === 8 && time >= 290) {
        const glideProgress = Math.min(1, Math.max(0, (time - 290) / 10));
        const maxScroll = Math.max(0, doc.documentElement.scrollHeight - win.innerHeight);
        win.scrollTo({ top: glideProgress * maxScroll, behavior: 'auto' });
      } else if (camera.focusSelector) {
        try {
          const targetEl = doc.querySelector(camera.focusSelector);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'auto', block: 'center' });
          }
        } catch (e) {}
      }
    }
  } catch (err) {
    console.warn('Direct DOM update fallback:', err);
  }
}
