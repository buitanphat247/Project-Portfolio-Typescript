import { useState, useEffect } from 'react';
import { projectsApi } from '../api/projects.api';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    id: null,
    title: '',
    description: '',
    imageUrl: '',
    githubUrl: '',
    deployUrl: '',
    categories: [], 
    tags: [],
  });
  const [currentTag, setCurrentTag] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await projectsApi.getAll();
      setProjects(data);
    } catch (err) {
      setError('Không thể tải dự án. Vui lòng thử lại.');
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
      imageUrl: '',
      githubUrl: '',
      deployUrl: '',
      categories: [],
      tags: [],
    });
    setCurrentTag('');
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    try {
      setLoading(true);
      setError(null);

      const projectData = {
        title: form.title,
        description: form.description,
        imageUrl: form.imageUrl,
        githubUrl: form.githubUrl,
        deployUrl: form.deployUrl,
        categories: form.categories,
        tags: form.tags,
      };

      if (isEditing) {
        await projectsApi.update(form.id, projectData);
      } else {
        await projectsApi.create(projectData);
      }

      resetForm();
      await fetchProjects();
    } catch (err) {
      setError('Không thể lưu dự án. Vui lòng thử lại.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    // Backward compatibility: nếu project cũ có category thì convert thành mảng
    let categories = project.categories || [];
    if (project.category && !categories.length) {
      categories = [project.category];
    }
    
    setForm({
      id: project.id,
      title: project.title || '',
      description: project.description || '',
      imageUrl: project.imageUrl || '',
      githubUrl: project.githubUrl || '',
      deployUrl: project.deployUrl || '',
      categories: categories,
      tags: project.tags || [],
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Bạn có chắc chắn muốn xóa dự án này?')) return;

    try {
      setLoading(true);
      await projectsApi.delete(id);
      await fetchProjects();
    } catch (err) {
      setError('Không thể xóa dự án. Vui lòng thử lại.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addTag = () => {
    if (currentTag.trim()) {
      setForm((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (index) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'fullstack', label: 'Fullstack' },
    { value: 'app', label: 'App/Tool' },
    { value: 'docs', label: 'Docs' },
  ];

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? 'Sửa dự án' : 'Thêm dự án mới'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tên dự án *</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="Tên dự án"
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              disabled={loading}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mô tả dự án</label>
            <textarea
              className="w-full border rounded px-3 py-2"
              placeholder="Mô tả về dự án..."
              rows="3"
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Link ảnh đại diện</label>
            <input
              type="url"
              className="w-full border rounded px-3 py-2"
              placeholder="https://example.com/image.jpg"
              value={form.imageUrl}
              onChange={(e) => setForm((prev) => ({ ...prev, imageUrl: e.target.value }))}
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Link GitHub</label>
            <input
              type="url"
              className="w-full border rounded px-3 py-2"
              placeholder="https://github.com/username/repo"
              value={form.githubUrl}
              onChange={(e) => setForm((prev) => ({ ...prev, githubUrl: e.target.value }))}
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Link Deploy</label>
            <input
              type="url"
              className="w-full border rounded px-3 py-2"
              placeholder="https://example.com"
              value={form.deployUrl}
              onChange={(e) => setForm((prev) => ({ ...prev, deployUrl: e.target.value }))}
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Danh mục</label>
            <div className="space-y-2">
              {categories.map((cat) => (
                <label key={cat.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.categories.includes(cat.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setForm((prev) => ({
                          ...prev,
                          categories: [...prev.categories, cat.value],
                        }));
                      } else {
                        setForm((prev) => ({
                          ...prev,
                          categories: prev.categories.filter((c) => c !== cat.value),
                        }));
                      }
                    }}
                    disabled={loading}
                    className="w-4 h-4"
                  />
                  <span>{cat.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tags (Icon HTML)</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                className="flex-1 border rounded px-3 py-2"
                placeholder='VD: <i class="devicon-react-original colored"></i>'
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag();
                  }
                }}
                disabled={loading}
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
                disabled={loading}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded"
                >
                  <div
                    className="text-lg"
                    dangerouslySetInnerHTML={{ __html: tag }}
                  />
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="text-red-500 hover:text-red-700"
                    disabled={loading}
                  >
                    <i className="fa-solid fa-times"></i>
                  </button>
                </div>
              ))}
            </div>
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
          <h3 className="text-lg font-semibold">Danh sách dự án</h3>
        </div>
        <div className="divide-y">
          {loading && projects.length === 0 ? (
            <div className="p-4 text-center text-gray-500">Đang tải...</div>
          ) : projects.length === 0 ? (
            <div className="p-4 text-center text-gray-500">Chưa có dự án nào</div>
          ) : (
            projects.map((project) => (
              <div key={project.id} className="p-4 flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-medium">{project.title}</div>
                  {project.description && (
                    <div className="text-sm text-gray-600 mt-1 line-clamp-2">{project.description}</div>
                  )}
                  <div className="text-sm text-gray-500 mt-1">
                    Categories: {(() => {
                      // Backward compatibility
                      const projectCategories = project.categories || (project.category ? [project.category] : []);
                      return projectCategories.length > 0
                        ? projectCategories
                            .map((cat) => categories.find((c) => c.value === cat)?.label || cat)
                            .join(', ')
                        : 'Chưa có danh mục';
                    })()}
                  </div>
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex gap-2 mt-2">
                      {project.tags.map((tag, index) => (
                        <div
                          key={index}
                          className="text-lg"
                          dangerouslySetInnerHTML={{ __html: tag }}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                    disabled={loading}
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
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

