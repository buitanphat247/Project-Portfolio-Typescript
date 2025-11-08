import { useState, useRef } from 'react';
import { projectsApi } from '../api/projects.api';
import { skillCategoriesApi } from '../api/skillCategories.api';
import { skillsApi } from '../api/skills.api';
import { achievementCategoriesApi } from '../api/achievementCategories.api';
import { achievementsApi } from '../api/achievements.api';

export default function ImportData() {
  const [loading, setLoading] = useState(false);
  const [imported, setImported] = useState(false);
  const [error, setError] = useState('');
  const [stats, setStats] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== 'application/json') {
      setError('Vui lòng chọn file JSON hợp lệ!');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);
        await handleImport(jsonData);
      } catch (err) {
        setError('Lỗi đọc file JSON: ' + err.message);
        console.error(err);
      }
    };
    reader.readAsText(file);
  };

  const handleImport = async (data) => {
    try {
      setLoading(true);
      setError('');
      setImported(false);
      setStats(null);

      // Validate structure
      if (!data.collections) {
        throw new Error('File JSON không đúng định dạng. Thiếu trường "collections"');
      }

      const stats = {
        projects: 0,
        skillCategories: 0,
        skills: 0,
        achievementCategories: 0,
        achievements: 0,
        errors: [],
      };

      // Import Skill Categories trước (vì Skills phụ thuộc vào nó)
      if (data.collections.skillCategories && Array.isArray(data.collections.skillCategories)) {
        for (const item of data.collections.skillCategories) {
          try {
            const { id, ...itemData } = item;
            // Convert ISO string back to Date if needed
            if (itemData.createdAt && typeof itemData.createdAt === 'string') {
              itemData.createdAt = new Date(itemData.createdAt);
            }
            if (itemData.updatedAt && typeof itemData.updatedAt === 'string') {
              itemData.updatedAt = new Date(itemData.updatedAt);
            }
            await skillCategoriesApi.create(itemData);
            stats.skillCategories++;
          } catch (err) {
            stats.errors.push(`Skill Category "${item.name || id}": ${err.message}`);
          }
        }
      }

      // Import Skills
      if (data.collections.skills && Array.isArray(data.collections.skills)) {
        for (const item of data.collections.skills) {
          try {
            const { id, ...itemData } = item;
            if (itemData.createdAt && typeof itemData.createdAt === 'string') {
              itemData.createdAt = new Date(itemData.createdAt);
            }
            if (itemData.updatedAt && typeof itemData.updatedAt === 'string') {
              itemData.updatedAt = new Date(itemData.updatedAt);
            }
            await skillsApi.create(itemData);
            stats.skills++;
          } catch (err) {
            stats.errors.push(`Skill "${item.name || id}": ${err.message}`);
          }
        }
      }

      // Import Achievement Categories trước
      if (data.collections.achievementCategories && Array.isArray(data.collections.achievementCategories)) {
        for (const item of data.collections.achievementCategories) {
          try {
            const { id, ...itemData } = item;
            if (itemData.createdAt && typeof itemData.createdAt === 'string') {
              itemData.createdAt = new Date(itemData.createdAt);
            }
            if (itemData.updatedAt && typeof itemData.updatedAt === 'string') {
              itemData.updatedAt = new Date(itemData.updatedAt);
            }
            await achievementCategoriesApi.create(itemData);
            stats.achievementCategories++;
          } catch (err) {
            stats.errors.push(`Achievement Category "${item.name || id}": ${err.message}`);
          }
        }
      }

      // Import Achievements
      if (data.collections.achievements && Array.isArray(data.collections.achievements)) {
        for (const item of data.collections.achievements) {
          try {
            const { id, ...itemData } = item;
            if (itemData.createdAt && typeof itemData.createdAt === 'string') {
              itemData.createdAt = new Date(itemData.createdAt);
            }
            if (itemData.updatedAt && typeof itemData.updatedAt === 'string') {
              itemData.updatedAt = new Date(itemData.updatedAt);
            }
            await achievementsApi.create(itemData);
            stats.achievements++;
          } catch (err) {
            stats.errors.push(`Achievement "${item.title || id}": ${err.message}`);
          }
        }
      }

      // Import Projects
      if (data.collections.projects && Array.isArray(data.collections.projects)) {
        for (const item of data.collections.projects) {
          try {
            const { id, ...itemData } = item;
            if (itemData.createdAt && typeof itemData.createdAt === 'string') {
              itemData.createdAt = new Date(itemData.createdAt);
            }
            if (itemData.updatedAt && typeof itemData.updatedAt === 'string') {
              itemData.updatedAt = new Date(itemData.updatedAt);
            }
            await projectsApi.create(itemData);
            stats.projects++;
          } catch (err) {
            stats.errors.push(`Project "${item.title || id}": ${err.message}`);
          }
        }
      }

      setStats(stats);
      setImported(true);
      setTimeout(() => setImported(false), 5000);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setError('Lỗi khi import dữ liệu: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Import Database</h2>
        
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            Import dữ liệu từ file JSON vào Firebase Firestore. File JSON phải có định dạng giống như file export.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <p className="text-yellow-800 text-sm font-semibold mb-2">⚠️ Lưu ý:</p>
            <ul className="list-disc list-inside text-yellow-700 text-sm space-y-1">
              <li>Dữ liệu sẽ được thêm mới vào database (không ghi đè dữ liệu cũ)</li>
              <li>ID cũ sẽ không được giữ lại, Firebase sẽ tạo ID mới</li>
              <li>Nên backup database trước khi import</li>
            </ul>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Chọn file JSON
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleFileSelect}
            disabled={loading}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        {loading && (
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 text-blue-700">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Đang import dữ liệu...</span>
            </div>
          </div>
        )}

        {imported && stats && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-semibold mb-3">✅ Import thành công!</p>
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
            {stats.errors.length > 0 && (
              <div className="mt-4 pt-4 border-t border-green-300">
                <p className="text-red-700 font-semibold mb-2">Lỗi ({stats.errors.length}):</p>
                <ul className="list-disc list-inside text-red-600 text-sm space-y-1 max-h-40 overflow-y-auto">
                  {stats.errors.map((err, index) => (
                    <li key={index}>{err}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

