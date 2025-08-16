import React, { useMemo } from 'react';
import { notification } from 'antd';
import type { GitHubRepo } from '../types/github.types';
import { getTechnologyBadge, formatDate } from '../utils/github.utils';

interface RepoCardProps {
  repo: GitHubRepo;
  type: 'client' | 'server' | 'course' | 'other';
}

const RepoCard: React.FC<RepoCardProps> = ({ repo, type }) => {
  const [api, contextHolder] = notification.useNotification();
  
  const getTypeColor = () => {
    switch (type) {
      case 'client': return 'border-green-500/40 hover:border-green-500/60';
      case 'server': return 'border-blue-500/40 hover:border-blue-500/60';
      case 'course': return 'border-yellow-500/40 hover:border-yellow-500/60';
      case 'other': return 'border-purple-500/40 hover:border-purple-500/60';
      default: return 'border-purple-500/20 hover:border-purple-500/40';
    }
  };



  return (
    <>
      {contextHolder}
      <div className={`bg-gray-700 cursor-pointer rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border ${getTypeColor()} group`}>
        <div className="p-6">
          {/* Header với tên và ngày */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              {/* <span className="text-lg">{getTypeIcon()}</span> */}
              <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors truncate flex-1">
                {repo.name.replace(/-/g, ' ').replace(/_/g, ' ')}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
              <span>Cập nhật: {formatDate(repo.updated_at)}</span>
            </div>
          </div>
          
          {/* Technologies và Topics */}
          <div className="flex flex-wrap gap-2 mb-4">
            {repo.language && (
              <span className="px-3 py-1 bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-200 border border-purple-500/40 text-xs rounded-full font-medium">
                {getTechnologyBadge(repo.language)}
              </span>
            )}
            {repo.topics.slice(0, 2).map((topic, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-600/50 text-gray-200 border border-gray-500/30 text-xs rounded-full"
              >
                {topic}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gray-800 hover:bg-gray-900 text-white text-center py-2 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer"
            >
              GitHub
            </a>
            <button
              onClick={() => {
                if (repo.homepage) {
                  window.open(repo.homepage, '_blank');
                } else {
                  api.info({
                    message: 'Không có Live Demo',
                    description: 'Dự án này chưa có Live Demo. Vui lòng xem trên GitHub!',
                    placement: 'topRight',
                    duration: 4,
                  });
                }
              }}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-center py-2 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer"
            >
              Live Demo
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RepoCard;
