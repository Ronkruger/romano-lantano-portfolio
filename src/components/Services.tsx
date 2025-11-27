import React, { useState } from 'react';

const services = [
  {
    icon: 'fas fa-laptop-code',
    title: 'Frontend Development',
    description: 'I build responsive and user-friendly interfaces using modern web technologies to ensure a seamless user experience.',
    features: ['Responsive Design', 'Modern UI/UX', 'Performance Optimization', 'Cross-browser Compatible'],
    techStack: [
      { icon: 'fab fa-html5', title: 'HTML' },
      { icon: 'fab fa-css3-alt', title: 'CSS' },
      { icon: 'fab fa-js', title: 'JavaScript' },
      { icon: 'fab fa-react', title: 'React.js' },
      { icon: 'fab fa-bootstrap', title: 'Bootstrap' },
    ],
  },
  {
    icon: 'fas fa-server',
    title: 'Backend Development',
    description: 'Developing secure, efficient, and scalable server-side applications and robust database solutions.',
    features: ['RESTful APIs', 'Database Design', 'Authentication', 'Server Management'],
    techStack: [
      { icon: 'fab fa-php', title: 'PHP' },
      { icon: 'fas fa-database', title: 'MySQL' },
      { icon: 'fas fa-leaf', title: 'MongoDB' },
      { icon: 'fab fa-node-js', title: 'Node.js' },
    ],
  },
];

const Services: React.FC = () => {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      <div className="w-[90%] max-w-7xl mx-auto px-5 relative z-10">
        <div className="relative inline-block mx-auto text-center pb-5 w-full">
          <h2 
            className="text-5xl md:text-6xl mb-10 relative text-highlight-blue text-center shadow-[0_0_10px_rgba(0,188,212,0.4)] font-bold uppercase tracking-wider"
            data-aos="fade-up"
          >
            Services
          </h2>
        </div>
        
        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10"
          data-aos="fade-up" 
          data-aos-delay="200"
        >
          {services.map((service, index) => (
            <div
              key={service.title}
              className="relative h-[400px] perspective-1000"
              data-aos={index === 0 ? "flip-left" : "flip-right"} 
              data-aos-delay={300 + index * 100}
            >
              <div 
                className={`relative w-full h-full transition-transform duration-700 transform-style-3d cursor-pointer ${flippedCard === index ? 'rotate-y-180' : ''}`}
                onClick={() => setFlippedCard(flippedCard === index ? null : index)}
              >
                {/* Front of card */}
                <div className="absolute inset-0 bg-dark-bg p-10 rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.3)] border border-accent-secondary text-center flex flex-col items-center backface-hidden group hover:border-accent-primary transition-all duration-300">
                  <div className="flex justify-center items-center w-24 h-24 rounded-full bg-accent-secondary mb-5 shadow-[0_0_10px_rgba(0,0,0,0.2)] relative group-hover:scale-110 transition-transform duration-300">
                    <i className={`${service.icon} text-5xl text-highlight-blue relative z-10`}></i>
                  </div>
                  
                  <h3 className="text-text-light text-3xl mb-4 font-semibold">{service.title}</h3>
                  <p className="text-base text-text-muted mb-5 flex-grow">{service.description}</p>
                  
                  <div className="mt-auto flex flex-wrap justify-center gap-4">
                    {service.techStack.map((tech) => (
                      <i 
                        key={tech.title} 
                        className={`${tech.icon} text-3xl text-highlight-blue transition-all duration-300 hover:text-accent-primary hover:scale-125 hover:drop-shadow-[0_0_8px_rgba(233,69,96,0.6)]`}
                        title={tech.title}
                      ></i>
                    ))}
                  </div>
                  
                  <div className="mt-4 text-sm text-highlight-green animate-pulse">
                    Click to see features →
                  </div>
                </div>

                {/* Back of card */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-primary to-accent-secondary p-10 rounded-xl shadow-[0_8px_25px_rgba(0,0,0,0.5)] text-center flex flex-col items-center justify-center rotate-y-180 backface-hidden">
                  <h3 className="text-white text-2xl mb-6 font-bold">Key Features</h3>
                  <ul className="space-y-3 text-left">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-white flex items-center gap-3 transform hover:translate-x-2 transition-transform duration-200">
                        <i className="fas fa-check-circle text-highlight-green text-xl"></i>
                        <span className="text-lg">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 text-sm text-white/80">
                    Click to flip back ←
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
