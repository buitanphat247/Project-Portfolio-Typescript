import { useState, useEffect } from 'react';
import { skillsApi } from '../api/skills.api';
import { skillCategoriesApi } from '../api/skillCategories.api';

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ id: null, name: '', iconHtml: '', categoryId: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setPage(1);
    setLastDoc(null);
    setHasMore(true);
    fetchSkills(true);
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const data = await skillCategoriesApi.getAll();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchSkills = async (reset = false) => {
    try {
      setLoading(true);
      setError(null);
      const categoryId = selectedCategory || null;
      const currentLastDoc = reset ? null : lastDoc;
      const result = await skillsApi.getAll(categoryId, 10, currentLastDoc);
      
      if (reset) {
        setSkills(result.data);
      } else {
        setSkills((prev) => [...prev, ...result.data]);
      }
      
      setLastDoc(result.lastDoc);
      setHasMore(result.hasMore);
      
      const count = await skillsApi.getCount(categoryId);
      setTotalCount(count);
    } catch (err) {
      setError('Không thể tải danh sách. Vui lòng thử lại.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPage((prev) => prev + 1);
      fetchSkills(false);
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const resetForm = () => setForm({ id: null, name: '', iconHtml: '', categoryId: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.categoryId) return;
    try {
      setLoading(true);
      setError(null);
      if (isEditing) {
        await skillsApi.update(form.id, { name: form.name, iconHtml: form.iconHtml, categoryId: form.categoryId });
      } else {
        await skillsApi.create({ name: form.name, iconHtml: form.iconHtml, categoryId: form.categoryId });
      }
      setIsEditing(false);
      resetForm();
      setPage(1);
      setLastDoc(null);
      setHasMore(true);
      await fetchSkills(true);
    } catch (err) {
      setError(isEditing ? 'Không thể cập nhật. Vui lòng thử lại.' : 'Không thể thêm mới. Vui lòng thử lại.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (skill) => {
    setIsEditing(true);
    setForm({ id: skill.id, name: skill.name || '', iconHtml: skill.iconHtml || '', categoryId: skill.categoryId || '' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Bạn có chắc muốn xóa kỹ năng này?')) return;
    try {
      setLoading(true);
      setError(null);
      await skillsApi.delete(id);
      setPage(1);
      setLastDoc(null);
      setHasMore(true);
      await fetchSkills(true);
    } catch (err) {
      setError('Không thể xóa. Vui lòng thử lại.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.name : 'Chưa có danh mục';
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Sửa kỹ năng' : 'Thêm kỹ năng'}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            className="border rounded px-3 py-2"
            placeholder="Tên kỹ năng"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            disabled={loading}
            required
          />
          <input
            className="border rounded px-3 py-2"
            placeholder='Link nhúng icon (VD: <i class="devicon-htmx-plain colored"></i>)'
            value={form.iconHtml}
            onChange={(e) => setForm((f) => ({ ...f, iconHtml: e.target.value }))}
            disabled={loading}
          />
          <select
            className="border rounded px-3 py-2"
            value={form.categoryId}
            onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))}
            disabled={loading}
            required
          >
            <option value="">Chọn danh mục kỹ năng</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
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
        <div className="p-4 border-b flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Danh sách kỹ năng</h3>
            {totalCount > 0 && (
              <p className="text-sm text-gray-500 mt-1">Tổng: {totalCount} kỹ năng</p>
            )}
          </div>
          <select
            className="border rounded px-3 py-2 text-sm"
            value={selectedCategory}
            onChange={handleCategoryChange}
            disabled={loading}
          >
            <option value="">Tất cả danh mục</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="divide-y">
          {loading && skills.length === 0 ? (
            <div className="p-6 text-gray-500 text-center">Đang tải...</div>
          ) : skills.length === 0 ? (
            <div className="p-6 text-gray-500 text-center">Chưa có kỹ năng nào</div>
          ) : (
            skills.map((skill) => (
              <div key={skill.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {skill.iconHtml && (
                    <div
                      className="text-xl flex items-center justify-center"
                      dangerouslySetInnerHTML={{ __html: skill.iconHtml }}
                    />
                  )}
                  <div>
                    <div className="font-medium">{skill.name}</div>
                    <div className="text-sm text-gray-500">{getCategoryName(skill.categoryId)}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(skill)}
                    className="px-3 py-1 rounded bg-yellow-100 text-yellow-800 disabled:opacity-50"
                    disabled={loading}
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(skill.id)}
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
        {hasMore && (
          <div className="p-4 border-t text-center">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
            >
              {loading ? 'Đang tải...' : 'Tải thêm'}
            </button>
          </div>
        )}
        {!hasMore && skills.length > 0 && (
          <div className="p-4 border-t text-center text-gray-500 text-sm">
            Đã hiển thị tất cả kỹ năng
          </div>
        )}
      </div>
    </div>
  );
}

