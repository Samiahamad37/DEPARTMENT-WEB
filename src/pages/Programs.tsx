import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Clock, Award, Globe, ChevronDown, ChevronUp, CheckCircle, Star, ExternalLink } from 'lucide-react';

interface Program {
  id: number;
  title: string;
  level: 'undergraduate' | 'graduate' | 'certificate';
  duration: string;
  credits: number;
  description: string;
  curriculum: string[];
  careerPaths: string[];
  requirements: string[];
  tuition: string;
  isPopular: boolean;
  image: string;
}

const Programs: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [expandedProgram, setExpandedProgram] = useState<number | null>(null);

  // Static programs data - will be replaced with API data later
  const programs: Program[] = [
    {
      id: 1,
      title: "Bachelor of Computer Science",
      level: "undergraduate",
      duration: "4 Years",
      credits: 144,
      description: "A comprehensive program covering fundamental computer science concepts, programming, algorithms, data structures, and software engineering. Students gain hands-on experience with modern technologies and industry practices.",
      curriculum: [
        "Introduction to Programming (Java, Python)",
        "Data Structures and Algorithms",
        "Database Systems",
        "Software Engineering",
        "Computer Networks",
        "Operating Systems",
        "Web Development",
        "Mobile Application Development",
        "Artificial Intelligence",
        "Cybersecurity Fundamentals",
        "Software Project Management",
        "Final Year Project"
      ],
      careerPaths: [
        "Software Developer",
        "Web Developer",
        "Mobile App Developer",
        "Database Administrator",
        "System Analyst",
        "IT Consultant",
        "Software Engineer",
        "Technical Lead"
      ],
      requirements: [
        "Advanced Level Certificate with Mathematics",
        "Minimum 2 principal passes",
        "English proficiency",
        "Basic computer literacy"
      ],
      tuition: "TZS 2,500,000 per year",
      isPopular: true,
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 2,
      title: "Bachelor of Information Technology",
      level: "undergraduate",
      duration: "4 Years",
      credits: 144,
      description: "Focuses on the practical application of computer technology in business environments. Students learn to design, implement, and manage information systems that support organizational objectives.",
      curriculum: [
        "Programming Fundamentals",
        "Database Management",
        "Network Administration",
        "Systems Analysis and Design",
        "Business Information Systems",
        "IT Project Management",
        "Cybersecurity",
        "Cloud Computing",
        "Digital Marketing",
        "E-commerce Systems",
        "IT Governance",
        "Capstone Project"
      ],
      careerPaths: [
        "IT Manager",
        "Network Administrator",
        "Business Analyst",
        "IT Consultant",
        "Systems Administrator",
        "Database Manager",
        "IT Support Specialist",
        "Project Manager"
      ],
      requirements: [
        "Advanced Level Certificate with Mathematics",
        "Minimum 2 principal passes",
        "English proficiency",
        "Basic computer literacy"
      ],
      tuition: "TZS 2,300,000 per year",
      isPopular: false,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 3,
      title: "Bachelor of Mathematics",
      level: "undergraduate",
      duration: "4 Years",
      credits: 144,
      description: "Provides a strong foundation in mathematical theory and applications. Students develop analytical thinking skills and learn to apply mathematical concepts to solve real-world problems in various fields.",
      curriculum: [
        "Calculus I, II, III",
        "Linear Algebra",
        "Discrete Mathematics",
        "Statistics and Probability",
        "Numerical Analysis",
        "Mathematical Modeling",
        "Operations Research",
        "Financial Mathematics",
        "Mathematical Statistics",
        "Complex Analysis",
        "Abstract Algebra",
        "Research Project"
      ],
      careerPaths: [
        "Mathematician",
        "Statistician",
        "Actuary",
        "Data Analyst",
        "Research Scientist",
        "Financial Analyst",
        "Operations Research Analyst",
        "Mathematics Teacher"
      ],
      requirements: [
        "Advanced Level Certificate with Mathematics",
        "Minimum 2 principal passes including Mathematics",
        "English proficiency",
        "Strong analytical skills"
      ],
      tuition: "TZS 2,000,000 per year",
      isPopular: false,
      image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 4,
      title: "Master of Computer Science",
      level: "graduate",
      duration: "2 Years",
      credits: 72,
      description: "Advanced program focusing on specialized areas of computer science including artificial intelligence, machine learning, cybersecurity, and software engineering. Students conduct independent research and contribute to the field.",
      curriculum: [
        "Advanced Algorithms",
        "Machine Learning",
        "Deep Learning",
        "Advanced Database Systems",
        "Computer Vision",
        "Natural Language Processing",
        "Cybersecurity",
        "Distributed Systems",
        "Software Architecture",
        "Research Methods",
        "Thesis Research",
        "Research Seminar"
      ],
      careerPaths: [
        "Senior Software Engineer",
        "Machine Learning Engineer",
        "AI Research Scientist",
        "Cybersecurity Specialist",
        "Technical Architect",
        "Research Scientist",
        "Technology Consultant",
        "Academic Researcher"
      ],
      requirements: [
        "Bachelor's degree in Computer Science or related field",
        "Minimum GPA of 3.0",
        "Research proposal",
        "English proficiency",
        "Letters of recommendation"
      ],
      tuition: "TZS 3,500,000 per year",
      isPopular: true,
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 5,
      title: "Master of Information Technology",
      level: "graduate",
      duration: "2 Years",
      credits: 72,
      description: "Designed for professionals seeking to advance their IT careers. Covers emerging technologies, IT management, and strategic planning. Includes practical projects and industry collaboration.",
      curriculum: [
        "IT Strategy and Management",
        "Enterprise Architecture",
        "Cloud Computing",
        "Big Data Analytics",
        "IT Security Management",
        "Digital Transformation",
        "IT Governance",
        "Project Management",
        "Business Intelligence",
        "Emerging Technologies",
        "Capstone Project",
        "Professional Practice"
      ],
      careerPaths: [
        "IT Director",
        "Chief Technology Officer",
        "IT Manager",
        "Enterprise Architect",
        "IT Consultant",
        "Digital Transformation Manager",
        "IT Security Manager",
        "Technology Strategist"
      ],
      requirements: [
        "Bachelor's degree in IT, Computer Science, or related field",
        "Minimum 2 years work experience",
        "Minimum GPA of 3.0",
        "English proficiency",
        "Professional references"
      ],
      tuition: "TZS 3,200,000 per year",
      isPopular: false,
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 6,
      title: "PhD in Computer Science",
      level: "graduate",
      duration: "3-5 Years",
      credits: 90,
      description: "Doctoral program for students who want to pursue advanced research in computer science. Students work closely with faculty advisors to conduct original research and contribute to the academic community.",
      curriculum: [
        "Advanced Research Methods",
        "Literature Review and Analysis",
        "Research Proposal Development",
        "Advanced Topics in Computer Science",
        "Statistical Methods for Research",
        "Academic Writing and Publishing",
        "Research Ethics",
        "Teaching and Mentoring",
        "Dissertation Research",
        "Research Seminars",
        "Conference Presentations",
        "Thesis Defense"
      ],
      careerPaths: [
        "University Professor",
        "Research Scientist",
        "Chief Technology Officer",
        "Senior Research Engineer",
        "Technology Innovation Leader",
        "Academic Researcher",
        "Industry Research Director",
        "Technology Policy Advisor"
      ],
      requirements: [
        "Master's degree in Computer Science or related field",
        "Minimum GPA of 3.5",
        "Research proposal",
        "English proficiency",
        "Academic references",
        "Research experience"
      ],
      tuition: "TZS 4,000,000 per year",
      isPopular: false,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  const levelCategories = [
    { value: 'All', label: 'All Programs' },
    { value: 'undergraduate', label: 'Undergraduate' },
    { value: 'graduate', label: 'Graduate' },
    { value: 'certificate', label: 'Certificates' }
  ];

  const filteredPrograms = selectedLevel === 'All' 
    ? programs 
    : programs.filter(program => program.level === selectedLevel);

  const getLevelColor = (level: string) => {
    const colors: { [key: string]: string } = {
      'undergraduate': 'bg-blue-100 text-blue-800',
      'graduate': 'bg-orange-100 text-orange-800',
      'certificate': 'bg-green-100 text-green-800'
    };
    return colors[level] || 'bg-gray-100 text-gray-800';
  };

  const toggleProgram = (programId: number) => {
    setExpandedProgram(expandedProgram === programId ? null : programId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Academic Programmes</h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Discover our comprehensive range of undergraduate and graduate programmes designed to prepare you for the future of technology and mathematics.
            </p>
          </div>
        </div>
      </section>

      {/* Level Filter */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {levelCategories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedLevel(category.value)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedLevel === category.value
                    ? 'bg-orange-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-orange-50 hover:text-orange-600 shadow-md hover:shadow-lg'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredPrograms.map((program, index) => (
              <div
                key={program.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                {/* Program Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(program.level)}`}>
                      {levelCategories.find(cat => cat.value === program.level)?.label}
                    </span>
                  </div>
                  {program.isPopular && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                        <Star size={14} className="mr-1" />
                        Popular
                      </div>
                    </div>
                  )}
                </div>

                {/* Program Info */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{program.title}</h3>
                  <p className="text-gray-600 mb-6 line-clamp-3">{program.description}</p>
                  
                  {/* Program Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-lg font-bold text-orange-600">{program.duration}</div>
                      <div className="text-sm text-gray-600">Duration</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-orange-600">{program.credits}</div>
                      <div className="text-sm text-gray-600">Credits</div>
                    </div>
                  </div>

                  {/* Tuition */}
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-900">{program.tuition}</div>
                      <div className="text-sm text-blue-700">Annual Tuition</div>
                    </div>
                  </div>

                  {/* Expand/Collapse Button */}
                  <button
                    onClick={() => toggleProgram(program.id)}
                    className="w-full flex items-center justify-center text-orange-600 hover:text-blue-900 font-semibold py-3 transition-colors duration-300"
                  >
                    {expandedProgram === program.id ? (
                      <>
                        <span>Show Less</span>
                        <ChevronUp size={20} className="ml-2" />
                      </>
                    ) : (
                      <>
                        <span>View Details</span>
                        <ChevronDown size={20} className="ml-2" />
                      </>
                    )}
                  </button>

                  {/* Expanded Content */}
                  {expandedProgram === program.id && (
                    <div className="mt-6 space-y-6 border-t pt-6">
                      {/* Curriculum */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <BookOpen size={18} className="mr-2 text-orange-600" />
                          Curriculum Highlights
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {program.curriculum.slice(0, 8).map((course, idx) => (
                            <div key={idx} className="flex items-start">
                              <CheckCircle size={16} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{course}</span>
                            </div>
                          ))}
                          {program.curriculum.length > 8 && (
                            <div className="col-span-2 text-sm text-gray-500">
                              +{program.curriculum.length - 8} more courses
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Career Paths */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Career Opportunities</h4>
                        <div className="flex flex-wrap gap-2">
                          {program.careerPaths.slice(0, 6).map((career, idx) => (
                            <span key={idx} className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
                              {career}
                            </span>
                          ))}
                          {program.careerPaths.length > 6 && (
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                              +{program.careerPaths.length - 6} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Requirements */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Entry Requirements</h4>
                        <ul className="space-y-2">
                          {program.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-start">
                              <ArrowRight size={16} className="text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-6">
                    <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                      Apply Now
                    </button>
                    <button className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300">
                      <ExternalLink size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Programs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Programmes?</h2>
            <p className="text-xl text-gray-600">Excellence in education and industry relevance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-all duration-300">
                <BookOpen size={32} className="text-blue-600 group-hover:text-white transition-all duration-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Industry-Relevant Curriculum</h3>
              <p className="text-gray-600">Updated curriculum aligned with industry needs and latest technologies</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-600 transition-all duration-300">
                <Users size={32} className="text-orange-600 group-hover:text-white transition-all duration-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Faculty</h3>
              <p className="text-gray-600">Learn from experienced professors and industry professionals</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600 transition-all duration-300">
                <Clock size={32} className="text-green-600 group-hover:text-white transition-all duration-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Flexible Learning</h3>
              <p className="text-gray-600">Multiple study options including full-time, part-time, and online</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-600 transition-all duration-300">
                <Globe size={32} className="text-purple-600 group-hover:text-white transition-all duration-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Global Recognition</h3>
              <p className="text-gray-600">Internationally recognized degrees and certifications</p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Ready to Apply?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Take the first step towards your future in computer science and mathematics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300 transform hover:scale-105">
              Apply Now
            </button>
            <Link 
              to="/contact" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300 inline-block transform hover:scale-105"
            >
              Contact Admissions
            </Link>
          </div>
        </div>
      </section>

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
    </div>
  );
};

export default Programs;