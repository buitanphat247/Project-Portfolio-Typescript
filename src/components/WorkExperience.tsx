import React from 'react';
import { portfolioData } from '../data/portfolioData';

const WorkExperience: React.FC = () => {
  return (
    <section id="work-experience" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Kinh nghiệm làm việc
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
          <p className="text-lg text-gray-300 mt-4 max-w-2xl mx-auto">
            Những trải nghiệm và kinh nghiệm làm việc đa dạng trong nhiều lĩnh vực khác nhau.
          </p>
        </div>

        {/* Experience Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {portfolioData.experience.map((exp, index) => (
            <div
              key={exp.id}
              className="group relative bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-sm border border-gray-600/30 rounded-2xl p-6 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
            >
              {/* Company & Position */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300 mb-2">
                  {exp.company}
                </h3>
                <p className="text-purple-400 font-semibold text-lg mb-1">
                  {exp.position}
                </p>
                <p className="text-gray-400 text-sm font-medium">
                  {exp.duration}
                </p>
              </div>

              {/* Description */}
              <p className="text-gray-300 mb-4 leading-relaxed">
                {exp.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {exp.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full border border-purple-500/30 hover:border-purple-500/50 hover:bg-purple-500/30 transition-all duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        {/* <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors duration-300 cursor-pointer">
            <span className="text-lg">💼</span>
            <span className="font-medium">Luôn sẵn sàng cho những cơ hội mới!</span>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default WorkExperience;
