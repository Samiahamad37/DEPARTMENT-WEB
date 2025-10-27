import React from 'react';
import { ExternalLink, Building2, Users, Globe } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import { Partner } from '../types/api';

const PartnersSection: React.FC = () => {

  // Fetch partners from API
  const { data: partners = [], isLoading, error } = useQuery({
    queryKey: ['partners'],
    queryFn: async () => {
      const response = await api.get('/partners/');
      return response.data;
    },
  });

  // Fallback static data if API fails
  const fallbackPartners: Partner[] = [
    {
      id: 1,
      name: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      description: "Technology partnership for AI research and student internships",
      website_url: "https://google.com",
      partnership_type: "Technology",
      is_active: true,
      display_order: 1
    },
    {
      id: 2,
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
      description: "Cloud computing and software development collaboration",
      website_url: "https://microsoft.com",
      partnership_type: "Technology",
      is_active: true,
      display_order: 2
    },
    {
      id: 3,
      name: "IBM",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
      description: "AI and quantum computing research partnership",
      website_url: "https://ibm.com",
      partnership_type: "Research",
      is_active: true,
      display_order: 3
    },
    {
      id: 4,
      name: "Tanzania Data Lab",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      description: "Data science and analytics research collaboration",
      website_url: "https://tanzaniadatalab.org",
      partnership_type: "Research",
      is_active: true,
      display_order: 4
    },
    {
      id: 5,
      name: "University of Dar es Salaam",
      logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      description: "Academic collaboration and student exchange programs",
      website_url: "https://udsm.ac.tz",
      partnership_type: "Academic",
      is_active: true,
      display_order: 5
    },
    {
      id: 6,
      name: "Nelson Mandela African Institution of Science and Technology",
      logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      description: "STEM education and research collaboration",
      website_url: "https://nm-aist.ac.tz",
      partnership_type: "Academic",
      is_active: true,
      display_order: 6
    }
  ];

  // Use API data or fallback to static data
  const partnerData = partners.length > 0 ? partners : fallbackPartners;

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Partners</h2>
            <p className="text-lg text-gray-600 mb-8">Loading partners...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error('Error loading partners:', error);
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Partners
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            We collaborate with leading organizations to provide world-class education and research opportunities
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partnerData.map((partner: Partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mr-4 overflow-hidden">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://via.placeholder.com/64x64?text=Logo";
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {partner.name}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Building2 size={16} className="mr-1" />
                    {partner.partnership_type}
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-3">
                {partner.description}
              </p>

              {partner.website_url && (
                <div className="flex items-center justify-between">
                  <a
                    href={partner.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-orange-600 hover:text-orange-700 font-medium transition-colors duration-300"
                  >
                    <Globe size={16} className="mr-1" />
                    Visit Website
                  </a>
                  <ExternalLink size={16} className="text-orange-600" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Partnership Benefits */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Partnership Benefits
            </h3>
            <p className="text-gray-600">
              Our partnerships create value for students, faculty, and the broader community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-orange-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Student Opportunities
              </h4>
              <p className="text-gray-600">
                Internships, research projects, and career opportunities with leading organizations
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 size={32} className="text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Research Collaboration
              </h4>
              <p className="text-gray-600">
                Joint research projects, funding opportunities, and knowledge sharing
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe size={32} className="text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Global Impact
              </h4>
              <p className="text-gray-600">
                Contributing to global technological advancement and innovation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;