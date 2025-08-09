import React from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Department Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Computer Systems & Mathematics</h3>
            <p className="text-blue-200 mb-4">
              Ardhi University's premier department for computer science and mathematics education, 
              research, and innovation in East Africa.
            </p>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">
                <Linkedin size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-blue-200">
              <li><a href="#about" className="hover:text-white transition-colors duration-200">About Us</a></li>
              <li><a href="#research" className="hover:text-white transition-colors duration-200">Research</a></li>
              <li><a href="#facilities" className="hover:text-white transition-colors duration-200">Facilities</a></li>
              <li><a href="#collaboration" className="hover:text-white transition-colors duration-200">Partnerships</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors duration-200">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-blue-200">
              <div className="flex items-start">
                <MapPin size={16} className="mr-2 mt-1" />
                <span className="text-sm">Ardhi University, P.O. Box 35176, Dar es Salaam</span>
              </div>
              <div className="flex items-center">
                <Phone size={16} className="mr-2" />
                <span className="text-sm">+255 22 277 5004</span>
              </div>
              <div className="flex items-center">
                <Mail size={16} className="mr-2" />
                <span className="text-sm">info@csm.aru.ac.tz</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p className="text-center text-xs text-blue-200 mt-4">&copy; {new Date().getFullYear()} Computer Systems & Mathematics, Ardhi University. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-full transition-colors duration-200"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;