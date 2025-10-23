import React, { useState } from 'react';
import { Users, Briefcase, GraduationCap, Award, CheckCircle, ArrowRight, Mail, Phone, MapPin, Clock, Star } from 'lucide-react';

const HireOurStudents: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    position: '',
    requirements: '',
    duration: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your interest! We will contact you soon.');
  };

  const successStories = [
    {
      company: "Google Africa",
      position: "Software Engineer",
      graduate: "John Mwalimu",
      year: "2022",
      quote: "The practical skills and problem-solving approach I learned at CSM gave me the confidence to excel in a global tech company."
    },
    {
      company: "Microsoft East Africa",
      position: "Data Scientist",
      graduate: "Sarah Kimani",
      year: "2021",
      quote: "The research opportunities and industry partnerships at CSM prepared me perfectly for real-world challenges in data science."
    },
    {
      company: "IBM Tanzania",
      position: "Cybersecurity Analyst",
      graduate: "Ahmed Hassan",
      year: "2023",
      quote: "The cybersecurity program at CSM provided hands-on experience that directly translated to my current role."
    }
  ];

  const studentSkills = [
    { skill: "Programming Languages", details: "Python, Java, C++, JavaScript, TypeScript, R" },
    { skill: "Web Development", details: "React, Node.js, Django, Angular, Vue.js, Full-stack development" },
    { skill: "Data Science", details: "Machine Learning, Statistical Analysis, Data Visualization, Big Data" },
    { skill: "Cybersecurity", details: "Network Security, Ethical Hacking, Digital Forensics, Risk Assessment" },
    { skill: "Mobile Development", details: "React Native, Flutter, iOS, Android, Cross-platform apps" },
    { skill: "Database Management", details: "SQL, NoSQL, MongoDB, PostgreSQL, Data Architecture" }
  ];

  const benefits = [
    {
      icon: <Users size={24} />,
      title: "Industry-Ready Graduates",
      description: "Our students are equipped with practical skills and real-world experience through internships and projects."
    },
    {
      icon: <Award size={24} />,
      title: "Proven Track Record",
      description: "95% of our graduates secure employment within 6 months of graduation, with many joining top-tier companies."
    },
    {
      icon: <Briefcase size={24} />,
      title: "Diverse Skill Sets",
      description: "Students trained in multiple technologies and methodologies, ready to adapt to various industry needs."
    },
    {
      icon: <GraduationCap size={24} />,
      title: "Continuous Learning",
      description: "Graduates with strong foundation in computer science principles, enabling rapid adaptation to new technologies."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Hire Our Students</h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-8">
              Our students work at leading organizations and contribute to cutting-edge innovation. 
              Discover how our graduates can drive your organization's success.
            </p>
            <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
              Start Hiring Process
            </button>
          </div>
        </div>
      </section>

      {/* Why Hire Our Students */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Graduates?</h2>
            <p className="text-xl text-gray-600">Excellence in education meets industry demand</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                  <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Skills */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Student Skills & Expertise</h2>
            <p className="text-xl text-gray-600">Comprehensive technical training across multiple domains</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {studentSkills.map((skill, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{skill.skill}</h3>
                <p className="text-gray-600">{skill.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">Hear from our graduates and their employers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mr-4">
                    <Star size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{story.graduate}</h3>
                    <p className="text-sm text-gray-600">{story.position} at {story.company}</p>
                    <p className="text-xs text-orange-600">Class of {story.year}</p>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic">
                  "{story.quote}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industrial Training & Hiring Options */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Industrial Training */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Briefcase size={32} className="text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Industrial Training Program</h2>
                  <p className="text-gray-600">Get Students for Practical Experience</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  Our Industrial Training program provides students with hands-on experience in real-world 
                  environments. This program is equivalent to an internship and offers:
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle size={20} className="text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Practical Skill Application</h4>
                      <p className="text-gray-600 text-sm">Students apply classroom knowledge to real projects</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle size={20} className="text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Professional Growth</h4>
                      <p className="text-gray-600 text-sm">Exposure to industry standards and best practices</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle size={20} className="text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Mentorship Opportunities</h4>
                      <p className="text-gray-600 text-sm">Guidance from experienced professionals</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Duration:</strong> 3-6 months<br />
                    <strong>Timing:</strong> Flexible scheduling available<br />
                    <strong>Support:</strong> Faculty supervision and regular check-ins
                  </p>
                </div>
              </div>
            </div>

            {/* Hire Our Graduates */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                  <GraduationCap size={32} className="text-orange-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Hire Our Graduates</h2>
                  <p className="text-gray-600">Permanent Employment Opportunities</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  Our graduates bring exceptional technical skills, strong problem-solving abilities, 
                  and a commitment to excellence. They are ready to contribute from day one.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle size={20} className="text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Immediate Productivity</h4>
                      <p className="text-gray-600 text-sm">Well-trained graduates ready to contribute immediately</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle size={20} className="text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Cultural Fit</h4>
                      <p className="text-gray-600 text-sm">Students familiar with local market and business practices</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle size={20} className="text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Long-term Partnership</h4>
                      <p className="text-gray-600 text-sm">Ongoing relationship with the department for future hires</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Graduation:</strong> Annual graduation in December<br />
                    <strong>Placement:</strong> 95% employment rate within 6 months<br />
                    <strong>Support:</strong> Career services and alumni network
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Started Today</h2>
            <p className="text-xl text-gray-600">Let's discuss how our students can contribute to your organization</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name *</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Person *</label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Position/Internship Type</label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select Duration</option>
                    <option value="3-months">3 Months</option>
                    <option value="6-months">6 Months</option>
                    <option value="1-year">1 Year</option>
                    <option value="permanent">Permanent Position</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Requirements & Skills Needed</label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center mx-auto"
                >
                  Submit Request
                  <ArrowRight size={20} className="ml-2" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Our Career Services</h2>
            <p className="text-xl text-gray-600">Get in touch for more information about our students</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600">careers@csm.aru.ac.tz</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone size={32} className="text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600">+255 22 277 5004</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600">CSM Building, Room 101<br />Ardhi University</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HireOurStudents;

