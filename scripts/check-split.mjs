import { chromium, devices } from 'playwright';

async function checkSplitLayout() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const iPhone = devices['iPhone 14'];
  const page = await browser.newPage({ ...iPhone });
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(1000);
  
  await page.evaluate(() => window.timelineEngine?.seek(45));
  await page.waitForTimeout(1500);

  const codeBox = await page.evaluate(() => {
    const codeEl = document.querySelector('.custom-scrollbar')?.parentElement;
    return codeEl ? codeEl.getBoundingClientRect() : null;
  });

  const stageBox = await page.evaluate(() => {
    const iframe = document.querySelector('iframe');
    return iframe ? iframe.getBoundingClientRect() : null;
  });

  console.log('Code container box:', codeBox);
  console.log('Stage iframe box:', stageBox);

  await browser.close();
}

checkSplitLayout().catch(console.error);
