const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Tổng quan</h2>
          <p className="text-gray-600">Quản lý tổng quan ứng dụng</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Người dùng</h2>
          <p className="text-gray-600">Quản lý người dùng</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Cài đặt</h2>
          <p className="text-gray-600">Cấu hình hệ thống</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

