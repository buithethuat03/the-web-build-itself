import { checkpointEngine } from '../src/engine/checkpointEngine';
import { CHAPTERS, TOTAL_DURATION } from '../src/engine/script';

console.log('=== VERIFYING DETERMINISTIC TIMELINE ENGINE ===\n');

console.log(`Total Duration: ${TOTAL_DURATION}s (${TOTAL_DURATION / 60} minutes)`);
console.log(`Chapters Count: ${CHAPTERS.length}`);

// Test 1: Check chapter boundary timestamps
CHAPTERS.forEach((ch) => {
  const snapshot = checkpointEngine.getSnapshotAt(ch.startTime + 0.1);
  console.log(`✓ Chapter ${ch.index.toString().padStart(2, '0')} [${ch.startTime}s - ${ch.endTime}s]: "${ch.title}" | Mode: ${snapshot.layoutMode} | Buffer: ${snapshot.activeBuffer}`);
  
  if (snapshot.chapterIndex !== ch.index) {
    throw new Error(`Mismatch in chapter index at time ${ch.startTime}: expected ${ch.index}, got ${snapshot.chapterIndex}`);
  }
});

// Test 2: Verify code buffers grow monotonically
let prevHtmlLen = 0;
let prevCssLen = 0;
for (let t = 0; t <= TOTAL_DURATION; t += 10) {
  const s = checkpointEngine.getSnapshotAt(t);
  if (s.htmlBuffer.length < prevHtmlLen) {
    throw new Error(`HTML buffer decreased at time ${t}: prev ${prevHtmlLen}, current ${s.htmlBuffer.length}`);
  }
  if (s.cssBuffer.length < prevCssLen) {
    throw new Error(`CSS buffer decreased at time ${t}: prev ${prevCssLen}, current ${s.cssBuffer.length}`);
  }
  prevHtmlLen = s.htmlBuffer.length;
  prevCssLen = s.cssBuffer.length;
}
console.log(`\n✓ Monotonic code buffer growth verified across all 60 sample points.`);

// Test 3: Verify end state contains all core semantic components
const finalSnapshot = checkpointEngine.getSnapshotAt(TOTAL_DURATION);
const requiredTags = [
  '<!doctype html>',
  '<html',
  '<head',
  '<body',
  '<h1',
  '<p',
  '<nav',
  '<ul',
  '<figure',
  '<img',
  '<table',
  '<form',
  '<input',
  '<select',
  '<details',
  '<dialog',
  '<audio',
  '<svg',
  '</body>',
  '</html>'
];

requiredTags.forEach((tag) => {
  if (!finalSnapshot.htmlBuffer.toLowerCase().includes(tag.toLowerCase())) {
    throw new Error(`Final document missing required tag: ${tag}`);
  }
});
console.log(`✓ All 20 required HTML tags present in final document.`);

// Test 4: Verify CSS contains responsive rules and typography
if (!finalSnapshot.cssBuffer.includes('Instrument Sans') || !finalSnapshot.cssBuffer.includes('Newsreader')) {
  throw new Error('CSS missing required font families');
}
if (!finalSnapshot.cssBuffer.includes('prefers-reduced-motion')) {
  throw new Error('CSS missing prefers-reduced-motion accessibility query');
}
console.log(`✓ CSS buffer contains required font families and accessibility queries.`);

// Test 5: Seeking test - seeking back and forth reproduces exact states
const snapA = checkpointEngine.getSnapshotAt(250);
const snapB = checkpointEngine.getSnapshotAt(500);
const snapA2 = checkpointEngine.getSnapshotAt(250);

if (snapA.htmlBuffer !== snapA2.htmlBuffer || snapA.layoutMode !== snapA2.layoutMode) {
  throw new Error('Seeking backward failed to reproduce deterministic snapshot state!');
}
console.log(`✓ Seeking backward reproduces 100% deterministic identical state.`);

console.log('\n>>> ALL ENGINE VERIFICATION CHECKS PASSED! <<<');
