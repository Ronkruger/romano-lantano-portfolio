import { Mail, MapPin, Paperclip, Send } from 'lucide-react';
import { type FormEvent, useState } from 'react';
import Section from './ui/Section';
import { profile, socialLinks } from '../data/portfolio';

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const initialFormData = {
  name: '',
  email: '',
  message: '',
};

const Contact = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [charCount, setCharCount] = useState(0);
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const isSubmitting = status === 'submitting';
  const fieldClass = 'w-full rounded-md border border-white/10 bg-dark-bg-alt px-4 py-3 text-text-light outline-none transition placeholder:text-text-muted/60 focus:border-accent-primary/70 focus:ring-2 focus:ring-accent-primary/30';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const requestBody = new FormData(form);
    const actionUrl = form.getAttribute('action') || '';

    setStatus('submitting');
    setStatusMessage('Sending your message...');

    try {
      const response = await fetch(actionUrl, {
        method: 'POST',
        body: requestBody,
        headers: {
          Accept: 'application/json',
        },
      });

      const result = (await response.json().catch(() => ({}))) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || 'Message submission failed.');
      }

      setStatus('success');
      setStatusMessage("Thank you for your message. I'll get back to you soon.");
      setFormData(initialFormData);
      setCharCount(0);
      // form.reset() is redundant — controlled state already resets the fields
    } catch {
      setStatus('error');
      setStatusMessage('There was a problem sending your message. Please try again or email me directly.');
    }
  };

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Tell me what you want to build."
      description="Share the project context, the deadline, or even the rough idea. I will help turn it into a clear next step."
      muted
    >
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="rounded-lg border border-white/10 bg-surface-raised/70 p-6 shadow-editorial">
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-accent-primary/10 text-accent-primary">
            <Mail size={22} aria-hidden="true" />
          </div>
          <h3 className="mt-6 text-2xl font-semibold text-text-light">Direct contact</h3>
          <p className="mt-3 text-sm leading-7 text-text-muted">
            Prefer not to use the form? Send an email directly or connect through the links below.
          </p>

          <div className="mt-6 space-y-3 text-sm text-text-muted">
            <a className="flex items-center gap-3 transition hover:text-accent-primary" href={`mailto:${profile.email}`}>
              <Mail size={17} aria-hidden="true" />
              {profile.email}
            </a>
            <span className="flex items-center gap-3">
              <MapPin size={17} aria-hidden="true" />
              {profile.location}
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {socialLinks.slice(0, 3).map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="grid min-h-11 min-w-11 place-items-center rounded-md border border-white/10 text-text-muted transition hover:border-accent-primary/60 hover:text-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/70"
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </aside>

        <form
          onSubmit={handleSubmit}
          action="https://getform.io/f/bdrnyndb"
          method="POST"
          encType="multipart/form-data"
          className="rounded-lg border border-white/10 bg-surface-raised/70 p-6 shadow-editorial md:p-8"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-semibold text-text-light">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                autoComplete="name"
                value={formData.name}
                onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                className={fieldClass}
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-text-light">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                autoComplete="email"
                value={formData.email}
                onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                className={fieldClass}
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="file" className="mb-2 flex items-center gap-2 text-sm font-semibold text-text-light">
              <Paperclip size={16} aria-hidden="true" />
              Attachment optional
            </label>
            <input
              type="file"
              id="file"
              name="file"
              className="w-full rounded-md border border-dashed border-white/15 bg-dark-bg-alt px-4 py-3 text-sm text-text-muted file:mr-4 file:rounded-md file:border-0 file:bg-accent-primary file:px-3 file:py-2 file:text-sm file:font-semibold file:text-dark-bg focus:outline-none focus:ring-2 focus:ring-accent-primary/30"
            />
          </div>

          <div className="mt-5">
            <label htmlFor="message" className="mb-2 flex justify-between gap-4 text-sm font-semibold text-text-light">
              <span>Message</span>
              <span id="message-count" className="font-normal text-text-muted">{charCount}/500</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              maxLength={500}
              value={formData.message}
              aria-describedby="message-count"
              onChange={(event) => {
                setFormData({ ...formData, message: event.target.value });
                setCharCount(event.target.value.length);
              }}
              className={`${fieldClass} min-h-[150px] resize-y`}
              placeholder="A short project brief, timeline, or question..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-accent-primary px-5 py-3 text-sm font-semibold text-dark-bg transition hover:-translate-y-0.5 hover:bg-link-hover focus:outline-none focus:ring-2 focus:ring-accent-primary/70 disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
          >
            <Send size={18} aria-hidden="true" />
            {isSubmitting ? 'Sending...' : 'Send message'}
          </button>

          <p
            className={`mt-5 rounded-md border p-4 text-sm ${
              status === 'success'
                ? 'border-highlight-green/40 bg-highlight-green/10 text-highlight-green'
                : status === 'error'
                  ? 'border-accent-primary/40 bg-accent-primary/10 text-accent-primary'
                  : 'border-transparent text-text-muted'
            }`}
            role="status"
            aria-live="polite"
          >
            {statusMessage || 'I usually respond after reviewing the project details.'}
          </p>
        </form>
      </div>
    </Section>
  );
};

export default Contact;
