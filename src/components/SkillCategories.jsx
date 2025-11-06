import { useState, useEffect } from 'react';
import { skillCategoriesApi } from '../api/skillCategories.api';

export default function SkillCategories() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ id: null, name: '', iconHtml: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await skillCategoriesApi.getAll();
      setCategories(data);
    } catch (err) {
      setError('Không thể tải danh sách. Vui lòng thử lại.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => setForm({ id: null, name: '', iconHtml: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    try {
      setLoading(true);
      setError(null);
      if (isEditing) {
        await skillCategoriesApi.update(form.id, { name: form.name, iconHtml: form.iconHtml });
      } else {
        await skillCategoriesApi.create({ name: form.name, iconHtml: form.iconHtml });
      }
      setIsEditing(false);
      resetForm();
      await fetchCategories();
    } catch (err) {
      setError(isEditing ? 'Không thể cập nhật. Vui lòng thử lại.' : 'Không thể thêm mới. Vui lòng thử lại.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (cat) => {
    setIsEditing(true);
    setForm({ id: cat.id, name: cat.name || '', iconHtml: cat.iconHtml || '' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Bạn có chắc muốn xóa danh mục này?')) return;
    try {
      setLoading(true);
      setError(null);
      await skillCategoriesApi.delete(id);
      await fetchCategories();
    } catch (err) {
      setError('Không thể xóa. Vui lòng thử lại.');
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
        <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Sửa danh mục kỹ năng' : 'Thêm danh mục kỹ năng'}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="border rounded px-3 py-2"
            placeholder="Tên danh mục"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            disabled={loading}
            required
          />
          <input
            className="border rounded px-3 py-2"
            placeholder='Kiểu nhúng icon (VD: <i class="devicon-htmx-plain colored"></i>)'
            value={form.iconHtml}
            onChange={(e) => setForm((f) => ({ ...f, iconHtml: e.target.value }))}
            disabled={loading}
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Đang xử lý...' : isEditing ? 'Lưu' : 'Thêm'}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={() => { setIsEditing(false); resetForm(); }}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                disabled={loading}
              >
                Huỷ
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Danh sách danh mục kỹ năng</h3>
        </div>
        <div className="divide-y">
          {loading && categories.length === 0 ? (
            <div className="p-6 text-gray-500 text-center">Đang tải...</div>
          ) : categories.length === 0 ? (
            <div className="p-6 text-gray-500 text-center">Chưa có danh mục nào</div>
          ) : (
            categories.map((cat) => (
              <div key={cat.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {cat.iconHtml && (
                    <div
                      className="text-xl flex items-center justify-center"
                      dangerouslySetInnerHTML={{ __html: cat.iconHtml }}
                    />
                  )}
                  <div className="font-medium">{cat.name}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="px-3 py-1 rounded bg-yellow-100 text-yellow-800 disabled:opacity-50"
                    disabled={loading}
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="px-3 py-1 rounded bg-red-100 text-red-800 disabled:opacity-50"
                    disabled={loading}
                  >
                    Xoá
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

