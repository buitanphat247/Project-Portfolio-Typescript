import { useState, useEffect } from 'react';
import { achievementsApi } from '../api/achievements.api';
import { achievementCategoriesApi } from '../api/achievementCategories.api';

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    id: null,
    title: '',
    description: '',
    categoryId: '',
    iconHtml: '',
    dateRange: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
    fetchAchievements();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await achievementCategoriesApi.getAll();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const data = await achievementsApi.getAll();
      setAchievements(data);
    } catch (err) {
      setError('Không thể tải thành tích. Vui lòng thử lại.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      id: null,
      title: '',
      description: '',
      categoryId: '',
      iconHtml: '',
      dateRange: '',
    });
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    try {
      setLoading(true);
      setError(null);

      const achievementData = {
        title: form.title,
        description: form.description,
        categoryId: form.categoryId,
        iconHtml: form.iconHtml,
        dateRange: form.dateRange,
      };

      if (isEditing) {
        await achievementsApi.update(form.id, achievementData);
      } else {
        await achievementsApi.create(achievementData);
      }

      resetForm();
      await fetchAchievements();
    } catch (err) {
      setError('Không thể lưu thành tích. Vui lòng thử lại.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (achievement) => {
    // Backward compatibility: nếu achievement cũ có category thì convert thành categoryId
    let categoryId = achievement.categoryId || '';
    if (achievement.category && !categoryId) {
      // Tìm category theo name hoặc value
      const foundCategory = categories.find(
        (cat) => cat.name === achievement.category || cat.id === achievement.category
      );
      if (foundCategory) {
        categoryId = foundCategory.id;
      }
    }

    setForm({
      id: achievement.id,
      title: achievement.title || '',
      description: achievement.description || '',
      categoryId: categoryId,
      iconHtml: achievement.iconHtml || '',
      dateRange: achievement.dateRange || '',
    });
    setIsEditing(true);
  };

  const getCategoryName = (categoryId) => {
    if (!categoryId) return '';
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : '';
  };

  const handleDelete = async (id) => {
    if (!confirm('Bạn có chắc chắn muốn xóa thành tích này?')) return;

    try {
      setLoading(true);
      await achievementsApi.delete(id);
      await fetchAchievements();
    } catch (err) {
      setError('Không thể xóa thành tích. Vui lòng thử lại.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? 'Sửa thành tích' : 'Thêm thành tích mới'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tiêu đề *</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="VD: Học sinh giỏi 12 năm liền"
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              disabled={loading}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mô tả</label>
            <textarea
              className="w-full border rounded px-3 py-2"
              placeholder="Mô tả chi tiết về thành tích..."
              rows="3"
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Danh mục</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={form.categoryId}
              onChange={(e) => setForm((prev) => ({ ...prev, categoryId: e.target.value }))}
              disabled={loading}
            >
              <option value="">Chọn danh mục</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Icon HTML</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder='VD: <i class="fa-solid fa-trophy"></i>'
              value={form.iconHtml}
              onChange={(e) => setForm((prev) => ({ ...prev, iconHtml: e.target.value }))}
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">
              Có thể sử dụng Font Awesome hoặc icon HTML khác
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Khoảng thời gian</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="VD: 2010-2022"
              value={form.dateRange}
              onChange={(e) => setForm((prev) => ({ ...prev, dateRange: e.target.value }))}
              disabled={loading}
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {isEditing ? 'Cập nhật' : 'Thêm mới'}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors disabled:opacity-50"
                disabled={loading}
              >
                Hủy
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Danh sách thành tích</h3>
        </div>
        <div className="divide-y">
          {loading && achievements.length === 0 ? (
            <div className="p-4 text-center text-gray-500">Đang tải...</div>
          ) : achievements.length === 0 ? (
            <div className="p-4 text-center text-gray-500">Chưa có thành tích nào</div>
          ) : (
            achievements.map((achievement) => (
              <div key={achievement.id} className="p-4 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {achievement.iconHtml && (
                      <div
                        className="text-xl"
                        dangerouslySetInnerHTML={{ __html: achievement.iconHtml }}
                      />
                    )}
                    <div className="font-medium">{achievement.title}</div>
                  </div>
                  {achievement.description && (
                    <div className="text-sm text-gray-600 mb-1">{achievement.description}</div>
                  )}
                  <div className="flex gap-2 flex-wrap">
                    {(() => {
                      // Backward compatibility
                      const categoryId = achievement.categoryId || achievement.category;
                      const categoryName = categoryId
                        ? getCategoryName(categoryId) || achievement.category
                        : '';
                      return categoryName ? (
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                          {categoryName}
                        </span>
                      ) : null;
                    })()}
                    {achievement.dateRange && (
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                        {achievement.dateRange}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(achievement)}
                    className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                    disabled={loading}
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(achievement.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                    disabled={loading}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

