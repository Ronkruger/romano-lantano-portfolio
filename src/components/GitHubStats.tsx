import { Activity, Code2, GitFork, Star, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Section from './ui/Section';

interface GitHubStats {
  repos: number;
  followers: number;
  stars: number;
  contributions: number;
}

interface GitHubRepo {
  stargazers_count: number;
}

interface GitHubUser {
  public_repos: number;
  followers: number;
}

const CACHE_KEY = 'github_stats_cache';
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

interface CachedStats {
  data: GitHubStats;
  timestamp: number;
}

const readCache = (): GitHubStats | null => {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cached: CachedStats = JSON.parse(raw);
    if (Date.now() - cached.timestamp > CACHE_TTL_MS) return null;
    return cached.data;
  } catch {
    return null;
  }
};

const writeCache = (data: GitHubStats) => {
  try {
    const payload: CachedStats = { data, timestamp: Date.now() };
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    // sessionStorage unavailable — silently skip
  }
};

const GitHubStats = () => {
  const [stats, setStats] = useState<GitHubStats>({
    repos: 0,
    followers: 0,
    stars: 0,
    contributions: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchGitHubStats = async () => {
      // Return cached data immediately if available
      const cached = readCache();
      if (cached) {
        setStats(cached);
        setLoading(false);
        return;
      }

      try {
        const username = 'Ronkruger';
        const response = await fetch(`https://api.github.com/users/${username}`, { signal: controller.signal });
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, { signal: controller.signal });

        if (!response.ok || !reposResponse.ok) {
          throw new Error('GitHub request failed');
        }

        const data = (await response.json()) as GitHubUser;
        const reposData = (await reposResponse.json()) as GitHubRepo[];
        const totalStars = reposData.reduce((acc: number, repo: GitHubRepo) => acc + repo.stargazers_count, 0);

        const freshStats: GitHubStats = {
          repos: data.public_repos,
          followers: data.followers,
          stars: totalStars,
          contributions: 150, // Approximate — requires GitHub GraphQL API
        };

        writeCache(freshStats);
        setStats(freshStats);
        setError('');
        setLoading(false);
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        setError('GitHub stats are temporarily unavailable.');
        setLoading(false);
      }
    };

    fetchGitHubStats();

    return () => controller.abort();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const statItems = [
    { label: 'Repositories', value: stats.repos, icon: GitFork, color: 'text-highlight-blue' },
    { label: 'Followers', value: stats.followers, icon: Users, color: 'text-accent-primary' },
    { label: 'Total Stars', value: stats.stars, icon: Star, color: 'text-link-hover' },
    { label: 'Activity Score', value: stats.contributions, icon: Activity, color: 'text-highlight-green' },
  ];

  if (loading) {
    return (
      <Section eyebrow="Open source" title="GitHub activity" description="Live public signals from my GitHub profile." centered>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="animate-pulse rounded-lg border border-white/10 bg-surface-raised/70 p-5">
              <div className="mb-3 h-8 rounded bg-white/10" />
              <div className="h-4 w-3/4 rounded bg-white/10" />
            </div>
          ))}
        </div>
      </Section>
    );
  }

  return (
    <Section eyebrow="Open source" title="GitHub activity" description="A compact view of public repository signals and profile activity." centered>
      {error && (
        <p className="mx-auto mb-6 max-w-xl rounded-lg border border-accent-primary/30 bg-accent-primary/10 p-4 text-sm text-accent-primary" role="status">
          {error}
        </p>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 gap-4 md:grid-cols-4"
      >
        {statItems.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="rounded-lg border border-white/10 bg-surface-raised/70 p-5 text-left shadow-lift transition hover:border-highlight-blue/50"
            >
              <div className="mb-4 flex items-center justify-between">
                <Icon className={item.color} size={24} aria-hidden="true" />
                <Code2 className="text-text-muted" size={20} aria-hidden="true" />
              </div>
              <div className={`mb-1 text-3xl font-semibold ${item.color}`}>{item.value}</div>
              <div className="text-sm text-text-muted">{item.label}</div>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
};

export default GitHubStats;
