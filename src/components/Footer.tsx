import { useSettings } from '../context/SettingsContext';

const Footer = () => {
  const { socialLinks } = useSettings();
  return (
    <footer className="relative z-10 border-t border-white/10 bg-dark-bg/90 py-10 text-text-muted">
      <div className="mx-auto flex w-[90%] max-w-7xl flex-col items-center gap-5 px-5 text-center md:flex-row md:justify-between md:text-left">
        <p className="text-sm">&copy; 2026 Romano Lantano. Built with React, TypeScript, and careful motion.</p>
        <ul className="flex list-none gap-3 p-0">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <li key={social.label}>
                <a
                  href={social.href}
                  target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  aria-label={social.label}
                  className="grid min-h-11 min-w-11 place-items-center rounded-md border border-white/10 text-text-muted transition hover:-translate-y-0.5 hover:border-accent-primary/60 hover:text-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/70"
                >
                  <Icon size={19} aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
