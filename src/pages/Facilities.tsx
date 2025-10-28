import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Clock, Award, Globe, ChevronDown, ChevronUp, CheckCircle, Star, ExternalLink, Cpu, Shield, Database, Zap, Monitor, Wifi, Camera, Printer } from 'lucide-react';
import { useFacilities } from '../hooks/useFacilities';

interface LocalFacility {
  id: number;
  name: string;
  description: string;
  type: 'computer_lab' | 'research_lab' | 'specialized' | 'general';
  capacity: number;
  equipment: string[];
  features: string[];
  image: string;
  location: string;
  availability: string;
  isPopular: boolean;
  staff: string[];
  projects: string[];
}

const Facilities: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('All');
  const [expandedFacility, setExpandedFacility] = useState<number | null>(null);

  // Fetch data from backend
  const { data: facilitiesFromAPI = [], isLoading: facilitiesLoading } = useFacilities();

  // Static data as fallback (defined before useMemo)
  const staticFacilitiesData: LocalFacility[] = [
    {
      id: 1,
      name: "AI & Machine Learning Laboratory",
      description: "State-of-the-art laboratory equipped with high-performance computing resources for artificial intelligence and machine learning research and development.",
      type: "research_lab",
      capacity: 30,
      equipment: [
        "NVIDIA RTX 4090 GPUs",
        "High-performance workstations",
        "Machine Learning servers",
        "Large display monitors",
        "High-speed internet (1Gbps)",
        "3D printers for prototyping"
      ],
      features: [
        "24/7 access for research",
        "Dedicated AI software suites",
        "Cloud computing access",
        "Collaborative workspace",
        "Presentation equipment",
        "Secure data storage"
      ],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      location: "CSM Building, Floor 3, Room 301",
      availability: "Monday-Friday: 8AM-10PM, Weekend: 9AM-6PM",
      isPopular: true,
      staff: ["Dr. Maria Santos", "Dr. Robert Kimani"],
      projects: ["Smart Campus Navigation", "AI-Powered Diagnostics", "Natural Language Processing"]
    },
    {
      id: 2,
      name: "Cybersecurity Research Lab",
      description: "Isolated network environment designed for cybersecurity research, penetration testing, and digital forensics investigations.",
      type: "research_lab",
      capacity: 20,
      equipment: [
        "Isolated network infrastructure",
        "Forensics workstations",
        "Penetration testing tools",
        "Security testing servers",
        "Network monitoring equipment",
        "Mobile device testing stations"
      ],
      features: [
        "Air-gapped network",
        "Advanced security tools",
        "Forensics software suites",
        "Malware analysis environment",
        "Secure communication systems",
        "Incident response tools"
      ],
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      location: "CSM Building, Floor 2, Room 205",
      availability: "Monday-Friday: 8AM-8PM, Weekend: 10AM-4PM",
      isPopular: true,
      staff: ["Prof. David Kiprop", "Dr. Lisa Wang"],
      projects: ["Banking Security Framework", "IoT Security Solutions", "Mobile Security Applications"]
    },
    {
      id: 3,
      name: "Computer Programming Lab A",
      description: "Modern computer laboratory equipped with the latest hardware and software for programming, software development, and computer science education.",
      type: "computer_lab",
      capacity: 40,
      equipment: [
        "Dell OptiPlex workstations",
        "Intel i7 processors",
        "16GB RAM per workstation",
        "SSD storage",
        "24-inch monitors",
        "High-speed internet"
      ],
      features: [
        "Multiple programming environments",
        "Development tools and IDEs",
        "Version control systems",
        "Database management tools",
        "Web development platforms",
        "Mobile development kits"
      ],
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      location: "CSM Building, Floor 1, Room 101",
      availability: "Monday-Friday: 7AM-10PM, Weekend: 8AM-8PM",
      isPopular: false,
      staff: ["Dr. Robert Kimani", "Technical Support Team"],
      projects: ["Student Programming Projects", "Software Development Courses", "Capstone Projects"]
    },
    {
      id: 4,
      name: "Data Science & Analytics Center",
      description: "Comprehensive facility for big data analysis, statistical modeling, and business intelligence research with advanced computing resources.",
      type: "research_lab",
      capacity: 25,
      equipment: [
        "High-performance servers",
        "Big data processing clusters",
        "Statistical analysis software",
        "Visualization workstations",
        "Large format displays",
        "Data storage systems"
      ],
      features: [
        "R and Python environments",
        "Statistical analysis tools",
        "Data visualization software",
        "Cloud computing access",
        "Collaborative analysis tools",
        "Secure data handling"
      ],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      location: "CSM Building, Floor 2, Room 210",
      availability: "Monday-Friday: 8AM-9PM, Weekend: 9AM-5PM",
      isPopular: false,
      staff: ["Dr. Anna Wanjiku", "Data Science Team"],
      projects: ["Climate Change Analytics", "Healthcare Data Insights", "Financial Risk Modeling"]
    },
    {
      id: 5,
      name: "IoT & Embedded Systems Lab",
      description: "Specialized laboratory for Internet of Things development, embedded systems programming, and hardware prototyping.",
      type: "specialized",
      capacity: 15,
      equipment: [
        "Arduino development kits",
        "Raspberry Pi clusters",
        "Sensor networks",
        "3D printers",
        "Oscilloscopes and multimeters",
        "Microcontroller boards"
      ],
      features: [
        "Hardware prototyping tools",
        "Sensor integration platforms",
        "Wireless communication modules",
        "Development boards",
        "Testing and measurement equipment",
        "Prototyping materials"
      ],
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      location: "CSM Building, Floor 1, Room 115",
      availability: "Monday-Friday: 9AM-7PM, Weekend: 10AM-4PM",
      isPopular: false,
      staff: ["Dr. Lisa Wang", "Embedded Systems Team"],
      projects: ["Smart Campus Infrastructure", "Agricultural IoT Systems", "Environmental Monitoring"]
    },
    {
      id: 6,
      name: "General Purpose Computer Lab B",
      description: "Multi-purpose computer laboratory for general computing courses, internet research, and student projects.",
      type: "computer_lab",
      capacity: 35,
      equipment: [
        "Standard desktop computers",
        "Basic software suites",
        "Internet connectivity",
        "Printers and scanners",
        "Projector systems",
        "Audio-visual equipment"
      ],
      features: [
        "Office productivity software",
        "Internet access",
        "Printing and scanning",
        "Presentation capabilities",
        "Group work areas",
        "Technical support"
      ],
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      location: "CSM Building, Floor 1, Room 105",
      availability: "Monday-Friday: 7AM-10PM, Weekend: 8AM-8PM",
      isPopular: false,
      staff: ["Technical Support Team"],
      projects: ["General Computing Courses", "Student Research", "Internet-based Projects"]
    }
  ];

  // Map API data to local format with useMemo
  const facilities: LocalFacility[] = useMemo(() => {
    if (facilitiesFromAPI.length === 0) {
      // Return static data as fallback
      return staticFacilitiesData;
    }
    
    // Map API data to local format
    return facilitiesFromAPI.map(fac => ({
      id: fac.id,
      name: fac.name,
      description: fac.description,
      type: 'general' as const,
      capacity: parseInt(fac.capacity) || 0,
      equipment: fac.equipment_list ? fac.equipment_list.split(',').map(e => e.trim()) : [],
      features: [],
      image: fac.image,
      location: fac.location || '',
      availability: '',
      isPopular: false,
      staff: [],
      projects: []
    }));
  }, [facilitiesFromAPI]);

  const facilityTypes = [
    { value: 'All', label: 'All Facilities' },
    { value: 'computer_lab', label: 'Computer Labs' },
    { value: 'research_lab', label: 'Research Labs' },
    { value: 'specialized', label: 'Specialized Labs' },
    { value: 'general', label: 'General Facilities' }
  ];

  const filteredFacilities = (facilities || []).filter(facility => 
    selectedType === 'All' || facility.type === selectedType
  );

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'computer_lab': 'bg-blue-100 text-blue-800',
      'research_lab': 'bg-orange-100 text-orange-800',
      'specialized': 'bg-green-100 text-green-800',
      'general': 'bg-gray-100 text-gray-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getTypeIcon = (type: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      'computer_lab': <Monitor size={20} />,
      'research_lab': <Zap size={20} />,
      'specialized': <Cpu size={20} />,
      'general': <Users size={20} />
    };
    return icons[type] || <Users size={20} />;
  };

  const toggleFacility = (facilityId: number) => {
    setExpandedFacility(expandedFacility === facilityId ? null : facilityId);
  };

  // Loading state
  if (facilitiesLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading facilities...</p>
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Facilities</h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Explore our state-of-the-art laboratories and facilities that support cutting-edge research, education, and innovation in computer science and mathematics.
            </p>
          </div>
        </div>
      </section>

      {/* Facilities Overview Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Facility Overview</h2>
            <p className="text-xl text-gray-600">World-class infrastructure supporting excellence in education and research</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-all duration-300">
                <Monitor size={32} className="text-blue-600 group-hover:text-white transition-all duration-300" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">6</div>
              <div className="text-gray-600">Computer Labs</div>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-600 transition-all duration-300">
                <Zap size={32} className="text-orange-600 group-hover:text-white transition-all duration-300" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">4</div>
              <div className="text-gray-600">Research Labs</div>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600 transition-all duration-300">
                <Users size={32} className="text-green-600 group-hover:text-white transition-all duration-300" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">165</div>
              <div className="text-gray-600">Total Capacity</div>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-600 transition-all duration-300">
                <Clock size={32} className="text-purple-600 group-hover:text-white transition-all duration-300" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-gray-600">Access Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Facility Type Filter */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {facilityTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setSelectedType(type.value)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                  selectedType === type.value
                    ? 'bg-orange-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 shadow-md hover:shadow-lg'
                }`}
              >
                {getTypeIcon(type.value)}
                <span>{type.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredFacilities.map((facility, index) => (
              <div
                key={facility.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                {/* Facility Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={facility.image}
                    alt={facility.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getTypeColor(facility.type)}`}>
                      {getTypeIcon(facility.type)}
                      <span>{facilityTypes.find(t => t.value === facility.type)?.label}</span>
                    </span>
                  </div>
                  {facility.isPopular && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                        <Star size={14} className="mr-1" />
                        Popular
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                      Capacity: {facility.capacity} students
                    </span>
                  </div>
                </div>

                {/* Facility Info */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{facility.name}</h3>
                  <p className="text-gray-600 mb-6 line-clamp-3">{facility.description}</p>
                  
                  {/* Quick Info */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-lg font-bold text-orange-600">{facility.capacity}</div>
                      <div className="text-sm text-gray-600">Capacity</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-orange-600">{facility.equipment.length}</div>
                      <div className="text-sm text-gray-600">Equipment Types</div>
                    </div>
                  </div>

                  {/* Location & Availability */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Globe size={16} className="mr-2 text-orange-600" />
                      <span>{facility.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock size={16} className="mr-2 text-orange-600" />
                      <span>{facility.availability}</span>
                    </div>
                  </div>

                  {/* Expand/Collapse Button */}
                  <button
                    onClick={() => toggleFacility(facility.id)}
                    className="w-full flex items-center justify-center text-orange-600 hover:text-blue-900 font-semibold py-3 transition-colors duration-300"
                  >
                    {expandedFacility === facility.id ? (
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
                  {expandedFacility === facility.id && (
                    <div className="mt-6 space-y-6 border-t pt-6">
                      {/* Equipment */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <Cpu size={18} className="mr-2 text-orange-600" />
                          Equipment & Tools
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {facility.equipment.map((item, idx) => (
                            <div key={idx} className="flex items-start">
                              <CheckCircle size={16} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Features */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <Star size={18} className="mr-2 text-orange-600" />
                          Key Features
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {facility.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start">
                              <ArrowRight size={16} className="text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Staff */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Support Staff</h4>
                        <div className="space-y-2">
                          {facility.staff.map((member, idx) => (
                            <div key={idx} className="flex items-center">
                              <Users size={16} className="text-orange-600 mr-2 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{member}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Active Projects */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Active Projects</h4>
                        <div className="flex flex-wrap gap-2">
                          {facility.projects.map((project, idx) => (
                            <span key={idx} className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
                              {project}
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

      {/* Facility Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Our Facilities Matter</h2>
            <p className="text-xl text-gray-600">Excellence in infrastructure supports excellence in education</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-all duration-300">
                <Cpu size={32} className="text-blue-600 group-hover:text-white transition-all duration-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Modern Equipment</h3>
              <p className="text-gray-600">Latest technology and tools for hands-on learning and research</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-600 transition-all duration-300">
                <Users size={32} className="text-orange-600 group-hover:text-white transition-all duration-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Support</h3>
              <p className="text-gray-600">Dedicated technical staff and faculty guidance</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600 transition-all duration-300">
                <Clock size={32} className="text-green-600 group-hover:text-white transition-all duration-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Extended Hours</h3>
              <p className="text-gray-600">Flexible access for research and project work</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-600 transition-all duration-300">
                <Shield size={32} className="text-purple-600 group-hover:text-white transition-all duration-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Industry Standard</h3>
              <p className="text-gray-600">Professional-grade tools used in industry</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Experience Our Facilities</h2>
          <p className="text-xl text-gray-600 mb-8">
            Schedule a visit to see our world-class facilities and learn how they can support your educational and research goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
              Schedule a Visit
            </button>
            <Link 
              to="/contact" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 inline-block transform hover:scale-105"
            >
              Contact Us
            </Link>
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

export default Facilities;