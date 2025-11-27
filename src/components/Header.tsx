import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* Fixed Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/95 backdrop-blur-sm shadow-lg">
        <div className="w-[90%] max-w-7xl mx-auto flex justify-between items-center p-5">
          <a 
            href="./resume/Lantano_Romano_resume.pdf" 
            target="_blank" 
            className="inline-block px-5 py-2.5 bg-accent-primary text-white no-underline border-2 border-accent-primary rounded-md font-semibold transition-all duration-300 hover:bg-transparent hover:text-accent-primary hover:shadow-[0_0_15px_rgba(233,69,96,0.6)]"
          >
            Download CV
          </a>

          {/* Hamburger Menu */}
          <div 
            className="relative z-[1001] cursor-pointer text-highlight-blue text-3xl"
            onClick={toggleMenu}
          >
            <i className="fas fa-bars p-2 rounded border-2 border-highlight-blue transition-all duration-300 hover:bg-highlight-blue hover:text-dark-bg"></i>
          </div>

          {/* Navigation Menu */}
          <nav 
            className={`fixed top-0 ${menuOpen ? 'right-0' : '-right-[300px]'} w-[300px] h-screen bg-black/95 p-8 transition-all duration-400 z-[1000] shadow-[-5px_0_20px_rgba(0,0,0,0.5)] flex flex-col items-center`}
          >
            <span 
              className="absolute top-5 right-5 text-4xl text-accent-primary cursor-pointer font-bold transition-colors duration-300 hover:text-highlight-blue"
              onClick={closeMenu}
            >
              &times;
            </span>

            <ul className="list-none p-0 mt-20 text-center w-full">
              {['About', 'Skills', 'Services', 'Projects', 'Timeline', 'Testimonials', 'Contact'].map((item) => (
                <li key={item} className="py-4 border-b border-white/10 last:border-b-0">
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className="no-underline text-text-light text-xl block transition-all duration-300 font-medium hover:text-highlight-blue hover:shadow-[0_0_10px_rgba(0,188,212,0.5)]"
                    onClick={closeMenu}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <header className="relative bg-gradient-to-br from-accent-secondary to-dark-bg text-text-light pt-32 pb-32 text-center overflow-hidden min-h-screen flex flex-col items-center justify-center">
        {/* Background patterns */}
        <div className="absolute inset-0 opacity-50">
          <div className="absolute w-full h-full bg-gradient-radial from-highlight-blue/5 to-transparent" style={{ backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(0, 188, 212, 0.05) 0%, transparent 80%)' }}></div>
          <div className="absolute w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 90% 80%, rgba(233, 69, 96, 0.05) 0%, transparent 80%)' }}></div>
        </div>

        {/* Hero Content */}
        <div 
          className="relative z-10 flex flex-col items-center justify-center h-full pt-16"
          style={{ transform: `translateY(${scrollY * 0.5}px)`, opacity: 1 - scrollY / 500 }}
        >
          <div className="text-center" data-aos="fade-up" data-aos-delay="400">
            <h1 className="text-6xl md:text-7xl lg:text-8xl mb-2.5 shadow-[0_0_20px_rgba(0,188,212,0.5)] leading-tight font-bold">
              Hi! I'm <span className="text-accent-primary">Romano Lantano</span>
            </h1>
            <p className="text-2xl md:text-3xl mt-4 italic text-text-muted font-code">
              Crafting Beautiful Digital Experiences
            </p>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
