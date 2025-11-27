import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [charCount, setCharCount] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    const actionUrl = form.getAttribute('action') || '';

    try {
      const response = await fetch(actionUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      const result = await response.json();

      if (response.ok) {
        setMessageText('Thank you for your message! I\'ll get back to you soon.');
        setMessageType('success');
        form.reset();
      } else {
        setMessageText(result.message || 'Oops! There was an error sending your message. Please try again later.');
        setMessageType('error');
      }
    } catch (error) {
      setMessageText('Network error. Please check your internet connection and try again.');
      setMessageType('error');
    } finally {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 7000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-dark-bg-alt relative overflow-hidden">
      <div className="w-[90%] max-w-7xl mx-auto px-5 relative z-10">
        <div className="relative inline-block mx-auto text-center pb-5 w-full">
          <h2 
            className="text-5xl md:text-6xl mb-10 relative text-highlight-blue text-center shadow-[0_0_10px_rgba(0,188,212,0.4)] font-bold uppercase tracking-wider"
            data-aos="fade-up"
          >
            Contact Me
          </h2>
        </div>
        
        <form 
          onSubmit={handleSubmit}
          action="https://getform.io/f/bdrnyndb" 
          method="POST" 
          encType="multipart/form-data"
          className="flex flex-col max-w-2xl mx-auto bg-dark-bg p-10 rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.3)] border border-accent-secondary relative overflow-hidden"
          data-aos="fade-up" 
          data-aos-delay="200"
        >
          {/* Background gradient */}
          <div className="absolute -top-2.5 -left-2.5 -right-2.5 -bottom-2.5 bg-gradient-to-br from-accent-primary/5 to-highlight-blue/5 -z-0 pointer-events-none rounded-2xl"></div>
          
          <label htmlFor="name" className="mb-2 font-medium text-text-light text-lg relative z-10 transition-colors duration-200" style={{ color: focusedField === 'name' ? '#00bcd4' : '' }}>Name:</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
            className="w-full p-3 mb-5 border border-accent-secondary rounded bg-dark-bg-alt text-text-light font-primary outline-none transition-all duration-300 relative z-10 focus:border-highlight-blue focus:shadow-[0_0_8px_rgba(0,188,212,0.4)] focus:scale-[1.02]"
          />
          
          <label htmlFor="email" className="mb-2 font-medium text-text-light text-lg relative z-10 transition-colors duration-200" style={{ color: focusedField === 'email' ? '#00bcd4' : '' }}>Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            className="w-full p-3 mb-5 border border-accent-secondary rounded bg-dark-bg-alt text-text-light font-primary outline-none transition-all duration-300 relative z-10 focus:border-highlight-blue focus:shadow-[0_0_8px_rgba(0,188,212,0.4)] focus:scale-[1.02]"
          />
          
          <label htmlFor="file" className="mb-2 font-medium text-text-light text-lg relative z-10">Insert File (Optional):</label>
          <input 
            type="file" 
            id="file" 
            name="file"
            className="w-full p-2.5 mb-5 border border-dashed border-accent-secondary rounded bg-dark-bg-alt text-text-muted relative z-10"
          />
          
          <div className="relative">
            <label htmlFor="message" className="mb-2 font-medium text-text-light text-lg relative z-10 transition-colors duration-200 flex justify-between" style={{ color: focusedField === 'message' ? '#00bcd4' : '' }}>
              <span>Message:</span>
              <span className="text-sm text-text-muted">{charCount}/500</span>
            </label>
            <textarea 
              id="message" 
              name="message" 
              required
              maxLength={500}
              value={formData.message}
              onChange={(e) => {
                setFormData({ ...formData, message: e.target.value });
                setCharCount(e.target.value.length);
              }}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              className="w-full p-3 mb-5 border border-accent-secondary rounded bg-dark-bg-alt text-text-light font-primary outline-none transition-all duration-300 min-h-[120px] resize-y relative z-10 focus:border-highlight-blue focus:shadow-[0_0_8px_rgba(0,188,212,0.4)] focus:scale-[1.02]"
            ></textarea>
          </div>
          
          <button 
            type="submit"
            className="inline-block px-6 py-3 rounded-md no-underline font-semibold text-sm my-2.5 mr-4 transition-all duration-300 border-2 uppercase tracking-wide relative overflow-hidden z-10 bg-accent-primary text-white border-accent-primary shadow-[0_0_8px_rgba(233,69,96,0.4)] hover:bg-transparent hover:text-accent-primary hover:shadow-[0_0_20px_rgba(233,69,96,0.8)] hover:-translate-y-0.5 hover:scale-105 active:scale-95"
          >
            <span className="flex items-center gap-2">
              <i className="fas fa-paper-plane"></i>
              Send Message
            </span>
          </button>
          
          {showMessage && (
            <p 
              className={`mt-5 p-4 rounded border text-center font-medium relative z-10 ${
                messageType === 'success' 
                  ? 'bg-highlight-green/20 border-highlight-green text-highlight-green' 
                  : 'bg-accent-primary/20 border-accent-primary text-accent-primary'
              }`}
            >
              {messageText}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;
