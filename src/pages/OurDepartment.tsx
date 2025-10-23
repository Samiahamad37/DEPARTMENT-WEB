import React from 'react';
import { Users, Target, Eye, Calendar, Award, Globe, BookOpen, TrendingUp } from 'lucide-react';

const OurDepartment: React.FC = () => {
  const milestones = [
    { year: "2001", title: "Department Founded", description: "Established as part of Ardhi University's commitment to technology education" },
    { year: "2005", title: "First Graduates", description: "Celebrated our first batch of computer science graduates" },
    { year: "2010", title: "Research Expansion", description: "Launched comprehensive research programs in AI and cybersecurity" },
    { year: "2015", title: "Industry Partnerships", description: "Established partnerships with major tech companies and organizations" },
    { year: "2020", title: "Digital Transformation", description: "Pioneered online learning and remote research capabilities" },
    { year: "2023", title: "AI Research Center", description: "Opened state-of-the-art AI research facility with cutting-edge equipment" }
  ];

  const achievements = [
    { icon: <Users size={24} />, number: "500+", label: "Graduates", description: "Successful alumni working in leading organizations" },
    { icon: <BookOpen size={24} />, number: "50+", label: "Research Papers", description: "Published in international journals and conferences" },
    { icon: <Award size={24} />, number: "25+", label: "Awards", description: "Recognition for excellence in education and research" },
    { icon: <Globe size={24} />, number: "15+", label: "Countries", description: "International partnerships and collaborations" }
  ];

  const researchAreas = [
    {
      title: "Artificial Intelligence & Machine Learning",
      description: "Advancing AI research with focus on healthcare, education, and sustainable development",
      projects: ["AI-powered diagnostic systems", "Intelligent tutoring systems", "Predictive analytics for climate change"]
    },
    {
      title: "Cybersecurity & Network Security",
      description: "Protecting digital infrastructure and developing secure systems for Tanzania and Africa",
      projects: ["National cybersecurity framework", "Blockchain security protocols", "IoT security solutions"]
    },
    {
      title: "Data Science & Analytics",
      description: "Leveraging big data to solve complex problems in business, government, and society",
      projects: ["Smart city analytics", "Healthcare data insights", "Financial risk modeling"]
    },
    {
      title: "Software Engineering & Development",
      description: "Building robust, scalable software solutions for diverse industries and applications",
      projects: ["Mobile app development", "Web platform solutions", "Enterprise software systems"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Department</h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Discover our journey, mission, and commitment to excellence in computer science and mathematics education at Ardhi University.
            </p>
          </div>
        </div>
      </section>

      {/* Welcome Message */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Welcome from the Head of Department</h2>
              <div className="bg-gradient-to-r from-orange-50 to-blue-50 p-6 rounded-xl border-l-4 border-orange-600">
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  "Welcome to the Department of Computer Systems and Mathematics at Ardhi University. 
                  We are at the forefront of technological innovation and academic excellence in Tanzania and East Africa."
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Our department is committed to providing world-class education, conducting cutting-edge research, 
                  and preparing our students to become the next generation of technology leaders. We believe in 
                  the power of technology to transform lives and drive sustainable development.
                </p>
              </div>
              <div className="mt-6 flex items-center">
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80" 
                  alt="Dr. Maria Santos" 
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-semibold text-gray-900">Dr. Maria Santos</p>
                  <p className="text-orange-600">Head of Department</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80" 
                alt="Department Building" 
                className="rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Vision */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye size={32} className="text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be the leading center of excellence in computer science and mathematics education, 
                research, and innovation in East Africa, producing graduates who drive technological 
                advancement and sustainable development.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target size={32} className="text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To provide high-quality education, conduct innovative research, and foster 
                partnerships that advance computer science and mathematics while addressing 
                real-world challenges in Tanzania and beyond.
              </p>
            </div>

            {/* Values */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp size={32} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
              <ul className="text-gray-600 space-y-2 text-left">
                <li>• Excellence in Education</li>
                <li>• Innovation in Research</li>
                <li>• Integrity in All Actions</li>
                <li>• Collaboration & Partnership</li>
                <li>• Social Responsibility</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Achievements</h2>
            <p className="text-xl text-gray-600">Proud milestones and accomplishments that define our excellence</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                  <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    {achievement.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{achievement.number}</div>
                  <div className="text-lg font-semibold text-gray-700 mb-2">{achievement.label}</div>
                  <div className="text-sm text-gray-600">{achievement.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Research Excellence</h2>
            <p className="text-xl text-gray-600">Cutting-edge research areas that drive innovation and impact</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {researchAreas.map((area, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{area.title}</h3>
                <p className="text-gray-600 mb-6">{area.description}</p>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Key Projects:</h4>
                  <ul className="space-y-2">
                    {area.projects.map((project, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-600 text-sm">{project}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">Key milestones in our department's history</p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-500 to-blue-500 rounded-full"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                      <div className="text-2xl font-bold text-orange-600 mb-2">{milestone.year}</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center relative z-10">
                    <Calendar size={16} className="text-white" />
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl text-blue-100 mb-8">
            Be part of our journey in advancing computer science and mathematics education in East Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
              Explore Programs
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-900 transition-all duration-300 transform hover:scale-105">
              Apply Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurDepartment;

