import React from 'react';

const Achievements: React.FC = () => {
  const achievements = [
    {
      id: 1,
      title: "Học sinh giỏi 12 năm liền",
      description: "Đạt danh hiệu học sinh giỏi liên tục từ lớp 1 đến lớp 12",
      icon: "🏆",
      category: "academic",
      year: "2010-2022",
      level: "gold"
    },
    {
      id: 2,
      title: "Giải Nhất Khoa học Kỹ thuật cấp tỉnh",
      description: "Dự án Lập trình Web - Xây dựng website giáo dục địa phương",
      icon: "🥇",
      category: "competition",
      year: "2022",
      level: "first"
    },
    {
      id: 3,
      title: "Giải Nhì Ý tưởng Khởi nghiệp cấp trường",
      description: "Chủ đề Tin học - Phát triển ứng dụng mobile cho giáo dục",
      icon: "🥈",
      category: "startup",
      year: "2021",
      level: "second"
    },
    {
      id: 4,
      title: "Giải Ba HSG Tin học cấp tỉnh",
      description: "Thi học sinh giỏi môn Tin học lớp 12 cấp tỉnh",
      icon: "🥉",
      category: "academic",
      year: "2022",
      level: "third"
    },
    {
      id: 5,
      title: "Huy chương Bạc lập trình thi đấu",
      description: "Cuộc thi lập trình thi đấu cấp tỉnh năm lớp 11",
      icon: "🥈",
      category: "programming",
      year: "2021",
      level: "silver"
    },
    {
      id: 6,
      title: "Huy chương Đồng Toán Violympic",
      description: "Cuộc thi giải toán qua internet do FPT tổ chức",
      icon: "🥉",
      category: "national",
      year: "2019",
      level: "bronze"
    },
    {
      id: 7,
      title: "Thành viên đội tuyển HSG Quốc gia",
      description: "Được chọn vào đội tuyển học sinh giỏi Quốc gia môn Tin học",
      icon: "🌟",
      category: "national",
      year: "2021",
      level: "special"
    }
  ];

  const getLevelStyle = (level: string) => {
    switch (level) {
      case 'gold':
        return 'from-yellow-400 via-yellow-500 to-orange-500 shadow-yellow-500/50';
      case 'first':
        return 'from-purple-400 via-purple-500 to-indigo-500 shadow-purple-500/50';
      case 'second':
        return 'from-gray-300 via-gray-400 to-gray-500 shadow-gray-500/50';
      case 'third':
        return 'from-orange-400 via-orange-500 to-red-500 shadow-orange-500/50';
      case 'silver':
        return 'from-gray-200 via-gray-300 to-gray-400 shadow-gray-400/50';
      case 'bronze':
        return 'from-amber-600 via-amber-700 to-orange-800 shadow-amber-700/50';
      case 'special':
        return 'from-pink-400 via-pink-500 to-purple-500 shadow-pink-500/50';
      default:
        return 'from-blue-500 to-cyan-500 shadow-blue-500/50';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic':
        return 'from-blue-500 to-cyan-500';
      case 'competition':
        return 'from-purple-500 to-pink-500';
      case 'startup':
        return 'from-green-500 to-emerald-500';
      case 'programming':
        return 'from-orange-500 to-red-500';
      case 'national':
        return 'from-indigo-500 to-purple-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'academic':
        return 'Học tập';
      case 'competition':
        return 'Thi đấu';
      case 'startup':
        return 'Khởi nghiệp';
      case 'programming':
        return 'Lập trình';
      case 'national':
        return 'Quốc gia';
      default:
        return category;
    }
  };

  return (
    <section id="achievements" className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_25%_25%,_rgba(147,51,234,0.1)_0%,_transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_75%_75%,_rgba(236,72,153,0.1)_0%,_transparent_50%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-6 shadow-2xl shadow-purple-500/25">
            <span className="text-3xl">🏆</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
            Thành tích & Giải thưởng
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 mx-auto rounded-full shadow-lg"></div>
          <p className="text-xl text-gray-300 mt-6 max-w-3xl mx-auto leading-relaxed">
            Những thành tích xuất sắc và giải thưởng đạt được trong quá trình học tập và phát triển.
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">
          {achievements.map((achievement, index) => (
            <div
              key={achievement.id}
              className="group relative bg-gradient-to-br from-gray-800/60 to-gray-700/60 backdrop-blur-xl border border-gray-600/40 rounded-3xl p-8 hover:border-purple-500/60 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-700 cursor-pointer transform hover:-translate-y-3 hover:scale-105"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Floating Icon */}
              <div className={`absolute -top-6 left-8 w-16 h-16 bg-gradient-to-br ${getLevelStyle(achievement.level)} rounded-2xl flex items-center justify-center text-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                {achievement.icon}
              </div>

              {/* Category Badge */}
              <div className="flex justify-end mb-6">
                <span className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 text-sm font-medium rounded-full border border-purple-500/30 backdrop-blur-sm">
                  {getCategoryLabel(achievement.category)}
                </span>
              </div>

              {/* Content */}
              <div className="mt-8">
                {/* Title */}
                <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-500 mb-4 leading-tight">
                  {achievement.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 text-base leading-relaxed mb-6">
                  {achievement.description}
                </p>

                {/* Year & Decoration */}
                <div className="flex items-center justify-between">
                  <span className="text-purple-400 text-lg font-semibold bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-4 py-2 rounded-full border border-purple-500/30">
                    {achievement.year}
                  </span>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ transitionDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ transitionDelay: '100ms' }}></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ transitionDelay: '200ms' }}></div>
                  </div>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              
              {/* Border Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {[
            { number: "12", label: "Năm học sinh giỏi", icon: "📚" },
            { number: "7", label: "Giải thưởng", icon: "🏅" },
            { number: "3", label: "Cấp tỉnh", icon: "🏆" },
            { number: "2", label: "Cấp quốc gia", icon: "🌟" }
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">{stat.icon}</span>
              </div>
              <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Motivation Quote */}
        <div className="text-center">
          <div className="inline-block bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-indigo-500/10 border border-purple-500/30 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
            <div className="text-4xl mb-4">💫</div>
            <p className="text-white text-xl font-medium italic leading-relaxed max-w-2xl">
              "Thành công không phải là đích đến, mà là hành trình không ngừng học hỏi và phát triển"
            </p>
            <div className="w-16 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-6 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
