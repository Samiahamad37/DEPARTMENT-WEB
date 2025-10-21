import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, ArrowUp, Clock, Globe, GraduationCap } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { path: '/about', label: 'About Us' },
    { path: '/about/people', label: 'Our People' },
    { path: '/about/department', label: 'Our Department' },
    { path: '/programmes', label: 'Programmes' },
    { path: '/research', label: 'Research & Innovation' },
    { path: '/facilities', label: 'Facilities' },
    { path: '/outreach', label: 'Outreach & Impact' },
    { path: '/about/hire-students', label: 'Hire Our Students' },
  ];

  const academicLinks = [
    { path: '/programmes', label: 'Undergraduate Programs' },
    { path: '/programmes', label: 'Graduate Programs' },
    { path: '/research', label: 'Research Areas' },
    { path: '/facilities', label: 'Laboratories' },
    { path: '/news', label: 'News & Events' },
  ];

  const supportLinks = [
    { path: '/contact', label: 'Contact Us' },
    { path: '/about/hire-students', label: 'Industry Partners' },
    { path: '/outreach', label: 'Community Outreach' },
    { path: '#', label: 'Student Portal' },
    { path: '#', label: 'Staff Portal' },
  ];

  return (
    <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-blue-500 transform rotate-12 scale-150"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Department Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">CSM</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Computer Systems & Mathematics</h3>
                <p className="text-blue-200 text-sm">Ardhi University</p>
              </div>
            </div>
            
            <p className="text-blue-200 mb-6 leading-relaxed">
              Empowering the next generation of innovators through cutting-edge education, 
              research, and technological advancement. We are committed to excellence in 
              computer science and mathematics education in East Africa.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4 mb-6">
              <a href="#" className="bg-blue-800 hover:bg-blue-700 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-blue-800 hover:bg-blue-700 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg">
                <Twitter size={20} />
              </a>
              <a href="#" className="bg-blue-800 hover:bg-blue-700 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg">
                <Linkedin size={20} />
              </a>
              <a href="#" className="bg-blue-800 hover:bg-blue-700 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg">
                <Globe size={20} />
              </a>
            </div>
          </div>

          {/* Order Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center">
              <GraduationCap size={20} className="mr-2 text-orange-400" />
              Academic Programs
            </h4>
            <ul className="space-y-3">
              {academicLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-blue-200 hover:text-orange-400 transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-orange-400 transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-blue-200 hover:text-orange-400 transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-orange-400 transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Information</h4>
            <div className="space-y-4">
              <div className="flex items-start group">
                <MapPin size={18} className="mr-3 mt-1 text-orange-400 flex-shrink-0" />
                <div>
                  <p className="text-blue-200 text-sm leading-relaxed">
                    Ardhi University<br />
                    P.O. Box 35176<br />
                    Dar es Salaam, Tanzania
                  </p>
                </div>
              </div>
              
              <div className="flex items-center group">
                <Phone size={18} className="mr-3 text-orange-400 flex-shrink-0" />
                <div>
                  <p className="text-blue-200 text-sm">+255 22 277 5004</p>
                  <p className="text-blue-300 text-xs">Main Office</p>
                </div>
              </div>
              
              <div className="flex items-center group">
                <Mail size={18} className="mr-3 text-orange-400 flex-shrink-0" />
                <div>
                  <p className="text-blue-200 text-sm">info@csm.aru.ac.tz</p>
                  <p className="text-blue-300 text-xs">General Inquiries</p>
                </div>
              </div>
              
              <div className="flex items-center group">
                <Clock size={18} className="mr-3 text-orange-400 flex-shrink-0" />
                <div>
                  <p className="text-blue-200 text-sm">Mon - Fri: 8:00 AM - 5:00 PM</p>
                  <p className="text-blue-300 text-xs">Office Hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated with CSM</h3>
            <p className="text-blue-200 mb-6">
              Subscribe to our newsletter for the latest news, events, and opportunities in Computer Systems and Mathematics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-center lg:text-left">
              <p className="text-blue-200 text-sm">
                &copy; {new Date().getFullYear()} Department of Computer Systems & Mathematics, Ardhi University. All rights reserved.
              </p>
              <p className="text-blue-300 text-xs mt-1">
                Proudly serving Tanzania and East Africa since 2001
              </p>
            </div>
            
            <div className="flex items-center space-x-6">
              <Link to="/contact" className="text-blue-200 hover:text-orange-400 transition-colors duration-300 text-sm">
                Privacy Policy
              </Link>
              <Link to="/contact" className="text-blue-200 hover:text-orange-400 transition-colors duration-300 text-sm">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-blue-200 hover:text-orange-400 transition-colors duration-300 text-sm">
                Accessibility
              </Link>
            </div>
            
            <button
              onClick={scrollToTop}
              className="bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;