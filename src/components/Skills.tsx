import React from 'react';
import type { Skill } from '../interface/data.interface';
import ExperienceSummary from './ExperienceSummary';
import Strengths from './Strengths';

interface SkillsProps {
  skills: Skill[];
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'frontend':
        return 'text-purple-400';
      case 'backend':
        return 'text-pink-400';
      case 'database':
        return 'text-indigo-400';
      case 'tools':
        return 'text-violet-400';
      default:
        return 'text-gray-400';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'frontend':
        return 'Frontend';
      case 'backend':
        return 'Backend';
      case 'database':
        return 'Database';
      case 'tools':
        return 'Tools';
      default:
        return category;
    }
  };

  const getSkillIcon = (skillName: string) => {
    // Lấy chữ cái đầu tiên của skill name
    const firstLetter = skillName.charAt(0).toUpperCase();
    
    // Tạo gradient colors dựa trên category
    const getGradientColors = (skillName: string) => {
      const name = skillName.toLowerCase();
      
      // Frontend
      if (name.includes('html') || name.includes('css') || name.includes('javascript') || 
          name.includes('typescript') || name.includes('react') || name.includes('vue') || 
          name.includes('next') || name.includes('tailwind') || name.includes('bootstrap') ||
          name.includes('mui') || name.includes('sass') || name.includes('less') ||
          name.includes('redux') || name.includes('router') || name.includes('query') ||
          name.includes('ant design')) {
        return 'from-blue-500 to-purple-600';
      }
      
      // Backend
      if (name.includes('node') || name.includes('express') || name.includes('python') ||
          name.includes('php') || name.includes('java') || name.includes('spring') ||
          name.includes('c++') || name.includes('c#') || name.includes('c ') ||
          name.includes('data') || name.includes('algorithm') || name.includes('competitive')) {
        return 'from-green-500 to-teal-600';
      }
      
      // Database
      if (name.includes('mongo') || name.includes('mysql') || name.includes('sql') ||
          name.includes('postgres') || name.includes('redis')) {
        return 'from-orange-500 to-red-600';
      }
      
      // DevOps & Hosting
      if (name.includes('vercel') || name.includes('heroku') || name.includes('firebase') ||
          name.includes('aws') || name.includes('docker') || name.includes('git') ||
          name.includes('github') || name.includes('gitlab')) {
        return 'from-indigo-500 to-blue-600';
      }
      
      // UI/Design
      if (name.includes('figma') || name.includes('canva') || name.includes('dribbble') ||
          name.includes('photoshop') || name.includes('illustrator') || name.includes('adobe')) {
        return 'from-pink-500 to-rose-600';
      }
      
      // Default gradient
      return 'from-purple-500 to-pink-600';
    };
    
    return {
      letter: firstLetter,
      gradient: getGradientColors(skillName)
    };
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

    return (
    <section id="skills" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Kỹ năng & Chuyên môn
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
          <p className="text-lg text-gray-300 mt-4 max-w-2xl mx-auto">
            Tôi có kinh nghiệm với nhiều công nghệ và framework khác nhau trong phát triển phần mềm.
          </p>
        </div>

        {/* Strengths */}
        <Strengths 
          title="Điểm mạnh chuyên môn"
          strengths={[
            {
              icon: "🚀",
              title: "Full-Stack Development",
              description: "Thành thạo cả Frontend và Backend, có thể xây dựng ứng dụng hoàn chỉnh",
              color: "purple"
            },
            {
              icon: "⚡",
              title: "Performance Optimization",
              description: "Tối ưu hiệu suất ứng dụng, tải trang nhanh và trải nghiệm người dùng tốt",
              color: "pink"
            },
            {
              icon: "🔧",
              title: "Problem Solving",
              description: "Kỹ năng giải quyết vấn đề tốt, tư duy logic và sáng tạo trong coding",
              color: "blue"
            },
            {
              icon: "📱",
              title: "Responsive Design",
              description: "Thiết kế responsive, tương thích với mọi thiết bị và trình duyệt",
              color: "green"
            },
            {
              icon: "🔄",
              title: "Agile Development",
              description: "Làm việc theo phương pháp Agile, thích ứng nhanh với thay đổi",
              color: "yellow"
            },
            {
              icon: "🤝",
              title: "Team Collaboration",
              description: "Làm việc nhóm hiệu quả, giao tiếp tốt và chia sẻ kiến thức",
              color: "cyan"
            }
          ]}
        />

        {/* Modern Skills Grid */}
        <div className="space-y-12">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category} className="relative">
              {/* Category Header */}
              <div className="flex items-center mb-8">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mr-4 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {getCategoryLabel(category)}
                </h3>
                <div className="ml-4 flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent"></div>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {categorySkills.map((skill) => (
                  <div 
                    key={skill.id} 
                    className="group relative bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-sm border border-gray-600/30 rounded-xl p-4 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer transform hover:scale-105"
                  >
                                                               {/* Skill Icon */}
                      <div className="flex items-center justify-center mb-3">
                        {(() => {
                          const iconData = getSkillIcon(skill.name);
                          return (
                            <div className={`w-8 h-8 bg-gradient-to-br ${iconData.gradient} rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                              <span className="text-white text-xs font-bold">
                                {iconData.letter}
                              </span>
                            </div>
                          );
                        })()}
                      </div>

                    {/* Skill Name */}
                    <h4 className="text-sm font-semibold text-white text-center mb-3 group-hover:text-purple-300 transition-colors duration-300">
                      {skill.name}
                    </h4>

                    {/* Skill Level Indicator */}
                    <div className="flex justify-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            i < Math.floor(skill.level / 20) 
                              ? 'bg-gradient-to-r from-purple-400 to-pink-400 shadow-sm shadow-purple-500/50' 
                              : 'bg-gray-600 group-hover:bg-gray-500'
                          }`}
                        ></div>
                      ))}
                    </div>

                    {/* Skill Level Text */}
                    <div className="text-center mt-2">
                      <span className="text-xs text-gray-400 font-medium">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Skills Overview */}
        <div className="mt-16 bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Tổng quan kỹ năng</h3>
           
          {/* Skill Categories Overview */}
          <div className="space-y-6">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => {
              const avgLevel = Math.round(
                categorySkills.reduce((sum, skill) => sum + skill.level, 0) / categorySkills.length
              );
               
              return (
                <div key={category} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-600/30">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mr-4"></div>
                    <span className="text-white font-semibold">{getCategoryLabel(category)}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-700 rounded-full h-3 mr-4">
                      <div
                        className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-sm shadow-purple-500/50 transition-all duration-500"
                        style={{ width: `${avgLevel}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-purple-300 font-bold w-12 text-right">{avgLevel}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Additional Skills */}
        <div className="mt-12 bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Kỹ năng bổ sung</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {['Git & GitHub', 'Docker', 'AWS', 'CI/CD', 'Agile/Scrum', 'Testing'].map((skill, index) => (
              <div 
                key={index}
                className="flex items-center space-x-3 p-4 bg-gray-800/30 rounded-xl border border-gray-600/30 hover:border-purple-500/50 hover:bg-gray-700/50 transition-all duration-300 cursor-pointer group"
              >
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"></div>
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300 font-medium">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
