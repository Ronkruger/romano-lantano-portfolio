import React from 'react';
import { motion } from 'framer-motion';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const timelineData: TimelineEvent[] = [
  {
    year: '2025',
    title: 'Discover Group of Travel Services',
    description: 'Working as a Web Developer at Discover Group of Travel Services, creating innovative travel solutions and web applications.',
    icon: 'fa-briefcase',
    color: 'bg-highlight-blue',
  },
  {
    year: '2024',
    title: 'MERN Stack Mastery',
    description: 'Developed full-stack e-commerce platform using MongoDB, Express, React, and Node.js.',
    icon: 'fa-layer-group',
    color: 'bg-highlight-green',
  },
  {
    year: '2023',
    title: 'Full-Stack Development',
    description: 'Created hotel reservation system with PHP, MySQL, and email integration.',
    icon: 'fa-server',
    color: 'bg-accent-primary',
  },
  {
    year: '2022',
    title: 'Frontend Specialization',
    description: 'Focused on responsive design, modern JavaScript, and React framework.',
    icon: 'fa-laptop-code',
    color: 'bg-link-hover',
  },
  {
    year: '2021',
    title: 'Web Development Journey',
    description: 'Started learning web development with HTML, CSS, and JavaScript fundamentals.',
    icon: 'fa-code',
    color: 'bg-highlight-blue',
  },
];

const Timeline: React.FC = () => {
  return (
    <section id="timeline" className="py-20 bg-dark-bg-alt relative overflow-hidden">
      <div className="w-[90%] max-w-7xl mx-auto px-5 relative z-10">
        <div className="relative inline-block mx-auto text-center pb-5 w-full">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl mb-10 relative text-highlight-blue text-center shadow-[0_0_10px_rgba(0,188,212,0.4)] font-bold uppercase tracking-wider"
          >
            My Journey
          </motion.h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-highlight-blue via-accent-primary to-highlight-green"></div>

          <div className="space-y-12">
            {timelineData.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-4 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content Card */}
                <motion.div
                  whileHover={{ scale: 1.03, x: index % 2 === 0 ? -10 : 10 }}
                  className="w-full md:w-5/12 bg-dark-bg p-6 rounded-xl border border-accent-secondary hover:border-highlight-blue transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.3)] group cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl font-bold text-accent-primary group-hover:text-highlight-blue transition-colors">
                      {event.year}
                    </span>
                    <div className="h-px flex-grow bg-accent-secondary group-hover:bg-highlight-blue transition-colors"></div>
                  </div>
                  <h3 className="text-xl font-semibold text-text-light mb-2 group-hover:text-highlight-blue transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {event.description}
                  </p>
                </motion.div>

                {/* Center Icon */}
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className={`w-16 h-16 ${event.color} rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,188,212,0.5)] z-10 cursor-pointer`}
                >
                  <i className={`fas ${event.icon} text-2xl text-white`}></i>
                </motion.div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
