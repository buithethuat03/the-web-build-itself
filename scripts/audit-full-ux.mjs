import { chromium, devices } from 'playwright';

async function runComprehensiveAudit() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const consoleErrors = [];

  console.log('--- STARTING COMPREHENSIVE UI/UX AUDIT ---');

  // ==========================================
  // PART 1: DESKTOP (1440x900)
  // ==========================================
  console.log('\n[1/3] Testing Desktop (1440x900)...');
  const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  desktopPage.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(`[Desktop Console Error] ${msg.text()}`);
    }
  });

  await desktopPage.goto('http://localhost:3000');
  await desktopPage.waitForTimeout(1000);
  await desktopPage.screenshot({ path: 'test-results/audit-01-desktop-opening.png' });

  // 45s: Chapter 1 Words
  await desktopPage.evaluate(() => window.timelineEngine?.seek(45));
  await desktopPage.waitForTimeout(1000);
  await desktopPage.screenshot({ path: 'test-results/audit-02-desktop-ch1-words.png' });

  // 180s: Chapter 4 Structure
  await desktopPage.evaluate(() => window.timelineEngine?.seek(180));
  await desktopPage.waitForTimeout(1000);
  await desktopPage.screenshot({ path: 'test-results/audit-03-desktop-ch4-structure.png' });

  // 280s: Chapter 6 Form Input
  await desktopPage.evaluate(() => window.timelineEngine?.seek(280));
  await desktopPage.waitForTimeout(1000);
  await desktopPage.screenshot({ path: 'test-results/audit-04-desktop-ch6-form.png' });

  // 422s: Chapter 9 Vector Graphics
  await desktopPage.evaluate(() => window.timelineEngine?.seek(422));
  await desktopPage.waitForTimeout(1000);
  await desktopPage.screenshot({ path: 'test-results/audit-05-desktop-ch9-vector.png' });

  // 480s: Chapter 10 CSS Arrives
  await desktopPage.evaluate(() => window.timelineEngine?.seek(480));
  await desktopPage.waitForTimeout(1000);
  await desktopPage.screenshot({ path: 'test-results/audit-06-desktop-ch10-css.png' });

  // 568s: Chapter 12 JavaScript Theme Inversion
  await desktopPage.evaluate(() => window.timelineEngine?.seek(568));
  await desktopPage.waitForTimeout(1000);
  await desktopPage.screenshot({ path: 'test-results/audit-07-desktop-ch12-darkmode.png' });

  // 592s: Chapter 13 Finale Glide
  await desktopPage.evaluate(() => window.timelineEngine?.seek(592));
  await desktopPage.waitForTimeout(1000);
  await desktopPage.screenshot({ path: 'test-results/audit-08-desktop-ch13-finale.png' });

  await desktopPage.close();

  // ==========================================
  // PART 2: MOBILE IPHONE 14 (390x844)
  // ==========================================
  console.log('\n[2/3] Testing iPhone 14 (390x844)...');
  const iPhone = devices['iPhone 14'];
  const mobilePage = await browser.newPage({ ...iPhone });
  mobilePage.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(`[iPhone Console Error] ${msg.text()}`);
    }
  });

  await mobilePage.goto('http://localhost:3000');
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({ path: 'test-results/audit-09-mobile-opening.png' });

  // 45s: Chapter 1 in Split mode
  await mobilePage.evaluate(() => window.timelineEngine?.seek(45));
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({ path: 'test-results/audit-10-mobile-ch1-split.png' });

  // Switch to Stage mode
  const stageBtn = await mobilePage.$('button:has-text("Stage")');
  if (stageBtn) {
    await stageBtn.click();
    await mobilePage.waitForTimeout(800);
    await mobilePage.screenshot({ path: 'test-results/audit-11-mobile-ch1-stage.png' });
  }

  // Switch to Code mode
  const codeBtn = await mobilePage.$('button:has-text("Code")');
  if (codeBtn) {
    await codeBtn.click();
    await mobilePage.waitForTimeout(800);
    await mobilePage.screenshot({ path: 'test-results/audit-12-mobile-ch1-code.png' });
  }

  // 480s: Chapter 10 CSS in Stage mode
  if (stageBtn) await stageBtn.click();
  await mobilePage.evaluate(() => window.timelineEngine?.seek(480));
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({ path: 'test-results/audit-13-mobile-ch10-css.png' });

  // 568s: Chapter 12 Dark mode in Stage mode
  await mobilePage.evaluate(() => window.timelineEngine?.seek(568));
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({ path: 'test-results/audit-14-mobile-ch12-darkmode.png' });

  // 592s: Chapter 13 Finale in Full Stage mode
  await mobilePage.evaluate(() => window.timelineEngine?.seek(592));
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({ path: 'test-results/audit-15-mobile-ch13-finale.png' });

  await mobilePage.close();

  // ==========================================
  // PART 3: NARROW ANDROID (360x800)
  // ==========================================
  console.log('\n[3/3] Testing Android (360x800)...');
  const androidPage = await browser.newPage({ viewport: { width: 360, height: 800 }, isMobile: true, hasTouch: true });
  androidPage.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(`[Android Console Error] ${msg.text()}`);
    }
  });

  await androidPage.goto('http://localhost:3000');
  await androidPage.waitForTimeout(1000);
  await androidPage.evaluate(() => window.timelineEngine?.seek(45));
  await androidPage.waitForTimeout(1000);
  await androidPage.screenshot({ path: 'test-results/audit-16-android-360-split.png' });

  // Test touch drag seek on timeline
  const timelineEl = await androidPage.$('.touch-none');
  if (timelineEl) {
    const box = await timelineEl.boundingBox();
    if (box) {
      await androidPage.mouse.move(box.x + 10, box.y + box.height / 2);
      await androidPage.mouse.down();
      await androidPage.mouse.move(box.x + box.width * 0.75, box.y + box.height / 2);
      await androidPage.mouse.up();
      await androidPage.waitForTimeout(1000);
      const newTime = await androidPage.evaluate(() => window.timelineEngine?.getCurrentTime());
      console.log('Scrubbed time on Android via drag:', newTime);
      await androidPage.screenshot({ path: 'test-results/audit-17-android-after-scrub.png' });
    }
  }

  await androidPage.close();
  await browser.close();

  console.log('\n--- AUDIT SUMMARY ---');
  console.log('Total Console Errors:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.error(consoleErrors);
  } else {
    console.log('PASS: ZERO console errors detected across all viewports!');
  }
}

runComprehensiveAudit().catch(console.error);
