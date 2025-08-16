import React from 'react';
import GitHubProjects from './GitHubProjects';

const Projects: React.FC = () => {

  return (
    <section id="projects" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Dự án của tôi
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
          <p className="text-lg text-gray-300 mt-4 max-w-2xl mx-auto">
            Khám phá các dự án tôi đã thực hiện với các công nghệ hiện đại và thiết kế đẹp mắt.
          </p>
        </div>



        {/* GitHub Projects Grid */}
        <GitHubProjects />

        
      </div>
    </section>
  );
};

export default Projects;
