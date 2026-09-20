import { chromium } from 'playwright';

async function examineUserExperience() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:3000');
  
  // Take screenshot at 1s (Initial load)
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'test-results/ux-review-01-opening.png' });

  // Take screenshot at 45s (Chapter 1 Words)
  await page.evaluate(() => (window as any).timelineEngine.seek(45));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'test-results/ux-review-02-chapter1.png' });

  // Take screenshot at 180s (Chapter 4 Structure)
  await page.evaluate(() => (window as any).timelineEngine.seek(180));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'test-results/ux-review-03-chapter4.png' });

  // Take screenshot at 480s (Chapter 10 CSS transformation)
  await page.evaluate(() => (window as any).timelineEngine.seek(480));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'test-results/ux-review-04-chapter10-css.png' });

  // Take screenshot at 590s (Chapter 13 Finale)
  await page.evaluate(() => (window as any).timelineEngine.seek(590));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'test-results/ux-review-05-finale.png' });

  await browser.close();
  console.log('UX Review screenshots captured.');
}

examineUserExperience().catch(console.error);
