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
    <div className={`relative flex flex-col lg:flex-row items-start gap-3 sm:gap-4 lg:gap-6 w-full ${
      index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
    }`}>
      {/* Timeline Dot - Hidden on mobile, visible on lg+ */}
      <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-gray-900 shadow-lg z-10"></div>

      {/* Content - Full width on mobile, timeline layout on lg+ */}
      <div className={`lg:ml-0 lg:w-5/12 w-full ${
        index % 2 === 0 ? 'lg:pr-3 xl:pr-6' : 'lg:pl-3 xl:pl-6'
      }`}>
        <div className="bg-gray-800/90 backdrop-blur-sm p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-500/20 hover:border-purple-500/40 hover:scale-[1.01] group w-full overflow-hidden">
          {/* Header */}
          <div className="mb-3 sm:mb-4">
            <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-purple-300 transition-colors duration-300 line-clamp-2">
              {project.name}
            </h3>
          </div>
          
                     {/* Language & Date */}
           <div className="flex items-center justify-between text-purple-400 font-medium mb-3 sm:mb-4">
             <div className="flex items-center min-w-0">
               <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                 <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                 <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
               </svg>
               <span className="text-sm sm:text-base truncate">{project.language}</span>
             </div>
             <span className="px-2 sm:px-3 py-1 bg-purple-500/20 text-purple-300 text-xs sm:text-sm rounded-full font-medium border border-purple-500/30 flex-shrink-0">
               {formatDate(project.createdAt)}
             </span>
           </div>
        
          {/* Description - Visible on all screens */}
          <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4 leading-relaxed line-clamp-3 sm:line-clamp-3 lg:line-clamp-4">
            {project.description}
          </p>
          
          {/* Topics */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            {project.topics.slice(0, 3).map((topic, topicIndex) => (
              <span
                key={topicIndex}
                className="px-2 py-1 bg-gray-700/80 text-gray-300 text-xs rounded-full border border-gray-600/50 hover:border-purple-500/50 hover:bg-gray-700 transition-all duration-200 flex-shrink-0 truncate"
                title={topic}
              >
                {topic}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 flex-1 sm:flex-none"
            >
              <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828L11.828 10H15a1 1 0 110 2h-3.172l3.586 3.586a2 2 0 11-2.828 2.828L9 13.172V17a1 1 0 11-2 0v-3.172l-3.586 3.586a2 2 0 11-2.828-2.828L6.172 13H3a1 1 0 110-2h3.172L2.586 6.414a2 2 0 112.828-2.828L9 6.828V3a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span className="hidden sm:inline truncate">GitHub</span>
              <span className="sm:hidden truncate">Code</span>
            </a>
            
            {project.homepage && (
              <a
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 flex-1 sm:flex-none"
              >
                <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                <span className="hidden sm:inline truncate">Live Demo</span>
                <span className="sm:hidden truncate">Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
