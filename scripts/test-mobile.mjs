import { chromium, devices } from 'playwright';

async function testMobile() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  
  const iPhone = devices['iPhone 14'];
  const page = await browser.newPage({ ...iPhone });
  
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'test-results/mobile-01-opening.png' });
  
  // Chapter 1
  await page.evaluate(() => window.timelineEngine?.seek(45));
  await page.waitForTimeout(1200);
  await page.screenshot({ path: 'test-results/mobile-02-ch1-split.png' });

  // Switch to Stage view on mobile
  const stageTab = await page.$('button:has-text("Stage")');
  if (stageTab) {
    await stageTab.click();
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'test-results/mobile-03-ch1-stage.png' });
  }

  // Switch to Code view on mobile
  const codeTab = await page.$('button:has-text("Code")');
  if (codeTab) {
    await codeTab.click();
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'test-results/mobile-04-ch1-code.png' });
  }

  // Seek to CSS Chapter 10 in Stage mode
  if (stageTab) await stageTab.click();
  await page.evaluate(() => window.timelineEngine?.seek(480));
  await page.waitForTimeout(1200);
  await page.screenshot({ path: 'test-results/mobile-05-ch10-stage.png' });

  // Seek to Finale
  await page.evaluate(() => window.timelineEngine?.seek(590));
  await page.waitForTimeout(1200);
  await page.screenshot({ path: 'test-results/mobile-06-finale.png' });

  await browser.close();
  console.log('Mobile screenshots captured successfully.');
}

testMobile().catch(console.error);
