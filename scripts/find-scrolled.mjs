import { chromium, devices } from 'playwright';

async function findScrolledElement() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const iPhone = devices['iPhone 14'];
  const page = await browser.newPage({ ...iPhone });
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(1000);
  
  await page.evaluate(() => window.timelineEngine?.seek(45));
  await page.waitForTimeout(1000);

  const scrolled = await page.evaluate(() => {
    const found = [];
    document.querySelectorAll('*').forEach(el => {
      if (el.scrollTop > 0 || el.scrollLeft > 0) {
        found.push({
          tag: el.tagName,
          className: el.className,
          scrollTop: el.scrollTop,
          scrollLeft: el.scrollLeft,
          scrollHeight: el.scrollHeight,
          clientHeight: el.clientHeight
        });
      }
    });
    return found;
  });

  console.log('Elements with scroll > 0:', JSON.stringify(scrolled, null, 2));
  await browser.close();
}

findScrolledElement().catch(console.error);
