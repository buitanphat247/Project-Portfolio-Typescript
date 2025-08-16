import React from 'react';
import ProjectCard from './ProjectCard';

interface TimelineContainerProps {
  projects: Array<{
    id: number;
    name: string;
    description: string;
    language: string;
    url: string;
    homepage: string | null;
    createdAt: string;
    updatedAt: string;
    topics: string[];
  }>;
}

const TimelineContainer: React.FC<TimelineContainerProps> = ({ projects }) => {
  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500"></div>

      <div className="space-y-12">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};

export default TimelineContainer;
