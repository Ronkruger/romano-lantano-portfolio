import React, { useState } from 'react';

const About: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="w-[90%] max-w-7xl mx-auto px-5 relative z-10">
        <div className="relative inline-block mx-auto text-center pb-5 w-full">
          <h2 
            className="text-5xl md:text-6xl mb-10 relative text-highlight-blue text-center shadow-[0_0_10px_rgba(0,188,212,0.4)] font-bold uppercase tracking-wider"
            data-aos="fade-up"
          >
            About Me
          </h2>
        </div>
        
        <div 
          className="flex flex-col md:flex-row items-center gap-10 text-left"
          data-aos="fade-up" 
          data-aos-delay="200"
        >
          <div className="relative group">
            <img 
              src="images/profile.png" 
              alt="Romano Lantano" 
              className={`w-48 h-48 rounded-full object-cover border-4 border-highlight-blue shadow-[0_0_20px_rgba(0,188,212,0.5)] transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,188,212,0.8),0_0_50px_rgba(0,188,212,0.4)] hover:rotate-3 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
            />
            {/* Animated ring */}
            <div className="absolute inset-0 rounded-full border-2 border-accent-primary opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 animate-ping"></div>
          </div>
          <div className="max-w-4xl mx-auto md:mx-0 space-y-4">
            <p className="text-lg text-text-light text-justify leading-relaxed transform transition-all duration-300 hover:translate-x-2">
              <span className="text-highlight-blue font-semibold">👋 Hi there!</span> I'm a passionate web developer specializing in building responsive and dynamic websites. With expertise in <span className="text-accent-primary font-semibold">HTML, CSS, JavaScript</span>, and <span className="text-accent-primary font-semibold">PHP</span>, I create seamless user experiences that bring ideas to life.
            </p>
            <p className="text-lg text-text-light text-justify leading-relaxed transform transition-all duration-300 hover:translate-x-2">
              Whether it's <span className="text-highlight-green font-semibold">front-end design</span> or <span className="text-highlight-green font-semibold">back-end functionality</span>, I strive for clean, efficient, and innovative solutions.
            </p>
            <p className="text-lg text-text-light text-justify leading-relaxed transform transition-all duration-300 hover:translate-x-2">
              Let's build something amazing together! 🚀
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-accent-secondary">
              <div className="text-center transform hover:scale-110 transition-transform duration-300 cursor-pointer">
                <div className="text-3xl font-bold text-accent-primary">5+</div>
                <div className="text-sm text-text-muted">Projects</div>
              </div>
              <div className="text-center transform hover:scale-110 transition-transform duration-300 cursor-pointer">
                <div className="text-3xl font-bold text-highlight-blue">2</div>
                <div className="text-sm text-text-muted">Happy Clients</div>
              </div>
              <div className="text-center transform hover:scale-110 transition-transform duration-300 cursor-pointer">
                <div className="text-3xl font-bold text-highlight-green">4.9</div>
                <div className="text-sm text-text-muted">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
