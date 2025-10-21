import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Building2, Users, Globe } from 'lucide-react';

interface Partner {
  id: number;
  name: string;
  logo: string;
  description: string;
  website_url?: string;
  partnership_type: string;
  is_active: boolean;
}

const PartnersSection: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Static partner data - will be replaced with API data later
  const staticPartners: Partner[] = [
    {
      id: 1,
      name: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      description: "Technology partnership for AI research and student internships",
      website_url: "https://google.com",
      partnership_type: "Technology",
      is_active: true
    },
    {
      id: 2,
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
      description: "Cloud computing education and research collaboration",
      website_url: "https://microsoft.com",
      partnership_type: "Technology",
      is_active: true
    },
    {
      id: 3,
      name: "IBM",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
      description: "AI and data science research partnership",
      website_url: "https://ibm.com",
      partnership_type: "Research",
      is_active: true
    },
    {
      id: 4,
      name: "University of Dar es Salaam",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/University_of_Dar_es_Salaam_logo.svg/200px-University_of_Dar_es_Salaam_logo.svg.png",
      description: "Academic collaboration and joint research programs",
      website_url: "https://udsm.ac.tz",
      partnership_type: "Academic",
      is_active: true
    },
    {
      id: 5,
      name: "Nelson Mandela African Institution of Science and Technology",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/NMAIST_logo.svg/200px-NMAIST_logo.svg.png",
      description: "Research collaboration in STEM fields",
      website_url: "https://nm-aist.ac.tz",
      partnership_type: "Academic",
      is_active: true
    },
    {
      id: 6,
      name: "Tanzania Communications Regulatory Authority",
      logo: "https://www.tcra.go.tz/images/logo.png",
      description: "Telecommunications research and policy development",
      website_url: "https://tcra.go.tz",
      partnership_type: "Government",
      is_active: true
    },
    {
      id: 7,
      name: "Vodacom Tanzania",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Vodacom_logo.svg/200px-Vodacom_logo.svg.png",
      description: "Mobile technology and connectivity research",
      website_url: "https://vodacom.co.tz",
      partnership_type: "Industry",
      is_active: true
    },
    {
      id: 8,
      name: "Tigo Tanzania",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Tigo_logo.svg/200px-Tigo_logo.svg.png",
      description: "Digital transformation and innovation partnership",
      website_url: "https://tigo.co.tz",
      partnership_type: "Industry",
      is_active: true
    },
    {
      id: 9,
      name: "National ICT Commission",
      logo: "https://www.nictc.go.tz/images/logo.png",
      description: "ICT policy research and digital government initiatives",
      website_url: "https://nictc.go.tz",
      partnership_type: "Government",
      is_active: true
    },
    {
      id: 10,
      name: "Sokoine University of Agriculture",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Sokoine_University_of_Agriculture_logo.svg/200px-Sokoine_University_of_Agriculture_logo.svg.png",
      description: "Agricultural technology and precision farming research",
      website_url: "https://sua.ac.tz",
      partnership_type: "Academic",
      is_active: true
    },
    {
      id: 11,
      name: "Kilimanjaro Christian Medical Centre",
      logo: "https://www.kcmc.ac.tz/images/logo.png",
      description: "Health informatics and medical technology research",
      website_url: "https://kcmc.ac.tz",
      partnership_type: "Healthcare",
      is_active: true
    },
    {
      id: 12,
      name: "Tanzania Revenue Authority",
      logo: "https://www.tra.go.tz/images/logo.png",
      description: "Digital taxation systems and data analytics",
      website_url: "https://tra.go.tz",
      partnership_type: "Government",
      is_active: true
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPartners(staticPartners);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getPartnershipTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'Technology': 'bg-blue-100 text-blue-800',
      'Research': 'clean-100 text-green-800',
      'Academic': 'bg-purple-100 text-purple-800',
      'Industry': 'bg-orange-100 text-orange-800',
      'Government': 'bg-gray-100 text-gray-800',
      'Healthcare': 'bg-red-100 text-red-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getPartnershipTypeIcon = (type: string) => {
    switch (type) {
      case 'Technology':
        return <Globe size={16} />;
      case 'Research':
        return <Users size={16} />;
      case 'Academic':
        return <Building2 size={16} />;
      case 'Industry':
        return <Building2 size={16} />;
      case 'Government':
        return <Building2 size={16} />;
      case 'Healthcare':
        return <Users size={16} />;
      default:
        return <Building2 size={16} />;
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading partners...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Partners & Collaborations</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We collaborate with leading institutions, industry partners, and government agencies to drive innovation and create meaningful impact in technology and education.
          </p>
        </div>

        {/* Partners Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={scrollLeft}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white hover:bg-gray-50 text-gray-700 p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white hover:bg-gray-50 text-gray-700 p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Partners Grid */}
          <div
            ref={scrollContainerRef}
            className="flex space-x-8 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {partners.map((partner, index) => (
              <div
                key={partner.id}
                className="flex-shrink-0 w-80 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                {/* Partner Logo */}
                <div className="p-8 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = `
                          <div class="text-gray-500 text-2xl font-bold">${partner.name.charAt(0)}</div>
                        `;
                      }}
                    />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                    {partner.name}
                  </h3>
                  
                  {/* Partnership Type */}
                  <div className="flex items-center justify-center mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getPartnershipTypeColor(partner.partnership_type)}`}>
                      {getPartnershipTypeIcon(partner.partnership_type)}
                      <span className="ml-1">{partner.partnership_type}</span>
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                    {partner.description}
                  </p>
                  
                  {/* Website Link */}
                  {partner.website_url && (
                    <a
                      href={partner.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium transition-colors duration-300 group-hover:translate-x-1"
                    >
                      Visit Website
                      <ExternalLink size={16} className="ml-2" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partnership Statistics */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">50+</div>
            <div className="text-gray-600">Active Partnerships</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">15</div>
            <div className="text-gray-600">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">200+</div>
            <div className="text-gray-600">Joint Projects</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">500+</div>
            <div className="text-gray-600">Student Placements</div>
          </div>
        </div>

        {/* Become a Partner CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Interested in Partnering with Us?</h3>
            <p className="text-gray-600 mb-6">
              Join our network of partners and collaborate on innovative projects that drive technological advancement and create meaningful impact.
            </p>
            <button className="inline-flex items-center px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Become a Partner
              <ExternalLink size={20} className="ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style> */}
    </section>
  );
};

export default PartnersSection;

