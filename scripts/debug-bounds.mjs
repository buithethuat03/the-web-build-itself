import { chromium, devices } from 'playwright';

async function debugBounds() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const iPhone = devices['iPhone 14'];
  const page = await browser.newPage({ ...iPhone });
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(1000);
  
  await page.evaluate(() => window.timelineEngine?.seek(45));
  await page.waitForTimeout(1000);

  const rects = await page.evaluate(() => {
    const results = [];
    const root = document.querySelector('#root') || document.body;
    function walk(el, depth = 0) {
      const r = el.getBoundingClientRect();
      const tag = el.tagName.toLowerCase();
      const cls = el.className ? el.className.toString().slice(0, 30) : '';
      results.push({ tag, cls, top: r.top, bottom: r.bottom, height: r.height, depth });
      for (const child of el.children) {
        walk(child, depth + 1);
      }
    }
    walk(document.body);
    return results;
  });

  console.log('Window scrollY:', await page.evaluate(() => window.scrollY));
  console.log('DOM rects:');
  for (const r of rects.slice(0, 20)) {
    console.log(' '.repeat(r.depth * 2) + `${r.tag}.${r.cls} -> top: ${r.top}, bottom: ${r.bottom}, h: ${r.height}`);
  }

  await browser.close();
}

debugBounds().catch(console.error);
