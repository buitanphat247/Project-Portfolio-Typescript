export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  stargazers_count: number;
  forks_count: number;
  size: number;
  open_issues_count: number;
  default_branch: string;
  visibility: string;
  fork: boolean;
  archived: boolean;
  disabled: boolean;
}

export interface CategorizedRepos {
  projects: { client: GitHubRepo[], server: GitHubRepo[] };
  courses: GitHubRepo[];
  others: GitHubRepo[];
}
