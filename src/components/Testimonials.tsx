import React from 'react';

const testimonials = [
  {
    text: 'He is easy to communicate.',
    author: 'Rh****d Ro****e',
    rating: 4.7,
    percentage: 93,
    stars: 4.5,
  },
  {
    text: 'Approachable and quick to address client concerns, plus the pricing is just right.',
    author: 'R***n S***n',
    rating: 5,
    percentage: 100,
    stars: 5,
  },
];

const Testimonials: React.FC = () => {
  const renderStars = (stars: number) => {
    const fullStars = Math.floor(stars);
    const hasHalfStar = stars % 1 !== 0;
    const starsArray = [];

    for (let i = 0; i < fullStars; i++) {
      starsArray.push(<i key={`full-${i}`} className="fas fa-star"></i>);
    }
    if (hasHalfStar) {
      starsArray.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }
    return starsArray;
  };

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      <div className="w-[90%] max-w-7xl mx-auto px-5 relative z-10">
        <div className="relative inline-block mx-auto text-center pb-5 w-full">
          <h2 
            className="text-5xl md:text-6xl mb-10 relative text-highlight-blue text-center shadow-[0_0_10px_rgba(0,188,212,0.4)] font-bold uppercase tracking-wider"
            data-aos="fade-up"
          >
            Testimonials
          </h2>
        </div>
        
        <div 
          className="text-center mb-10 text-lg text-text-light"
          data-aos="fade-up" 
          data-aos-delay="200"
        >
          <strong>Total Reviews: 2 (96.5%)</strong>
          <div className="text-2xl text-link-hover mt-1 drop-shadow-[0_0_8px_rgba(247,217,76,0.5)]">
            {renderStars(4.9)} (4.9/5)
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-dark-bg p-5 rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.3)] border border-accent-secondary text-center transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(0,0,0,0.5),0_0_15px_rgba(0,188,212,0.4)] hover:border-highlight-blue"
              data-aos="zoom-in" 
              data-aos-delay={400 + index * 100}
            >
              <p className="italic mb-4 text-text-muted text-base flex-grow relative pb-4">
                <span className="absolute top-0 left-0 text-2xl text-link-hover/30">"</span>
                {testimonial.text}
                <span className="absolute bottom-0 right-0 text-2xl text-link-hover/30">"</span>
              </p>
              <p className="text-text-light mt-4 block">
                <strong>- {testimonial.author}</strong>
              </p>
              <div className="text-link-hover text-xl my-0 mx-0.5 drop-shadow-[0_0_5px_rgba(247,217,76,0.4)]">
                {renderStars(testimonial.stars)}
              </div>
              <p className="text-sm text-text-light mt-2.5">
                {testimonial.rating}/5 ({testimonial.percentage}%)
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
