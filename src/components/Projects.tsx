import React, { useState } from 'react';

const projects = [
  {
    image: './images/dg.png',
    title: 'Discover Group Travel Services',
    description: 'A comprehensive travel booking platform with client-facing website and admin panel for managing tours, packages, and bookings.',
    tech: 'React, Node.js, MongoDB, Express',
    github: 'https://github.com/Ronkruger/discoverGroup',
    demo: 'https://discoverg.netlify.app/',
    demoAdmin: 'https://admindiscovergrp.netlify.app/',
  },
  {
    image: './images/background-color-picker.png',
    title: 'Background Color Picker',
    description: 'An intuitive tool to select and visualize color codes for web design backgrounds.',
    tech: 'HTML, CSS, JavaScript',
    github: 'https://github.com/Ronkruger/background-color-picker',
    demo: 'https://dainty-cassata-231695.netlify.app/',
  },
  {
    image: './images/tip_calculator.png',
    title: 'Tip Calculator',
    description: 'A simple and efficient application to compute tip amounts and split bills easily.',
    tech: 'HTML, CSS',
    github: 'https://github.com/Ronkruger/tip-calculator-for-business',
    demo: 'https://stellar-belekoy-0d4dde.netlify.app/',
  },
  {
    image: './images/yt2mp3.png',
    title: 'YouTube to MP3',
    description: 'A fast and reliable tool to convert YouTube videos into MP3 audio format.',
    tech: 'HTML, CSS, Vite',
    github: 'https://github.com/Ronkruger/yt2mp3',
    demo: 'https://fanciful-choux-59513a.netlify.app/?fbclid=IwY2xjawHsZBVleHRuA2FlcQIxMAABHaGboEt4IcXkMMjbhNzRCPAwhVYxXS-NMn5BSY9UT_oaF09G3d6EW77RQw_aem_Ew78kp8TJZf0sx6UkwsgVA',
  },
  {
    image: './images/hotel.png',
    title: 'Hotel Website',
    description: 'A comprehensive hotel reservation platform with user registration and email confirmation features.',
    tech: 'HTML, CSS, JavaScript, PHP, MySQL',
    github: 'https://github.com/Ronkruger/hotel-website-w-email-registration',
    demo: null,
  },
  {
    image: './images/proshop.png',
    title: 'Online Shop MERN Stack',
    description: 'Your go-to online shop for gadgets – easy browse, secure checkout, and fast delivery right to your door.',
    tech: 'React Js, NodeJS',
    github: 'https://github.com/Ronkruger/shop-v2',
    demo: 'https://proshop-3rqi.onrender.com/',
  },
];

const Projects: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <section id="projects" className="py-20 bg-dark-bg-alt relative overflow-hidden">
      <div className="w-[90%] max-w-7xl mx-auto px-5 relative z-10">
        <div className="relative inline-block mx-auto text-center pb-5 w-full">
          <h2 
            className="text-5xl md:text-6xl mb-10 relative text-highlight-blue text-center shadow-[0_0_10px_rgba(0,188,212,0.4)] font-bold uppercase tracking-wider"
            data-aos="fade-up"
          >
            Projects
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="bg-dark-bg rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.3)] border border-accent-secondary overflow-hidden flex flex-col relative transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(0,0,0,0.5),0_0_15px_rgba(233,69,96,0.4)] hover:border-accent-primary"
              data-aos="fade-up" 
              data-aos-delay={100 + index * 100}
              onMouseEnter={() => setHoveredProject(project.title)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Subtle pattern on hover */}
              <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(57,255,20,0.03),rgba(57,255,20,0.03)_2px,transparent_2px,transparent_10px)] opacity-0 transition-opacity duration-300 z-0 group-hover:opacity-10"></div>
              
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-48 object-cover border-b border-accent-secondary transition-transform duration-500 relative z-10 group-hover:scale-110"
                />
                {/* Interactive overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/80 to-transparent flex items-center justify-center transition-opacity duration-300 z-20 ${hoveredProject === project.title ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <i className="fas fa-eye text-4xl text-highlight-blue mb-2 animate-pulse"></i>
                    <p className="text-text-light font-semibold">View Details</p>
                  </div>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow relative z-10">
                <h3 className="text-2xl text-highlight-blue mb-2 font-semibold">{project.title}</h3>
                <p className="text-sm text-text-muted mb-4 flex-grow">{project.description}</p>
                <p className="text-xs text-highlight-green font-code mt-auto drop-shadow-[0_0_5px_rgba(57,255,20,0.3)]">
                  Technologies: {project.tech}
                </p>
                <div className="flex flex-wrap gap-4 mt-5">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 rounded-md no-underline font-semibold text-sm my-0 mr-4 transition-all duration-300 border-2 uppercase tracking-wide relative overflow-hidden z-10 bg-accent-primary text-white border-accent-primary shadow-[0_0_8px_rgba(233,69,96,0.4)] hover:bg-transparent hover:text-accent-primary hover:shadow-[0_0_20px_rgba(233,69,96,0.8)] hover:-translate-y-0.5"
                  >
                    Source Code
                  </a>
                  {project.demo && (
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-3 rounded-md no-underline font-semibold text-sm my-0 mr-4 transition-all duration-300 border-2 uppercase tracking-wide relative overflow-hidden z-10 bg-transparent text-highlight-blue border-highlight-blue shadow-[0_0_8px_rgba(0,188,212,0.4)] hover:bg-highlight-blue hover:text-dark-bg hover:shadow-[0_0_20px_rgba(0,188,212,0.8)] hover:-translate-y-0.5"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.demoAdmin && (
                    <a 
                      href={project.demoAdmin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-3 rounded-md no-underline font-semibold text-sm my-0 transition-all duration-300 border-2 uppercase tracking-wide relative overflow-hidden z-10 bg-transparent text-highlight-green border-highlight-green shadow-[0_0_8px_rgba(57,255,20,0.4)] hover:bg-highlight-green hover:text-dark-bg hover:shadow-[0_0_20px_rgba(57,255,20,0.8)] hover:-translate-y-0.5"
                    >
                      Admin Panel
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
