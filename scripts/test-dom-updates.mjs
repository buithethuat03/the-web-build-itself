import { chromium } from 'playwright';

async function testDomUpdates() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000');
  
  await page.evaluate(() => window.timelineEngine?.seek(45));
  await page.waitForTimeout(500);

  const frame = page.frame({ url: /.*/ });
  const text1 = await page.$eval('iframe', el => el.contentDocument?.body?.innerText || '');
  console.log('Text at 45s length:', text1.length, 'preview:', text1.slice(0, 100).replace(/\n/g, ' '));

  await page.evaluate(() => window.timelineEngine?.seek(48));
  await page.waitForTimeout(500);
  const text2 = await page.$eval('iframe', el => el.contentDocument?.body?.innerText || '');
  console.log('Text at 48s length:', text2.length, 'preview:', text2.slice(0, 100).replace(/\n/g, ' '));

  await browser.close();
}

testDomUpdates().catch(console.error);
