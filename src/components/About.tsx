import React from 'react';

interface AboutProps {
  bio: string;
  personalInfo: {
    name: string;
    title: string;
    location: string;
  };
}

const About: React.FC<AboutProps> = ({ bio, personalInfo }) => {
  const stats = [
    { label: 'Năm kinh nghiệm', value: '3+' },
    { label: 'Dự án hoàn thành', value: '20+' },
    { label: 'Khách hàng hài lòng', value: '15+' },
    { label: 'Chứng chỉ', value: '5+' },
  ];

  const interests = [
    'Phát triển Web',
    'Mobile Development',
    'UI/UX Design',
    'Machine Learning',
    'Cloud Computing',
    'DevOps',
  ];

  return (
    <section id="about" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Về tôi
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                {personalInfo.name} - {personalInfo.title}
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                {bio}
              </p>
            </div>

            <div className="flex items-center text-gray-400">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>{personalInfo.location}</span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-gray-700 rounded-lg border border-purple-500/20">
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">{stat.value}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image and Interests */}
          <div className="space-y-8">
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-2xl p-2">
                <div className="w-full h-full bg-gray-800 rounded-xl p-4 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-16 h-16 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-semibold text-white">{personalInfo.name}</h4>
                    <p className="text-gray-300">{personalInfo.title}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interests */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Sở thích & Chuyên môn</h4>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30 rounded-full text-sm font-medium"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-gray-700 rounded-lg border border-purple-500/20">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Chất lượng</h4>
            <p className="text-gray-300">Cam kết mang đến sản phẩm chất lượng cao với code sạch và hiệu suất tối ưu.</p>
          </div>

          <div className="text-center p-6 bg-gray-700 rounded-lg border border-purple-500/20">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Đúng hạn</h4>
            <p className="text-gray-300">Luôn hoàn thành dự án đúng thời hạn với tiến độ rõ ràng và minh bạch.</p>
          </div>

          <div className="text-center p-6 bg-gray-700 rounded-lg border border-purple-500/20">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Hỗ trợ 24/7</h4>
            <p className="text-gray-300">Sẵn sàng hỗ trợ và bảo trì dự án bất cứ khi nào khách hàng cần.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
