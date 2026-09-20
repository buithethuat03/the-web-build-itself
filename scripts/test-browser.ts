import { chromium } from 'playwright';

async function testBrowser() {
  console.log('Testing browser launch...');
  const browser = await chromium.launch({
    channel: 'msedge', // Microsoft Edge is built-in on Windows 10/11
    headless: true
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  const title = await page.title();
  console.log('Page title:', title);
  await browser.close();
  console.log('Browser test successful!');
}

testBrowser().catch(err => {
  console.error('Browser launch error:', err);
  process.exit(1);
});
