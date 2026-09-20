import { checkpointEngine } from '../src/engine/checkpointEngine';
import { buildStageDocument } from '../src/stage/iframeBridge';

const snap230 = checkpointEngine.getSnapshotAt(230);
console.log('--- Snapshot at 230s (Chapter 5) ---');
console.log('layoutMode:', snap230.layoutMode);
console.log('camera:', snap230.camera);
console.log('htmlBuffer length:', snap230.htmlBuffer.length);
console.log('cssBuffer length:', snap230.cssBuffer.length);

const snap490 = checkpointEngine.getSnapshotAt(490);
console.log('\n--- Snapshot at 490s (Chapter 10) ---');
console.log('layoutMode:', snap490.layoutMode);
console.log('camera:', snap490.camera);
console.log('htmlBuffer length:', snap490.htmlBuffer.length);
console.log('cssBuffer length:', snap490.cssBuffer.length);
console.log('cssBuffer snippet:', snap490.cssBuffer.slice(0, 200));

const doc490 = buildStageDocument(snap490);
console.log('doc490 length:', doc490.length);
