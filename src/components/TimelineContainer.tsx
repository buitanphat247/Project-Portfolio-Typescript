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
      {/* Timeline Line - Hidden on mobile, visible on md+ */}
      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500"></div>

      {/* Mobile: Simple card layout, Desktop: Timeline layout */}
      <div className="md:space-y-12 space-y-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};

export default TimelineContainer;
