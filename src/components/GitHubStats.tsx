import React from 'react';

interface GitHubStatsProps {
  username: string;
  theme?: 'dark' | 'radical' | 'merko' | 'tokyonight' | 'dracula' | 'cobalt' | 'synthwave' | 'highcontrast' | 'prussian' | 'monokai' | 'vue' | 'vue-dark' | 'shades-of-purple' | 'nightowl' | 'buefy' | 'blue-green' | 'algolia' | 'great-gatsby' | 'darcula' | 'bear' | 'solarized-dark' | 'solarized-light' | 'chartreuse-dark' | 'nord' | 'gotham' | 'material-palenight' | 'graywhite' | 'vision-friendly-dark' | 'ayu-mirage' | 'midnight-purple' | 'calm' | 'flag-india' | 'omni' | 'react-dark' | 'night' | 'coffee' | 'synthwave-84' | 'holi' | 'ayu-light' | 'devsarah' | 'barbie' | 'back-to-the-future' | 'outrun' | 'ocean-dark' | 'city-lights' | 'bluloco-dark' | 'bluloco-light' | 'ubuntu' | 'discord_old_blurple' | 'aura_dark';
  hide?: 'stars' | 'commits' | 'prs' | 'issues' | 'contribs';
  count_private?: boolean;
  include_all_commits?: boolean;
  first_day_of_week?: number;
  line_height?: number;
  title_color?: string;
  icon_color?: string;
  text_color?: string;
  bg_color?: string;
  border_color?: string;
  border_radius?: number;
  custom_title?: string;
  disable_animations?: boolean;
  hide_border?: boolean;
  show_icons?: boolean;
}

const GitHubStats: React.FC<GitHubStatsProps> = ({
  username,
  theme = 'dark',
  hide,
  count_private = false,
  include_all_commits = false,
  first_day_of_week = 0,
  line_height = 25,
  title_color,
  icon_color,
  text_color,
  bg_color,
  border_color,
  border_radius = 4,
  custom_title,
  disable_animations = false,
  hide_border = false,
  show_icons = true
}) => {
  const buildStatsUrl = () => {
    const params = new URLSearchParams({
      username,
      theme,
      count_private: count_private.toString(),
      include_all_commits: include_all_commits.toString(),
      first_day_of_week: first_day_of_week.toString(),
      line_height: line_height.toString(),
      border_radius: border_radius.toString(),
      disable_animations: disable_animations.toString(),
      hide_border: hide_border.toString(),
      show_icons: show_icons.toString()
    });

    if (hide) params.append('hide', hide);
    if (title_color) params.append('title_color', title_color);
    if (icon_color) params.append('icon_color', icon_color);
    if (text_color) params.append('text_color', text_color);
    if (bg_color) params.append('bg_color', bg_color);
    if (border_color) params.append('border_color', border_color);
    if (custom_title) params.append('custom_title', custom_title);

    return `https://github-readme-stats.vercel.app/api?${params.toString()}`;
  };

  const buildTopLanguagesUrl = () => {
    const params = new URLSearchParams({
      username,
      theme,
      layout: 'compact',
      hide_border: hide_border.toString(),
      show_icons: show_icons.toString(),
      border_radius: border_radius.toString()
    });

    if (title_color) params.append('title_color', title_color);
    if (text_color) params.append('text_color', text_color);
    if (bg_color) params.append('bg_color', bg_color);
    if (border_color) params.append('border_color', border_color);
    if (custom_title) params.append('custom_title', custom_title);

    return `https://github-readme-stats.vercel.app/api/top-langs/?${params.toString()}`;
  };

  const buildStreakUrl = () => {
    const params = new URLSearchParams({
      username,
      theme,
      hide_border: hide_border.toString(),
      border_radius: border_radius.toString()
    });

    if (title_color) params.append('title_color', title_color);
    if (text_color) params.append('text_color', text_color);
    if (bg_color) params.append('bg_color', bg_color);
    if (border_color) params.append('border_color', border_color);

    return `https://github-readme-streak-stats.herokuapp.com/?${params.toString()}`;
  };

  return (
    <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-lg p-6 mb-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">
          📈 GitHub Statistics
        </h3>
        <p className="text-gray-300 text-sm">
          Thống kê hoạt động của <span className="text-purple-300">@{username}</span>
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* GitHub Stats */}
        <div className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-700/50 transition-all duration-300">
          <h4 className="text-lg font-semibold text-white mb-3 text-center">📊 Stats</h4>
          <img
            src={buildStatsUrl()}
            alt="GitHub Stats"
            className="w-full h-auto rounded-lg"
          />
        </div>
        
        {/* Top Languages */}
        <div className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-700/50 transition-all duration-300">
          <h4 className="text-lg font-semibold text-white mb-3 text-center">💻 Top Languages</h4>
          <img
            src={buildTopLanguagesUrl()}
            alt="Top Languages"
            className="w-full h-auto rounded-lg"
          />
        </div>
        
        {/* Streak Stats */}
        <div className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-700/50 transition-all duration-300">
          <h4 className="text-lg font-semibold text-white mb-3 text-center">🔥 Streak</h4>
          <img
            src={buildStreakUrl()}
            alt="GitHub Streak"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
      
      <div className="text-center mt-6">
        <button
          onClick={() => window.open(`https://github.com/${username}`, '_blank')}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          👤 Xem Profile GitHub
        </button>
      </div>
    </div>
  );
};

export default GitHubStats;
