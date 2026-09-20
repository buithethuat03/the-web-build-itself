import { chromium } from 'playwright';

async function printSrcDoc() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(1000);
  await page.evaluate(() => window.timelineEngine?.seek(180));
  await page.waitForTimeout(1000);

  const srcdoc = await page.evaluate(() => {
    return document.querySelector('iframe')?.getAttribute('srcdoc');
  });

  console.log('srcdoc preview:');
  console.log(srcdoc?.slice(0, 500));
  console.log('\n--- BODY SECTION ---');
  const bodyIdx = srcdoc?.indexOf('<body>');
  console.log(srcdoc?.slice(bodyIdx, bodyIdx + 500));

  await browser.close();
}

printSrcDoc().catch(console.error);
