import { checkpointEngine } from './checkpointEngine';
import { ShowSnapshot, ChapterInfo } from './types';
import { soundEngine } from '../audio/soundEngine';

type Listener = (snapshot: ShowSnapshot) => void;

export class TimelineEngine {
  private currentTime: number = 0;
  private isPlaying: boolean = false;
  private playbackSpeed: number = 2.0;
  private lastRafTimestamp: number | null = null;
  private rafId: number | null = null;
  private listeners: Set<Listener> = new Set();
  private lastTypingSoundTime: number = 0;
  private lastChapterIndex: number = 0;

  constructor() {
    // Start paused at 0
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    // Emit initial snapshot
    listener(this.getSnapshot());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const snapshot = this.getSnapshot();
    
    // Play transition sound and update musical harmony if chapter changes
    if (snapshot.chapterIndex !== this.lastChapterIndex) {
      this.lastChapterIndex = snapshot.chapterIndex;
      soundEngine.setChapter(snapshot.chapterIndex);
    }

    // Play tactile mechanical key clicks if actively typing
    if (this.isPlaying && snapshot.isTyping) {
      const now = performance.now();
      // At higher speeds, throttle key clicks smoothly to sound like a skilled typist
      const typingInterval = Math.max(65, 110 / Math.min(this.playbackSpeed, 2.5));
      if (now - this.lastTypingSoundTime > typingInterval) {
        this.lastTypingSoundTime = now;
        const isSpace = Math.random() < 0.18;
        const isEnter = Math.random() < 0.08;
        soundEngine.playKeyClick(isSpace, isEnter);
      }
    }

    this.listeners.forEach((fn) => fn(snapshot));
  }

  public getSnapshot(): ShowSnapshot {
    return checkpointEngine.getSnapshotAt(this.currentTime);
  }

  public getCurrentTime(): number {
    return this.currentTime;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getPlaybackSpeed(): number {
    return this.playbackSpeed;
  }

  public getChapters(): ChapterInfo[] {
    return checkpointEngine.getChapters();
  }

  public play() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.lastRafTimestamp = null;
    soundEngine.init();
    this.startLoop();
    this.notify();
  }

  public pause() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.notify();
  }

  public togglePlay() {
    if (this.isPlaying) this.pause();
    else this.play();
  }

  public seek(time: number) {
    this.currentTime = Math.max(0, Math.min(time, checkpointEngine.totalDuration));
    this.notify();
  }

  public seekRelative(deltaSeconds: number) {
    this.seek(this.currentTime + deltaSeconds);
  }

  public restart() {
    this.seek(0);
    this.play();
  }

  public setSpeed(speed: number) {
    this.playbackSpeed = speed;
    this.notify();
  }

  public jumpToChapter(index: number) {
    const chapters = this.getChapters();
    const target = chapters.find((c) => c.index === index);
    if (target) {
      this.seek(target.startTime + 0.05);
    }
  }

  public nextChapter() {
    const chapters = this.getChapters();
    const currentChapter = checkpointEngine.getChapterForTime(this.currentTime);
    const nextIdx = Math.min(chapters.length - 1, currentChapter.index + 1);
    this.jumpToChapter(nextIdx);
  }

  public prevChapter() {
    const currentChapter = checkpointEngine.getChapterForTime(this.currentTime);
    // If more than 3 seconds into current chapter, jump to start of current, else previous
    if (this.currentTime - currentChapter.startTime > 3) {
      this.seek(currentChapter.startTime + 0.05);
    } else {
      const prevIdx = Math.max(0, currentChapter.index - 1);
      this.jumpToChapter(prevIdx);
    }
  }

  private startLoop() {
    const step = (timestamp: number) => {
      if (!this.isPlaying) return;

      if (this.lastRafTimestamp !== null) {
        const deltaSec = (timestamp - this.lastRafTimestamp) / 1000;
        this.currentTime += deltaSec * this.playbackSpeed;

        if (this.currentTime >= checkpointEngine.totalDuration) {
          this.currentTime = checkpointEngine.totalDuration;
          this.isPlaying = false;
          this.notify();
          return;
        }
      }

      this.lastRafTimestamp = timestamp;
      this.notify();
      this.rafId = requestAnimationFrame(step);
    };

    this.rafId = requestAnimationFrame(step);
  }
}

export const timelineEngine = new TimelineEngine();
