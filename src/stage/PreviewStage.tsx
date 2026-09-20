import React, { useEffect, useRef, useMemo } from 'react';
import { ShowSnapshot } from '../engine/types';
import { buildStageDocument, updateStageDocumentDirectly } from './iframeBridge';

interface PreviewStageProps {
  snapshot: ShowSnapshot;
}

export const PreviewStage: React.FC<PreviewStageProps> = ({ snapshot }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isLoadedRef = useRef<boolean>(false);
  const { camera } = snapshot;

  // Initial full document template - only generated once on mount
  const initialDoc = useMemo(() => {
    return buildStageDocument(snapshot);
  }, []);

  // Sync snapshot changes directly to the iframe DOM at 60fps without page reloads
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    if (isLoadedRef.current) {
      updateStageDocumentDirectly(iframe, snapshot);
    }
  }, [
    snapshot.htmlBuffer,
    snapshot.cssBuffer,
    snapshot.jsBuffer,
    snapshot.interactiveState,
    snapshot.camera,
    snapshot.chapterIndex,
    snapshot.time
  ]);

  const handleIframeLoad = () => {
    isLoadedRef.current = true;
    if (iframeRef.current) {
      updateStageDocumentDirectly(iframeRef.current, snapshot);
    }
  };

  // Camera transform styles
  const cameraTransform = useMemo(() => {
    const scale = camera.zoom || 1;
    const x = camera.panX || 0;
    const y = camera.panY || 0;
    return `translate3d(${x}px, ${y}px, 0px) scale(${scale})`;
  }, [camera]);

  return (
    <div className="relative w-full h-full flex flex-col bg-[#faf9f6] overflow-hidden select-none">
      {/* Chapter 9 CSS Reality-Shift Scanline Beam */}
      {snapshot.chapterIndex === 9 && (
        <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#c84b31] to-transparent shadow-[0_0_18px_#c84b31] animate-scanline" />
          <div
            style={{ backgroundColor: '#c84b31', color: '#ffffff' }}
            className="absolute bottom-4 right-4 bg-[#c84b31] text-white font-mono text-[9.5px] tracking-widest uppercase px-3.5 py-1.5 rounded-full shadow-xl border border-white/25 flex items-center space-x-2"
          >
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span className="font-semibold text-white whitespace-nowrap">CSS Masterpiece · Portfolio Transformed</span>
          </div>
        </div>
      )}

      {/* Clean stage frame */}
      <div
        className="w-full h-full flex-1 overflow-hidden transition-transform duration-500 ease-out"
        style={{
          transform: cameraTransform,
          transformOrigin: 'center center',
        }}
      >
        <iframe
          ref={iframeRef}
          onLoad={handleIframeLoad}
          title="Live Showcase Document"
          sandbox="allow-scripts allow-forms allow-same-origin allow-modals"
          srcDoc={initialDoc}
          className="w-full h-full border-0 bg-[#faf9f6]"
        />
      </div>
    </div>
  );
};
