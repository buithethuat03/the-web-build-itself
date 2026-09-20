import { chromium } from 'playwright';

async function inspectIframe() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(500);

  // Seek to 490s
  await page.evaluate(() => {
    (window as any).timelineEngine.seek(490);
  });
  await page.waitForTimeout(1000);

  const iframe = await page.$('iframe');
  if (iframe) {
    const frame = await iframe.contentFrame();
    if (frame) {
      const bodyHtml = await frame.evaluate(() => document.body.innerHTML);
      console.log('Iframe Body HTML length:', bodyHtml.length);
      console.log('Iframe Body HTML first 300 chars:\n', bodyHtml.slice(0, 300));
      
      const bodyBox = await frame.evaluate(() => {
        const b = document.body;
        return {
          scrollWidth: b.scrollWidth,
          scrollHeight: b.scrollHeight,
          offsetWidth: b.offsetWidth,
          offsetHeight: b.offsetHeight,
          color: window.getComputedStyle(b).color,
          bg: window.getComputedStyle(b).backgroundColor,
          h1Color: document.querySelector('h1') ? window.getComputedStyle(document.querySelector('h1')!).color : 'no-h1',
          h1Display: document.querySelector('h1') ? window.getComputedStyle(document.querySelector('h1')!).display : 'no-h1',
          h1OffsetTop: document.querySelector('h1') ? (document.querySelector('h1') as HTMLElement).offsetTop : -1,
        };
      });
      console.log('Body box computed styles:', bodyBox);
    }
  }

  await browser.close();
}

inspectIframe().catch(console.error);
