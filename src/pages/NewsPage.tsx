import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Tag, ArrowRight, Eye, ChevronLeft, ChevronRight, Search } from 'lucide-react';

interface NewsItem {
  id: number;
  title: string;
  description: string;
  content?: string;
  image: string;
  category: string;
  author: string;
  date_posted: string;
  is_featured: boolean;
  tags: string[];
  status: string;
}

const NewsPage: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 6;

  // Static news data - will be replaced with API data later
  const staticNews: NewsItem[] = [
    {
      id: 1,
      title: "CSM Department Launches New AI Research Center",
      description: "The department officially opens its state-of-the-art Artificial Intelligence Research Center, equipped with cutting-edge computing resources and research facilities.",
      content: "The new AI Research Center represents a significant milestone in our department's commitment to advancing artificial intelligence research and education. The center features high-performance computing clusters, specialized AI development environments, and collaborative research spaces designed to foster innovation and discovery.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      category: "research",
      author: "Dr. Maria Santos",
      date_posted: "2024-01-15T10:30:00Z",
      is_featured: true,
      tags: ["AI", "Research", "Innovation", "Technology"],
      status: "Latest"
    },
    {
      id: 2,
      title: "Student Team Wins National Programming Competition",
      description: "Our computer science students secured first place in the National Programming Competition, showcasing their exceptional problem-solving and coding skills.",
      content: "The team of three students competed against 50 universities across Tanzania, demonstrating advanced algorithmic thinking and efficient coding techniques. Their victory highlights the quality of education and practical training provided by our department.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
      category: "student_achievement",
      author: "Prof. David Kiprop",
      date_posted: "2024-01-12T14:15:00Z",
      is_featured: true,
      tags: ["Programming", "Competition", "Students", "Achievement"],
      status: "Latest"
    },
    {
      id: 3,
      title: "New Partnership with Tech Industry Leaders",
      description: "The department announces strategic partnerships with leading technology companies to enhance student internship opportunities and research collaborations.",
      content: "These partnerships will provide students with hands-on experience in real-world projects, access to industry mentors, and opportunities for collaborative research that addresses current technological challenges.",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2084&q=80",
      category: "partnership",
      author: "Dr. Anna Wanjiku",
      date_posted: "2024-01-10T09:45:00Z",
      is_featured: false,
      tags: ["Partnership", "Industry", "Internship", "Collaboration"],
      status: "Latest"
    },
    {
      id: 4,
      title: "Faculty Publishes Groundbreaking Research on Machine Learning",
      description: "Dr. Robert Kimani's research on advanced machine learning algorithms has been published in a top-tier international journal, contributing to the field's advancement.",
      content: "The research introduces novel approaches to deep learning optimization, potentially revolutionizing how machine learning models are trained and deployed in real-world applications.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      category: "research",
      author: "Dr. Robert Kimani",
      date_posted: "2024-01-08T16:20:00Z",
      is_featured: false,
      tags: ["Machine Learning", "Research", "Publication", "Faculty"],
      status: "Latest"
    },
    {
      id: 5,
      title: "Department Hosts Annual Tech Innovation Summit",
      description: "The CSM Department successfully hosted its annual Technology Innovation Summit, bringing together industry experts, researchers, and students.",
      content: "The summit featured keynote presentations, panel discussions, and technology demonstrations, providing a platform for knowledge exchange and networking opportunities in the technology sector.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2025&q=80",
      category: "event",
      author: "Event Team",
      date_posted: "2024-01-05T11:30:00Z",
      is_featured: false,
      tags: ["Event", "Innovation", "Summit", "Networking"],
      status: "Latest"
    },
    {
      id: 6,
      title: "New Cybersecurity Lab Opens for Advanced Training",
      description: "The department launches a specialized cybersecurity laboratory equipped with the latest security tools and simulation environments for hands-on training.",
      content: "The new lab provides students with practical experience in cybersecurity defense, ethical hacking, and security analysis using industry-standard tools and realistic attack scenarios.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      category: "facilities",
      author: "Dr. Lisa Wang",
      date_posted: "2024-01-03T13:45:00Z",
      is_featured: false,
      tags: ["Cybersecurity", "Laboratory", "Training", "Security"],
      status: "Latest"
    },
    {
      id: 7,
      title: "CSM Students Develop Award-Winning Mobile App",
      description: "A team of computer science students has developed a mobile application that won the national innovation award, addressing real-world challenges in healthcare access.",
      content: "The mobile app connects rural communities with healthcare providers, enabling telemedicine consultations and health monitoring. The application has been recognized for its innovative approach to solving healthcare accessibility issues in Tanzania.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      category: "student_achievement",
      author: "Dr. Sarah Mwangi",
      date_posted: "2023-12-28T09:15:00Z",
      is_featured: false,
      tags: ["Mobile App", "Healthcare", "Innovation", "Students"],
      status: "Latest"
    },
    {
      id: 8,
      title: "International Collaboration with European Universities",
      description: "The department establishes new research partnerships with leading European universities to promote international academic exchange and collaborative research projects.",
      content: "These partnerships will enable faculty and students to participate in joint research projects, exchange programs, and international conferences, enhancing the global perspective of our academic programs.",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      category: "partnership",
      author: "Prof. Michael Johnson",
      date_posted: "2023-12-20T14:30:00Z",
      is_featured: false,
      tags: ["International", "Collaboration", "Research", "Exchange"],
      status: "Latest"
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setNews(staticNews);
      setIsLoading(false);
    }, 1000);
  }, []);

  const categories = [
    { label: 'All', value: 'All' },
    { label: 'Research', value: 'research' },
    { label: 'Student Achievements', value: 'student_achievement' },
    { label: 'Partnerships', value: 'partnership' },
    { label: 'Events', value: 'event' },
    { label: 'Facilities', value: 'facilities' },
    { label: 'Announcements', value: 'announcement' },
    { label: 'General', value: 'general' },
  ];

  const filteredNews = news.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNews = filteredNews.slice(startIndex, endIndex);

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'research': 'bg-blue-100 text-blue-800',
      'student_achievement': 'bg-green-100 text-green-800',
      'partnership': 'bg-orange-100 text-orange-800',
      'event': 'bg-purple-100 text-purple-800',
      'facilities': 'bg-yellow-100 text-yellow-800',
      'announcement': 'bg-red-100 text-red-800',
      'general': 'bg-gray-100 text-gray-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInHours < 168) {
      return `${Math.floor(diffInHours / 24)}d ago`;
    } else {
      return `${Math.floor(diffInHours / 168)}w ago`;
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading news...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-orange-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">News & Updates</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Stay informed about the latest developments, achievements, and events in the Computer Systems and Mathematics Department.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => {
                  setSelectedCategory(category.value);
                  setCurrentPage(1);
                }}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.value
                    ? 'bg-orange-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-200 text-gray-700 hover:bg-orange-100 hover:text-orange-700'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {currentNews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No news articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentNews.map((item, index) => (
                <article
                  key={item.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group border border-gray-100"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  {/* News Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                        {categories.find(cat => cat.value === item.category)?.label}
                      </span>
                    </div>
                    {item.is_featured && (
                      <div className="absolute top-4 right-4">
                        <div className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                          Featured
                        </div>
                      </div>
                    )}
                  </div>

                  {/* News Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {item.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                      {item.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{item.tags.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Author and Date */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <User size={16} className="mr-2" />
                        <span>{item.author}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar size={16} className="mr-2" />
                        <span>{formatDate(item.date_posted)}</span>
                        <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {getRelativeTime(item.date_posted)}
                        </span>
                      </div>
                    </div>

                    {/* Read More Button */}
                    <Link
                      to={`/news/${item.id}`}
                      className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium transition-colors duration-300 group-hover:translate-x-1"
                    >
                      Read More
                      <ArrowRight size={16} className="ml-2 transition-transform duration-300" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-12 space-x-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
              >
                <ChevronLeft size={20} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    currentPage === page
                      ? 'bg-orange-600 text-white shadow-lg'
                      : 'bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default NewsPage;


