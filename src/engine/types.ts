export type LayoutMode = 'blank' | 'split' | 'stage-dominant' | 'full-stage' | 'code-focus';

export type TargetBuffer = 'html' | 'css' | 'js';

export interface CameraState {
  zoom: number;
  panX: number;
  panY: number;
  focusSelector: string | null;
}

export type CueType = 'type' | 'pause' | 'layout' | 'camera' | 'interaction' | 'chapter';

export interface BaseCue {
  id: string;
  start: number; // in seconds
  duration: number; // in seconds
  type: CueType;
}

export interface TypeCue extends BaseCue {
  type: 'type';
  buffer: TargetBuffer;
  code: string;
  speed?: number; // chars per second (default ~30-40)
  targetSelector?: string;
  commentary?: string;
}

export interface PauseCue extends BaseCue {
  type: 'pause';
}

export interface LayoutCue extends BaseCue {
  type: 'layout';
  mode: LayoutMode;
}

export interface CameraCue extends BaseCue {
  type: 'camera';
  zoom?: number;
  panX?: number;
  panY?: number;
  focusSelector?: string;
}

export interface InteractionCue extends BaseCue {
  type: 'interaction';
  action: 'click' | 'input' | 'toggle-details' | 'open-dialog' | 'close-dialog' | 'slider' | 'toggle-theme' | 'select-era' | 'trigger-button';
  selector: string;
  value?: string | number;
}

export interface ChapterCue extends BaseCue {
  type: 'chapter';
  chapterIndex: number;
  title: string;
  theme: string;
  year?: string;
}

export type Cue = TypeCue | PauseCue | LayoutCue | CameraCue | InteractionCue | ChapterCue;

export interface ChapterInfo {
  index: number;
  title: string;
  theme: string;
  year?: string;
  startTime: number;
  endTime: number;
}

export interface ShowSnapshot {
  time: number;
  chapterIndex: number;
  chapterTitle: string;
  chapterTheme: string;
  eraYear: string;
  htmlBuffer: string;
  cssBuffer: string;
  jsBuffer: string;
  activeBuffer: TargetBuffer;
  layoutMode: LayoutMode;
  camera: CameraState;
  activeLine: number;
  activeCharIndex: number;
  totalCharsTyped: number;
  interactiveState: Record<string, any>;
  typingCodeChunk?: string;
  isTyping: boolean;
}
