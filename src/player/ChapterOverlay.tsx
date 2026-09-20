import React, { useEffect, useState } from 'react';
import { ShowSnapshot } from '../engine/types';

interface ChapterOverlayProps {
  snapshot: ShowSnapshot;
}

const ROMAN_NUMERALS = ['0', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII'];

export const ChapterOverlay: React.FC<ChapterOverlayProps> = ({ snapshot }) => {
  const [showCenterCard, setShowCenterCard] = useState(false);
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [displayedTheme, setDisplayedTheme] = useState('');
  const [displayedIndex, setDisplayedIndex] = useState(0);

  useEffect(() => {
    // Chapter 0 is pure stillness
    if (snapshot.chapterIndex === 0) {
      setShowCenterCard(false);
      return;
    }

    setDisplayedTitle(snapshot.chapterTitle);
    setDisplayedTheme(snapshot.chapterTheme);
    setDisplayedIndex(snapshot.chapterIndex);
    setShowCenterCard(true);

    const timer = setTimeout(() => {
      setShowCenterCard(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, [snapshot.chapterIndex]);

  if (snapshot.chapterIndex === 0) return null;

  return (
    <>
      {/* 1. Subtle Sticky Pill at top */}
      <div className="hidden md:block fixed top-3.5 left-1/2 -translate-x-1/2 z-40 pointer-events-none transition-all duration-500 ease-out">
        <div className="flex items-center space-x-2.5 bg-[#141416]/95 text-[#faf9f6] px-4 py-1.5 rounded-full border border-white/15 shadow-xl backdrop-blur-sm">
          <span className="text-[10.5px] font-mono font-semibold tracking-wider text-[#e05638] uppercase">
            {snapshot.eraYear} · Ch. {snapshot.chapterIndex.toString().padStart(2, '0')}
          </span>
          <span className="text-white/30 text-xs">/</span>
          <span className="text-xs font-serif font-medium text-[#faf9f6]">
            {snapshot.chapterTitle}
          </span>
          <span className="text-white/30 text-[11px]">·</span>
          <span className="text-[11px] font-sans text-white/70 italic truncate max-w-[320px]">
            {snapshot.chapterTheme}
          </span>
        </div>
      </div>

      {/* 2. Dramatic Center Cinematic Title Card (Flashes on chapter transition) */}
      {showCenterCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none px-4 transition-opacity duration-700">
          <div
            style={{
              backgroundColor: '#141416',
              color: '#faf9f6',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.75)',
            }}
            className="relative overflow-hidden bg-[#141416] border border-white/25 text-[#faf9f6] px-6 py-5 md:px-10 md:py-8 rounded-2xl shadow-2xl max-w-lg w-full text-center transform animate-in fade-in zoom-in-95 duration-300"
          >
            {/* Giant Roman numeral watermark background */}
            <div className="absolute -right-4 -bottom-6 text-white/[0.08] text-8xl md:text-9xl font-serif font-black select-none pointer-events-none">
              {snapshot.eraYear}
            </div>

            {/* Glowing Accent Bar */}
            <div className="mx-auto w-12 h-1 bg-[#c84b31] rounded-full mb-3 shadow-[0_0_10px_#c84b31]" />

            {/* Chapter Number Badge */}
            <div className="text-[11px] md:text-xs font-mono font-bold text-[#f97316] tracking-[0.2em] uppercase mb-1">
              ERA {snapshot.eraYear} · CHAPTER {displayedIndex.toString().padStart(2, '0')}
            </div>

            {/* Title */}
            <h2 className="text-xl md:text-2xl font-serif font-semibold text-white tracking-tight mb-2">
              {displayedTitle}
            </h2>

            {/* Quote Theme */}
            <p className="text-xs md:text-sm font-sans text-slate-200 italic leading-relaxed max-w-md mx-auto">
              “{displayedTheme}”
            </p>
          </div>
        </div>
      )}
    </>
  );
};
