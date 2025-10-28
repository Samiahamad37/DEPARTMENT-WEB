import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll compression
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset scroll position on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navItems = [
    { path: '/', label: 'Home' },
    { 
      path: '/programmes', 
      label: 'Programmes',
      hasDropdown: false
    },
    { 
      path: '/research', 
      label: 'Research and Innovation',
      hasDropdown: false
    },
    { 
      path: '/facilities', 
      label: 'Facilities',
      hasDropdown: false
    },
    { 
      path: '/outreach', 
      label: 'Outreach and Impact',
      hasDropdown: false
    },
    { 
      path: '/about', 
      label: 'About',
      hasDropdown: true,
      dropdownItems: [
        { path: '/about/people', label: 'Our People' },
        { path: '/about/department', label: 'Our Department' },
        { path: '/about/hire-students', label: 'Hire Our Students' },
      ]
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 border-b border-white/20 shadow-lg transition-all duration-300 ${
      isScrolled ? 'py-2' : 'py-0'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two-column layout: Logo spans both sections */}
        <div className="flex">
          {/* Left Column - Logo spanning both sections */}
          <div className={`flex-shrink-0 flex items-center transition-all duration-300 ${
            isScrolled ? 'mr-4' : 'mr-6'
          }`}>
            <img 
              src="/src/assets/ARU-logo.png" 
              alt="Ardhi University Logo" 
              className={`${isScrolled ? 'w-14 h-14' : 'w-20 h-20 md:w-24 md:h-24'}`}
            />
          </div>

          {/* Right Column - Department name and navigation */}
          <div className="flex-1 flex flex-col">
            {/* Department Name Section */}
            <div className={`flex items-center justify-center transition-all duration-300 ${
              isScrolled ? 'py-1' : 'py-3'
            }`}>
              <Link to="/" className="text-center">
                <span className={`font-bold text-blue-900 transition-all duration-300 hover:text-orange-600 leading-tight ${
                  isScrolled 
                    ? 'text-base md:text-lg' 
                    : 'text-lg md:text-xl lg:text-2xl'
                }`}>
                  Department of Computer Systems and Mathematics, Ardhi University
                </span>
              </Link>
              
              {/* Mobile menu button */}
              <div className="lg:hidden ml-4">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                >
                  {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>
            
            {/* Navigation Items Section */}
            <div className={`hidden lg:block border-t border-white/20 transition-all duration-300 ${
              isScrolled ? 'pt-2 pb-2' : 'pt-3 pb-3'
            }`}>
              <div className="flex items-center justify-center space-x-2 xl:space-x-4">
                {navItems.map((item) => (
                  <div key={item.path} className="relative">
                    {item.hasDropdown ? (
                      <div className="relative">
                        <button
                          onClick={() => toggleDropdown(item.label)}
                          className={`px-3 xl:px-4 py-2 xl:py-3 rounded-lg text-sm xl:text-base font-semibold transition-all duration-300 hover:bg-orange-50 hover:text-orange-600 flex items-center space-x-1 xl:space-x-2 relative group ${
                            isActive(item.path) ? 'text-orange-600' : 'text-gray-700'
                          }`}
                        >
                          <span className="relative">
                            {item.label}
                            <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-300 group-hover:w-full ${
                              isActive(item.path) ? 'w-full' : ''
                            }`}></span>
                          </span>
                          <ChevronDown 
                            size={18} 
                            className={`transition-transform duration-300 ${
                              activeDropdown === item.label ? 'rotate-180' : ''
                            }`} 
                          />
                        </button>
                        {activeDropdown === item.label && (
                          <div className="absolute top-full left-0 mt-2 w-56 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/20 z-50 overflow-hidden">
                            {item.dropdownItems?.map((dropdownItem) => (
                              <Link
                                key={dropdownItem.path}
                                to={dropdownItem.path}
                                className={`block px-4 py-3 text-base font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300 relative group ${
                                  isActive(dropdownItem.path) ? 'bg-orange-50 text-orange-600' : ''
                                }`}
                                onClick={() => setActiveDropdown(null)}
                              >
                                <span className="relative">
                                  {dropdownItem.label}
                                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
                                </span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        className={`px-3 xl:px-4 py-2 xl:py-3 rounded-lg text-sm xl:text-base font-semibold transition-all duration-300 hover:bg-orange-50 hover:text-orange-600 relative group ${
                          isActive(item.path) ? 'text-orange-600' : 'text-gray-700'
                        }`}
                      >
                        <span className="relative">
                          {item.label}
                          <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-300 group-hover:w-full ${
                            isActive(item.path) ? 'w-full' : ''
                          }`}></span>
                        </span>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden">
          <div className="px-4 pt-4 pb-6 space-y-2 bg-white/95 backdrop-blur-md border-t border-white/20">
            {navItems.map((item) => (
              <div key={item.path}>
                {item.hasDropdown ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 hover:bg-orange-50 hover:text-orange-600 flex items-center justify-between ${
                        isActive(item.path) ? 'text-orange-600 bg-orange-50' : 'text-gray-700'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown 
                        size={16} 
                        className={`transition-transform duration-200 ${
                          activeDropdown === item.label ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    {activeDropdown === item.label && (
                      <div className="ml-4 space-y-1">
                        {item.dropdownItems?.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.path}
                            to={dropdownItem.path}
                            onClick={() => {
                              setIsMenuOpen(false);
                              setActiveDropdown(null);
                            }}
                            className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-orange-600 ${
                              isActive(dropdownItem.path) ? 'bg-orange-600 text-white' : ''
                            }`}
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:bg-orange-600 ${
                      isActive(item.path) ? 'bg-orange-600 text-white' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      {item.label}
                      <ChevronRight size={16} />
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;






