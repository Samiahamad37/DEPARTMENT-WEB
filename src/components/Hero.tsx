import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface BannerSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  ctaText: string;
  ctaLink: string;
  isActive: boolean;
}

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Static banner data - will be replaced with API data later
  const bannerSlides: BannerSlide[] = [
    {
      id: 1,
      title: "Welcome Message from the Head of Department",
      subtitle: "Dr. Maria Santos, Head of CSM Department",
      description: "Welcome to the Department of Computer Systems and Mathematics at Ardhi University. We are committed to providing world-class education and fostering innovation in technology and mathematics. Join us in shaping the future of computing and digital transformation.",
      backgroundImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
      ctaText: "Meet Our Team",
      ctaLink: "/about/people",
      isActive: true
    },
    {
      id: 2,
      title: "New Programme Launch",
      subtitle: "Bachelor of Data Science and Artificial Intelligence",
      description: "Join our groundbreaking new program combining data science and AI to prepare for the future of technology and innovation.",
      backgroundImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      ctaText: "Learn More",
      ctaLink: "/programmes",
      isActive: true
    },
    {
      id: 3,
      title: "Modern AI Infrastructure",
      subtitle: "Powerful AI Server Access",
      description: "Access state-of-the-art AI servers and computational resources for cutting-edge research and development projects.",
      backgroundImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2025&q=80",
      ctaText: "View Facilities",
      ctaLink: "/facilities",
      isActive: true
    },
    {
      id: 4,
      title: "Ardhi University Celebrates",
      subtitle: "23 Years of Excellence",
      description: "Join us in celebrating 23 years of academic excellence, innovation, and contribution to Tanzania's technological advancement.",
      backgroundImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      ctaText: "Our Story",
      ctaLink: "/about/department",
      isActive: true
    },
    {
      id: 5,
      title: "Hire Our Students",
      subtitle: "Talented Graduates Ready for Industry",
      description: "Connect with our highly skilled graduates who are ready to contribute to your organization's success with cutting-edge knowledge and skills.",
      backgroundImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2084&q=80",
      ctaText: "Partner With Us",
      ctaLink: "/about/hire-students",
      isActive: true
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay, bannerSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Slides */}
      <div className="absolute inset-0">
        {bannerSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${slide.backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white px-4 max-w-4xl mx-auto">
          <div className="transform transition-all duration-1000 ease-in-out">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              {bannerSlides[currentSlide].title}
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-light mb-8 text-blue-200">
              {bannerSlides[currentSlide].subtitle}
            </h2>
            <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
              {bannerSlides[currentSlide].description}
            </p>
            <Link
              to={bannerSlides[currentSlide].ctaLink}
              className="inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {bannerSlides[currentSlide].ctaText}
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
        {/* Play/Pause Button */}
        <button
          onClick={toggleAutoPlay}
          className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
        >
          {isAutoPlay ? <Pause size={20} /> : <Play size={20} />}
        </button>

        {/* Slide Indicators */}
        <div className="flex space-x-2">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-orange-600 scale-125'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Arrow Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronRight size={24} />
      </button>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;