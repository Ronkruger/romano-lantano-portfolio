import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface GitHubStats {
  repos: number;
  followers: number;
  stars: number;
  contributions: number;
}

interface GitHubRepo {
  stargazers_count: number;
}

const GitHubStats: React.FC = () => {
  const [stats, setStats] = useState<GitHubStats>({
    repos: 0,
    followers: 0,
    stars: 0,
    contributions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const username = 'Ronkruger';
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();
        
        // Fetch repos to count total stars
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        const reposData = await reposResponse.json();
        const totalStars = reposData.reduce((acc: number, repo: GitHubRepo) => acc + repo.stargazers_count, 0);

        setStats({
          repos: data.public_repos,
          followers: data.followers,
          stars: totalStars,
          contributions: 150, // Approximate - requires GraphQL API
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        setLoading(false);
      }
    };

    fetchGitHubStats();
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
    { label: 'Repositories', value: stats.repos, icon: 'fa-code-branch', color: 'text-highlight-blue' },
    { label: 'Followers', value: stats.followers, icon: 'fa-users', color: 'text-accent-primary' },
    { label: 'Total Stars', value: stats.stars, icon: 'fa-star', color: 'text-link-hover' },
    { label: 'Contributions', value: stats.contributions, icon: 'fa-code-commit', color: 'text-highlight-green' },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-dark-bg-alt p-4 rounded-lg animate-pulse">
            <div className="h-8 bg-accent-secondary/20 rounded mb-2"></div>
            <div className="h-4 bg-accent-secondary/20 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
    >
      {statItems.map((item) => (
        <motion.div
          key={item.label}
          variants={itemVariants}
          whileHover={{ scale: 1.05, y: -5 }}
          className="bg-dark-bg-alt p-5 rounded-xl border border-accent-secondary hover:border-highlight-blue transition-all duration-300 cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <i className={`fas ${item.icon} text-2xl ${item.color} group-hover:scale-110 transition-transform duration-300`}></i>
            <i className="fab fa-github text-text-muted text-xl"></i>
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className={`text-3xl font-bold ${item.color} mb-1`}
          >
            {item.value}
          </motion.div>
          <div className="text-sm text-text-muted">{item.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default GitHubStats;
