import { Cue, ChapterInfo, ShowSnapshot, LayoutMode, TargetBuffer, CameraState, TypeCue } from './types';
import { CHAPTERS, RAW_CUES, TOTAL_DURATION } from './script';

export interface CompiledCueTimeline {
  cues: Cue[];
  chapters: ChapterInfo[];
  totalDuration: number;
}

export class CheckpointEngine {
  private cues: Cue[];
  private chapters: ChapterInfo[];
  public totalDuration: number;

  constructor() {
    // Sort cues by start time
    this.cues = [...RAW_CUES].sort((a, b) => a.start - b.start);
    this.chapters = CHAPTERS;
    this.totalDuration = TOTAL_DURATION;
  }

  public getChapters(): ChapterInfo[] {
    return this.chapters;
  }

  public getChapterForTime(t: number): ChapterInfo {
    for (let i = this.chapters.length - 1; i >= 0; i--) {
      if (t >= this.chapters[i].startTime) {
        return this.chapters[i];
      }
    }
    return this.chapters[0];
  }

  /**
   * Deterministically calculates the state snapshot at any millisecond timestamp t
   */
  public getSnapshotAt(t: number): ShowSnapshot {
    const clampedTime = Math.max(0, Math.min(t, this.totalDuration));
    const currentChapter = this.getChapterForTime(clampedTime);

    let htmlBuffer = '';
    let cssBuffer = '';
    let jsBuffer = '';
    let activeBuffer: TargetBuffer = 'html';
    let layoutMode: LayoutMode = currentChapter.index === 0 ? 'blank' : 'split';
    let camera: CameraState = { zoom: 1, panX: 0, panY: 0, focusSelector: null };
    let isTyping = false;
    let typingCodeChunk = '';
    let activeCharIndex = 0;
    let totalCharsTyped = 0;
    const interactiveState: Record<string, any> = {
      readerName: '',
      sliderValue: 75,
      detailsOpen: true,
      dialogOpen: false,
      theme: 'archival',
      era: 'modern',
      dispatches: 1991
    };

    // Iterate through all cues up to clampedTime
    for (const cue of this.cues) {
      if (cue.start > clampedTime) {
        break;
      }

      const cueElapsed = clampedTime - cue.start;
      const isCueFinished = cueElapsed >= cue.duration;

      switch (cue.type) {
        case 'layout':
          layoutMode = cue.mode;
          break;

        case 'camera':
          camera = {
            zoom: cue.zoom ?? camera.zoom,
            panX: cue.panX ?? camera.panX,
            panY: cue.panY ?? camera.panY,
            focusSelector: cue.focusSelector ?? null
          };
          break;

        case 'type': {
          activeBuffer = cue.buffer;
          const codeToType = cue.code;
          const totalChars = codeToType.length;

          if (isCueFinished) {
            // Entire chunk is committed
            if (cue.buffer === 'html') htmlBuffer += codeToType;
            else if (cue.buffer === 'css') cssBuffer += codeToType;
            else if (cue.buffer === 'js') jsBuffer += codeToType;
            totalCharsTyped += totalChars;
          } else {
            // Partial typing progress
            isTyping = true;
            const progress = Math.min(1, Math.max(0, cueElapsed / cue.duration));
            const charsToTake = Math.floor(progress * totalChars);
            const partialCode = codeToType.slice(0, charsToTake);

            if (cue.buffer === 'html') htmlBuffer += partialCode;
            else if (cue.buffer === 'css') cssBuffer += partialCode;
            else if (cue.buffer === 'js') jsBuffer += partialCode;

            typingCodeChunk = codeToType;
            activeCharIndex = charsToTake;
            totalCharsTyped += charsToTake;
          }
          break;
        }

        case 'interaction': {
          if (cue.action === 'input') {
            interactiveState.readerName = isCueFinished ? String(cue.value) : String(cue.value).slice(0, Math.floor((cueElapsed / cue.duration) * String(cue.value).length));
          } else if (cue.action === 'slider') {
            interactiveState.sliderValue = isCueFinished ? cue.value : 75 + ((Number(cue.value) - 75) * (cueElapsed / cue.duration));
          } else if (cue.action === 'toggle-details') {
            interactiveState.detailsOpen = !isCueFinished; // toggle once
          } else if (cue.action === 'open-dialog') {
            interactiveState.dialogOpen = true;
          } else if (cue.action === 'close-dialog') {
            interactiveState.dialogOpen = false;
          } else if (cue.action === 'toggle-theme') {
            interactiveState.theme = cue.value;
          } else if (cue.action === 'select-era') {
            interactiveState.era = cue.value;
          } else if (cue.action === 'trigger-button') {
            interactiveState.dispatches = (interactiveState.dispatches || 1991) + 1;
          }
          break;
        }
      }
    }

    // Compute active line in active buffer
    const bufferForLines = activeBuffer === 'html' ? htmlBuffer : activeBuffer === 'css' ? cssBuffer : jsBuffer;
    const lines = bufferForLines.split('\n');
    const activeLine = Math.max(1, lines.length);

    return {
      time: clampedTime,
      chapterIndex: currentChapter.index,
      chapterTitle: currentChapter.title,
      chapterTheme: currentChapter.theme,
      eraYear: currentChapter.year || '1991',
      htmlBuffer,
      cssBuffer,
      jsBuffer,
      activeBuffer,
      layoutMode,
      camera,
      activeLine,
      activeCharIndex,
      totalCharsTyped,
      interactiveState,
      typingCodeChunk,
      isTyping
    };
  }
}

export const checkpointEngine = new CheckpointEngine();
