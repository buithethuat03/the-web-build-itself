import React, { useRef, useState, useCallback } from 'react';
import { ChapterInfo, ShowSnapshot } from '../engine/types';
import { timelineEngine } from '../engine/timelineEngine';

interface TimelineProps {
  snapshot: ShowSnapshot;
  chapters: ChapterInfo[];
  totalDuration: number;
}

export const Timeline: React.FC<TimelineProps> = ({ snapshot, chapters, totalDuration }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverX, setHoverX] = useState<number>(0);

  const currentTime = snapshot.time;
  const progressPercent = Math.min(100, Math.max(0, (currentTime / totalDuration) * 100));

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePointerSeek = useCallback(
    (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const relativeX = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const targetTime = (relativeX / rect.width) * totalDuration;
      timelineEngine.seek(targetTime);
    },
    [totalDuration]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const relativeX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const targetTime = (relativeX / rect.width) * totalDuration;
    setHoverTime(targetTime);
    setHoverX(relativeX);
  };

  const hoveredChapter = hoverTime !== null ? chapters.find(
    (c) => hoverTime >= c.startTime && hoverTime <= c.endTime
  ) : null;

  return (
    <div
      className="relative w-full py-3 -my-1 cursor-pointer group select-none touch-none"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setHoverTime(null);
      }}
      onMouseMove={handleMouseMove}
      onClick={handlePointerSeek}
      onTouchStart={handlePointerSeek}
      onTouchMove={handlePointerSeek}
    >
      {/* Chapter Hover Preview Tooltip */}
      {isHovering && hoverTime !== null && (
        <div
          className="absolute -top-9 -translate-x-1/2 bg-[#141416] text-[#faf9f6] text-[11px] font-sans px-2.5 py-1 rounded shadow-lg pointer-events-none whitespace-nowrap z-50 transition-transform duration-75"
          style={{ left: `${hoverX}px` }}
        >
          <span className="font-medium text-[#c84b31] mr-1.5">
            {hoveredChapter ? `${hoveredChapter.year ? hoveredChapter.year + ' · ' : ''}Ch.${hoveredChapter.index} ${hoveredChapter.title}` : ''}
          </span>
          <span className="text-[#faf9f6]/70">{formatTime(hoverTime)}</span>
        </div>
      )}

      {/* Hairline Timeline Bar */}
      <div
        ref={trackRef}
        className="relative w-full h-[3px] bg-[#141416]/15 group-hover:h-[5px] transition-all duration-200 rounded-full overflow-visible"
      >
        {/* Progress Fill */}
        <div
          className="absolute top-0 left-0 h-full bg-[#c84b31] rounded-full transition-[width] duration-75"
          style={{ width: `${progressPercent}%` }}
        />

        {/* Playhead Marker */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#141416] group-hover:scale-125 border border-white rounded-full shadow-sm -ml-1 transition-transform pointer-events-none"
          style={{ left: `${progressPercent}%` }}
        />

        {/* Chapter Boundary Ticks */}
        {chapters.map((ch) => {
          if (ch.startTime === 0) return null;
          const posPercent = (ch.startTime / totalDuration) * 100;
          return (
            <div
              key={ch.index}
              className="absolute top-0 bottom-0 w-[1px] bg-[#141416]/25 hover:bg-[#141416]/60 pointer-events-none"
              style={{ left: `${posPercent}%` }}
            />
          );
        })}
      </div>
    </div>
  );
};
