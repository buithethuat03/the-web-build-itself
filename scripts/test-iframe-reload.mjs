import { chromium } from 'playwright';

async function testIframeReload() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000');
  
  // Seek to 180s (in Chapter 4, where typing is happening)
  await page.evaluate(() => window.timelineEngine?.seek(180));
  await page.waitForTimeout(1000);

  // Measure iframe reloads over 2 seconds of playback
  await page.evaluate(() => window.timelineEngine?.play());
  
  let navigationCount = 0;
  page.on('framenavigated', frame => {
    if (frame !== page.mainFrame()) {
      navigationCount++;
    }
  });

  await page.waitForTimeout(2000);
  await page.evaluate(() => window.timelineEngine?.pause());
  
  console.log('Iframe reloads in 2 seconds:', navigationCount);
  await browser.close();
}

testIframeReload().catch(console.error);
