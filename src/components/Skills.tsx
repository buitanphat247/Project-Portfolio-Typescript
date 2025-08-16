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
    const skillIcons: { [key: string]: string } = {
      // Frontend
      'HTML5': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
      'CSS3': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
      'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      'Vue.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
      'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
      'TailwindCSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
      'Bootstrap': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
      'MUI': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg',
      'SASS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
      'LESS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/less/less-plain-wordmark.svg',
      'Windicss': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windicss/windicss-original.svg',
      'Redux': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
      'React Router': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/reactrouter/reactrouter-original.svg',
      'React Query': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/reactquery/reactquery-original.svg',
      'Ant Design': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/antdesign/antdesign-original.svg',
      
      // Backend
      'NodeJS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      'Express.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
      'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      'PHP': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
      'Java': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
      'Spring Boot': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
      'Nodemon': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodemon/nodemon-original.svg',
      'Context API': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      'C++': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
      'C': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
      'Data Structures': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      'Algorithms': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      'Competitive Programming': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
      
      // Database
      'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      'MySQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
      'Microsoft SQL Server': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg',
      'SQLite': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg',
      
      // Mobile & IoT
      'React Native': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      'Node-RED': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      'Arduino': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg',
      
      // DevOps & Hosting
      'Vercel': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg',
      'Heroku': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-original.svg',
      'Firebase': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
      'Google Cloud': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
      'Cloudflare': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg',
      'GitHub Pages': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
      'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      
      // UI/Design
      'Figma': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
      'Canva': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg',
      'Dribbble': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dribbble/dribbble-original.svg',
      'Adobe Photoshop': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg',
      'Adobe Illustrator': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg',
      'Adobe InDesign': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/indesign/indesign-plain.svg',
      'Adobe Premiere Pro': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-plain.svg',
      'Adobe After Effects': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-plain.svg',
      'Adobe Dreamweaver': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dreamweaver/dreamweaver-plain.svg',
      
      // Tools & Others
      'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      'GitHub': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
      'GitLab': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg',
      'GitLab CI': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg',
      'Postman': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg',
      'ESLint': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg',
      'Yarn': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/yarn/yarn-original.svg',
      'Markdown': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/markdown/markdown-original.svg',
      'Portfolio': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      'Babel': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/babel/babel-original.svg',
    };
    
    // Fallback icons for common skills that might not have specific icons
    const fallbackIcons: { [key: string]: string } = {
      'AWS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg',
      'Netlify': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg',
      'Redis': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
      'PostgreSQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      'Laravel': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg',
      'Django': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
      'C#': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
      '.NET': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg',
    };
    
    return skillIcons[skillName] || fallbackIcons[skillName] || 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg';
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
                       <img 
                         src={getSkillIcon(skill.name)} 
                         alt={skill.name}
                         className="w-8 h-8 object-contain filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                         onError={(e) => {
                           const target = e.target as HTMLImageElement;
                           target.style.display = 'none';
                           target.nextElementSibling?.classList.remove('hidden');
                         }}
                       />
                       <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center hidden">
                         <span className="text-white text-xs font-bold">
                           {skill.name.charAt(0).toUpperCase()}
                         </span>
                       </div>
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
