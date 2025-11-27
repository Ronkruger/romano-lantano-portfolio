import React from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';

const ScrollProgress: React.FC = () => {
  const scrollProgress = useScrollProgress();

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-dark-bg-alt z-[9999]">
        <div
          className="h-full bg-gradient-to-r from-accent-primary via-highlight-blue to-highlight-green transition-all duration-150 shadow-[0_0_10px_rgba(233,69,96,0.5)]"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Scroll to Top Button */}
      {scrollProgress > 20 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-12 h-12 bg-accent-primary rounded-full flex items-center justify-center text-white shadow-[0_4px_15px_rgba(233,69,96,0.4)] transition-all duration-300 hover:scale-110 hover:shadow-[0_6px_20px_rgba(233,69,96,0.6)] hover:bg-highlight-blue z-50 animate-bounce cursor-pointer group"
          aria-label="Scroll to top"
        >
          <i className="fas fa-arrow-up text-xl group-hover:animate-pulse"></i>
        </button>
      )}
    </>
  );
};

export default ScrollProgress;
