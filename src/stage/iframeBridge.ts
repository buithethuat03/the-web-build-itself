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
  const docTitle = titleMatch ? titleMatch[1] : 'The Web Builds Itself';

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

  // Authentic browser-default styles before CSS arrives in Chapter 9
  const basePreCssStyle = `
    <style id="stage-pristine-base">
      html {
        height: 100%;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        scroll-behavior: smooth;
        touch-action: pan-y;
      }
      body {
        margin: 0;
        padding: 2.5rem 1.75rem;
        min-height: 100%;
        box-sizing: border-box;
        font-family: 'Times New Roman', Times, serif;
        background-color: #faf9f6;
        color: #141416;
        transition: background-color 0.5s ease, color 0.5s ease;
        touch-action: pan-y;
        user-select: text;
        -webkit-user-select: text;
      }
      *, *:before, *:after {
        box-sizing: inherit;
      }
      
      /* Classic Unstyled Hyperlink styles */
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

      /* Clean Default Table Appearance before CSS */
      table {
        border-collapse: collapse;
        margin: 1.5rem 0;
        width: 100%;
      }
      th, td {
        border: 1px solid #d5d0c7;
        padding: 8px 12px;
      }
      th {
        background: #f4f1ea;
      }

      /* Default Modern Dialog & Accordion Styling */
      dialog {
        border: 1px solid rgba(20, 20, 22, 0.12);
        border-radius: 18px;
        padding: 2rem;
        max-width: 520px;
        width: 92vw;
        box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.25);
        background: #ffffff;
        color: #141416;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        margin: 0;
      }
      dialog::backdrop {
        background: rgba(20, 20, 22, 0.55);
        backdrop-filter: blur(8px);
      }
      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 1.2rem;
      }
      .modal-close-icon {
        background: none;
        border: none;
        font-size: 1.2rem;
        color: #57606a;
        cursor: pointer;
        padding: 0.3rem 0.6rem;
        border-radius: 6px;
      }
      .modal-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 0.75rem;
        margin: 1.2rem 0;
      }
      .modal-card {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        background: #faf9f6;
        border: 1px solid rgba(20, 20, 22, 0.08);
        border-radius: 10px;
        padding: 0.8rem 1rem;
        text-decoration: none;
        color: inherit;
      }
      .modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 0.75rem;
        margin-top: 1.2rem;
        padding-top: 1rem;
        border-top: 1px solid rgba(20, 20, 22, 0.08);
      }
      .btn-ghost {
        background: transparent;
        border: 1px solid rgba(20, 20, 22, 0.15);
        color: #57606a;
        padding: 0.6rem 1.2rem;
        border-radius: 8px;
        cursor: pointer;
      }
      .btn-primary {
        background: #c84b31;
        color: white;
        border: none;
        padding: 0.6rem 1.4rem;
        border-radius: 8px;
        cursor: pointer;
        text-decoration: none;
        font-weight: 600;
      }

      /* Responsive Adaptations for Mobile Screens */
      @media (max-width: 768px) {
        body {
          padding: 1.5rem 1rem !important;
        }
        h1 {
          font-size: 2rem !important;
          line-height: 1.2 !important;
        }
        .modal-grid {
          grid-template-columns: 1fr !important;
        }
      }
    </style>
  `;

  // Injected CSS buffer from Chapter 9+
  const injectedStyle = cssBuffer.trim().length > 0 ? `
    <style id="showcase-injected-style">
      ${cssBuffer}
    </style>
  ` : '';

  // Synchronizer script for live interactive dialog states and navigation
  const stateSyncScript = `
    <script>
      (function() {
        const state = ${JSON.stringify(interactiveState)};
        
        // Native Dialog Interactivity
        const dialog = document.getElementById('contact-dialog') || document.getElementById('manifest-dialog');
        const openBtn = document.getElementById('btn-open-contact') || document.getElementById('btn-open-manifest');
        const closeBtn = document.getElementById('btn-close-contact') || document.getElementById('btn-close-manifest');
        const closeIcon = document.getElementById('btn-close-icon');

        if (dialog) {
          if (state.dialogOpen && !dialog.open) {
            try { dialog.showModal(); } catch (e) { dialog.setAttribute('open', ''); }
          } else if (!state.dialogOpen && dialog.open) {
            try { dialog.close(); } catch (e) { dialog.removeAttribute('open'); }
          }
        }

        if (openBtn && dialog) {
          openBtn.onclick = function() {
            try { dialog.showModal(); } catch (e) { dialog.setAttribute('open', ''); }
          };
        }
        if (closeBtn && dialog) {
          closeBtn.onclick = function() {
            try { dialog.close(); } catch (e) { dialog.removeAttribute('open'); }
          };
        }
        if (closeIcon && dialog) {
          closeIcon.onclick = function() {
            try { dialog.close(); } catch (e) { dialog.removeAttribute('open'); }
          };
        }

        // Chapter 12 Finale Majestic Vertical Glide
        const chIdx = ${snapshot.chapterIndex};
        const currentTime = ${snapshot.time};
        if (chIdx === 12 && currentTime >= 615) {
          const glideProgress = Math.min(1, Math.max(0, (currentTime - 615) / 5));
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

  // Injected JS buffer from Chapter 11+
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

    // 3. Sync Interactive Dialog State
    const dialog = (doc.getElementById('contact-dialog') || doc.getElementById('manifest-dialog')) as HTMLDialogElement | null;
    if (dialog) {
      if (interactiveState.dialogOpen && !dialog.open) {
        try { dialog.showModal(); } catch (e) { dialog.setAttribute('open', ''); }
      } else if (!interactiveState.dialogOpen && dialog.open) {
        try { dialog.close(); } catch (e) { dialog.removeAttribute('open'); }
      }
    }

    const openBtn = doc.getElementById('btn-open-contact') || doc.getElementById('btn-open-manifest');
    const closeBtn = doc.getElementById('btn-close-contact') || doc.getElementById('btn-close-manifest');
    const closeIcon = doc.getElementById('btn-close-icon');
    if (openBtn && dialog) {
      openBtn.onclick = () => {
        try { dialog.showModal(); } catch (e) { dialog.setAttribute('open', ''); }
      };
    }
    if (closeBtn && dialog) {
      closeBtn.onclick = () => {
        try { dialog.close(); } catch (e) { dialog.removeAttribute('open'); }
      };
    }
    if (closeIcon && dialog) {
      closeIcon.onclick = () => {
        try { dialog.close(); } catch (e) { dialog.removeAttribute('open'); }
      };
    }

    // 4. Smart Auto-scroll & Manual Scroll/Drag Management
    const win = iframe.contentWindow;
    if (win) {
      // Attach listeners to this iframe window instance
      if (!(win as any).__stageScrollTrackerAttached) {
        (win as any).__stageScrollTrackerAttached = true;
        (win as any).__userScrolledUp = false;
        (win as any).__isAutoScrolling = false;
        (win as any).__isUserInteracting = false;
        (win as any).__lastUserInteraction = 0;
        (win as any).__lastChapterIndex = chapterIndex;
        (win as any).__lastFocusSelector = null;
        (win as any).__lastHtmlLen = htmlBuffer.length;
        (win as any).__lastScrollHeight = 0;

        const markUserInteraction = () => {
          (win as any).__isUserInteracting = true;
          (win as any).__lastUserInteraction = Date.now();
          (win as any).__isAutoScrolling = false;
        };

        const onScroll = () => {
          const scrollHeight = Math.max(doc.documentElement.scrollHeight, doc.body ? doc.body.scrollHeight : 0);
          const scrollTop = win.scrollY || doc.documentElement.scrollTop || (doc.body ? doc.body.scrollTop : 0);
          const clientHeight = win.innerHeight || doc.documentElement.clientHeight;
          const distFromBottom = scrollHeight - (scrollTop + clientHeight);

          // If distance from bottom > 50px, the user has scrolled up to inspect earlier content
          if (distFromBottom > 50) {
            (win as any).__userScrolledUp = true;
          } else {
            // User is at or swiped back down near the bottom
            (win as any).__userScrolledUp = false;
          }
        };

        win.addEventListener('scroll', onScroll, { passive: true });
        win.addEventListener('wheel', markUserInteraction, { passive: true });
        win.addEventListener('touchstart', markUserInteraction, { passive: true });
        win.addEventListener('touchmove', markUserInteraction, { passive: true });
        win.addEventListener('touchend', () => {
          (win as any).__lastUserInteraction = Date.now();
          setTimeout(() => { if (win) (win as any).__isUserInteracting = false; }, 400);
        }, { passive: true });

        // Keyboard navigation (Arrow keys, PageUp, PageDown, Space)
        win.addEventListener('keydown', (e: KeyboardEvent) => {
          if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Space', 'Home', 'End'].includes(e.code)) {
            markUserInteraction();
          }
        }, { passive: true });

        // Desktop mouse drag-to-scroll (pan)
        let isMouseDown = false;
        let startY = 0;
        let startScrollTop = 0;

        doc.addEventListener('mousedown', (e: MouseEvent) => {
          const target = e.target as HTMLElement | null;
          // Don't drag if clicking interactive controls (buttons, inputs, links, details)
          if (target && target.closest('button, input, textarea, select, a, summary, dialog')) {
            return;
          }
          isMouseDown = true;
          startY = e.clientY;
          startScrollTop = win.scrollY || doc.documentElement.scrollTop || 0;
          markUserInteraction();
        }, { passive: true });

        doc.addEventListener('mousemove', (e: MouseEvent) => {
          if (!isMouseDown || e.buttons !== 1) {
            isMouseDown = false;
            return;
          }
          const deltaY = e.clientY - startY;
          if (Math.abs(deltaY) > 2) {
            e.preventDefault();
            markUserInteraction();
            win.scrollTo({ top: Math.max(0, startScrollTop - deltaY), behavior: 'auto' });
          }
        }, { passive: false });

        const endMouseDrag = () => {
          if (isMouseDown) {
            isMouseDown = false;
            (win as any).__lastUserInteraction = Date.now();
            setTimeout(() => { if (win) (win as any).__isUserInteracting = false; }, 300);
          }
        };
        doc.addEventListener('mouseup', endMouseDrag, { passive: true });
      }

      // If user is actively touching / dragging or interacted in the last 600ms, DO NOT interrupt them!
      const isUserBusy = (win as any).__isUserInteracting || (Date.now() - ((win as any).__lastUserInteraction || 0) < 600);

      // Chapter 12 Finale Glide
      if (chapterIndex === 12 && time >= 615) {
        if (!isUserBusy) {
          const glideProgress = Math.min(1, Math.max(0, (time - 615) / 5));
          const maxScroll = Math.max(0, doc.documentElement.scrollHeight - win.innerHeight);
          (win as any).__isAutoScrolling = true;
          win.scrollTo({ top: glideProgress * maxScroll, behavior: 'auto' });
          setTimeout(() => { if (win) (win as any).__isAutoScrolling = false; }, 50);
        }
      } else if (camera.focusSelector && camera.focusSelector !== (win as any).__lastFocusSelector) {
        // Camera focus cue: ONLY trigger ONCE when selector changes, NEVER on every frame!
        (win as any).__lastFocusSelector = camera.focusSelector;
        if (!isUserBusy) {
          try {
            const targetEl = doc.querySelector(camera.focusSelector);
            if (targetEl) {
              (win as any).__isAutoScrolling = true;
              targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
              setTimeout(() => { if (win) (win as any).__isAutoScrolling = false; }, 300);
            }
          } catch (e) {}
        }
      } else if (!camera.focusSelector) {
        (win as any).__lastFocusSelector = null;

        // Auto-scroll when NEW CODE / content is typed or document grows:
        // Rule: If the user is at the bottom (!__userScrolledUp) and not actively interacting,
        // scroll down to show the newly added content.
        // If the user has scrolled up to inspect earlier content (__userScrolledUp), DO NOTHING ("giữ nguyên cho họ đang ngắm").
        const scrollHeight = Math.max(doc.documentElement.scrollHeight, doc.body ? doc.body.scrollHeight : 0);
        const clientHeight = win.innerHeight || doc.documentElement.clientHeight;
        const maxScroll = Math.max(0, scrollHeight - clientHeight);
        const currentScrollTop = win.scrollY || doc.documentElement.scrollTop || (doc.body ? doc.body.scrollTop : 0);

        const hasNewContent = htmlBuffer.length > ((win as any).__lastHtmlLen || 0) || scrollHeight > ((win as any).__lastScrollHeight || 0);
        (win as any).__lastHtmlLen = htmlBuffer.length;
        (win as any).__lastScrollHeight = scrollHeight;

        if (hasNewContent && !(win as any).__userScrolledUp && !isUserBusy && maxScroll > currentScrollTop + 4) {
          (win as any).__isAutoScrolling = true;
          win.scrollTo({ top: maxScroll, behavior: 'smooth' });
          setTimeout(() => {
            if (win) (win as any).__isAutoScrolling = false;
          }, 150);
        }
      }
    }
  } catch (err) {
    console.warn('Direct DOM update fallback:', err);
  }
}
