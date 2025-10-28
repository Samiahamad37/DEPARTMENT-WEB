import React from 'react';
import { useBanners } from '../hooks/useBanners';
import { useFeaturedNews } from '../hooks/useNews';
import { useFeaturedProjects } from '../hooks/useProjects';

const ApiTest: React.FC = () => {
  const { data: banners, isLoading: bannersLoading, error: bannersError } = useBanners();
  const { data: news, isLoading: newsLoading, error: newsError } = useFeaturedNews();
  const { data: projects, isLoading: projectsLoading, error: projectsError } = useFeaturedProjects();

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">API Integration Test</h1>
      
      {/* Banners Test */}
      <div className="mb-8 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Banners API</h2>
        {bannersLoading && <p>Loading banners...</p>}
        {bannersError && <p className="text-red-600">Error: {bannersError.message}</p>}
        {banners && (
          <div>
            <p>Found {banners.length} banners</p>
            {banners.slice(0, 2).map((banner) => (
              <div key={banner.id} className="mt-2 p-2 bg-gray-50 rounded">
                <p><strong>Title:</strong> {banner.title}</p>
                <p><strong>Subtitle:</strong> {banner.subtitle}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* News Test */}
      <div className="mb-8 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">News API</h2>
        {newsLoading && <p>Loading news...</p>}
        {newsError && <p className="text-red-600">Error: {newsError.message}</p>}
        {news && (
          <div>
            <p>Found {news.length} news items</p>
            {news.slice(0, 2).map((item) => (
              <div key={item.id} className="mt-2 p-2 bg-gray-50 rounded">
                <p><strong>Title:</strong> {item.title}</p>
                <p><strong>Category:</strong> {item.category}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Projects Test */}
      <div className="mb-8 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Projects API</h2>
        {projectsLoading && <p>Loading projects...</p>}
        {projectsError && <p className="text-red-600">Error: {projectsError.message}</p>}
        {projects && (
          <div>
            <p>Found {projects.length} projects</p>
            {projects.slice(0, 2).map((project) => (
              <div key={project.id} className="mt-2 p-2 bg-gray-50 rounded">
                <p><strong>Name:</strong> {project.name}</p>
                <p><strong>Category:</strong> {project.category}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiTest;






