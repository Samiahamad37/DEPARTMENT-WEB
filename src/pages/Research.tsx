import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Clock, Award, Globe, ChevronDown, ChevronUp, CheckCircle, Star, ExternalLink, Microscope, Zap, Target, TrendingUp, GraduationCap } from 'lucide-react';

interface ResearchArea {
  id: number;
  title: string;
  description: string;
  focus: string[];
  faculty: string[];
  projects: string[];
  publications: number;
  funding: string;
  image: string;
  isActive: boolean;
}

interface ResearchProject {
  id: number;
  title: string;
  description: string;
  area: string;
  leadResearcher: string;
  status: 'active' | 'completed' | 'upcoming';
  startDate: string;
  endDate?: string;
  funding: string;
  collaborators: string[];
  outcomes: string[];
  image: string;
}

const Research: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState<string>('All');
  const [expandedArea, setExpandedArea] = useState<number | null>(null);

  // Static research areas data - will be replaced with API data later
  const researchAreas: ResearchArea[] = [
    {
      id: 1,
      title: "Artificial Intelligence & Machine Learning",
      description: "Advancing AI research with focus on machine learning, natural language processing, and computer vision applications for solving real-world problems in healthcare, education, and industry.",
      focus: [
        "Machine Learning Algorithms",
        "Deep Learning Networks",
        "Natural Language Processing",
        "Computer Vision",
        "Reinforcement Learning",
        "AI Ethics and Fairness"
      ],
      faculty: [
        "Dr. Maria Santos (Lead)",
        "Prof. David Kiprop",
        "Dr. Anna Wanjiku",
        "Dr. Robert Kimani"
      ],
      projects: [
        "AI-Powered Diagnostic Systems",
        "Intelligent Tutoring Systems",
        "Computer Vision for Agriculture",
        "NLP for Swahili Language Processing"
      ],
      publications: 28,
      funding: "TZS 500M+",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      isActive: true
    },
    {
      id: 2,
      title: "Cybersecurity & Network Security",
      description: "Protecting digital infrastructure and developing secure systems for Tanzania and Africa. Research focuses on threat detection, secure communication, and digital forensics.",
      focus: [
        "Network Security",
        "Cryptography",
        "Digital Forensics",
        "Threat Detection",
        "Security Protocols",
        "Privacy Protection"
      ],
      faculty: [
        "Prof. David Kiprop (Lead)",
        "Dr. Maria Santos",
        "Dr. Lisa Wang"
      ],
      projects: [
        "National Cybersecurity Framework",
        "Blockchain Security Protocols",
        "IoT Security Solutions",
        "Mobile Security Applications"
      ],
      publications: 22,
      funding: "TZS 300M+",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      isActive: true
    },
    {
      id: 3,
      title: "Data Science & Analytics",
      description: "Leveraging big data to solve complex problems in business, government, and society. Focus on predictive modeling, statistical analysis, and data visualization.",
      focus: [
        "Big Data Analytics",
        "Predictive Modeling",
        "Statistical Analysis",
        "Data Visualization",
        "Business Intelligence",
        "Data Mining"
      ],
      faculty: [
        "Dr. Anna Wanjiku (Lead)",
        "Prof. David Kiprop",
        "Dr. Maria Santos"
      ],
      projects: [
        "Smart City Analytics",
        "Healthcare Data Insights",
        "Financial Risk Modeling",
        "Climate Data Analysis"
      ],
      publications: 18,
      funding: "TZS 250M+",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      isActive: true
    },
    {
      id: 4,
      title: "Internet of Things & Embedded Systems",
      description: "Developing intelligent embedded systems for IoT applications, robotics, and smart infrastructure. Research covers sensor networks, embedded computing, and system integration.",
      focus: [
        "IoT Development",
        "Embedded Systems",
        "Sensor Networks",
        "Smart Systems",
        "Robotics",
        "System Integration"
      ],
      faculty: [
        "Dr. Lisa Wang (Lead)",
        "Dr. Robert Kimani",
        "Dr. Anna Wanjiku"
      ],
      projects: [
        "Smart Campus Infrastructure",
        "Agricultural IoT Systems",
        "Environmental Monitoring",
        "Industrial Automation"
      ],
      publications: 15,
      funding: "TZS 200M+",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      isActive: true
    }
  ];

  const researchProjects: ResearchProject[] = [
    {
      id: 1,
      title: "AI-Powered Smart Campus Navigation System",
      description: "Developing an intelligent navigation system for Ardhi University campus using AI and computer vision to help students and visitors navigate efficiently.",
      area: "Artificial Intelligence",
      leadResearcher: "Dr. Maria Santos",
      status: "active",
      startDate: "2023-01-15",
      endDate: "2024-12-31",
      funding: "TZS 150M",
      collaborators: ["Microsoft Research", "Google AI", "University of Dar es Salaam"],
      outcomes: ["3 Conference Papers", "1 Patent Application", "Pilot Deployment"],
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 2,
      title: "Cybersecurity Framework for Tanzanian Banks",
      description: "Developing a comprehensive cybersecurity framework specifically designed for the Tanzanian banking sector to protect against cyber threats.",
      area: "Cybersecurity",
      leadResearcher: "Prof. David Kiprop",
      status: "active",
      startDate: "2023-06-01",
      endDate: "2025-05-31",
      funding: "TZS 200M",
      collaborators: ["Bank of Tanzania", "CRDB Bank", "NMB Bank"],
      outcomes: ["Framework Implementation", "Training Program", "Policy Recommendations"],
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 3,
      title: "Predictive Analytics for Climate Change Impact",
      description: "Using machine learning and data science to predict the impact of climate change on Tanzanian agriculture and recommend adaptation strategies.",
      area: "Data Science",
      leadResearcher: "Dr. Anna Wanjiku",
      status: "completed",
      startDate: "2022-03-01",
      endDate: "2023-12-31",
      funding: "TZS 120M",
      collaborators: ["Tanzania Meteorological Agency", "Ministry of Agriculture"],
      outcomes: ["Published Model", "Policy Brief", "Implementation Guide"],
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  const areaCategories = [
    { value: 'All', label: 'All Areas' },
    { value: 'Artificial Intelligence', label: 'AI & ML' },
    { value: 'Cybersecurity', label: 'Cybersecurity' },
    { value: 'Data Science', label: 'Data Science' },
    { value: 'IoT', label: 'IoT & Embedded' }
  ];

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'active': 'bg-green-100 text-green-800',
      'completed': 'bg-blue-100 text-blue-800',
      'upcoming': 'bg-orange-100 text-orange-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const toggleArea = (areaId: number) => {
    setExpandedArea(expandedArea === areaId ? null : areaId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Research & Innovation</h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Discover our cutting-edge research initiatives and innovative projects that are shaping the future of technology in Tanzania and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Research Impact Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Research Impact</h2>
            <p className="text-xl text-gray-600">Our contributions to the global research community</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-all duration-300">
                <BookOpen size={32} className="text-blue-600 group-hover:text-white transition-all duration-300" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-gray-600">Research Papers Published</div>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-600 transition-all duration-300">
                <Award size={32} className="text-orange-600 group-hover:text-white transition-all duration-300" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">15+</div>
              <div className="text-gray-600">Research Grants</div>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600 transition-all duration-300">
                <Users size={32} className="text-green-600 group-hover:text-white transition-all duration-300" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">25+</div>
              <div className="text-gray-600">Graduate Students</div>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-600 transition-all duration-300">
                <Globe size={32} className="text-purple-600 group-hover:text-white transition-all duration-300" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">10+</div>
              <div className="text-gray-600">International Collaborations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Research Areas</h2>
            <p className="text-xl text-gray-600">Explore our diverse research themes and specializations</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {researchAreas.map((area, index) => (
              <div
                key={area.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                {/* Research Area Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={area.image}
                    alt={area.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                      {area.publications} Publications
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {area.funding}
                    </span>
                  </div>
                </div>

                {/* Research Area Info */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{area.title}</h3>
                  <p className="text-gray-600 mb-6 line-clamp-3">{area.description}</p>
                  
                  {/* Faculty */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Research Team:</h4>
                    <div className="flex flex-wrap gap-2">
                      {area.faculty.slice(0, 2).map((member, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {member}
                        </span>
                      ))}
                      {area.faculty.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{area.faculty.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Expand/Collapse Button */}
                  <button
                    onClick={() => toggleArea(area.id)}
                    className="w-full flex items-center justify-center text-orange-600 hover:text-blue-900 font-semibold py-3 transition-colors duration-300"
                  >
                    {expandedArea === area.id ? (
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
                  {expandedArea === area.id && (
                    <div className="mt-6 space-y-6 border-t pt-6">
                      {/* Research Focus */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <Target size={18} className="mr-2 text-orange-600" />
                          Research Focus
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {area.focus.map((focus, idx) => (
                            <div key={idx} className="flex items-start">
                              <CheckCircle size={16} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{focus}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Active Projects */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Active Projects</h4>
                        <div className="space-y-2">
                          {area.projects.map((project, idx) => (
                            <div key={idx} className="flex items-start">
                              <ArrowRight size={16} className="text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{project}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Research Team */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Research Team</h4>
                        <div className="space-y-2">
                          {area.faculty.map((member, idx) => (
                            <div key={idx} className="flex items-center">
                              <Users size={16} className="text-orange-600 mr-2 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{member}</span>
                            </div>
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

      {/* Featured Research Projects */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Research Projects</h2>
            <p className="text-xl text-gray-600">Current and recent research initiatives making an impact</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {researchProjects.map((project, index) => (
              <div
                key={project.id}
                className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {project.funding}
                    </span>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Microscope size={16} className="mr-2 text-orange-600" />
                      <span>{project.area}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users size={16} className="mr-2 text-orange-600" />
                      <span>{project.leadResearcher}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock size={16} className="mr-2 text-orange-600" />
                      <span>{new Date(project.startDate).toLocaleDateString()} - {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'Ongoing'}</span>
                    </div>
                  </div>

                  {/* Collaborators */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Collaborators:</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.collaborators.slice(0, 2).map((collaborator, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {collaborator}
                        </span>
                      ))}
                      {project.collaborators.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{project.collaborators.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Outcomes */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Outcomes:</h4>
                    <ul className="space-y-1">
                      {project.outcomes.map((outcome, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle size={14} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-gray-700">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded-lg transition-colors duration-300">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Opportunities */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Our Research Community</h2>
              <p className="text-lg text-gray-600 mb-8">
                We welcome researchers, students, and industry partners to collaborate on groundbreaking projects that address real-world challenges.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <GraduationCap size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Graduate Research Opportunities</h3>
                    <p className="text-gray-600">Join our MSc and PhD programs and work on cutting-edge research projects.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Users size={24} className="text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Industry Collaboration</h3>
                    <p className="text-gray-600">Partner with us to solve real-world problems and drive innovation.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Zap size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Research Grants</h3>
                    <p className="text-gray-600">Access funding opportunities for innovative research projects.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get Involved</h3>
              <div className="space-y-4">
                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300">
                  Apply for Graduate Program
                </button>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300">
                  Explore Research Opportunities
                </button>
                <Link 
                  to="/contact" 
                  className="block w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300 text-center"
                >
                  Contact Research Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
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
      `}</style>
    </div>
  );
};

export default Research;