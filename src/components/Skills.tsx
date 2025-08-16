import React from 'react';
import type { Skill } from '../interface/data.interface';

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
      'SASS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
      'LESS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/less/less-plain-wordmark.svg',
      
      // Backend
      'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      'Express.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
      'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      'Django': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
      'PHP': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
      'Laravel': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg',
      'Java': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
      'Spring': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
      'C#': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
      '.NET': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg',
      
      // Database
      'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      'MySQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
      'PostgreSQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      'Redis': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
      'SQLite': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg',
      
      // Tools
      'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      'AWS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg',
      'Firebase': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
      'Vercel': 'https://assets.vercel.com/image/upload/q_auto/front/assets/design/vercel-triangle-black.svg',
      'Netlify': 'https://www.vectorlogo.zone/logos/netlify/netlify-icon.svg',
    };
    
    return skillIcons[skillName] || 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg';
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

                <div className="space-y-8">
          {/* Skills by Category */}
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category} className="bg-gray-800 p-6 rounded-lg shadow-sm border border-purple-500/20">
              <div className="flex items-center mb-6">
                <div className={`w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mr-3`}></div>
                <h3 className="text-xl font-semibold text-white">
                  {getCategoryLabel(category)}
                </h3>
              </div>
                             <div className="flex flex-wrap gap-3">
                 {categorySkills.map((skill) => (
                   <div key={skill.id} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200 group cursor-pointer">
                     <div className="flex flex-col">
                       <span className="text-sm font-medium text-gray-300">{skill.name}</span>
                       <div className="flex space-x-1 mt-1">
                         {[...Array(5)].map((_, i) => (
                           <div
                             key={i}
                             className={`w-1.5 h-1.5 rounded-full ${
                               i < Math.floor(skill.level / 20) 
                                 ? 'bg-gradient-to-r from-purple-400 to-pink-400' 
                                 : 'bg-gray-600'
                             }`}
                           ></div>
                         ))}
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          ))}

          {/* Skills Overview */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-sm border border-purple-500/20">
            <h3 className="text-2xl font-semibold text-white mb-6">Tổng quan kỹ năng</h3>
             
            {/* Skill Categories Overview */}
            <div className="space-y-6">
              {Object.entries(groupedSkills).map(([category, categorySkills]) => {
                const avgLevel = Math.round(
                  categorySkills.reduce((sum, skill) => sum + skill.level, 0) / categorySkills.length
                );
                 
                return (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mr-3"></div>
                      <span className="text-gray-300 font-medium">{getCategoryLabel(category)}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-700 rounded-full h-2 mr-3">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                          style={{ width: `${avgLevel}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-400 w-8">{avgLevel}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Additional Skills */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-sm border border-purple-500/20">
            <h3 className="text-2xl font-semibold text-white mb-6">Kỹ năng bổ sung</h3>
                         <div className="grid grid-cols-2 gap-4">
               <div className="flex items-center space-x-2 cursor-pointer hover:text-purple-300 transition-colors duration-200">
                 <span className="text-gray-300">Git & GitHub</span>
               </div>
               <div className="flex items-center space-x-2 cursor-pointer hover:text-purple-300 transition-colors duration-200">
                 <span className="text-gray-300">Docker</span>
               </div>
               <div className="flex items-center space-x-2 cursor-pointer hover:text-purple-300 transition-colors duration-200">
                 <span className="text-gray-300">AWS</span>
               </div>
               <div className="flex items-center space-x-2 cursor-pointer hover:text-purple-300 transition-colors duration-200">
                 <span className="text-gray-300">CI/CD</span>
               </div>
               <div className="flex items-center space-x-2 cursor-pointer hover:text-purple-300 transition-colors duration-200">
                 <span className="text-gray-300">Agile/Scrum</span>
               </div>
               <div className="flex items-center space-x-2 cursor-pointer hover:text-purple-300 transition-colors duration-200">
                 <span className="text-gray-300">Testing</span>
               </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
