import { chromium } from 'playwright';

async function check180() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(1000);
  await page.evaluate(() => window.timelineEngine?.seek(180));
  await page.waitForTimeout(1000);

  const data = await page.evaluate(() => {
    const iframe = document.querySelector('iframe');
    const doc = iframe?.contentDocument;
    return {
      iframeFound: !!iframe,
      srcDocLength: iframe?.getAttribute('srcdoc')?.length,
      bodyHtml: doc?.body?.innerHTML?.slice(0, 300),
      scrollY: iframe?.contentWindow?.scrollY,
      bodyHeight: doc?.body?.scrollHeight,
      viewportHeight: iframe?.contentWindow?.innerHeight
    };
  });

  console.log('180s data:', data);
  await browser.close();
}

check180().catch(console.error);
