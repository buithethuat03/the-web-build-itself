import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { timelineEngine } from '../engine/timelineEngine';
import { ShowSnapshot } from '../engine/types';
import { CodePanel } from '../code/CodePanel';
import { PreviewStage } from '../stage/PreviewStage';
import { Timeline } from './Timeline';
import { TransportControls } from './TransportControls';
import { ChapterOverlay } from './ChapterOverlay';
import { Volume2, VolumeX } from 'lucide-react';
import clsx from 'clsx';
import { TOTAL_DURATION } from '../engine/script';
import { soundEngine, AudioStatus } from '../audio/soundEngine';

export const ShowPlayer: React.FC = () => {
  const [snapshot, setSnapshot] = useState<ShowSnapshot>(() => timelineEngine.getSnapshot());
  const [isPlaying, setIsPlaying] = useState<boolean>(() => timelineEngine.getIsPlaying());
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(() => timelineEngine.getPlaybackSpeed());
  const [audioStatus, setAudioStatus] = useState<AudioStatus>(() => soundEngine.getStatus());
  const [isMuted, setIsMuted] = useState<boolean>(() => soundEngine.getMuted());
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [mouseMovedRecently, setMouseMovedRecently] = useState<boolean>(false);
  const [mobileView, setMobileView] = useState<'split' | 'code' | 'stage'>('split');
  const mouseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Subscribe to timeline updates
  useEffect(() => {
    const unsubscribe = timelineEngine.subscribe((newSnapshot) => {
      setSnapshot(newSnapshot);
      setIsPlaying(timelineEngine.getIsPlaying());
      setPlaybackSpeed(timelineEngine.getPlaybackSpeed());
    });
    const unsubAudio = soundEngine.subscribe((status) => {
      setAudioStatus(status);
      setIsMuted(status.isMuted);
    });
    return () => {
      unsubscribe();
      unsubAudio();
    };
  }, []);

  // Autoplay start after gentle stillness (1.5s)
  useEffect(() => {
    const timer = setTimeout(() => {
      timelineEngine.play();
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Keyboard controls listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        timelineEngine.togglePlay();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        if (e.shiftKey) timelineEngine.prevChapter();
        else timelineEngine.seekRelative(-5);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        if (e.shiftKey) timelineEngine.nextChapter();
        else timelineEngine.seekRelative(5);
      } else if (e.code === 'KeyR') {
        e.preventDefault();
        timelineEngine.restart();
      } else if (e.code === 'KeyM') {
        e.preventDefault();
        const muted = soundEngine.toggleMute();
        setIsMuted(muted);
      } else if (e.code === 'KeyF') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.code === 'Digit1') {
        timelineEngine.setSpeed(1);
      } else if (e.code === 'Digit2') {
        timelineEngine.setSpeed(2);
      } else if (e.code === 'Digit5') {
        timelineEngine.setSpeed(5);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Mouse idle detection for clean cinematic immersion
  const handleMouseMove = useCallback(() => {
    setMouseMovedRecently(true);
    if (mouseTimerRef.current) clearTimeout(mouseTimerRef.current);
    mouseTimerRef.current = setTimeout(() => {
      setMouseMovedRecently(false);
    }, 3200);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const handleToggleMute = async () => {
    if (!audioStatus.isReady) {
      await soundEngine.ensureActive();
      soundEngine.setMuted(false);
    } else {
      soundEngine.toggleMute();
    }
  };

  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 768 : false));

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const chapters = timelineEngine.getChapters();
  const totalDuration = TOTAL_DURATION;

  // Layout mode proportions
  const { layoutMode } = snapshot;

  // Dynamic smooth style computation for continuous fluid layout transitions
  const { codePanelStyle, stagePanelStyle } = useMemo(() => {
    if (!isMobile) {
      // DESKTOP LAYOUT (Horizontal Split with continuous width & opacity transitions)
      switch (layoutMode) {
        case 'blank':
          return {
            codePanelStyle: {
              width: '100%',
              height: '100%',
              opacity: 1,
              pointerEvents: 'auto' as const,
              transform: 'none',
            },
            stagePanelStyle: {
              width: '0%',
              height: '100%',
              opacity: 0,
              pointerEvents: 'none' as const,
              transform: 'translateX(24px)',
            },
          };
        case 'code-focus':
          return {
            codePanelStyle: {
              width: '58%',
              height: '100%',
              opacity: 1,
              pointerEvents: 'auto' as const,
              transform: 'none',
            },
            stagePanelStyle: {
              width: '42%',
              height: '100%',
              opacity: 1,
              pointerEvents: 'auto' as const,
              transform: 'none',
            },
          };
        case 'stage-dominant':
          return {
            codePanelStyle: {
              width: '28%',
              height: '100%',
              opacity: 1,
              pointerEvents: 'auto' as const,
              transform: 'none',
            },
            stagePanelStyle: {
              width: '72%',
              height: '100%',
              opacity: 1,
              pointerEvents: 'auto' as const,
              transform: 'none',
            },
          };
        case 'full-stage':
          return {
            codePanelStyle: {
              width: '0%',
              height: '100%',
              opacity: 0,
              pointerEvents: 'none' as const,
              transform: 'translateX(-24px)',
            },
            stagePanelStyle: {
              width: '100%',
              height: '100%',
              opacity: 1,
              pointerEvents: 'auto' as const,
              transform: 'none',
            },
          };
        case 'split':
        default:
          return {
            codePanelStyle: {
              width: '42%',
              height: '100%',
              opacity: 1,
              pointerEvents: 'auto' as const,
              transform: 'none',
            },
            stagePanelStyle: {
              width: '58%',
              height: '100%',
              opacity: 1,
              pointerEvents: 'auto' as const,
              transform: 'none',
            },
          };
      }
    } else {
      // MOBILE LAYOUT (Vertical Stack with continuous height & opacity transitions)
      if (layoutMode === 'blank') {
        return {
          codePanelStyle: {
            width: '100%',
            height: '100%',
            opacity: 1,
            pointerEvents: 'auto' as const,
            transform: 'none',
          },
          stagePanelStyle: {
            width: '100%',
            height: '0%',
            opacity: 0,
            pointerEvents: 'none' as const,
            transform: 'translateY(24px)',
          },
        };
      }
      if (layoutMode === 'full-stage') {
        return {
          codePanelStyle: {
            width: '100%',
            height: '0%',
            opacity: 0,
            pointerEvents: 'none' as const,
            transform: 'translateY(-24px)',
          },
          stagePanelStyle: {
            width: '100%',
            height: '100%',
            opacity: 1,
            pointerEvents: 'auto' as const,
            transform: 'none',
          },
        };
      }
      // Standard mobile view choices:
      if (mobileView === 'code') {
        return {
          codePanelStyle: {
            width: '100%',
            height: '100%',
            opacity: 1,
            pointerEvents: 'auto' as const,
            transform: 'none',
          },
          stagePanelStyle: {
            width: '100%',
            height: '0%',
            opacity: 0,
            pointerEvents: 'none' as const,
            transform: 'translateY(24px)',
          },
        };
      }
      if (mobileView === 'stage') {
        return {
          codePanelStyle: {
            width: '100%',
            height: '0%',
            opacity: 0,
            pointerEvents: 'none' as const,
            transform: 'translateY(-24px)',
          },
          stagePanelStyle: {
            width: '100%',
            height: '100%',
            opacity: 1,
            pointerEvents: 'auto' as const,
            transform: 'none',
          },
        };
      }
      // Default mobile split:
      return {
        codePanelStyle: {
          width: '100%',
          height: '45%',
          opacity: 1,
          pointerEvents: 'auto' as const,
          transform: 'none',
        },
        stagePanelStyle: {
          width: '100%',
          height: '55%',
          opacity: 1,
          pointerEvents: 'auto' as const,
          transform: 'none',
        },
      };
    }
  }, [isMobile, layoutMode, mobileView]);

  // Bottom chrome visibility:
  // Hidden during Chapter 0 unless user explicitly moves mouse
  // During later chapters, visible when mouse moves or hovered
  const isChromeVisible = mouseMovedRecently || !isPlaying;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-screen h-[100dvh] flex flex-col bg-[#faf9f6] text-[#141416] overflow-hidden select-none font-sans"
    >
      {/* Chapter Title Badge Overlay (Centered cinematic pill on desktop) */}
      <ChapterOverlay snapshot={snapshot} />

      {/* Desktop Sound Pill (Top-Right) */}
      <div className="hidden md:flex absolute top-3.5 right-4 z-40 items-center space-x-2">
        <button
          type="button"
          onClick={handleToggleMute}
          className={clsx(
            'flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-[11px] font-sans border transition-all duration-200 touch-manipulation shadow-xs backdrop-blur-sm',
            audioStatus.isReady
              ? 'bg-[#c84b31]/10 text-[#c84b31] border-[#c84b31]/30 font-medium'
              : 'bg-white text-[#c84b31] border-[#c84b31]/50 hover:bg-[#c84b31]/10 font-semibold shadow-md animate-pulse ring-2 ring-[#c84b31]/20'
          )}
          title={audioStatus.isReady ? 'Tắt âm thanh (M)' : 'Bật nhạc nền không lời & tiếng gõ phím cơ (M)'}
        >
          {audioStatus.isReady ? (
            <>
              <Volume2 size={13} />
              <span className="flex items-end space-x-[1.5px] h-3 pr-0.5">
                <span className="w-[1.5px] h-2.5 bg-[#c84b31] animate-pulse" />
                <span className="w-[1.5px] h-3.5 bg-[#c84b31] animate-pulse delay-75" />
                <span className="w-[1.5px] h-1.5 bg-[#c84b31] animate-pulse delay-150" />
              </span>
              <span>Nhạc nền & Phím cơ</span>
            </>
          ) : (
            <>
              <VolumeX size={13} className="text-[#c84b31]" />
              <span>Bật âm thanh (Phím & Nhạc)</span>
            </>
          )}
        </button>
      </div>

      {/* Mobile Top Header Bar (Shown when not in pure blank opening) */}
      {layoutMode !== 'blank' && (
        <div className="flex md:hidden items-center justify-between px-3 py-1.5 bg-[#141416] text-[#faf9f6] border-b border-white/10 z-30 flex-shrink-0 shadow-md">
          {/* Chapter indicator */}
          <div className="flex items-center space-x-1.5 min-w-0 pr-1">
            <span className="text-[10px] font-mono font-semibold tracking-wider text-[#f97316] uppercase whitespace-nowrap">
              {snapshot.eraYear} · Ch. {snapshot.chapterIndex.toString().padStart(2, '0')}
            </span>
            <span className="text-white/30 text-xs">·</span>
            <span className="text-xs font-serif font-medium text-white truncate max-w-[95px]">
              {snapshot.chapterTitle}
            </span>
          </div>

          {/* View Switcher (Segmented buttons with >= 36px touch target) */}
          {layoutMode !== 'full-stage' && (
            <div className="flex items-center bg-white/10 p-0.5 rounded text-[11px] font-mono">
              <button
                type="button"
                onClick={() => setMobileView('split')}
                className={clsx(
                  'min-h-[32px] px-2.5 rounded transition-colors touch-manipulation',
                  mobileView === 'split' ? 'bg-[#c84b31] font-medium shadow-xs text-white' : 'text-white/70'
                )}
              >
                Split
              </button>
              <button
                type="button"
                onClick={() => setMobileView('code')}
                className={clsx(
                  'min-h-[32px] px-2.5 rounded transition-colors touch-manipulation',
                  mobileView === 'code' ? 'bg-[#c84b31] font-medium shadow-xs text-white' : 'text-white/70'
                )}
              >
                Code
              </button>
              <button
                type="button"
                onClick={() => setMobileView('stage')}
                className={clsx(
                  'min-h-[32px] px-2.5 rounded transition-colors touch-manipulation',
                  mobileView === 'stage' ? 'bg-[#c84b31] font-medium shadow-xs text-white' : 'text-white/70'
                )}
              >
                Stage
              </button>
            </div>
          )}

          {/* Mobile Mute Button */}
          <button
            type="button"
            onClick={handleToggleMute}
            className={clsx(
              'min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full text-[11px] font-sans border transition-all touch-manipulation flex-shrink-0',
              audioStatus.isReady
                ? 'bg-[#c84b31]/20 text-[#f97316] border-[#c84b31]/40 font-medium'
                : 'bg-white text-[#c84b31] border-white/30 shadow-sm animate-pulse'
            )}
            title="Toggle audio (M)"
          >
            {audioStatus.isReady ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>
        </div>
      )}

      {/* Mobile Pure Opening Sound Pill (Visible only in Chapter 0 on mobile) */}
      {layoutMode === 'blank' && (
        <div className="flex md:hidden absolute top-3.5 right-4 z-40">
          <button
            type="button"
            onClick={handleToggleMute}
            className={clsx(
              'min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full text-[11px] font-sans border transition-all touch-manipulation',
              audioStatus.isReady
                ? 'bg-[#c84b31]/10 text-[#c84b31] border-[#c84b31]/25'
                : 'bg-white text-[#c84b31] border-[#c84b31]/40 shadow-sm animate-pulse'
            )}
          >
            {audioStatus.isReady ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>
        </div>
      )}

      {/* Floating Sound Activation Banner (Shown in Chapter 0 when waiting for first user click) */}
      {snapshot.chapterIndex === 0 && !audioStatus.isReady && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
          <button
            type="button"
            onClick={handleToggleMute}
            className="flex items-center space-x-2 text-xs font-sans bg-[#141416]/92 hover:bg-[#141416] text-[#faf9f6] px-4 py-2 rounded-full shadow-2xl border border-white/20 transition-all backdrop-blur-md animate-bounce"
          >
            <Volume2 size={14} className="text-[#e05638]" />
            <span>Chạm bất kỳ đâu để bật âm thanh (Nhạc & Phím cơ)</span>
          </button>
        </div>
      )}

      {/* Main Viewport Stage Area */}
      <div className={clsx(
        "relative flex-1 min-h-0 w-full flex overflow-hidden transition-[padding] duration-500",
        snapshot.chapterIndex === 0 && !mouseMovedRecently ? 'pb-0' : 'pb-24 sm:pb-16'
      )}>
        <div className="w-full h-full flex flex-col md:flex-row overflow-hidden relative">
          {/* Code Panel Container */}
          <div
            style={codePanelStyle}
            className="flex-shrink-0 flex flex-col min-h-0 min-w-0 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden relative z-10"
          >
            <CodePanel snapshot={snapshot} />
          </div>

          {/* Live Stage Viewport Container */}
          <div
            style={stagePanelStyle}
            className="flex-1 min-h-0 min-w-0 flex flex-col transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden relative z-0"
          >
            <PreviewStage snapshot={snapshot} />
          </div>
        </div>
      </div>

      {/* Bottom Player Chrome (Hidden in Chapter 0, Slides up on interaction) */}
      <div
        className={clsx(
          'fixed bottom-0 left-0 right-0 z-30 transition-all duration-300 ease-out bg-[#fdfcfb]/95 border-t border-[#141416]/10 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]',
          snapshot.chapterIndex === 0 && !mouseMovedRecently
            ? 'translate-y-full opacity-0 pointer-events-none'
            : isChromeVisible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-[calc(100%-8px)] opacity-50 hover:opacity-100 hover:translate-y-0'
        )}
      >
        <div className="px-3 md:px-4 pt-1">
          <Timeline
            snapshot={snapshot}
            chapters={chapters}
            totalDuration={totalDuration}
          />
        </div>

        <TransportControls
          snapshot={snapshot}
          isPlaying={isPlaying}
          playbackSpeed={playbackSpeed}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          isFullscreen={isFullscreen}
          onToggleFullscreen={toggleFullscreen}
          chapters={chapters}
        />
      </div>
    </div>
  );
};
