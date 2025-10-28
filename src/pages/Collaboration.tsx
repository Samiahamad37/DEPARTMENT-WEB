import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Star, GraduationCap, Target, TrendingUp, Eye } from 'lucide-react';
import { useOutreachInitiatives } from '../hooks/useOutreach';
import { OutreachInitiative } from '../types/api';

interface InitiativeModalProps {
  initiative: OutreachInitiative;
  isOpen: boolean;
  onClose: () => void;
}

const InitiativeModal: React.FC<InitiativeModalProps> = ({ initiative, isOpen, onClose }) => {
  if (!isOpen) return null;

  const getDuration = () => {
    const start = new Date(initiative.start_date);
    const end = initiative.end_date ? new Date(initiative.end_date) : new Date();
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) return `${diffDays} days`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months`;
    return `${Math.floor(diffDays / 365)} years`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
        
        {/* Modal */}
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto z-50">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
          >
            <span className="text-2xl">&times;</span>
          </button>

          {/* Modal content */}
          <div className="relative">
            {/* Image */}
            {initiative.image && (
              <div className="relative h-64 overflow-hidden">
                <img
                  src={initiative.image}
                  alt={initiative.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {initiative.is_featured && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                      <Star size={14} className="mr-1" />
                      Featured
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Content */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{initiative.title}</h2>
              
              <div className="mb-6 space-y-4">
                {initiative.target_audience && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                      <Users size={18} className="mr-2 text-orange-600" />
                      Target Audience
                    </h3>
                    <p className="text-gray-700 text-sm">{initiative.target_audience}</p>
                  </div>
                )}

                {initiative.start_date && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                      <TrendingUp size={18} className="mr-2 text-orange-600" />
                      Duration
                    </h3>
                    <p className="text-gray-700 text-sm">{getDuration()}</p>
                  </div>
                )}
              </div>

              {initiative.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Overview</h3>
                  <p className="text-gray-700 leading-relaxed">{initiative.description}</p>
                </div>
              )}

              {initiative.detailed_description && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Details</h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {initiative.detailed_description}
                  </p>
                </div>
              )}

              {initiative.impact_description && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Target size={20} className="mr-2 text-orange-600" />
                    Impact
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{initiative.impact_description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Collaboration: React.FC = () => {
  const [selectedInitiative, setSelectedInitiative] = useState<OutreachInitiative | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch data from backend
  const { data: outreachInitiativesFromAPI = [], isLoading: initiativesLoading } = useOutreachInitiatives();

  const handleOpenModal = (initiative: OutreachInitiative) => {
    setSelectedInitiative(initiative);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInitiative(null);
  };

  // Loading state
  if (initiativesLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading outreach information...</p>
        </div>
      </div>
    );
  }

  // No data state
  if (outreachInitiativesFromAPI.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-2xl px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Outreach & Impact</h2>
          <p className="text-xl text-gray-600">No initiatives available at the moment.</p>
          <p className="text-gray-500 mt-2">Please check back later for updates on our outreach programs.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Outreach & Impact</h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Building strong partnerships with industry, government, and communities to drive innovation, create real-world impact, and advance technology education across Tanzania.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Overview Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-xl text-gray-600">Making a difference through collaboration and community engagement</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-all duration-300">
                <Users size={32} className="text-blue-600 group-hover:text-white transition-all duration-300" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">2,500+</div>
              <div className="text-gray-600">Community Members Reached</div>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-600 transition-all duration-300">
                <GraduationCap size={32} className="text-orange-600 group-hover:text-white transition-all duration-300" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600 transition-all duration-300">
                <Target size={32} className="text-green-600 group-hover:text-white transition-all duration-300" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">15+</div>
              <div className="text-gray-600">Partner Organizations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Initiatives */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Initiatives</h2>
            <p className="text-xl text-gray-600">Comprehensive outreach programs creating positive impact</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {outreachInitiativesFromAPI.map((initiative, index) => (
              <div
                key={initiative.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100 cursor-pointer"
                onClick={() => handleOpenModal(initiative)}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                {/* Initiative Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={initiative.image}
                    alt={initiative.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  {initiative.is_featured && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                        <Star size={14} className="mr-1" />
                        Featured
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center text-white">
                      <Eye size={16} className="mr-2" />
                      <span className="text-sm font-medium">View Details</span>
                    </div>
                  </div>
                </div>

                {/* Initiative Info */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{initiative.title}</h3>
                  <p className="text-gray-600 mb-6 line-clamp-3">{initiative.description}</p>
                  
                  {initiative.target_audience && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                        <Users size={16} className="mr-2 text-orange-600" />
                        Target Audience
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2">{initiative.target_audience}</p>
                    </div>
                  )}

                  {initiative.impact_description && (
                    <div className="pt-6 border-t border-gray-100">
                      <div className="flex items-center text-orange-600 hover:text-blue-900 font-semibold transition-colors duration-300">
                        <ArrowRight size={20} className="mr-2" />
                        Learn More
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Partner With Us</h2>
          <p className="text-xl text-blue-200 mb-8">
            Join us in creating innovative solutions and driving positive change in technology and education across Tanzania.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              Contact Us
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedInitiative && (
        <InitiativeModal
          initiative={selectedInitiative}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Collaboration;
