import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-bg text-text-muted py-10 text-center border-t border-accent-secondary relative overflow-hidden">
      {/* Scanline animation */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-highlight-blue to-transparent animate-scanline opacity-30"></div>
      
      <div className="w-[90%] max-w-7xl mx-auto px-5 flex flex-col md:flex-row items-center gap-5 md:justify-between">
        <p className="text-sm relative z-10">&copy; 2025 Romano Lantano. All rights reserved.</p>
        <ul className="list-none p-0 flex gap-10">
          <li>
            <a 
              href="https://www.linkedin.com/in/romano-lantano-418870234/" 
              target="_blank" 
              rel="noopener noreferrer"
              title="LinkedIn"
              className="text-text-muted text-2xl no-underline transition-all duration-300 relative z-10 hover:text-highlight-blue hover:-translate-y-1 hover:drop-shadow-[0_0_10px_rgba(0,188,212,0.8)]"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </li>
          <li>
            <a 
              href="https://github.com/Ronkruger" 
              target="_blank" 
              rel="noopener noreferrer"
              title="GitHub"
              className="text-text-muted text-2xl no-underline transition-all duration-300 relative z-10 hover:text-highlight-blue hover:-translate-y-1 hover:drop-shadow-[0_0_10px_rgba(0,188,212,0.8)]"
            >
              <i className="fa-brands fa-github"></i>
            </a>
          </li>
          <li>
            <a 
              href="https://www.facebook.com/R2sl1/" 
              target="_blank" 
              rel="noopener noreferrer"
              title="Facebook"
              className="text-text-muted text-2xl no-underline transition-all duration-300 relative z-10 hover:text-highlight-blue hover:-translate-y-1 hover:drop-shadow-[0_0_10px_rgba(0,188,212,0.8)]"
            >
              <i className="fa-brands fa-facebook-f"></i>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
