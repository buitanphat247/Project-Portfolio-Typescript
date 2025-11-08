import { useState } from 'react';
import { projectsApi } from '../api/projects.api';
import { skillCategoriesApi } from '../api/skillCategories.api';
import { skillsApi } from '../api/skills.api';
import { achievementCategoriesApi } from '../api/achievementCategories.api';
import { achievementsApi } from '../api/achievements.api';

export default function ExportData() {
  const [loading, setLoading] = useState(false);
  const [exported, setExported] = useState(false);
  const [stats, setStats] = useState(null);

  const handleExport = async () => {
    try {
      setLoading(true);
      setExported(false);

      // Lấy tất cả dữ liệu từ các collections
      // Sử dụng try-catch riêng cho từng collection để không bị dừng nếu một collection lỗi
      const collections = {
        projects: [],
        skillCategories: [],
        skills: [],
        achievementCategories: [],
        achievements: [],
      };

      try {
        collections.projects = await projectsApi.getAll();
      } catch (err) {
        console.error('Error fetching projects:', err);
        collections.projects = [];
      }

      try {
        collections.skillCategories = await skillCategoriesApi.getAll();
      } catch (err) {
        console.error('Error fetching skillCategories:', err);
        collections.skillCategories = [];
      }

      try {
        collections.skills = await skillsApi.getAllWithoutPagination();
      } catch (err) {
        console.error('Error fetching skills:', err);
        collections.skills = [];
      }

      try {
        collections.achievementCategories = await achievementCategoriesApi.getAll();
      } catch (err) {
        console.error('Error fetching achievementCategories:', err);
        collections.achievementCategories = [];
      }

      try {
        collections.achievements = await achievementsApi.getAll();
      } catch (err) {
        console.error('Error fetching achievements:', err);
        collections.achievements = [];
      }

      // Chuẩn hóa dữ liệu (convert tất cả Firestore types thành JSON-safe types)
      const normalizeValue = (value) => {
        // Firestore Timestamp
        if (value && typeof value.toDate === 'function') {
          return value.toDate().toISOString();
        }
        // Firestore GeoPoint
        if (value && typeof value.latitude === 'function') {
          return { latitude: value.latitude(), longitude: value.longitude() };
        }
        // Firestore DocumentReference
        if (value && typeof value.path !== 'undefined' && typeof value.id !== 'undefined') {
          return { _type: 'reference', path: value.path, id: value.id };
        }
        // Array - recursive
        if (Array.isArray(value)) {
          return value.map(normalizeValue);
        }
        // Object - recursive
        if (value && typeof value === 'object' && value.constructor === Object) {
          const normalized = {};
          for (const key in value) {
            if (value.hasOwnProperty(key)) {
              normalized[key] = normalizeValue(value[key]);
            }
          }
          return normalized;
        }
        // Primitive values
        return value;
      };

      const normalizeData = (data) => {
        return data.map((item) => {
          const normalized = {};
          for (const key in item) {
            if (item.hasOwnProperty(key)) {
              normalized[key] = normalizeValue(item[key]);
            }
          }
          return normalized;
        });
      };

      const exportData = {
        exportDate: new Date().toISOString(),
        version: '1.0',
        collections: {
          projects: normalizeData(collections.projects),
          skillCategories: normalizeData(collections.skillCategories),
          skills: normalizeData(collections.skills),
          achievementCategories: normalizeData(collections.achievementCategories),
          achievements: normalizeData(collections.achievements),
        },
        stats: {
          projects: collections.projects.length,
          skillCategories: collections.skillCategories.length,
          skills: collections.skills.length,
          achievementCategories: collections.achievementCategories.length,
          achievements: collections.achievements.length,
        },
      };

      // Tạo file JSON và download
      const jsonString = JSON.stringify(exportData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `portfolio-database-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setStats(exportData.stats);
      setExported(true);
      setTimeout(() => {
        setExported(false);
        setStats(null);
      }, 5000);
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Lỗi khi export dữ liệu: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Export Database</h2>
        
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            Xuất toàn bộ dữ liệu từ Firebase Firestore ra file JSON. File sẽ bao gồm:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
            <li>Projects (Dự án)</li>
            <li>Skill Categories (Danh mục kỹ năng)</li>
            <li>Skills (Kỹ năng)</li>
            <li>Achievement Categories (Danh mục thành tích)</li>
            <li>Achievements (Thành tích)</li>
          </ul>
        </div>

        <button
          onClick={handleExport}
          disabled={loading}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : exported
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white`}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Đang export...
            </span>
          ) : exported ? (
            <span className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Export thành công!
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export Database
            </span>
          )}
        </button>

        {exported && stats && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-semibold mb-3">✅ Export thành công!</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Projects</p>
                <p className="text-2xl font-bold text-green-600">{stats.projects}</p>
              </div>
              <div>
                <p className="text-gray-600">Skill Categories</p>
                <p className="text-2xl font-bold text-green-600">{stats.skillCategories}</p>
              </div>
              <div>
                <p className="text-gray-600">Skills</p>
                <p className="text-2xl font-bold text-green-600">{stats.skills}</p>
              </div>
              <div>
                <p className="text-gray-600">Achievement Categories</p>
                <p className="text-2xl font-bold text-green-600">{stats.achievementCategories}</p>
              </div>
              <div>
                <p className="text-gray-600">Achievements</p>
                <p className="text-2xl font-bold text-green-600">{stats.achievements}</p>
              </div>
            </div>
            <p className="mt-3 text-green-700 text-sm">
              File JSON đã được tải xuống thành công!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

