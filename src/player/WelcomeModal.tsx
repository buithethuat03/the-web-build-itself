import React from 'react';
import { FileText, Sparkles, ArrowRight, Play } from 'lucide-react';

interface WelcomeModalProps {
  onSelectPortfolio: () => void;
  onSelectStory: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({
  onSelectPortfolio,
  onSelectStory,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#141416]/75 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl bg-[#ffffff] text-[#141416] rounded-3xl shadow-2xl border border-black/10 overflow-hidden transform animate-in zoom-in-95 duration-300 p-6 sm:p-9">
        {/* Decorative Top Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#c84b31] via-[#e05638] to-[#f97316]" />

        {/* Header */}
        <div className="text-center mb-7 sm:mb-8">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#f4f1ea] border border-black/10 text-[11px] font-mono uppercase tracking-widest text-[#c84b31] font-semibold mb-3">
            <span>Bui The Thuat · Portfolio Experience</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[#141416] tracking-tight mb-2">
            Welcome to The Web Builds Itself
          </h2>
          <p className="text-xs sm:text-sm font-sans text-[#57606a] max-w-md mx-auto">
            Choose how you would like to explore the portfolio of Backend Developer &amp; DevOps Engineer Bui The Thuat:
          </p>
        </div>

        {/* 2 Choice Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-6">
          {/* Card 1: View Portfolio (Result) */}
          <button
            type="button"
            onClick={onSelectPortfolio}
            className="group text-left flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-[#faf9f6] hover:bg-[#fff9f7] border-2 border-black/10 hover:border-[#c84b31] transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer touch-manipulation"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-black/10 flex items-center justify-center text-[#c84b31] shadow-xs group-hover:scale-110 transition-transform">
                  <FileText size={20} />
                </div>
                <span className="text-[10.5px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-[#f4f1ea] text-[#141416]/70 group-hover:bg-[#fff0ed] group-hover:text-[#c84b31] transition-colors">
                  RESULT
                </span>
              </div>
              <h3 className="text-lg font-serif font-semibold text-[#141416] group-hover:text-[#c84b31] transition-colors mb-1.5">
                View Portfolio
              </h3>
              <p className="text-xs font-sans text-[#57606a] leading-relaxed">
                Explore the complete interactive CV with distributed microservice architecture diagrams, skill matrices, production projects, and direct contact.
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-black/5 flex items-center justify-between text-xs font-semibold text-[#c84b31]">
              <span>Explore Portfolio</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 2: Watch the Story (Build Process) */}
          <button
            type="button"
            onClick={onSelectStory}
            className="group text-left flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-[#faf9f6] hover:bg-[#fff9f7] border-2 border-black/10 hover:border-[#c84b31] transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer touch-manipulation"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-black/10 flex items-center justify-center text-[#c84b31] shadow-xs group-hover:scale-110 transition-transform">
                  <Sparkles size={20} />
                </div>
                <span className="text-[10.5px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-[#f4f1ea] text-[#141416]/70 group-hover:bg-[#fff0ed] group-hover:text-[#c84b31] transition-colors">
                  STORY
                </span>
              </div>
              <h3 className="text-lg font-serif font-semibold text-[#141416] group-hover:text-[#c84b31] transition-colors mb-1.5">
                Watch the Story
              </h3>
              <p className="text-xs font-sans text-[#57606a] leading-relaxed">
                Watch the real-time creation from a blank canvas as code types itself with mechanical key clicks and dynamic sound at 2x speed.
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-black/5 flex items-center justify-between text-xs font-semibold text-[#c84b31]">
              <span>Watch the Story</span>
              <Play size={15} className="group-hover:translate-x-1 transition-transform fill-current" />
            </div>
          </button>
        </div>

        {/* Subtle Footer Note */}
        <p className="text-center text-[11px] font-sans text-[#57606a]/80">
          You can freely switch between both modes at any time.
        </p>
      </div>
    </div>
  );
};
