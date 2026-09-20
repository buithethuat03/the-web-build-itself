import React from 'react';
import { TOTAL_DURATION } from '../engine/script';
import { ShowSnapshot, ChapterInfo } from '../engine/types';
import { timelineEngine } from '../engine/timelineEngine';
import {
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
} from 'lucide-react';

interface TransportControlsProps {
  snapshot: ShowSnapshot;
  isPlaying: boolean;
  playbackSpeed: number;
  isMuted: boolean;
  onToggleMute: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  chapters: ChapterInfo[];
}

export const TransportControls: React.FC<TransportControlsProps> = ({
  snapshot,
  isPlaying,
  playbackSpeed,
  isMuted,
  onToggleMute,
  isFullscreen,
  onToggleFullscreen,
  chapters,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentChapter = chapters.find((c) => c.index === snapshot.chapterIndex);
  const speedOptions = [1, 2, 5, 10];

  const controlBtnClass =
    'min-w-[36px] min-h-[36px] lg:min-w-[28px] lg:min-h-[28px] flex items-center justify-center rounded transition-colors touch-manipulation text-[#141416]/75 hover:text-[#141416] hover:bg-[#141416]/5 active:bg-[#141416]/10';

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-3 md:px-4 py-2 bg-[#fdfcfb]/95 backdrop-blur-md border-t border-[#141416]/10 select-none text-[#141416] text-xs gap-1.5 sm:gap-0">
      {/* Top / Left side: Playback buttons & Timecode */}
      <div className="flex items-center justify-between w-full sm:w-auto space-x-1.5 md:space-x-2.5">
        <div className="flex items-center space-x-1">
          {/* Play / Pause */}
          <button
            type="button"
            onClick={() => timelineEngine.togglePlay()}
            className={`${controlBtnClass} ${isPlaying ? 'bg-[#141416]/[0.06]' : ''}`}
            title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>

          {/* Restart */}
          <button
            type="button"
            onClick={() => timelineEngine.restart()}
            className={controlBtnClass}
            title="Restart from Beginning (R)"
            aria-label="Restart"
          >
            <RotateCcw size={15} />
          </button>

          {/* Previous Chapter */}
          <button
            type="button"
            onClick={() => timelineEngine.prevChapter()}
            className={controlBtnClass}
            title="Previous Chapter (Shift+Left)"
            aria-label="Previous Chapter"
          >
            <SkipBack size={15} />
          </button>

          {/* Next Chapter */}
          <button
            type="button"
            onClick={() => timelineEngine.nextChapter()}
            className={controlBtnClass}
            title="Next Chapter (Shift+Right)"
            aria-label="Next Chapter"
          >
            <SkipForward size={15} />
          </button>
        </div>

        {/* Timecode */}
        <div className="text-[11px] font-mono text-[#141416]/70 tracking-tight tabular-nums pl-1.5 whitespace-nowrap">
          <span>{formatTime(snapshot.time)}</span>
          <span className="text-[#141416]/30 mx-1">/</span>
          <span>{formatTime(TOTAL_DURATION)}</span>
        </div>

        {/* Chapter Title Badge (hidden on narrow screens) */}
        {currentChapter && (
          <div className="hidden md:flex items-center space-x-1.5 pl-3 border-l border-[#141416]/10 text-[11px]">
            <span className="text-[#c84b31] font-medium">Ch. {currentChapter.index}</span>
            <span className="text-[#141416]/40">·</span>
            <span className="text-[#141416]/80 font-medium truncate max-w-[180px]">
              {currentChapter.title}
            </span>
          </div>
        )}
      </div>

      {/* Bottom / Right side: Speed, Audio, Fullscreen */}
      <div className="flex items-center justify-end w-full sm:w-auto space-x-2">
        {/* Speed Multiplier Pill */}
        <div className="flex items-center bg-[#141416]/[0.05] p-0.5 rounded text-[11px] font-mono">
          {speedOptions.map((speed) => (
            <button
              key={speed}
              type="button"
              onClick={() => timelineEngine.setSpeed(speed)}
              className={`min-h-[32px] lg:min-h-0 px-2.5 lg:px-1.5 py-1 lg:py-0.5 rounded transition-colors touch-manipulation ${
                playbackSpeed === speed
                  ? 'bg-white shadow-xs font-semibold text-[#141416]'
                  : 'text-[#141416]/60 hover:text-[#141416]'
              }`}
              title={`Playback Speed ${speed}x`}
            >
              {speed}x
            </button>
          ))}
        </div>

        {/* Audio Mute / Unmute */}
        <button
          type="button"
          onClick={onToggleMute}
          className={`${controlBtnClass} ${
            !isMuted ? 'text-[#c84b31] bg-[#c84b31]/10 border border-[#c84b31]/20' : ''
          }`}
          title={isMuted ? 'Unmute Audio (M)' : 'Mute Audio (M)'}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX size={15} /> : (
            <div className="flex items-center space-x-1">
              <Volume2 size={15} />
              <span className="flex items-end space-x-[1.5px] h-3 pr-0.5">
                <span className="w-[1.5px] h-2.5 bg-[#c84b31] animate-pulse" />
                <span className="w-[1.5px] h-3.5 bg-[#c84b31] animate-pulse delay-75" />
                <span className="w-[1.5px] h-1.5 bg-[#c84b31] animate-pulse delay-150" />
              </span>
            </div>
          )}
        </button>

        {/* Fullscreen toggle */}
        <button
          type="button"
          onClick={onToggleFullscreen}
          className={controlBtnClass}
          title={isFullscreen ? 'Exit Fullscreen (F)' : 'Fullscreen (F)'}
          aria-label="Fullscreen"
        >
          {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
        </button>
      </div>
    </div>
  );
};
