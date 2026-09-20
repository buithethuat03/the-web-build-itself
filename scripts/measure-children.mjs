import { chromium, devices } from 'playwright';

async function measureDirectChildren() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const iPhone = devices['iPhone 14'];
  const page = await browser.newPage({ ...iPhone });
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(1000);
  
  await page.evaluate(() => window.timelineEngine?.seek(45));
  await page.waitForTimeout(1000);

  const directChildren = await page.evaluate(() => {
    const parent = document.querySelector('.relative.w-screen');
    if (!parent) return [];
    return Array.from(parent.children).map(child => {
      const rect = child.getBoundingClientRect();
      const style = window.getComputedStyle(child);
      return {
        tag: child.tagName,
        className: child.className.slice(0, 40),
        position: style.position,
        height: rect.height,
        offsetHeight: child.offsetHeight,
        top: rect.top,
        bottom: rect.bottom
      };
    });
  });

  console.log('Direct children:', JSON.stringify(directChildren, null, 2));
  await browser.close();
}

measureDirectChildren().catch(console.error);
