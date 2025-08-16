import React from 'react';

interface GitHubProfileCardProps {
  username: string;
  theme?: 'dark' | 'light';
  hideBorder?: boolean;
  bgColor?: string;
  color?: string;
  line?: string;
  point?: string;
  area?: boolean;
  areaColor?: string;
  hideTitle?: boolean;
  radius?: number;
  size?: number;
  stroke?: number;
  strokeWidth?: number;
  width?: number;
  height?: number;
}

const GitHubProfileCard: React.FC<GitHubProfileCardProps> = ({
  username,
  theme = 'dark',
  hideBorder = false,
  bgColor,
  color,
  line,
  point,
  area = true,
  areaColor,
  hideTitle = false,
  radius = 4,
  size = 400,
  stroke = 1.5,
  strokeWidth = 1,
  width = 800,
  height = 200
}) => {
  const buildGraphUrl = () => {
    const params = new URLSearchParams({
      username,
      theme,
      hide_border: hideBorder.toString(),
      area: area.toString(),
      hide_title: hideTitle.toString(),
      radius: radius.toString(),
      size: size.toString(),
      stroke: stroke.toString(),
      stroke_width: strokeWidth.toString(),
      width: width.toString(),
      height: height.toString()
    });

    if (bgColor) params.append('bg_color', bgColor);
    if (color) params.append('color', color);
    if (line) params.append('line', line);
    if (point) params.append('point', point);
    if (areaColor) params.append('area_color', areaColor);

    return `https://github-readme-activity-graph.vercel.app/graph?${params.toString()}`;
  };

  return (
    <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-lg p-6 mb-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">
          👨‍💻 GitHub Profile
        </h3>
        <p className="text-gray-300 text-sm">
          Profile và hoạt động của <span className="text-purple-300">@{username}</span>
        </p>
      </div>
      
      <div className="flex justify-center">
        <div className="relative group">
          <img
            src={buildGraphUrl()}
            alt={`GitHub Profile for ${username}`}
            className="rounded-lg shadow-lg transition-all duration-300 group-hover:scale-105"
            style={{
              maxWidth: '100%',
              height: 'auto',
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
            }}
          />
          
          {/* Overlay with GitHub link */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
            <button
              onClick={() => window.open(`https://github.com/${username}`, '_blank')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              👤 Xem Profile GitHub
            </button>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-4">
        <p className="text-gray-400 text-xs">
          💡 Click vào biểu đồ để xem profile GitHub chi tiết
        </p>
      </div>
    </div>
  );
};

export default GitHubProfileCard;
