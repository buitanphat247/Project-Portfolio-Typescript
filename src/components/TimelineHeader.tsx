import React from 'react';

const TimelineHeader: React.FC = () => {
  return (
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Timeline Dự Án
      </h2>
      <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
      <p className="text-lg text-gray-300 mt-4 max-w-2xl mx-auto">
        Hành trình phát triển các dự án của tôi theo thời gian, từ những dự án đầu tiên đến hiện tại.
      </p>
    </div>
  );
};

export default TimelineHeader;
