import { chromium } from 'playwright';

async function testRange() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000');
  
  for (const t of [170, 175, 180, 185, 190]) {
    await page.evaluate(time => window.timelineEngine?.seek(time), t);
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `test-results/range-${t}.png` });
  }

  await browser.close();
  console.log('Range screenshots done');
}

testRange().catch(console.error);
