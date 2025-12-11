import React, { useState } from 'react';

const skills = [
  { icon: 'fab fa-html5', name: 'HTML', level: 95 },
  { icon: 'fab fa-css3-alt', name: 'CSS', level: 90 },
  { icon: 'fab fa-js-square', name: 'JavaScript', level: 88 },
  { icon: 'fab fa-php', name: 'PHP', level: 85 },
  { icon: 'fas fa-database', name: 'MySQL', level: 80 },
  { icon: 'fab fa-react', name: 'React.js', level: 87 },
  { icon: 'fab fa-node-js', name: 'Node.js', level: 82 },
  { icon: 'fab fa-git-alt', name: 'Git', level: 90 },
  { icon: 'custom-odoo', name: 'Odoo', level: 75 },
];

const Skills: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="py-20 bg-dark-bg-alt relative overflow-hidden">
      <div className="w-[90%] max-w-7xl mx-auto px-5 relative z-10">
        <div className="relative inline-block mx-auto text-center pb-5 w-full">
          <h2 
            className="text-5xl md:text-6xl mb-10 relative text-highlight-blue text-center shadow-[0_0_10px_rgba(0,188,212,0.4)] font-bold uppercase tracking-wider"
            data-aos="fade-up"
          >
            Skills
          </h2>
        </div>
        
        <div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10 justify-center"
          data-aos="fade-up" 
          data-aos-delay="200"
        >
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className="bg-dark-bg p-5 rounded-xl text-center shadow-[0_4px_15px_rgba(0,0,0,0.3)] border border-accent-secondary transition-all duration-300 flex flex-col items-center justify-center min-h-[160px] relative overflow-hidden group hover:-translate-y-1 hover:scale-105 hover:shadow-[0_8px_25px_rgba(0,0,0,0.5),0_0_15px_rgba(57,255,20,0.4)] hover:border-highlight-green cursor-pointer"
              data-aos="zoom-in" 
              data-aos-delay={300 + index * 100}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {/* Background pattern */}
              <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-radial from-highlight-green/5 to-transparent rotate-45 transition-transform duration-500 group-hover:rotate-[225deg]"></div>
              
              {skill.icon === 'custom-odoo' ? (
                <div className="text-6xl font-bold text-highlight-green mb-2.5 relative z-10 transition-transform duration-300" style={{ fontFamily: 'Arial, sans-serif', letterSpacing: '2px' }}>
                  OD
                </div>
              ) : (
                <i className={`${skill.icon} text-6xl text-highlight-green mb-2.5 relative z-10 transition-transform duration-300 ${hoveredSkill === skill.name ? 'scale-110 rotate-12' : ''}`}></i>
              )}
              <p className="text-lg text-text-light font-medium relative z-10 mb-2">{skill.name}</p>
              
              {/* Progress bar */}
              <div className="w-full h-1.5 bg-dark-bg-alt rounded-full overflow-hidden relative z-10 mt-2">
                <div 
                  className="h-full bg-gradient-to-r from-highlight-green to-highlight-blue transition-all duration-1000 ease-out"
                  style={{ width: hoveredSkill === skill.name ? `${skill.level}%` : '0%' }}
                ></div>
              </div>
              {hoveredSkill === skill.name && (
                <span className="text-xs text-highlight-green mt-1 relative z-10 animate-pulse">{skill.level}%</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
