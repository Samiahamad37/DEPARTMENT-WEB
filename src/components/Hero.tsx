import React, { useState, useEffect } from 'react';
import { ArrowRight, Award, Users, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { useBanners } from '../hooks/useBanners';
import { Banner } from '../types/api';

const Hero: React.FC = () => {
  // Fetch banners from API
  const { data: banners = [], isLoading, error } = useBanners();
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  // Fallback static banners if API fails
  const fallbackBanners: Banner[] = [
    {
      id: 1,
      title: "Computer Systems & Mathematics",
      subtitle: "Ardhi University",
      description: "Empowering innovation through cutting-edge technology, mathematical excellence, and collaborative research for tomorrow's digital world.",
      background_image: "https://images.pexels.com/photos/159306/network-cable-ethernet-computer-159306.jpeg?auto=compress&cs=tinysrgb&w=1600",
      cta_text: "Explore Programs",
      cta_link: "/programmes",
      is_active: true,
      display_order: 1,
      created_at: "2024-01-01T00:00:00Z",
      show_highlights: true,
      highlight_1_text: "Excellence in Education",
      highlight_1_icon: undefined,
      highlight_2_text: "Industry Partnerships",
      highlight_2_icon: undefined,
      highlight_3_text: "Research Impact",
      highlight_3_icon: undefined,
      overlay_opacity: 0.4
    },
    {
      id: 2,
      title: "Research Excellence",
      subtitle: "Innovation Hub",
      description: "Leading research in artificial intelligence, data science, and emerging technologies that shape the future.",
      background_image: "https://images.pexels.com/photos/3862130/3862130.jpeg?auto=compress&cs=tinysrgb&w=1600",
      cta_text: "View Research",
      cta_link: "/research",
      is_active: true,
      display_order: 2,
      created_at: "2024-01-01T00:00:00Z",
      show_highlights: false,
      highlight_1_text: "",
      highlight_1_icon: undefined,
      highlight_2_text: "",
      highlight_2_icon: undefined,
      highlight_3_text: "",
      highlight_3_icon: undefined,
      overlay_opacity: 0.6
    },
    {
      id: 3,
      title: "Student Success",
      subtitle: "Future Leaders",
      description: "Preparing the next generation of computer scientists and mathematicians for global challenges and opportunities.",
      background_image: "https://images.pexels.com/photos/3184465/3184465.jpeg?auto=compress&cs=tinysrgb&w=1600",
      cta_text: "Meet Our Students",
      cta_link: "/about/people",
      is_active: true,
      display_order: 3,
      created_at: "2024-01-01T00:00:00Z",
      show_highlights: true,
      highlight_1_text: "Student Achievement",
      highlight_1_icon: undefined,
      highlight_2_text: "Career Success",
      highlight_2_icon: undefined,
      highlight_3_text: "Global Impact",
      highlight_3_icon: undefined,
      overlay_opacity: 0.3
    }
  ];

  // Use API data or fallback to static data
  const bannerData = banners.length > 0 ? banners : fallbackBanners;
  const currentBanner = bannerData[currentBannerIndex];

  // Auto-scroll functionality
  useEffect(() => {
    if (bannerData.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => 
        prevIndex === bannerData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change banner every 5 seconds

    return () => clearInterval(interval);
  }, [bannerData.length]);

  const goToPrevious = () => {
    setCurrentBannerIndex((prevIndex) => 
      prevIndex === 0 ? bannerData.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentBannerIndex((prevIndex) => 
      prevIndex === bannerData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToBanner = (index: number) => {
    setCurrentBannerIndex(index);
  };

  if (isLoading) {
    return (
      <div className="relative bg-gradient-to-br from-blue-900 to-blue-800 min-h-screen flex items-center">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white text-center">
          <div className="animate-pulse">
            <div className="h-16 bg-blue-700 rounded mb-4"></div>
            <div className="h-8 bg-blue-600 rounded mb-8"></div>
            <div className="h-6 bg-blue-500 rounded mb-8"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    console.error('Error loading banners:', error);
  }

  return (
    <div className="relative bg-gradient-to-br from-blue-900 to-blue-800 min-h-screen flex items-center overflow-hidden">
      {/* Background Image Overlay with configurable opacity */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url("${currentBanner.background_image}")`,
          opacity: currentBanner.overlay_opacity || 0.4
        }}
      />
      
      {/* Navigation Arrows */}
      {bannerData.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
            aria-label="Previous banner"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
            aria-label="Next banner"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div className="mb-8 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in">
              {currentBanner.title}
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-blue-100 animate-fade-in-delay-1">
              {currentBanner.subtitle}
            </p>
            <p className="text-lg md:text-xl mb-8 text-blue-200 leading-relaxed animate-fade-in-delay-2">
              {currentBanner.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay-3">
              <a 
                href={currentBanner.cta_link || "/programmes"}
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
              >
                {currentBanner.cta_text || "Explore Programs"}
                <ArrowRight size={20} className="ml-2" />
              </a>
              <a 
                href="/research"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Research Areas
              </a>
            </div>
          </div>

          {/* Configurable Highlights */}
          {currentBanner.show_highlights && (
            <div className="grid grid-cols-1 gap-6">
              {currentBanner.highlight_1_text && (
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors duration-200">
                  <div className="flex items-center space-x-4">
                    {currentBanner.highlight_1_icon ? (
                      <img 
                        src={currentBanner.highlight_1_icon} 
                        alt="Highlight 1" 
                        className="w-12 h-12 object-contain flex-shrink-0"
                      />
                    ) : (
                      <Award className="text-orange-600 flex-shrink-0" size={48} />
                    )}
                    <h3 className="text-xl font-semibold">{currentBanner.highlight_1_text}</h3>
                  </div>
                </div>
              )}
              {currentBanner.highlight_2_text && (
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors duration-200">
                  <div className="flex items-center space-x-4">
                    {currentBanner.highlight_2_icon ? (
                      <img 
                        src={currentBanner.highlight_2_icon} 
                        alt="Highlight 2" 
                        className="w-12 h-12 object-contain flex-shrink-0"
                      />
                    ) : (
                      <Users className="text-green-400 flex-shrink-0" size={48} />
                    )}
                    <h3 className="text-xl font-semibold">{currentBanner.highlight_2_text}</h3>
                  </div>
                </div>
              )}
              {currentBanner.highlight_3_text && (
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors duration-200">
                  <div className="flex items-center space-x-4">
                    {currentBanner.highlight_3_icon ? (
                      <img 
                        src={currentBanner.highlight_3_icon} 
                        alt="Highlight 3" 
                        className="w-12 h-12 object-contain flex-shrink-0"
                      />
                    ) : (
                      <BookOpen className="text-orange-600 flex-shrink-0" size={48} />
                    )}
                    <h3 className="text-xl font-semibold">{currentBanner.highlight_3_text}</h3>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Banner Indicators */}
      {bannerData.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {bannerData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToBanner(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentBannerIndex 
                  ? 'bg-white' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Hero;