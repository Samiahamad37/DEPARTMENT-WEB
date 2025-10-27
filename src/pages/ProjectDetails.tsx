import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjectById, useProjects } from '../hooks/useProjects';
import { ArrowLeft, Calendar, User, Tag, ExternalLink, Github, Eye, Users, Target, Award, Clock, MapPin, Share2, Heart, MessageCircle } from 'lucide-react';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const projectId = id ? parseInt(id) : 0;
  const [isLiked, setIsLiked] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const { data: project, isLoading, error } = useProjectById(projectId);
  const { data: relatedProjects } = useProjects({ 
    category: project?.category, 
    page_size: 3,
    is_active: true 
  });

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
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Project Not Found</h1>
          <p className="text-gray-600 mb-6">The project you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/projects-page')}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      ai: 'bg-purple-100 text-purple-800',
      iot: 'bg-blue-100 text-blue-800',
      embedded: 'bg-green-100 text-green-800',
      web: 'bg-orange-100 text-orange-800',
      mobile: 'bg-pink-100 text-pink-800',
      data_science: 'bg-indigo-100 text-indigo-800',
      cybersecurity: 'bg-red-100 text-red-800',
      networking: 'bg-teal-100 text-teal-800',
      other: 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors.other;
  };

  const formatCategory = (category: string) => {
    return category.replace('_', ' ').toUpperCase();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project?.name,
          text: project?.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      setShowShareModal(true);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/projects-page')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Projects
            </button>
            <div className="flex items-center space-x-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(project.category)}`}>
                {formatCategory(project.category)}
              </span>
              {project.is_featured && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                  <Award className="h-4 w-4 mr-1" />
                  Featured
                </span>
              )}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-2 rounded-full transition-colors ${
                    isLiked ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Project Image */}
            {project.image && (
              <div className="mb-8 relative group">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-64 lg:h-80 object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-90 p-3 rounded-full">
                    <Eye className="h-6 w-6 text-gray-800" />
                  </button>
                </div>
              </div>
            )}

            {/* Project Title and Meta */}
            <div className="mb-6">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {project.name}
              </h1>
              
              {/* Project Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Created {formatDate(project.created_at)}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Active Project
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Team Project
                </div>
              </div>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Detailed Description */}
            {project.detailed_description && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Project Overview</h2>
                <div className="prose prose-lg max-w-none text-gray-700">
                  {project.detailed_description.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Objectives */}
            {project.objectives && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Target className="h-6 w-6 mr-2 text-orange-600" />
                  Objectives
                </h2>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="prose prose-lg max-w-none text-gray-700">
                    {project.objectives.split('\n').map((objective, index) => (
                      <p key={index} className="mb-2">{objective}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Outcomes */}
            {project.outcomes && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Award className="h-6 w-6 mr-2 text-green-600" />
                  Outcomes
                </h2>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="prose prose-lg max-w-none text-gray-700">
                    {project.outcomes.split('\n').map((outcome, index) => (
                      <p key={index} className="mb-2">{outcome}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Contributors */}
            {project.contributors && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Users className="h-6 w-6 mr-2 text-blue-600" />
                  Contributors
                </h2>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <p className="text-gray-700">{project.contributors}</p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Project Links */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Links</h3>
                <div className="space-y-3">
                  {project.project_link && (
                    <a
                      href={project.project_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
                    >
                      <ExternalLink className="h-5 w-5 mr-3 text-orange-600" />
                      <span className="text-orange-800 font-medium">View Project</span>
                    </a>
                  )}
                  {project.github_link && (
                    <a
                      href={project.github_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Github className="h-5 w-5 mr-3 text-gray-600" />
                      <span className="text-gray-800 font-medium">GitHub Repository</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Technologies Used */}
              {project.technologies_used && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies_used.split(',').map((tech, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {project.tags && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.split(',').map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Projects Section */}
        {relatedProjects && relatedProjects.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.results?.filter(p => p.id !== project.id).slice(0, 3).map((relatedProject) => (
                <div key={relatedProject.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  {relatedProject.image && (
                    <img
                      src={relatedProject.image}
                      alt={relatedProject.name}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(relatedProject.category)}`}>
                        {formatCategory(relatedProject.category)}
                      </span>
                      {relatedProject.is_featured && (
                        <Award className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{relatedProject.name}</h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">{relatedProject.description}</p>
                    <button
                      onClick={() => navigate(`/projects/${relatedProject.id}`)}
                      className="text-orange-600 hover:text-orange-700 font-medium text-sm flex items-center"
                    >
                      View Project
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this project</h3>
            <div className="space-y-3">
              <button
                onClick={copyToClipboard}
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Copy Link
              </button>
              <button
                onClick={() => setShowShareModal(false)}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;

