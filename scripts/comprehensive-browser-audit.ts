import { chromium, Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

interface AuditFinding {
  severity: 'error' | 'warning' | 'info';
  viewport: string;
  message: string;
}

const findings: AuditFinding[] = [];
const screenshotsDir = path.join(process.cwd(), 'test-results', 'screenshots');

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

async function auditViewport(
  name: string,
  width: number,
  height: number,
  isMobile: boolean = false
) {
  console.log(`\n-----------------------------------------`);
  console.log(`Auditing Viewport: ${name} (${width}x${height}, isMobile=${isMobile})`);
  console.log(`-----------------------------------------`);

  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width, height },
    isMobile,
    hasTouch: isMobile,
    userAgent: isMobile
      ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1'
      : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });

  const page = await context.newPage();

  // 1. Console & error tracking
  const consoleMessages: string[] = [];
  page.on('console', (msg) => {
    const text = msg.text();
    consoleMessages.push(`[${msg.type()}] ${text}`);
    if (msg.type() === 'error') {
      findings.push({
        severity: 'error',
        viewport: name,
        message: `Console Error: ${text}`,
      });
    }
  });

  page.on('pageerror', (err) => {
    findings.push({
      severity: 'error',
      viewport: name,
      message: `Page Uncaught Error: ${err.message}`,
    });
  });

  page.on('requestfailed', (req) => {
    findings.push({
      severity: 'warning',
      viewport: name,
      message: `Request failed: ${req.url()}`,
    });
  });

  // Navigate
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // Capture initial Chapter 0
  const initialShot = path.join(screenshotsDir, `${name}-01-chapter-0-init.png`);
  await page.screenshot({ path: initialShot });
  console.log(`✓ Captured: ${name}-01-chapter-0-init.png`);

  // Check 1: Horizontal overflow
  const hasHorizontalOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth ||
           document.body.scrollWidth > window.innerWidth;
  });

  if (hasHorizontalOverflow) {
    findings.push({
      severity: 'error',
      viewport: name,
      message: `Horizontal viewport overflow detected! (scrollWidth > innerWidth)`,
    });
  } else {
    console.log(`✓ No horizontal viewport overflow detected.`);
  }

  // Check 2: Speed up to 10x to test later chapters
  // Click 10x button in transport controls
  const btn10x = page.locator('button[title*="10x"]');
  if (await btn10x.isVisible()) {
    await btn10x.click();
    console.log(`✓ Activated 10x speed multiplier.`);
  } else {
    // If hidden during Chapter 0, move mouse to show controls
    await page.mouse.move(width / 2, height - 20);
    await page.waitForTimeout(300);
    if (await btn10x.isVisible()) {
      await btn10x.click();
      console.log(`✓ Activated 10x speed multiplier after mouse move.`);
    }
  }

  // Jump to Chapter 1 (Words) - time ~35s
  await page.evaluate(() => {
    // Access timelineEngine via window or simulate seek
    const timeline = (window as any).timelineEngine;
    if (timeline) {
      timeline.seek(35);
    }
  });
  await page.waitForTimeout(600);

  const wordsShot = path.join(screenshotsDir, `${name}-02-chapter-1-words.png`);
  await page.screenshot({ path: wordsShot });
  console.log(`✓ Captured: ${name}-02-chapter-1-words.png`);

  // Jump to Chapter 5 (Data Table) - time ~230s
  await page.evaluate(() => {
    const timeline = (window as any).timelineEngine;
    if (timeline) timeline.seek(230);
  });
  await page.waitForTimeout(600);

  const dataShot = path.join(screenshotsDir, `${name}-03-chapter-5-data.png`);
  await page.screenshot({ path: dataShot });
  console.log(`✓ Captured: ${name}-03-chapter-5-data.png`);

  // Jump to Chapter 10 (CSS Arrives) - time ~490s
  await page.evaluate(() => {
    const timeline = (window as any).timelineEngine;
    if (timeline) timeline.seek(490);
  });
  await page.waitForTimeout(600);

  const cssShot = path.join(screenshotsDir, `${name}-04-chapter-10-css.png`);
  await page.screenshot({ path: cssShot });
  console.log(`✓ Captured: ${name}-04-chapter-10-css.png`);

  // Jump to Chapter 13 (Finale) - time ~590s
  await page.evaluate(() => {
    const timeline = (window as any).timelineEngine;
    if (timeline) timeline.seek(590);
  });
  await page.waitForTimeout(600);

  const finaleShot = path.join(screenshotsDir, `${name}-05-chapter-13-finale.png`);
  await page.screenshot({ path: finaleShot });
  console.log(`✓ Captured: ${name}-05-chapter-13-finale.png`);

  // Check 3: Inspect iframe inside stage
  const iframeHandle = await page.$('iframe');
  if (iframeHandle) {
    const frame = await iframeHandle.contentFrame();
    if (frame) {
      const h1Count = await frame.$$eval('h1', (els) => els.length);
      const tableCount = await frame.$$eval('table', (els) => els.length);
      const formCount = await frame.$$eval('form', (els) => els.length);
      const svgCount = await frame.$$eval('svg', (els) => els.length);

      console.log(`✓ Sandboxed iframe content verified: h1=${h1Count}, table=${tableCount}, form=${formCount}, svg=${svgCount}`);
      if (h1Count === 0 || tableCount === 0 || svgCount === 0) {
        findings.push({
          severity: 'error',
          viewport: name,
          message: `Expected elements missing inside iframe at finale!`,
        });
      }
    }
  } else {
    findings.push({
      severity: 'error',
      viewport: name,
      message: `PreviewStage iframe not found!`,
    });
  }

  // Check 4: Touch targets on mobile
  if (isMobile) {
    const smallTargets = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const smalls: string[] = [];
      buttons.forEach((btn) => {
        const rect = btn.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          if (rect.width < 28 || rect.height < 28) {
            smalls.push(`${btn.getAttribute('aria-label') || btn.innerText || 'btn'}: ${Math.round(rect.width)}x${Math.round(rect.height)}px`);
          }
        }
      });
      return smalls;
    });

    if (smallTargets.length > 0) {
      findings.push({
        severity: 'warning',
        viewport: name,
        message: `Small touch targets on mobile: ${smallTargets.join(', ')}`,
      });
    } else {
      console.log(`✓ Mobile button hit areas meet minimum sizes.`);
    }
  }

  await browser.close();
}

