import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Đang tải dự án...</p>
        </div>
      </div>
    </section>
  );
};

export default LoadingSpinner;
