import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Tag, ArrowRight, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

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

const NewsSection: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
    }
  ];

  useEffect(() => {
    // In a real application, you would fetch data from your Django API here
    // For now, we use static data with a delay to simulate loading
    setIsLoading(true);
    setTimeout(() => {
      setNews(staticNews);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredNews = selectedCategory === 'All'
    ? news
    : news.filter(item => item.category === selectedCategory);

  const displayedNews = filteredNews.slice(currentIndex, currentIndex + 3);

  const nextNews = () => {
    if (currentIndex + 3 < filteredNews.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevNews = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

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

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading news...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest News & Updates</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed about the latest developments, achievements, and events in the Computer Systems and Mathematics Department.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => {
                setSelectedCategory(category.value);
                setCurrentIndex(0); // Reset index on category change
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

        {/* News Grid */}
        <div className="relative mb-12">
          {/* Navigation Arrows */}
          {filteredNews.length > 3 && (
            <>
              <button
                onClick={prevNews}
                disabled={currentIndex === 0}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white hover:bg-gray-50 text-gray-700 p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextNews}
                disabled={currentIndex + 3 >= filteredNews.length}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white hover:bg-gray-50 text-gray-700 p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-12">
            {displayedNews.map((item, index) => (
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
        </div>

        {/* View All News Button */}
        <div className="text-center">
          <Link
            to="/news"
            className="inline-flex items-center px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Eye size={20} className="mr-2" />
            More News & Updates
          </Link>
        </div>
      </div>

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
    </section>
  );
};

export default NewsSection;