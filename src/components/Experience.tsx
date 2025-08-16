import React from 'react';
import { useGitHubProjects } from '../hooks/useGitHubProjects';
import LoadingSpinner from './LoadingSpinner';
import TimelineHeader from './TimelineHeader';
import TimelineContainer from './TimelineContainer';

const Experience: React.FC = () => {
  const { projects, loading, error } = useGitHubProjects();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <section id="experience" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-red-400 text-xl mb-4">⚠️</div>
            <p className="text-red-400 text-lg">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TimelineHeader />
        <TimelineContainer projects={projects} />
      </div>
    </section>
  );
};

export default Experience;
