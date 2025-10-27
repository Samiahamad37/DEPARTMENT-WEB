import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Award, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink,
  CheckCircle,
  ArrowRight,
  FileText,
  Download,
  Clock,
  Star
} from 'lucide-react';

interface Announcement {
  id: number;
  title: string;
  content: string;
  date_posted: string;
  is_important: boolean;
  category: string;
}

interface Program {
  id: number;
  name: string;
  duration: string;
  level: string;
  requirements: string[];
  application_deadline: string;
  intake_period: string;
}

const ProspectiveStudent: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Static data - will be replaced with API data later
  const staticAnnouncements: Announcement[] = [
    {
      id: 1,
      title: "2024/2025 Academic Year Applications Now Open",
      content: "Applications for the 2024/2025 academic year are now open. Apply early to secure your place in our competitive programs.",
      date_posted: "2024-01-15T10:00:00Z",
      is_important: true,
      category: "admissions"
    },
    {
      id: 2,
      title: "New Scholarship Opportunities Available",
      content: "The department is pleased to announce new scholarship opportunities for outstanding students in Computer Science and Mathematics programs.",
      date_posted: "2024-01-12T14:30:00Z",
      is_important: true,
      category: "scholarships"
    },
    {
      id: 3,
      title: "Virtual Campus Tour Available",
      content: "Take a virtual tour of our state-of-the-art facilities and laboratories from the comfort of your home.",
      date_posted: "2024-01-10T09:15:00Z",
      is_important: false,
      category: "campus"
    }
  ];

  const staticPrograms: Program[] = [
    {
      id: 1,
      name: "Bachelor of Science in Computer Science",
      duration: "4 years",
      level: "Undergraduate",
      requirements: [
        "Advanced Level Certificate with at least two principal passes in Mathematics and Physics",
        "Minimum grade C in Mathematics and Physics at O-Level",
        "English language proficiency"
      ],
      application_deadline: "2024-03-31",
      intake_period: "September 2024"
    },
    {
      id: 2,
      name: "Bachelor of Science in Mathematics",
      duration: "4 years",
      level: "Undergraduate",
      requirements: [
        "Advanced Level Certificate with at least two principal passes in Mathematics",
        "Minimum grade C in Mathematics at O-Level",
        "English language proficiency"
      ],
      application_deadline: "2024-03-31",
      intake_period: "September 2024"
    },
    {
      id: 3,
      name: "Master of Science in Computer Science",
      duration: "2 years",
      level: "Postgraduate",
      requirements: [
        "Bachelor's degree in Computer Science or related field",
        "Minimum GPA of 3.0",
        "Research proposal",
        "English language proficiency"
      ],
      application_deadline: "2024-04-30",
      intake_period: "September 2024"
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAnnouncements(staticAnnouncements);
      setPrograms(staticPrograms);
      setIsLoading(false);
    }, 1000);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'admissions': 'bg-blue-100 text-blue-800',
      'scholarships': 'bg-green-100 text-green-800',
      'campus': 'bg-purple-100 text-purple-800',
      'events': 'bg-orange-100 text-orange-800',
      'general': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading information...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-orange-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Prospective Students
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Your Journey to Excellence in Computer Systems and Mathematics Starts Here
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/programmes"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                <BookOpen size={20} className="mr-2" />
                Explore Programs
              </Link>
              <Link
                to="/about/department"
                className="inline-flex items-center px-8 py-4 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-all duration-300 transform hover:scale-105"
              >
                <Users size={20} className="mr-2" />
                Learn About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Message and Application Information */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Thank you for taking the initiative to apply.
            </h2>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg text-left">
              <p className="text-lg text-gray-800 mb-4">
                All applications are managed by Ardhi University through the official university admissions portal.
              </p>
              <a
                href="https://www.aru.ac.tz/admissions"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
              >
                <ExternalLink size={20} className="mr-2" />
                Visit ARU Admissions Portal
              </a>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Application Timeline
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Application Periods</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-orange-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Main Intake</p>
                      <p className="text-sm text-gray-600">Applications typically open in March and close in June</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-blue-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Supplementary Intake</p>
                      <p className="text-sm text-gray-600">Applications typically open in August and close in October</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Important Notes</h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                    <p className="text-sm text-gray-700">Specific dates are subject to official ARU announcements</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                    <p className="text-sm text-gray-700">Application deadlines may vary by program</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                    <p className="text-sm text-gray-700">Early application is recommended for competitive programs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link
              to="/programmes"
              className="group bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <BookOpen className="w-12 h-12 text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Academic Programs</h3>
              <p className="text-gray-600 text-sm">Explore our undergraduate and postgraduate programs</p>
            </Link>

            <Link
              to="/facilities"
              className="group bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <Award className="w-12 h-12 text-green-600 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Facilities</h3>
              <p className="text-gray-600 text-sm">State-of-the-art laboratories and research facilities</p>
            </Link>

            <Link
              to="/about/people"
              className="group bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <Users className="w-12 h-12 text-purple-600 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Faculty & Staff</h3>
              <p className="text-gray-600 text-sm">Meet our experienced faculty and research staff</p>
            </Link>

            <Link
              to="/contact"
              className="group bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <Phone className="w-12 h-12 text-orange-600 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Us</h3>
              <p className="text-gray-600 text-sm">Get in touch with our admissions team</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Announcements */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Latest Announcements
            </h2>
            <p className="text-xl text-gray-600">
              Stay updated with important information for prospective students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 ${
                  announcement.is_important ? 'ring-2 ring-orange-500' : ''
                }`}
              >
                {announcement.is_important && (
                  <div className="flex items-center mb-4">
                    <Star className="w-5 h-5 text-orange-500 mr-2" />
                    <span className="text-sm font-semibold text-orange-600">Important</span>
                  </div>
                )}
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {announcement.title}
                </h3>
                <p className="text-gray-600 mb-4">{announcement.content}</p>
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(announcement.category)}`}>
                    {announcement.category.charAt(0).toUpperCase() + announcement.category.slice(1)}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatDate(announcement.date_posted)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Available Programs
            </h2>
            <p className="text-xl text-gray-600">
              Choose from our comprehensive range of academic programs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {programs.map((program) => (
              <div
                key={program.id}
                className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {program.level}
                  </span>
                  <span className="text-sm text-gray-500">{program.duration}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {program.name}
                </h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Application Deadline: {formatDate(program.application_deadline)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Intake: {program.intake_period}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                  <ul className="space-y-1">
                    {program.requirements.map((req, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/programmes"
                  className="inline-flex items-center w-full justify-center px-4 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-all duration-300"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How to Apply
            </h2>
            <p className="text-xl text-gray-600">
              Follow these simple steps to begin your application
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Your Program</h3>
              <p className="text-gray-600">Select the program that matches your interests and career goals</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Check Requirements</h3>
              <p className="text-gray-600">Ensure you meet all academic and language requirements</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Prepare Documents</h3>
              <p className="text-gray-600">Gather all required documents and transcripts</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Submit Application</h3>
              <p className="text-gray-600">Complete and submit your application before the deadline</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Need Help?
            </h2>
            <p className="text-xl text-gray-600">
              Our admissions team is here to assist you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600">+255 22 241 0000</p>
              <p className="text-sm text-gray-500">Mon-Fri, 8AM-5PM</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">admissions@aru.ac.tz</p>
              <p className="text-sm text-gray-500">24/7 support</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600">Ardhi University</p>
              <p className="text-sm text-gray-500">Dar es Salaam, Tanzania</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProspectiveStudent;
