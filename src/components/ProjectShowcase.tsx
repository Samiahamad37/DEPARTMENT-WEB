import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ExternalLink,
  Github,
  Eye,
  Tag,
  Users,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Project {
  id: number;
  name: string;
  description: string;
  detailedDescription?: string;
  image: string;
  category: string;
  tags: string[];
  contributors: string;
  objectives?: string;
  outcomes?: string;
  technologiesUsed?: string;
  projectLink?: string;
  githubLink?: string;
  isFeatured: boolean;
  created_at: string;
}

const ProjectShowcase: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  // const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Static project data - will be replaced with API data later
  const staticProjects: Project[] = [
    {
      id: 1,
      name: "Smart Campus IoT System",
      description:
        "An intelligent IoT-based system for monitoring campus facilities and optimizing resource usage.",
      detailedDescription:
        "This comprehensive IoT solution integrates sensors across the campus to monitor energy consumption, air quality, and facility usage patterns. The system provides real-time analytics and automated responses to optimize campus operations.",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
      category: "iot",
      tags: ["IoT", "Smart Campus", "Energy Monitoring", "Analytics"],
      contributors: "John Mwalimu, Sarah Kimani, Ahmed Hassan",
      objectives:
        "Optimize campus resource usage and provide real-time monitoring capabilities",
      outcomes:
        "Reduced energy consumption by 25% and improved facility management efficiency",
      technologiesUsed:
        "Arduino, Raspberry Pi, Python, Node.js, MongoDB, React",
      projectLink: "https://example.com/smart-campus",
      githubLink: "https://github.com/csm-aru/smart-campus-iot",
      isFeatured: true,
      created_at: "2024-01-15",
    },
    {
      id: 2,
      name: "AI-Powered Learning Assistant",
      description:
        "An intelligent tutoring system that adapts to individual learning styles and provides personalized assistance.",
      detailedDescription:
        "This AI-powered system uses machine learning algorithms to analyze student learning patterns and provide customized educational content and feedback. It supports multiple subjects and adapts in real-time to student performance.",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      category: "ai",
      tags: ["AI", "Machine Learning", "Education", "Personalization"],
      contributors: "Dr. Maria Santos, James Otieno, Fatima Al-Zahra",
      objectives:
        "Enhance learning outcomes through personalized AI assistance",
      outcomes: "Improved student performance by 30% and increased engagement",
      technologiesUsed: "Python, TensorFlow, React, PostgreSQL, Docker",
      projectLink: "https://example.com/ai-tutor",
      githubLink: "https://github.com/csm-aru/ai-learning-assistant",
      isFeatured: true,
      created_at: "2024-02-20",
    },
    {
      id: 3,
      name: "Blockchain-Based Certificate Verification",
      description:
        "A secure and tamper-proof system for verifying academic certificates using blockchain technology.",
      detailedDescription:
        "This system creates immutable records of academic achievements on the blockchain, ensuring authenticity and preventing fraud. It provides instant verification capabilities for employers and institutions.",
      image:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2036&q=80",
      category: "blockchain",
      tags: ["Blockchain", "Security", "Verification", "Academic Records"],
      contributors: "Prof. David Kiprop, Grace Mwangi, Omar Salim",
      objectives: "Create a secure and verifiable academic credential system",
      outcomes:
        "Eliminated certificate fraud and streamlined verification process",
      technologiesUsed: "Ethereum, Solidity, Web3.js, React, Node.js",
      projectLink: "https://example.com/cert-verify",
      githubLink: "https://github.com/csm-aru/blockchain-certificates",
      isFeatured: false,
      created_at: "2024-03-10",
    },
    {
      id: 4,
      name: "Mobile Health Monitoring App",
      description:
        "A comprehensive mobile application for remote health monitoring and telemedicine services.",
      detailedDescription:
        "This mobile app enables patients to monitor vital signs, schedule telemedicine appointments, and receive health alerts. It integrates with wearable devices and provides real-time health insights to healthcare providers.",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      category: "mobile",
      tags: ["Mobile App", "Health Tech", "Telemedicine", "IoT"],
      contributors: "Dr. Anna Wanjiku, Michael Chen, Aisha Mohamed",
      objectives: "Improve healthcare access through mobile technology",
      outcomes: "Increased healthcare accessibility by 40% in rural areas",
      technologiesUsed: "React Native, Node.js, MongoDB, AWS, WebRTC",
      projectLink: "https://example.com/health-app",
      githubLink: "https://github.com/csm-aru/health-monitoring-app",
      isFeatured: true,
      created_at: "2024-04-05",
    },
    {
      id: 5,
      name: "Cybersecurity Threat Detection System",
      description:
        "An advanced system for detecting and preventing cybersecurity threats in real-time.",
      detailedDescription:
        "This system uses machine learning and behavioral analysis to detect anomalous network activities and potential security threats. It provides automated responses and detailed threat intelligence reports.",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      category: "cybersecurity",
      tags: [
        "Cybersecurity",
        "Threat Detection",
        "Machine Learning",
        "Network Security",
      ],
      contributors: "Prof. Robert Kimani, Lisa Wang, Hassan Ali",
      objectives:
        "Enhance network security through intelligent threat detection",
      outcomes: "Reduced security incidents by 60% and improved response time",
      technologiesUsed: "Python, Scikit-learn, Elasticsearch, Kafka, Docker",
      projectLink: "https://example.com/cyber-detection",
      githubLink: "https://github.com/csm-aru/cyber-threat-detection",
      isFeatured: false,
      created_at: "2024-05-12",
    },
  ];

  const categories = [
    { value: "All", label: "All Projects" },
    { value: "ai", label: "Artificial Intelligence" },
    { value: "iot", label: "Internet of Things" },
    { value: "mobile", label: "Mobile Development" },
    { value: "cybersecurity", label: "Cybersecurity" },
    { value: "blockchain", label: "Blockchain" },
    { value: "web", label: "Web Development" },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProjects(staticProjects);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const displayedProjects = filteredProjects.slice(
    currentIndex,
    currentIndex + 3
  );

  const nextProjects = () => {
    if (currentIndex + 3 < filteredProjects.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevProjects = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      ai: "bg-purple-100 text-purple-800",
      iot: "bg-blue-100 text-blue-800",
      mobile: "bg-green-100 text-green-800",
      cybersecurity: "bg-red-100 text-red-800",
      blockchain: "bg-yellow-100 text-yellow-800",
      web: "bg-indigo-100 text-indigo-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading projects...</p>
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
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Project Showcase
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover innovative projects developed by our students and faculty,
            showcasing cutting-edge technology and creative solutions.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => {
                setSelectedCategory(category.value);
                setCurrentIndex(0); // Reset to first page when category changes
              }}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.value
                  ? "bg-orange-600 text-white shadow-lg transform scale-105"
                  : "bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 shadow-md hover:shadow-lg"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="relative">
          {/* Navigation Arrows */}
          {filteredProjects.length > 3 && (
            <>
              <button
                onClick={prevProjects}
                disabled={currentIndex === 0}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white hover:bg-gray-50 text-gray-700 p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextProjects}
                disabled={currentIndex + 3 >= filteredProjects.length}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white hover:bg-gray-50 text-gray-700 p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-12">
            {displayedProjects.map((project, index) => (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                }}
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                        project.category
                      )}`}
                    >
                      {
                        categories.find((cat) => cat.value === project.category)
                          ?.label
                      }
                    </span>
                  </div>
                  {project.isFeatured && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-orange-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                    {project.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        <Tag size={12} className="mr-1" />
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{project.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Project Meta */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-500">
                      <Users size={16} className="mr-2" />
                      <span className="truncate">{project.contributors}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar size={16} className="mr-2" />
                      <span>{formatDate(project.created_at)}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Link
                      to={`/projects/${project.id}`}
                      className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-lg transition-colors duration-300"
                    >
                      <Eye size={16} className="mr-2" />
                      View Details
                    </Link>
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors duration-300"
                      >
                        <Github size={16} />
                      </a>
                    )}
                    {project.projectLink && (
                      <a
                        href={project.projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm font-medium rounded-lg transition-colors duration-300"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-12">
          <Link
            to="/projects"
            className="inline-flex items-center px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            View All Projects
            <ExternalLink size={20} className="ml-2" />
          </Link>
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
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style> */}
    </section>
  );
};

export default ProjectShowcase;
