import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Tag, ArrowRight, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { useFeaturedNews } from '../hooks/useNews';
import { News } from '../types/api';

const NewsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Fetch featured news from API
  const { data: news = [], isLoading, error } = useFeaturedNews();

  // Fallback static data if API fails
  const fallbackNews: News[] = [
    {
      id: 1,
      title: "CSM Department Launches New AI Research Center",
      description: "The department officially opens its state-of-the-art Artificial Intelligence Research Center, equipped with cutting-edge computing resources and research facilities.",
      content: "The new AI Research Center represents a significant milestone in our department's commitment to advancing artificial intelligence research and education.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      category: "research",
      author: "Dr. Maria Santos",
      date_posted: "2024-01-15T10:30:00Z",
      is_featured: true,
      is_active: true,
      tags: "AI, Research, Innovation, Technology",
      tag_list: ["AI", "Research", "Innovation", "Technology"],
      status: "Latest"
    },
    {
      id: 2,
      title: "Student Team Wins National Programming Competition",
      description: "Our computer science students secured first place in the National Programming Competition, showcasing their exceptional problem-solving and coding skills.",
      content: "The team of three students competed against 50 universities across Tanzania, demonstrating advanced algorithmic thinking and efficient coding techniques.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
      category: "student_achievement",
      author: "Prof. David Kiprop",
      date_posted: "2024-01-12T14:15:00Z",
      is_featured: true,
      is_active: true,
      tags: "Programming, Competition, Students, Achievement",
      tag_list: ["Programming", "Competition", "Students", "Achievement"],
      status: "Latest"
    },
    {
      id: 3,
      title: "New Master's Program in Data Science Announced",
      description: "The department introduces a comprehensive Master's program in Data Science, designed to meet the growing demand for data science professionals in Tanzania and beyond.",
      content: "This new program combines theoretical knowledge with practical applications, preparing students for careers in data analysis, machine learning, and business intelligence.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      category: "announcement",
      author: "Dr. Sarah Mwangi",
      date_posted: "2024-01-10T09:00:00Z",
      is_featured: true,
      is_active: true,
      tags: "Data Science, Masters, Program, Education",
      tag_list: ["Data Science", "Masters", "Program", "Education"],
      status: "Latest"
    }
  ];

  // Use API data or fallback to static data
  const newsData = news.length > 0 ? news : fallbackNews;

  const categories = ['All', 'research', 'student_achievement', 'announcement', 'event', 'faculty_news', 'department_news', 'general'];
  
  const filteredNews = selectedCategory === 'All' 
    ? newsData 
    : newsData.filter(item => item.category === selectedCategory);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">News & Updates</h2>
            <p className="text-lg text-gray-600 mb-8">Loading latest news...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error('Error loading news:', error);
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">News & Updates</h2>
          <p className="text-lg text-gray-600 mb-8">Stay informed with the latest news and announcements from our department</p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-orange-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-orange-100'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1).replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
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

          {/* News Cards */}
          <div 
            ref={scrollContainerRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredNews.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-80 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1).replace('_', ' ')}
                    </span>
                  </div>
                  {item.is_featured && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      {formatDate(item.date_posted)}
                    </div>
                    <div className="flex items-center">
                      <User size={16} className="mr-1" />
                      {item.author}
                    </div>
                  </div>
                  
                  {item.tag_list && item.tag_list.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tag_list.slice(0, 3).map((tag, index) => (
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
                  
                  <div className="flex items-center justify-between">
                    <Link
                      to={`/news/${item.id}`}
                      className="flex items-center text-orange-600 hover:text-orange-700 font-medium transition-colors duration-300"
                    >
                      <Eye size={16} className="mr-1" />
                      Read More
                    </Link>
                    <ArrowRight size={16} className="text-orange-600" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/news-page"
            className="inline-flex items-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            View All News
            <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;