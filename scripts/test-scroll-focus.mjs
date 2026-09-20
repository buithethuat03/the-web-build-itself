import { chromium } from 'playwright';

async function testScrollFocus() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(1000);

  // Seek to 180s (c4-cam-main with focusSelector: '.document-flow')
  await page.evaluate(() => window.timelineEngine?.seek(180));
  await page.waitForTimeout(1000);

  const iframe = page.frame({ url: /.*/ });
  const scrollY = await page.$eval('iframe', el => el.contentWindow?.scrollY);
  const targetRect = await page.$eval('iframe', el => {
    const target = el.contentDocument?.querySelector('.document-flow');
    return target ? target.getBoundingClientRect() : null;
  });

  console.log('ScrollY at 180s:', scrollY);
  console.log('Target .document-flow rect:', targetRect);

  await page.screenshot({ path: 'test-results/debug-c4-scroll.png' });
  await browser.close();
}

testScrollFocus().catch(console.error);
