import { useState, useEffect } from 'react';
import axios from 'axios';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  created_at: string;
  updated_at: string;
  topics: string[];
  private: boolean;
}

interface ProjectTimeline {
  id: number;
  name: string;
  description: string;
  language: string;
  url: string;
  homepage: string | null;
  createdAt: string;
  updatedAt: string;
  topics: string[];
}

export const useGitHubProjects = () => {
  const [projects, setProjects] = useState<ProjectTimeline[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = import.meta.env.VITE_GITHUB_TOKEN;
        const username = import.meta.env.VITE_GITHUB_USERNAME;
        
        if (!token || !username) {
          setError('GitHub token or username not found');
          setLoading(false);
          return;
        }

        const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
          headers: {
            Authorization: `token ${token}`,
          },
        });

        // Filter only public repositories that start with "project" (case insensitive)
        const publicRepos = response.data
          .filter((repo: GitHubRepo) => !repo.private && repo.name.toLowerCase().startsWith('project'))
          .sort((a: GitHubRepo, b: GitHubRepo) => 
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          )
          .slice(0, 12) // Limit to 12 most recent projects
          .map((repo: GitHubRepo) => ({
            id: repo.id,
            name: repo.name.replace(/-/g, ' '), // Replace all hyphens with spaces
            description: repo.description || 'Không có mô tả',
            language: repo.language || 'Other',
            url: repo.html_url,
            homepage: repo.homepage,
            createdAt: repo.created_at,
            updatedAt: repo.updated_at,
            topics: repo.topics || [],
          }));

        setProjects(publicRepos);
        setError(null);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Không thể tải dự án. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
};
