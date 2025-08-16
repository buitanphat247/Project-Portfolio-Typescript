// Environment Configuration
export const config = {
  github: {
    token: import.meta.env.VITE_GITHUB_TOKEN,
    username: import.meta.env.VITE_GITHUB_USERNAME,
  },
};

// GitHub URLs
export const githubUrls = {
  profile: `https://github.com/${config.github.username}`,
  repositories: `https://github.com/${config.github.username}?tab=repositories`,
  stars: `https://github.com/${config.github.username}?tab=stars`,
  readme: `https://github.com/${config.github.username}/${config.github.username}`,
};
