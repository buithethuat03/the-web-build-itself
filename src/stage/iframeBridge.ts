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

      /* Default Native Dialog Styling */
      dialog {
        border: 1px solid rgba(20, 20, 22, 0.2);
        border-radius: 12px;
        padding: 2rem;
        max-width: 480px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        background: #ffffff;
        color: #141416;
      }
      dialog::backdrop {
        background: rgba(20, 20, 22, 0.4);
        backdrop-filter: blur(4px);
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
        const dialog = document.getElementById('manifest-dialog');
        const openBtn = document.getElementById('btn-open-manifest');
        const closeBtn = document.getElementById('btn-close-manifest');

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
    const dialog = doc.getElementById('manifest-dialog') as HTMLDialogElement | null;
    if (dialog) {
      if (interactiveState.dialogOpen && !dialog.open) {
        try { dialog.showModal(); } catch (e) { dialog.setAttribute('open', ''); }
      } else if (!interactiveState.dialogOpen && dialog.open) {
        try { dialog.close(); } catch (e) { dialog.removeAttribute('open'); }
      }
    }

    const openBtn = doc.getElementById('btn-open-manifest');
    const closeBtn = doc.getElementById('btn-close-manifest');
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

    // 4. Smart Auto-scroll & Camera Positioning
    const win = iframe.contentWindow;
    if (win) {
      // Initialize scroll tracker if not already attached to this iframe window
      if (!(win as any).__stageScrollTrackerAttached) {
        (win as any).__stageScrollTrackerAttached = true;
        (win as any).__userScrolledUp = false;
        (win as any).__isAutoScrolling = false;
        (win as any).__lastChapterIndex = chapterIndex;

        const onScroll = () => {
          if ((win as any).__isAutoScrolling) return;

          const scrollHeight = Math.max(doc.documentElement.scrollHeight, doc.body ? doc.body.scrollHeight : 0);
          const scrollTop = win.scrollY || doc.documentElement.scrollTop || (doc.body ? doc.body.scrollTop : 0);
          const clientHeight = win.innerHeight || doc.documentElement.clientHeight;
          const distFromBottom = scrollHeight - (scrollTop + clientHeight);

          // If distance from bottom > 65px, the user has scrolled up to inspect earlier content
          if (distFromBottom > 65) {
            (win as any).__userScrolledUp = true;
          } else {
            // User is at or swiped back down near the bottom
            (win as any).__userScrolledUp = false;
          }
        };

        win.addEventListener('scroll', onScroll, { passive: true });
        win.addEventListener('wheel', () => { (win as any).__isAutoScrolling = false; }, { passive: true });
        win.addEventListener('touchstart', () => { (win as any).__isAutoScrolling = false; }, { passive: true });
      }

      // Reset scroll lock when entering a new chapter or seeking so user follows the new chapter
      if ((win as any).__lastChapterIndex !== chapterIndex) {
        (win as any).__lastChapterIndex = chapterIndex;
        (win as any).__userScrolledUp = false;
      }

      if (chapterIndex === 12 && time >= 615) {
        const glideProgress = Math.min(1, Math.max(0, (time - 615) / 5));
        const maxScroll = Math.max(0, doc.documentElement.scrollHeight - win.innerHeight);
        (win as any).__isAutoScrolling = true;
        win.scrollTo({ top: glideProgress * maxScroll, behavior: 'auto' });
        setTimeout(() => { if (win) (win as any).__isAutoScrolling = false; }, 50);
      } else if (camera.focusSelector) {
        try {
          const targetEl = doc.querySelector(camera.focusSelector);
          if (targetEl) {
            (win as any).__isAutoScrolling = true;
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => { if (win) (win as any).__isAutoScrolling = false; }, 200);
          }
        } catch (e) {}
      } else {
        // Smart auto-scroll:
        // When user scrolls down near bottom (or is at bottom), auto-scroll down to show newly added code/content.
        // When user has scrolled up to inspect earlier content, DO NOT auto-scroll ("giữ nguyên cho họ đang ngắm").
        if (!(win as any).__userScrolledUp) {
          const scrollHeight = Math.max(doc.documentElement.scrollHeight, doc.body ? doc.body.scrollHeight : 0);
          const clientHeight = win.innerHeight || doc.documentElement.clientHeight;
          const maxScroll = Math.max(0, scrollHeight - clientHeight);
          const currentScrollTop = win.scrollY || doc.documentElement.scrollTop || (doc.body ? doc.body.scrollTop : 0);

          if (maxScroll > currentScrollTop + 4) {
            (win as any).__isAutoScrolling = true;
            win.scrollTo({ top: maxScroll, behavior: 'smooth' });
            setTimeout(() => {
              if (win) (win as any).__isAutoScrolling = false;
            }, 100);
          }
        }
      }
    }
  } catch (err) {
    console.warn('Direct DOM update fallback:', err);
  }
}
