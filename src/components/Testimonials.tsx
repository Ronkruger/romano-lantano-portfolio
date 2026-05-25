import { Star } from 'lucide-react';
import Section from './ui/Section';
import { testimonials } from '../data/portfolio';

const Testimonials = () => {
  return (
    <Section
      id="testimonials"
      eyebrow="Feedback"
      title="Clear communication matters as much as the code."
      description="A small but useful signal from previous client interactions."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {testimonials.map((testimonial) => (
          <article key={testimonial.author} className="rounded-lg border border-white/10 bg-surface-raised/70 p-6 shadow-lift">
            <div className="flex gap-1 text-link-hover" aria-label={`${testimonial.rating} out of 5 stars`}>
              {Array.from({ length: 5 }, (_, index) => (
                <Star key={index} size={18} fill={index < Math.round(testimonial.rating) ? 'currentColor' : 'none'} aria-hidden="true" />
              ))}
            </div>
            <blockquote className="mt-6 text-xl leading-8 text-text-light">"{testimonial.quote}"</blockquote>
            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="font-semibold text-text-light">{testimonial.author}</p>
              <p className="text-sm text-text-muted">{testimonial.context} - {testimonial.rating}/5</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
};

export default Testimonials;
