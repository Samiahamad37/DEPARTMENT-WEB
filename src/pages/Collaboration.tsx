import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Clock, Award, Globe, ChevronDown, ChevronUp, CheckCircle, Star, ExternalLink, Handshake, Building, GraduationCap, Heart, Target, TrendingUp } from 'lucide-react';

interface OutreachInitiative {
  id: number;
  title: string;
  description: string;
  category: 'training' | 'partnership' | 'community' | 'research';
  targetAudience: string[];
  outcomes: string[];
  participants: number;
  duration: string;
  status: 'active' | 'completed' | 'upcoming';
  image: string;
  isFeatured: boolean;
  partners: string[];
  impact: string[];
}

interface Partner {
  id: number;
  name: string;
  type: 'industry' | 'academic' | 'government' | 'ngo';
  logo: string;
  description: string;
  collaboration: string[];
  since: string;
  isActive: boolean;
}

const Collaboration: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedInitiative, setExpandedInitiative] = useState<number | null>(null);

  // Static outreach initiatives data - will be replaced with API data later
  const outreachInitiatives: OutreachInitiative[] = [
    {
      id: 1,
      title: "Digital Literacy for Rural Communities",
      description: "Comprehensive digital literacy program targeting rural communities in Tanzania, providing basic computer skills, internet usage, and digital safety awareness.",
      category: "training",
      targetAudience: ["Rural communities", "Small business owners", "Local government staff", "Students"],
      outcomes: [
        "1,500+ community members trained",
        "50+ local businesses digitized",
        "15 rural schools connected",
        "Digital safety awareness increased"
      ],
      participants: 1500,
      duration: "6 months",
      status: "completed",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      isFeatured: true,
      partners: ["Ministry of Education", "Local Government", "Community Leaders"],
      impact: ["Improved digital access", "Economic empowerment", "Educational enhancement"]
    },
    {
      id: 2,
      title: "Industry Training Program",
      description: "Professional development program for industry professionals, focusing on emerging technologies, project management, and technical skills enhancement.",
      category: "training",
      targetAudience: ["IT professionals", "Software developers", "Project managers", "Technical leads"],
      outcomes: [
        "200+ professionals trained",
        "95% skill improvement rate",
        "15+ companies participated",
        "Career advancement achieved"
      ],
      participants: 200,
      duration: "3 months",
      status: "active",
      image: "https://images.unsplash.com/photo-1521737711867-ee1ab9279f17?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      isFeatured: true,
      partners: ["Microsoft Tanzania", "IBM East Africa", "Local Tech Companies"],
      impact: ["Professional development", "Industry readiness", "Technology adoption"]
    },
    {
      id: 3,
      title: "Research Collaboration Network",
      description: "International research collaboration network connecting Tanzanian researchers with global academic institutions for joint research projects and knowledge sharing.",
      category: "research",
      targetAudience: ["Researchers", "Graduate students", "Academic institutions", "Research organizations"],
      outcomes: [
        "25+ joint research projects",
        "50+ international publications",
        "15+ student exchanges",
        "Knowledge transfer achieved"
      ],
      participants: 100,
      duration: "Ongoing",
      status: "active",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      isFeatured: false,
      partners: ["MIT", "Stanford University", "University of Cape Town", "Makerere University"],
      impact: ["Research advancement", "International collaboration", "Academic excellence"]
    },
    {
      id: 4,
      title: "Community Technology Hub",
      description: "Establishing technology hubs in underserved communities to provide access to computers, internet, and digital services for community development.",
      category: "community",
      targetAudience: ["Community members", "Small business owners", "Students", "Entrepreneurs"],
      outcomes: [
        "5 technology hubs established",
        "2,000+ community members served",
        "100+ small businesses supported",
        "Digital services accessed"
      ],
      participants: 2000,
      duration: "12 months",
      status: "completed",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      isFeatured: false,
      partners: ["Local Government", "NGOs", "Community Organizations"],
      impact: ["Digital inclusion", "Community development", "Economic growth"]
    },
    {
      id: 5,
      title: "Student Industrial Training Program",
      description: "Structured industrial training program placing students in partner organizations for practical experience and skill development.",
      category: "partnership",
      targetAudience: ["Undergraduate students", "Graduate students", "Partner organizations", "Industry professionals"],
      outcomes: [
        "300+ students placed",
        "50+ partner organizations",
        "95% placement success rate",
        "Industry-ready graduates"
      ],
      participants: 300,
      duration: "4-6 months",
      status: "active",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      isFeatured: true,
      partners: ["Local Companies", "Government Agencies", "NGOs", "International Organizations"],
      impact: ["Student development", "Industry collaboration", "Workforce preparation"]
    }
  ];

  const partners: Partner[] = [
    {
      id: 1,
      name: "Microsoft Tanzania",
      type: "industry",
      logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      description: "Leading technology company providing cloud services and software solutions.",
      collaboration: ["Cloud computing training", "Software development", "Student internships"],
      since: "2020",
      isActive: true
    },
    {
      id: 2,
      name: "University of Cape Town",
      type: "academic",
      logo: "https://images.unsplash.com/photo-1523050854805-9a1579b8175c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      description: "Premier research university in South Africa with strong computer science programs.",
      collaboration: ["Joint research projects", "Student exchanges", "Academic collaboration"],
      since: "2019",
      isActive: true
    },
    {
      id: 3,
      name: "Ministry of Education",
      type: "government",
      logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      description: "Government ministry responsible for education policy and implementation.",
      collaboration: ["Digital literacy programs", "Teacher training", "Educational technology"],
      since: "2018",
      isActive: true
    },
    {
      id: 4,
      name: "IBM East Africa",
      type: "industry",
      logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      description: "Global technology company specializing in AI, cloud computing, and business solutions.",
      collaboration: ["AI research", "Professional training", "Technology consulting"],
      since: "2021",
      isActive: true
    }
  ];

  const categories = [
    { value: 'All', label: 'All Initiatives' },
    { value: 'training', label: 'Training Programs' },
    { value: 'partnership', label: 'Partnerships' },
    { value: 'community', label: 'Community Outreach' },
    { value: 'research', label: 'Research Collaboration' }
  ];

  const filteredInitiatives = selectedCategory === 'All' 
    ? outreachInitiatives 
    : outreachInitiatives.filter(initiative => initiative.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'training': 'bg-blue-100 text-blue-800',
      'partnership': 'bg-orange-100 text-orange-800',
      'community': 'bg-green-100 text-green-800',
      'research': 'bg-purple-100 text-purple-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'active': 'bg-green-100 text-green-800',
      'completed': 'bg-blue-100 text-blue-800',
      'upcoming': 'bg-orange-100 text-orange-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      'training': <GraduationCap size={20} />,
      'partnership': <Handshake size={20} />,
      'community': <Heart size={20} />,
      'research': <BookOpen size={20} />
    };
    return icons[category] || <Users size={20} />;
  };

  const toggleInitiative = (initiativeId: number) => {
    setExpandedInitiative(expandedInitiative === initiativeId ? null : initiativeId);
  };

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-all duration-300">
                <Users size={32} className="text-blue-600 group-hover:text-white transition-all duration-300" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">4,000+</div>
              <div className="text-gray-600">People Impacted</div>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-600 transition-all duration-300">
                <Handshake size={32} className="text-orange-600 group-hover:text-white transition-all duration-300" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-gray-600">Active Partnerships</div>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600 transition-all duration-300">
                <Target size={32} className="text-green-600 group-hover:text-white transition-all duration-300" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">25+</div>
              <div className="text-gray-600">Community Projects</div>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-600 transition-all duration-300">
                <TrendingUp size={32} className="text-purple-600 group-hover:text-white transition-all duration-300" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">15+</div>
              <div className="text-gray-600">Regions Reached</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                  selectedCategory === category.value
                    ? 'bg-orange-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 shadow-md hover:shadow-lg'
                }`}
              >
                {getCategoryIcon(category.value)}
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Outreach Initiatives */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Initiatives</h2>
            <p className="text-xl text-gray-600">Comprehensive outreach programs creating positive impact</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredInitiatives.map((initiative, index) => (
              <div
                key={initiative.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
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
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getCategoryColor(initiative.category)}`}>
                      {getCategoryIcon(initiative.category)}
                      <span>{categories.find(cat => cat.value === initiative.category)?.label}</span>
                    </span>
                  </div>
                  {initiative.isFeatured && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                        <Star size={14} className="mr-1" />
                        Featured
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(initiative.status)}`}>
                      {initiative.status.charAt(0).toUpperCase() + initiative.status.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Initiative Info */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{initiative.title}</h3>
                  <p className="text-gray-600 mb-6 line-clamp-3">{initiative.description}</p>
                  
                  {/* Quick Info */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-lg font-bold text-orange-600">{initiative.participants}</div>
                      <div className="text-sm text-gray-600">Participants</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-orange-600">{initiative.duration}</div>
                      <div className="text-sm text-gray-600">Duration</div>
                    </div>
                  </div>

                  {/* Target Audience */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Target Audience:</h4>
                    <div className="flex flex-wrap gap-2">
                      {initiative.targetAudience.slice(0, 3).map((audience, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {audience}
                        </span>
                      ))}
                      {initiative.targetAudience.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{initiative.targetAudience.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Expand/Collapse Button */}
                  <button
                    onClick={() => toggleInitiative(initiative.id)}
                    className="w-full flex items-center justify-center text-orange-600 hover:text-blue-900 font-semibold py-3 transition-colors duration-300"
                  >
                    {expandedInitiative === initiative.id ? (
                      <>
                        <span>Show Less</span>
                        <ChevronUp size={20} className="ml-2" />
                      </>
                    ) : (
                      <>
                        <span>View Details</span>
                        <ChevronDown size={20} className="ml-2" />
                      </>
                    )}
                  </button>

                  {/* Expanded Content */}
                  {expandedInitiative === initiative.id && (
                    <div className="mt-6 space-y-6 border-t pt-6">
                      {/* Outcomes */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <CheckCircle size={18} className="mr-2 text-orange-600" />
                          Key Outcomes
                        </h4>
                        <div className="space-y-2">
                          {initiative.outcomes.map((outcome, idx) => (
                            <div key={idx} className="flex items-start">
                              <ArrowRight size={16} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{outcome}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Partners */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Partners</h4>
                        <div className="space-y-2">
                          {initiative.partners.map((partner, idx) => (
                            <div key={idx} className="flex items-center">
                              <Handshake size={16} className="text-orange-600 mr-2 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{partner}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Impact */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Impact Areas</h4>
                        <div className="flex flex-wrap gap-2">
                          {initiative.impact.map((impact, idx) => (
                            <span key={idx} className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
                              {impact}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Partners */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Partners</h2>
            <p className="text-xl text-gray-600">Strategic partnerships driving innovation and impact</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partners.map((partner, index) => (
              <div
                key={partner.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6 text-center"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{partner.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{partner.description}</p>
                <div className="text-xs text-gray-500 mb-4">Partner since {partner.since}</div>
                <div className="space-y-1">
                  {partner.collaboration.slice(0, 2).map((collab, idx) => (
                    <div key={idx} className="text-xs text-blue-600">
                      • {collab}
                    </div>
                  ))}
                  {partner.collaboration.length > 2 && (
                    <div className="text-xs text-gray-500">
                      +{partner.collaboration.length - 2} more
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
            <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
              Become a Partner
              <Handshake size={20} className="ml-2" />
            </button>
            <Link 
              to="/contact" 
              className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              Contact Us
              <ExternalLink size={20} className="ml-2" />
            </Link>
          </div>
          <div className="mt-8 text-blue-200">
            <p>Email: partnerships@tanzaniatech.edu | Phone: +255 123 456 789</p>
          </div>
        </div>
      </section>

      {/* Additional CSS for animations */}
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
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style> */}
    </div>
  );
};

export default Collaboration;