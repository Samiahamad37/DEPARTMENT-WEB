import React, { useState } from 'react';
import { Mail, MapPin, ExternalLink, Award, BookOpen, Calendar } from 'lucide-react';
import { useTeam } from '../hooks/useTeam';
import { Team } from '../types/api';
import StaffProfileModal from '../components/StaffProfileModal';

const OurPeople: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string>('All');
  const [selectedStaff, setSelectedStaff] = useState<Team | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Fetch team data from API
  const { data: staff = [], isLoading, error } = useTeam();

  // Fallback static staff data if API fails
  const fallbackStaff: Team[] = [
    {
      id: 1,
      name: "Dr. Maria Santos",
      role: "head",
      specialization: "Artificial Intelligence & Machine Learning",
      bio: "Dr. Santos leads the department with over 15 years of experience in AI research and education. She has published extensively in top-tier journals and has led numerous research projects in machine learning applications for healthcare and education.",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
      email: "maria.santos@aru.ac.tz",
      phone: "+255 22 277 5001",
      office_location: "CSM Building, Room 201",
      is_active: true,
      is_on_study_leave: false,
      display_order: 1,
      title: "Head of Department",
      education: ["PhD in Computer Science, MIT", "MSc in Artificial Intelligence, Stanford", "BSc in Mathematics, University of Dar es Salaam"],
      research_areas: ["Machine Learning", "Artificial Intelligence", "Healthcare Technology"],
      publications_count: 45,
      awards: ["AI Research Excellence Award 2023", "Outstanding Educator Award 2022"]
    },
    {
      id: 2,
      name: "Prof. David Kiprop",
      role: "professor",
      specialization: "Cybersecurity & Network Security",
      bio: "Professor Kiprop is a leading expert in cybersecurity with extensive experience in both academia and industry. He has consulted for major organizations and has been instrumental in developing Tanzania's cybersecurity policies.",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      email: "david.kiprop@aru.ac.tz",
      phone: "+255 22 277 5002",
      office_location: "CSM Building, Room 205",
      is_active: true,
      is_on_study_leave: false,
      display_order: 2,
      title: "Professor of Computer Science",
      education: ["PhD in Cybersecurity, Carnegie Mellon", "MSc in Information Security, University of London", "BSc in Computer Science, Makerere University"],
      research_areas: ["Cybersecurity", "Network Security", "Cryptography", "Digital Forensics"],
      publications_count: 38,
      awards: ["Cybersecurity Excellence Award 2023", "Research Innovation Award 2021"]
    },
    {
      id: 3,
      name: "Dr. Anna Wanjiku",
      role: "senior_lecturer",
      specialization: "Data Science & Analytics",
      bio: "Dr. Wanjiku specializes in data science and has been at the forefront of applying big data analytics to solve real-world problems in Tanzania. She leads the Data Science Research Group and mentors numerous graduate students.",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      email: "anna.wanjiku@aru.ac.tz",
      phone: "+255 22 277 5003",
      office_location: "CSM Building, Room 210",
      is_active: true,
      is_on_study_leave: true,
      display_order: 3,
      title: "Senior Lecturer",
      education: ["PhD in Data Science, University of Cape Town", "MSc in Statistics, University of Nairobi", "BSc in Mathematics, University of Dar es Salaam"],
      research_areas: ["Data Science", "Machine Learning", "Statistical Analysis"],
      publications_count: 28,
      awards: ["Data Science Innovation Award 2022"]
    }
  ];

  const staffData = staff.length > 0 ? staff : fallbackStaff;

  // Get unique roles for filter
  const uniqueRoles = Array.from(new Set(staffData.map(member => member.role)));
  const roleOptions = [
    { value: 'All', label: 'All Staff' },
    ...uniqueRoles.map(role => ({
      value: role,
      label: staffData.find(member => member.role === role)?.get_role_display || role
    }))
  ];

  const filteredStaff = selectedRole === 'All' 
    ? staffData 
    : staffData.filter(member => member.role === selectedRole);

  const handleStaffClick = (member: Team) => {
    setSelectedStaff(member);
    setIsModalOpen(true);
  };

  const getRoleColor = (role: string) => {
    const colors: { [key: string]: string } = {
      'head': 'bg-purple-100 text-purple-800',
      'professor': 'bg-red-100 text-red-800',
      'associate_professor': 'bg-pink-100 text-pink-800',
      'senior_lecturer': 'bg-blue-100 text-blue-800',
      'lecturer': 'bg-indigo-100 text-indigo-800',
      'assistant_lecturer': 'bg-green-100 text-green-800',
      'tutorial_assistant': 'bg-teal-100 text-teal-800',
      'admin': 'bg-orange-100 text-orange-800',
      'technical': 'bg-gray-100 text-gray-800'
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

  // Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading staff information...</p>
          </div>
        </div>
      </div>
    );
  }

  // Handle error
  if (error) {
    console.error('Error loading staff:', error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our People</h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Meet the dedicated faculty and staff who are shaping the future of computer science and mathematics education at Ardhi University.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {roleOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedRole(option.value)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  selectedRole === option.value
                    ? 'bg-orange-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Staff Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStaff.map((member) => (
              <div
                key={member.id}
                onClick={() => handleStaffClick(member)}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 group"
              >
                <div className="relative">
                  <div className="h-64 bg-gray-200 rounded-t-lg overflow-hidden">
                    {member.photo ? (
                      <img 
                        src={member.photo} 
                        alt={member.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl font-medium">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  
                  {/* Study Leave Badge */}
                  {member.is_on_study_leave && (
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Calendar className="h-3 w-3 mr-1" />
                        On Study Leave
                      </span>
                    </div>
                  )}

                  {/* Awards Badge */}
                  {member.awards && Array.isArray(member.awards) && member.awards.length > 0 && (
                    <div className="absolute top-4 left-4">
                      <div className="bg-orange-600 text-white p-2 rounded-full">
                        <Award size={16} />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                        {member.title || member.get_role_display || member.role}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{member.specialization}</p>
                  </div>

                  <div className="space-y-3">
                    {member.email && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="truncate">{member.email}</span>
                      </div>
                    )}
                    {member.office_location && (
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{member.office_location}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        {member.publications_count && member.publications_count > 0 && (
                          <div className="flex items-center">
                            <BookOpen className="h-4 w-4 mr-1" />
                            <span>{member.publications_count} publications</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center text-orange-600 group-hover:text-orange-700">
                        <span className="text-sm font-medium">View Profile</span>
                        <ExternalLink className="h-4 w-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredStaff.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">👥</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Staff Found</h3>
              <p className="text-gray-600">No staff members found for the selected role.</p>
            </div>
          )}
        </div>
      </section>

      {/* Staff Profile Modal */}
      <StaffProfileModal
        staff={selectedStaff!}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedStaff(null);
        }}
      />
    </div>
  );
};

export default OurPeople;