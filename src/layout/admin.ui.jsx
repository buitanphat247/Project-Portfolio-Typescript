import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Icon from '../components/Icon';

export default function AdminUI() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('adminUsername');
    navigate('/admin/login');
  };

  const adminUsername = sessionStorage.getItem('adminUsername') || 'Admin';

  const menuItems = [
    { path: '/admin/skill-categories', label: 'Danh mục kỹ năng', icon: 'skills' },
    { path: '/admin/skills', label: 'Kỹ năng', icon: 'skill' },
    { path: '/admin/projects', label: 'Dự án', icon: 'projects' },
    { path: '/admin/achievement-categories', label: 'Danh mục thành tích', icon: 'achievements' },
    { path: '/admin/achievements', label: 'Thành tích', icon: 'achievements' },

  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'w-64' : 'w-20'
          } bg-gray-900 text-white transition-all duration-300 min-h-screen fixed left-0 top-0`}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-8">
              {sidebarOpen && (
                <h1 className="text-xl font-bold">Admin Panel</h1>
              )}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-800 rounded"
                aria-label="Toggle sidebar"
              >
                {sidebarOpen ? (
                  <Icon name="chevronLeft" />
                ) : (
                  <Icon name="chevronRight" />
                )}
              </button>
            </div>
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-800 text-gray-300'
                  }`}
                >
                  <Icon name={item.icon} className="text-lg" />
                  {sidebarOpen && <span>{item.label}</span>}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
          {/* Header */}
          <header className="bg-white shadow-sm sticky top-0 z-10">
            <div className="flex items-center justify-between p-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                {menuItems.find((item) => item.path === location.pathname)?.label || 'Admin'}
              </h2>
              <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-gray-100 rounded-full" aria-label="Notifications">
                  <Icon name="bell" />
                </button>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {adminUsername.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-gray-700">{adminUsername}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 text-sm"
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Content Area */}
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
