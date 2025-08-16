import React, { useState, useEffect } from "react";
import type { GitHubRepo, CategorizedRepos } from "../types/github.types";
import {
  categorizeRepositories,
  formatDate,
  getTechnologyBadge,
} from "../utils/github.utils";
import { fetchGitHubRepos } from "../services/github.service";
import RepoCard from "./RepoCard";

const GitHubProjects: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categorizedRepos, setCategorizedRepos] = useState<{
    projects: { client: GitHubRepo[]; server: GitHubRepo[] };
    courses: GitHubRepo[];
    others: GitHubRepo[];
  }>({ projects: { client: [], server: [] }, courses: [], others: [] });

  useEffect(() => {
    fetchRepos();
  }, []);

  const fetchRepos = async () => {
    try {
      setLoading(true);
      setError(null);

      const sortedRepos = await fetchGitHubRepos();

      setRepos(sortedRepos);
      console.log("🎯 Đã set repos vào state:", sortedRepos.length);

      // Phân loại repositories
      const categorized = categorizeRepositories(sortedRepos);
      setCategorizedRepos(categorized);
    } catch (err) {
      console.error("❌ Lỗi khi fetch repositories:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Có lỗi xảy ra khi kết nối với GitHub"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        <span className="ml-3 text-gray-300">Đang tải dự án từ GitHub...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="text-red-400 text-lg mb-4">⚠️ {error}</div>
        <button
          onClick={fetchRepos}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Thống kê tổng quan */}
      <div className="bg-gray-700 rounded-lg p-6 border border-purple-500/20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-purple-400">
              {repos.length}
            </div>
            <div className="text-gray-400 text-sm">Tổng repositories</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">
              {categorizedRepos.projects.client.length +
                categorizedRepos.projects.server.length}
            </div>
            <div className="text-gray-400 text-sm">Projects</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-400">
              {categorizedRepos.courses.length}
            </div>
            <div className="text-gray-400 text-sm">Courses</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-400">
              {categorizedRepos.others.length}
            </div>
            <div className="text-gray-400 text-sm">Others</div>
          </div>
        </div>
        <div className="mt-4 text-center text-gray-400 text-sm">
          🔐 Sử dụng GitHub Access Token - Phân loại theo Project/Course/Others
        </div>
      </div>

      {/* Hiển thị theo nhóm */}
      <div className="space-y-8">
        {/* Projects Client */}
        {categorizedRepos.projects.client.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              Projects Client ({categorizedRepos.projects.client.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categorizedRepos.projects.client.map((repo) => (
                <RepoCard key={repo.id} repo={repo} type="client" />
              ))}
            </div>
          </div>
        )}

        {/* Projects Server */}
        {categorizedRepos.projects.server.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              Projects Server ({categorizedRepos.projects.server.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categorizedRepos.projects.server.map((repo) => (
                <RepoCard key={repo.id} repo={repo} type="server" />
              ))}
            </div>
          </div>
        )}

        {/* Courses */}
        {categorizedRepos.courses.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              Courses ({categorizedRepos.courses.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categorizedRepos.courses.map((repo) => (
                <RepoCard key={repo.id} repo={repo} type="course" />
              ))}
            </div>
          </div>
        )}

        {/* Others */}
        {categorizedRepos.others.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              Others ({categorizedRepos.others.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categorizedRepos.others.map((repo) => (
                <RepoCard key={repo.id} repo={repo} type="other" />
              ))}
            </div>
          </div>
        )}

        {/* Không có repositories nào */}
        {repos.length === 0 && (
          <div className="text-center py-20">
            <div className="text-gray-400 text-lg mb-4">
              📭 Không có repositories nào
            </div>
            <div className="text-gray-500 text-sm">Có thể do:</div>
            <div className="text-gray-500 text-sm">• Token không hợp lệ</div>
            <div className="text-gray-500 text-sm">
              • Không có quyền truy cập
            </div>
            <div className="text-gray-500 text-sm">• API rate limit</div>
            <button
              onClick={fetchRepos}
              className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
            >
              🔄 Thử lại
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GitHubProjects;
