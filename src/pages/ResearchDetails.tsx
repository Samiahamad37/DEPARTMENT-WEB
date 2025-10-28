import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProjectById } from '../hooks/useProjects';
import { CheckCircle, Calendar, Users, Award, ExternalLink } from 'lucide-react';

const ResearchDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const projectId = id ? parseInt(id) : 0;
  const { data: project, isLoading, error } = useProjectById(projectId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <p className="text-gray-600 mb-6">The project you're looking for doesn't exist.</p>
          <Link to="/research" className="text-orange-600 hover:text-orange-700">
            Back to Research
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link to="/" className="text-gray-400 hover:text-gray-500">Home</Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="text-gray-500">/</span>
                  <Link to="/research" className="ml-4 text-gray-400 hover:text-gray-500">Research</Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="text-gray-500">/</span>
                  <span className="ml-4 text-gray-900 font-medium">{project.name}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Project Header */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <img 
                src={project.image} 
                alt={project.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            <div>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                {project.category}
              </span>
              <h1 className="text-4xl font-bold text-gray-900 mb-6">{project.name}</h1>
              <p className="text-xl text-gray-600 mb-8">{project.description}</p>
              
              {project.tag_list && project.tag_list.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tag_list.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {project.contributors && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Users className="h-5 w-5 mr-2 text-orange-600" />
                    Contributors
                  </h3>
                  <p className="text-gray-600">{project.contributors}</p>
                </div>
              )}
              
              {project.technologies_used && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Award className="h-5 w-5 mr-2 text-orange-600" />
                    Technologies Used
                  </h3>
                  <p className="text-gray-600">{project.technologies_used}</p>
                </div>
              )}
            </div>

            {project.detailed_description && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
                <div className="prose max-w-none">
                  <p className="text-gray-600 whitespace-pre-line">{project.detailed_description}</p>
                </div>
              </div>
            )}

            {project.objectives && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-orange-600" />
                  Objectives
                </h3>
                <div className="prose max-w-none">
                  <p className="text-gray-600 whitespace-pre-line">{project.objectives}</p>
                </div>
              </div>
            )}

            {project.outcomes && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Award className="h-5 w-5 mr-2 text-green-600" />
                  Outcomes
                </h3>
                <div className="prose max-w-none">
                  <p className="text-gray-600 whitespace-pre-line">{project.outcomes}</p>
                </div>
              </div>
            )}

            {(project.project_link || project.github_link) && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Links</h3>
                <div className="flex flex-wrap gap-4">
                  {project.project_link && (
                    <a 
                      href={project.project_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Project
                    </a>
                  )}
                  {project.github_link && (
                    <a 
                      href={project.github_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View on GitHub
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResearchDetails;

