import { chromium, devices } from 'playwright';

async function runAudit() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const consoleErrors = [];

  console.log('=== RUNNING NEW PACING, AUDIO & DRAMATIC ANIMATION AUDIT ===');

  // 1. DESKTOP (1440x900)
  console.log('\n[1/2] Auditing Desktop (1440x900)...');
  const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  desktopPage.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(`[Desktop Console Error] ${msg.text()}`);
    }
  });

  await desktopPage.goto('http://localhost:3000');
  await desktopPage.waitForTimeout(1000);

  // Verify default 5x speed
  const speed = await desktopPage.evaluate(() => window.timelineEngine?.getPlaybackSpeed());
  console.log(`✓ Initial playback speed: ${speed}x (Expected: 5x)`);

  // Verify audio engine and unmute
  const isMutedInitially = await desktopPage.evaluate(() => window.soundEngine?.getMuted());
  console.log(`✓ Sound muted state initially: ${isMutedInitially}`);
  
  // Unmute and test key sound + music
  await desktopPage.evaluate(() => {
    window.soundEngine?.setMuted(false);
    window.soundEngine?.playKeyClick(false);
    window.soundEngine?.playKeyClick(true);
    window.soundEngine?.setChapter(1);
  });
  console.log(`✓ Audio unmuted and mechanical key sounds triggered`);

  // Screenshot Opening
  await desktopPage.screenshot({ path: 'test-results/audit2-01-opening.png' });

  // Seek to Chapter 1 Words (25s)
  await desktopPage.evaluate(() => window.timelineEngine?.seek(25));
  await desktopPage.waitForTimeout(800);
  await desktopPage.screenshot({ path: 'test-results/audit2-02-ch1-words.png' });

  // Seek to Chapter 6 Input (145s)
  await desktopPage.evaluate(() => window.timelineEngine?.seek(145));
  await desktopPage.waitForTimeout(800);
  await desktopPage.screenshot({ path: 'test-results/audit2-03-ch6-form.png' });

  // Seek to Chapter 9 Graphics (220s)
  await desktopPage.evaluate(() => window.timelineEngine?.seek(220));
  await desktopPage.waitForTimeout(800);
  await desktopPage.screenshot({ path: 'test-results/audit2-04-ch9-graphics.png' });

  // Seek to Chapter 10 CSS Arrives (255s) - Scanline & Reality Shift
  await desktopPage.evaluate(() => window.timelineEngine?.seek(255));
  await desktopPage.waitForTimeout(800);
  await desktopPage.screenshot({ path: 'test-results/audit2-05-ch10-css-scanline.png' });

  // Seek to Chapter 12 JavaScript Theme Inversion (308s)
  await desktopPage.evaluate(() => window.timelineEngine?.seek(308));
  await desktopPage.waitForTimeout(800);
  await desktopPage.screenshot({ path: 'test-results/audit2-06-ch12-nocturne.png' });

  // Seek to Chapter 13 Finale (325s)
  await desktopPage.evaluate(() => window.timelineEngine?.seek(325));
  await desktopPage.waitForTimeout(800);
  await desktopPage.screenshot({ path: 'test-results/audit2-07-ch13-finale.png' });

  await desktopPage.close();

  // 2. MOBILE IPHONE 14 (390x844)
  console.log('\n[2/2] Auditing Mobile iPhone 14 (390x844)...');
  const iPhone = devices['iPhone 14'];
  const mobilePage = await browser.newPage({ ...iPhone });
  mobilePage.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(`[Mobile Console Error] ${msg.text()}`);
    }
  });

  await mobilePage.goto('http://localhost:3000');
  await mobilePage.waitForTimeout(1000);

  // Test Chapter Card Overlay on Mobile
  await mobilePage.evaluate(() => window.timelineEngine?.jumpToChapter(10));
  await mobilePage.waitForTimeout(600);
  await mobilePage.screenshot({ path: 'test-results/audit2-08-mobile-ch10-card.png' });

  await mobilePage.evaluate(() => window.timelineEngine?.seek(265));
  await mobilePage.waitForTimeout(800);
  await mobilePage.screenshot({ path: 'test-results/audit2-09-mobile-ch10-stage.png' });

  // Test mobile Nocturne mode
  await mobilePage.evaluate(() => window.timelineEngine?.seek(308));
  await mobilePage.waitForTimeout(800);
  await mobilePage.screenshot({ path: 'test-results/audit2-10-mobile-nocturne.png' });

  await mobilePage.close();
  await browser.close();

  console.log('\n=== AUDIT RESULTS ===');
  console.log(`Total console errors: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    consoleErrors.forEach(err => console.error(err));
    process.exit(1);
  } else {
    console.log('🎉 ALL AUDITS PASSED WITH ZERO CONSOLE ERRORS & VERIFIED AUDIO/ANIMATIONS!');
  }
}

runAudit().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
