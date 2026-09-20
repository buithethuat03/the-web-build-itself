import { chromium } from 'playwright';

async function find404() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  
  page.on('response', resp => {
    if (resp.status() >= 400) {
      console.log('>>> ERROR HTTP RESPONSE:', resp.status(), resp.url());
    }
  });

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('>>> CONSOLE ERROR:', msg.text(), msg.location());
    }
  });

  await page.goto('http://localhost:3000');
  await page.waitForTimeout(1000);

  // Seek across chapters to catch any lazy resources
  for (const t of [35, 130, 230, 340, 380, 420, 480, 560, 590]) {
    await page.evaluate((time) => {
      (window as any).timelineEngine.seek(time);
    }, t);
    await page.waitForTimeout(400);
  }

  await browser.close();
}

find404().catch(console.error);
