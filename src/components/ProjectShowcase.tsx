import React, { useState, useRef } from "react";
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
import { useFeaturedProjects } from '../hooks/useProjects';
import { Project } from '../types/api';

const ProjectShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Fetch featured projects from API
  const { data: projects = [], isLoading, error } = useFeaturedProjects();

  // Fallback static data if API fails
  const fallbackProjects: Project[] = [
    {
      id: 1,
      name: "Smart Campus IoT System",
      description: "An intelligent IoT-based system for monitoring campus facilities and optimizing resource usage.",
      detailed_description: "This comprehensive IoT solution integrates sensors across the campus to monitor energy consumption, air quality, and facility usage patterns.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
      category: "iot",
      tags: "IoT, Sensors, Campus, Automation",
      tag_list: ["IoT", "Sensors", "Campus", "Automation"],
      contributors: "John Doe, Jane Smith, Mike Johnson",
      objectives: "Optimize campus resource usage and improve efficiency",
      outcomes: "30% reduction in energy consumption, improved facility management",
      technologies_used: "Arduino, Raspberry Pi, Python, MQTT, Node.js",
      project_link: "https://example.com/smart-campus",
      github_link: "https://github.com/example/smart-campus",
      is_featured: true,
      is_active: true,
      created_at: "2024-01-15T10:30:00Z",
      display_order: 1
    },
    {
      id: 2,
      name: "AI-Powered Student Performance Analytics",
      description: "Machine learning system for analyzing student performance and providing personalized recommendations.",
      detailed_description: "This AI system analyzes student data to identify learning patterns and provide personalized study recommendations.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      category: "ai",
      tags: "AI, Machine Learning, Analytics, Education",
      tag_list: ["AI", "Machine Learning", "Analytics", "Education"],
      contributors: "Dr. Sarah Mwangi, Alex Kim, Maria Garcia",
      objectives: "Improve student learning outcomes through data-driven insights",
      outcomes: "25% improvement in student performance, personalized learning paths",
      technologies_used: "Python, TensorFlow, Pandas, Scikit-learn, Flask",
      project_link: "https://example.com/student-analytics",
      github_link: "https://github.com/example/student-analytics",
      is_featured: true,
      is_active: true,
      created_at: "2024-01-12T14:15:00Z",
      display_order: 2
    },
    {
      id: 3,
      name: "Blockchain-Based Academic Credentials",
      description: "Secure blockchain system for issuing and verifying academic certificates and credentials.",
      detailed_description: "A decentralized system that ensures the authenticity and integrity of academic credentials using blockchain technology.",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
      category: "web",
      tags: "Blockchain, Security, Credentials, Web3",
      tag_list: ["Blockchain", "Security", "Credentials", "Web3"],
      contributors: "David Kiprop, Lisa Wang, Tom Brown",
      objectives: "Create tamper-proof academic credential system",
      outcomes: "100% credential authenticity, reduced fraud cases",
      technologies_used: "Solidity, Web3.js, React, Node.js, IPFS",
      project_link: "https://example.com/blockchain-credentials",
      github_link: "https://github.com/example/blockchain-credentials",
      is_featured: true,
      is_active: true,
      created_at: "2024-01-10T09:00:00Z",
      display_order: 3
    }
  ];

  // Use API data or fallback to static data
  const projectData = projects.length > 0 ? projects : fallbackProjects;

  const categories = [
    "All",
    "ai",
    "iot",
    "embedded",
    "web",
    "mobile",
    "data_science",
    "cybersecurity",
    "networking",
    "other",
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? projectData
      : projectData.filter((project) => project.category === selectedCategory);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-lg text-gray-600 mb-8">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error('Error loading projects:', error);
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Explore innovative projects developed by our students and faculty
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-orange-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-orange-100"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1).replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-700 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-700 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronRight size={24} />
          </button>

          {/* Project Cards */}
          <div
            ref={scrollContainerRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="flex-shrink-0 w-80 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {project.category.charAt(0).toUpperCase() + project.category.slice(1).replace("_", " ")}
                    </span>
                  </div>
                  {project.is_featured && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {project.name}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar size={16} className="mr-1" />
                    {formatDate(project.created_at)}
                  </div>

                  {project.tag_list && project.tag_list.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tag_list.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                        >
                          <Tag size={12} className="inline mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Users size={16} className="mr-1" />
                      {project.contributors?.split(",").length || 0} contributors
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Link
                      to={`/projects/${project.id}`}
                      className="flex items-center text-orange-600 hover:text-orange-700 font-medium transition-colors duration-300"
                    >
                      <Eye size={16} className="mr-1" />
                      View Details
                    </Link>
                    <div className="flex space-x-2">
                      {project.github_link && (
                        <a
                          href={project.github_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
                        >
                          <Github size={16} />
                        </a>
                      )}
                      {project.project_link && (
                        <a
                          href={project.project_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/projects-page"
            className="inline-flex items-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            View All Projects
            <ExternalLink size={20} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;