import { chromium, devices } from 'playwright';

async function debugMobile() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const iPhone = devices['iPhone 14'];
  const page = await browser.newPage({ ...iPhone });
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(1000);
  
  await page.evaluate(() => window.timelineEngine?.seek(45));
  await page.waitForTimeout(1000);
  
  const stageTab = await page.$('button:has-text("Stage")');
  if (stageTab) await stageTab.click();
  await page.waitForTimeout(1000);
  
  const iframeHandle = await page.$('iframe');
  const frame = await iframeHandle.contentFrame();
  const bodyHtml = await frame.evaluate(() => document.body?.outerHTML || '');
  const scrollY = await frame.evaluate(() => window.scrollY);
  const innerHeight = await frame.evaluate(() => window.innerHeight);
  const h1Rect = await frame.evaluate(() => {
    const el = document.getElementById('masthead');
    return el ? JSON.stringify(el.getBoundingClientRect()) : 'NOT FOUND';
  });
  
  console.log('ScrollY:', scrollY, 'InnerHeight:', innerHeight);
  console.log('h1Rect:', h1Rect);
  console.log('Body HTML length:', bodyHtml.length);
  console.log('Body HTML preview:', bodyHtml.slice(0, 400));
  
  await page.screenshot({ path: 'test-results/debug-stage-shot.png' });
  await browser.close();
}

debugMobile().catch(console.error);