async function runAllAudits() {
  // Expose timelineEngine on window in the app for testing
  console.log('Starting Comprehensive Browser Audit on Laptop and Mobile Viewports...');

  // 1. Laptop / Desktop Viewports
  await auditViewport('desktop-1920x1080', 1920, 1080, false);
  await auditViewport('laptop-1440x900', 1440, 900, false);
  await auditViewport('laptop-1366x768', 1366, 768, false);

  // 2. Tablet Viewport
  await auditViewport('tablet-768x1024', 768, 1024, true);

  // 3. Mobile Viewports
  await auditViewport('mobile-iphone14-390x844', 390, 844, true);
  await auditViewport('mobile-iphonese-375x667', 375, 667, true);
  await auditViewport('mobile-android-360x800', 360, 800, true);

  console.log('\n=========================================');
  console.log(`AUDIT SUMMARY: ${findings.length} findings`);
  console.log('=========================================');

  if (findings.length === 0) {
    console.log('ALL VIEWPORTS PASSED WITH ZERO ERRORS OR WARNINGS!');
  } else {
    findings.forEach((f) => {
      console.log(`[${f.severity.toUpperCase()}] (${f.viewport}): ${f.message}`);
    });
  }
}

runAllAudits().catch((err) => {
  console.error('Fatal error during audit:', err);
  process.exit(1);
});
