import React, { useEffect, useRef, useMemo } from 'react';
import { ShowSnapshot } from '../engine/types';
import { tokenizeCode } from './tokenizer';
import clsx from 'clsx';

interface CodePanelProps {
  snapshot: ShowSnapshot;
  isOpeningMode?: boolean;
}

export const CodePanel: React.FC<CodePanelProps> = ({ snapshot, isOpeningMode = false }) => {
  const { activeBuffer, htmlBuffer, cssBuffer, jsBuffer, isTyping } = snapshot;
  const containerRef = useRef<HTMLDivElement>(null);
  const activeLineRef = useRef<HTMLDivElement>(null);

  // Active code buffer
  const activeCode = useMemo(() => {
    if (activeBuffer === 'html') return htmlBuffer;
    if (activeBuffer === 'css') return cssBuffer;
    return jsBuffer;
  }, [activeBuffer, htmlBuffer, cssBuffer, jsBuffer]);

  // Tokenized lines
  const tokenizedLines = useMemo(() => {
    return tokenizeCode(activeCode, activeBuffer);
  }, [activeCode, activeBuffer]);

  const activeLineIndex = tokenizedLines.length;

  // Auto-scroll to keep active line in view within the container, without scrolling window/ancestors
  useEffect(() => {
    const container = containerRef.current;
    const activeEl = activeLineRef.current;
    if (container && activeEl) {
      const lineTop = activeEl.offsetTop - container.offsetTop;
      const lineBottom = lineTop + activeEl.offsetHeight;
      const visibleTop = container.scrollTop;
      const visibleBottom = visibleTop + container.clientHeight;

      if (lineBottom > visibleBottom - 30) {
        container.scrollTo({
          top: lineBottom - container.clientHeight + 60,
          behavior: 'smooth'
        });
      } else if (lineTop < visibleTop + 30) {
        container.scrollTo({
          top: Math.max(0, lineTop - 60),
          behavior: 'smooth'
        });
      }
    }
  }, [activeLineIndex, activeCode]);

  // If in opening mode (Mode A / Chapter 0), render as an ethereal pure white typewriter canvas
  if (isOpeningMode) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center md:items-start px-6 md:px-16 font-code text-sm md:text-base leading-[1.9] text-[#141416] select-none bg-white">
        <div className="max-w-xl w-full space-y-1">
          {tokenizedLines.map((line, idx) => {
            const isCurrentActiveLine = idx === tokenizedLines.length - 1;
            return (
              <div key={idx} className="flex items-center">
                <span className="whitespace-pre">
                  {line.tokens.map((token, tIdx) => (
                    <span
                      key={tIdx}
                      className={clsx(
                        token.type === 'tag' && 'font-medium text-[#141416]',
                        token.type === 'attr' && 'text-[#6e7781]',
                        token.type === 'val' && 'text-[#0550ae]',
                        token.type === 'punct' && 'text-[#57606a]',
                        token.type === 'text' && 'text-[#141416]'
                      )}
                    >
                      {token.content}
                    </span>
                  ))}
                  {isCurrentActiveLine && (
                    <span
                      className={clsx(
                        'inline-block w-[2px] h-[16px] ml-[2px] bg-[#c84b31] align-middle',
                        isTyping ? 'opacity-100' : 'animate-caret'
                      )}
                    />
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#fdfcfb] border-r border-[#141416]/8 select-text overflow-hidden font-code text-[11.5px] sm:text-[12px] md:text-[13px] leading-[1.65] md:leading-[1.7]">
      {/* Code Editor Header */}
      <div className="sticky top-0 z-10 flex-shrink-0 flex items-center justify-between px-3 md:px-4 py-1.5 md:py-2 border-b border-[#141416]/6 bg-[#faf8f5]/90 backdrop-blur-xs select-none">
        <div className="flex items-center space-x-2">
          <span className={clsx(
            "w-2 h-2 rounded-full transition-colors duration-300",
            activeBuffer === 'html' && "bg-[#c84b31] shadow-[0_0_6px_rgba(200,75,49,0.7)]",
            activeBuffer === 'css' && "bg-[#0969da] shadow-[0_0_6px_rgba(9,105,218,0.7)]",
            activeBuffer === 'js' && "bg-[#d97706] shadow-[0_0_6px_rgba(217,119,6,0.7)]"
          )} />
          <span className="text-[11px] font-mono font-medium tracking-tight text-[#141416]/90 lowercase">
            {activeBuffer === 'html' && 'document.html'}
            {activeBuffer === 'css' && 'styles.css'}
            {activeBuffer === 'js' && 'interaction.js'}
          </span>
          <span className="text-[10px] font-mono text-[#141416]/40 tabular-nums">
            · {tokenizedLines.length} lines
          </span>
        </div>
        {isTyping && (
          <span className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded text-[9.5px] font-mono uppercase tracking-wider bg-[#c84b31]/10 text-[#c84b31] font-semibold animate-pulse">
            <span className="w-1 h-1 rounded-full bg-[#c84b31]" />
            <span>typing</span>
          </span>
        )}
      </div>

      {/* Code Lines Container */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto overflow-x-auto p-2 md:p-4 custom-scrollbar space-y-[1px]"
      >
        {tokenizedLines.map((line, idx) => {
          const isCurrentActiveLine = idx === tokenizedLines.length - 1;

          return (
            <div
              key={idx}
              ref={isCurrentActiveLine ? activeLineRef : null}
              className={clsx(
                'flex items-start rounded-r px-1 transition-all duration-150',
                isCurrentActiveLine
                  ? 'bg-gradient-to-r from-[#c84b31]/10 via-[#c84b31]/[0.02] to-transparent border-l-2 border-[#c84b31]'
                  : 'hover:bg-[#141416]/[0.015] border-l-2 border-transparent'
              )}
            >
              {/* Line Number */}
              <span className={clsx(
                "w-5 md:w-7 select-none text-right pr-2 md:pr-3.5 text-[10px] md:text-[11px] font-normal tabular-nums flex-shrink-0 transition-colors",
                isCurrentActiveLine ? "text-[#c84b31] font-medium" : "text-[#141416]/25"
              )}>
                {line.lineNumber}
              </span>

              {/* Code Tokens */}
              <span className="flex-1 whitespace-pre font-normal text-[#141416]">
                {line.tokens.map((token, tIdx) => {
                  let tokenClass = 'text-[#141416]';
                  if (token.type === 'tag') tokenClass = 'text-[#141416] font-medium';
                  else if (token.type === 'attr') tokenClass = 'text-[#6e7781]';
                  else if (token.type === 'val') tokenClass = 'text-[#0550ae]';
                  else if (token.type === 'comment') tokenClass = 'text-[#8c959f] italic';
                  else if (token.type === 'punct') tokenClass = 'text-[#57606a]';
                  else if (token.type === 'selector') tokenClass = 'text-[#141416] font-medium';
                  else if (token.type === 'prop') tokenClass = 'text-[#6e7781]';
                  else if (token.type === 'keyword') tokenClass = 'text-[#cf222e] font-medium';

                  return (
                    <span key={tIdx} className={tokenClass}>
                      {token.content}
                    </span>
                  );
                })}

                {/* Insertion Laser Caret on active line */}
                {isCurrentActiveLine && (
                  <span
                    className={clsx(
                      'inline-block w-[2px] h-[14px] ml-[1px] -mb-[1px] bg-[#c84b31] align-middle shadow-[0_0_8px_rgba(200,75,49,0.85)]',
                      isTyping ? 'opacity-100 scale-y-110' : 'animate-caret'
                    )}
                  />
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
