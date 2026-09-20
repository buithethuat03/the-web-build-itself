import { chromium } from 'playwright';

async function testSingleShot() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(500);

  // Seek to 490s
  await page.evaluate(() => {
    (window as any).timelineEngine.seek(490);
  });
  await page.waitForTimeout(1000);

  // Take screenshot of iframe
  const iframe = await page.$('iframe');
  if (iframe) {
    await iframe.screenshot({ path: 'test-results/screenshots/iframe-only-490.png' });
    console.log('Saved iframe-only-490.png');
  }

  // Also take screenshot of the entire stage container
  const stage = await page.$('.relative.flex-1.w-full.h-full');
  if (stage) {
    await stage.screenshot({ path: 'test-results/screenshots/stage-only-490.png' });
    console.log('Saved stage-only-490.png');
  }

  await browser.close();
}

testSingleShot().catch(console.error);
