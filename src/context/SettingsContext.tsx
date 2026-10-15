import React, { createContext, useContext, useEffect, useState } from 'react';
import { Code2, Mail, Users, Globe2 } from 'lucide-react';
import { profile as fallbackProfile, type SocialLink } from '../data/portfolio';

export interface Profile {
  name: string;
  title: string;
  location: string;
  email: string;
  resumeUrl: string;
  image: string;
  intro: string;
}

interface SiteSettings {
  name: string;
  title: string;
  location: string;
  email: string;
  intro: string;
  resumeUrl: string | null;
  resumePublicId: string | null;
  githubUrl: string;
  linkedinUrl: string;
  facebookUrl: string;
}

interface SettingsContextType {
  profile: Profile;
  socialLinks: SocialLink[];
  loading: boolean;
  error: Error | null;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile>(fallbackProfile);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Initialize socialLinks with static defaults first
  useEffect(() => {
    setSocialLinks([
      {
        label: 'GitHub',
        href: 'https://github.com/Ronkruger',
        icon: Code2,
      },
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/romano-lantano-418870234/',
        icon: Users,
      },
      {
        label: 'Facebook',
        href: 'https://www.facebook.com/R2sl1/',
        icon: Globe2,
      },
      {
        label: 'Email',
        href: `mailto:${fallbackProfile.email}`,
        icon: Mail,
      },
    ]);
  }, []);

  useEffect(() => {
    let active = true;
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings');
        if (!response.ok) {
          throw new Error(`Failed to fetch settings: ${response.status}`);
        }
        const data = await response.json();
        
        if (active && data?.settings) {
          const settings: SiteSettings = data.settings;
          
          setProfile({
            name: settings.name || fallbackProfile.name,
            title: settings.title || fallbackProfile.title,
            location: settings.location || fallbackProfile.location,
            email: settings.email || fallbackProfile.email,
            resumeUrl: settings.resumeUrl || fallbackProfile.resumeUrl,
            image: fallbackProfile.image,
            intro: settings.intro || fallbackProfile.intro,
          });

          setSocialLinks([
            {
              label: 'GitHub',
              href: settings.githubUrl || 'https://github.com/Ronkruger',
              icon: Code2,
            },
            {
              label: 'LinkedIn',
              href: settings.linkedinUrl || 'https://www.linkedin.com/in/romano-lantano-418870234/',
              icon: Users,
            },
            {
              label: 'Facebook',
              href: settings.facebookUrl || 'https://www.facebook.com/R2sl1/',
              icon: Globe2,
            },
            {
              label: 'Email',
              href: `mailto:${settings.email || fallbackProfile.email}`,
              icon: Mail,
            },
          ]);
        }
      } catch (err) {
        console.error('Error loading site settings, falling back to static portfolio data:', err);
        if (active) {
          setError(err instanceof Error ? err : new Error('Unknown error fetching settings'));
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchSettings();

    return () => {
      active = false;
    };
  }, []);

  return (
    <SettingsContext.Provider value={{ profile, socialLinks, loading, error }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
