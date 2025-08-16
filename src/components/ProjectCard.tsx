import React from 'react';

interface ProjectCardProps {
  project: {
    id: number;
    name: string;
    description: string;
    language: string;
    url: string;
    homepage: string | null;
    createdAt: string;
    updatedAt: string;
    topics: string[];
  };
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
    });
  };

  return (
    <div className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      {/* Timeline Dot */}
      <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-gray-900 shadow-lg"></div>

      {/* Content */}
      <div className={`ml-12 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                 <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-purple-500/20">
           <div className="mb-4">
             <h3 className="text-xl font-semibold text-white truncate">
               {project.name}
             </h3>
           </div>
           
           <div className="flex items-center justify-between text-purple-400 font-medium mb-3">
             <div className="flex items-center">
               <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                 <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                 <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
               </svg>
               {project.language}
             </div>
             <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full font-medium">
               {formatDate(project.createdAt)}
             </span>
           </div>
          
          <p className="text-gray-300 mb-4 leading-relaxed">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.topics.slice(0, 5).map((topic, topicIndex) => (
              <span
                key={topicIndex}
                className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
              >
                {topic}
              </span>
            ))}
          </div>

          <div className="flex gap-3">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828L11.828 10H15a1 1 0 110 2h-3.172l3.586 3.586a2 2 0 11-2.828 2.828L9 13.172V17a1 1 0 11-2 0v-3.172l-3.586 3.586a2 2 0 11-2.828-2.828L6.172 13H3a1 1 0 110-2h3.172L2.586 6.414a2 2 0 112.828-2.828L9 6.828V3a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              GitHub
            </a>
            
            {project.homepage && (
              <a
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
