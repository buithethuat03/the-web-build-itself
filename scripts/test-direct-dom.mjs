import { chromium } from 'playwright';

async function testDirectDomAccess() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(1000);
  await page.evaluate(() => window.timelineEngine?.seek(45));
  await page.waitForTimeout(1000);

  const canAccess = await page.evaluate(() => {
    const iframe = document.querySelector('iframe');
    if (!iframe) return 'no iframe';
    try {
      const doc = iframe.contentDocument;
      if (!doc) return 'doc is null';
      doc.body.innerHTML = '<h1 id="test">DIRECT DOM INJECTION WORKS!</h1>';
      return document.querySelector('iframe').contentDocument.getElementById('test')?.innerText;
    } catch (err) {
      return 'Error: ' + err.message;
    }
  });

  console.log('Result:', canAccess);
  await browser.close();
}

testDirectDomAccess().catch(console.error);
