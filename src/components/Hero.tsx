import React from 'react';
import { ArrowRight, Award, Users, BookOpen } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-900 to-blue-800 min-h-screen flex items-center">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/159306/network-cable-ethernet-computer-159306.jpeg?auto=compress&cs=tinysrgb&w=1600")'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div className="mb-8 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Computer Systems & Mathematics
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-blue-100">
              Ardhi University
            </p>
            <p className="text-lg md:text-xl mb-8 text-blue-200 leading-relaxed">
              Empowering innovation through cutting-edge technology, mathematical excellence, and collaborative research for tomorrow's digital world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center">
                Explore Programs
                <ArrowRight size={20} className="ml-2" />
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
                Research Areas
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors duration-200">
              <Award className="text-orange-600 mb-4" size={48} />
              <h3 className="text-xl font-semibold mb-2">Excellence in Education</h3>
              <p className="text-blue-200">Recognized programs in computer systems and mathematical sciences</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors duration-200">
              <Users className="text-green-400 mb-4" size={48} />
              <h3 className="text-xl font-semibold mb-2">Industry Partnerships</h3>
              <p className="text-blue-200">Strong collaborations with leading technology companies</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors duration-200">
              <BookOpen className="text-orange-600 mb-4" size={48} />
              <h3 className="text-xl font-semibold mb-2">Research Impact</h3>
              <p className="text-blue-200">Published research contributing to global knowledge</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;