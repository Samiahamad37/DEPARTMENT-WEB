import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, ExternalLink, GraduationCap, Award, BookOpen } from 'lucide-react';

interface StaffMember {
  id: number;
  name: string;
  title: string;
  role: string;
  specialization: string;
  bio: string;
  photo: string;
  email: string;
  phone: string;
  office_location: string;
  education: string[];
  research_areas: string[];
  publications: number;
  awards: string[];
}

const OurPeople: React.FC = () => {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);

  // Static staff data - will be replaced with API data later
  const staticStaff: StaffMember[] = [
    {
      id: 1,
      name: "Dr. Maria Santos",
      title: "Head of Department",
      role: "head",
      specialization: "Artificial Intelligence & Machine Learning",
      bio: "Dr. Santos leads the department with over 15 years of experience in AI research and education. She has published extensively in top-tier journals and has led numerous research projects in machine learning applications for healthcare and education.",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
      email: "maria.santos@aru.ac.tz",
      phone: "+255 22 277 5001",
      office_location: "CSM Building, Room 201",
      education: ["PhD in Computer Science, MIT", "MSc in Artificial Intelligence, Stanford", "BSc in Computer Science, University of Dar es Salaam"],
      research_areas: ["Machine Learning", "Deep Learning", "Natural Language Processing", "Computer Vision"],
      publications: 45,
      awards: ["Best Researcher Award 2023", "Outstanding Faculty Member 2022"]
    },
    {
      id: 2,
      name: "Prof. David Kiprop",
      title: "Professor of Computer Science",
      role: "lecturer",
      specialization: "Cybersecurity & Network Security",
      bio: "Professor Kiprop is a leading expert in cybersecurity with extensive experience in both academia and industry. He has consulted for major organizations and has been instrumental in developing Tanzania's cybersecurity policies.",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      email: "david.kiprop@aru.ac.tz",
      phone: "+255 22 277 5002",
      office_location: "CSM Building, Room 205",
      education: ["PhD in Cybersecurity, Carnegie Mellon", "MSc in Information Security, University of London", "BSc in Computer Science, Makerere University"],
      research_areas: ["Cybersecurity", "Network Security", "Cryptography", "Digital Forensics"],
      publications: 38,
      awards: ["Cybersecurity Excellence Award 2023", "Research Innovation Award 2021"]
    },
    {
      id: 3,
      name: "Dr. Anna Wanjiku",
      title: "Senior Lecturer",
      role: "lecturer",
      specialization: "Data Science & Analytics",
      bio: "Dr. Wanjiku specializes in data science and has been at the forefront of applying big data analytics to solve real-world problems in Tanzania. She leads the Data Science Research Group and mentors numerous graduate students.",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      email: "anna.wanjiku@aru.ac.tz",
      phone: "+255 22 277 5003",
      office_location: "CSM Building, Room 210",
      education: ["PhD in Statistics, University of Cape Town", "MSc in Data Science, University of Edinburgh", "BSc in Mathematics, University of Nairobi"],
      research_areas: ["Data Science", "Big Data Analytics", "Statistical Modeling", "Business Intelligence"],
      publications: 32,
      awards: ["Data Science Innovation Award 2022", "Outstanding Mentor Award 2023"]
    },
    {
      id: 4,
      name: "Dr. Robert Kimani",
      title: "Lecturer",
      role: "lecturer",
      specialization: "Software Engineering & Web Development",
      bio: "Dr. Kimani is passionate about software engineering education and has developed innovative teaching methods that bridge the gap between academia and industry. He maintains strong connections with the tech industry.",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
      email: "robert.kimani@aru.ac.tz",
      phone: "+255 22 277 5004",
      office_location: "CSM Building, Room 215",
      education: ["PhD in Software Engineering, University of Waterloo", "MSc in Computer Science, University of Toronto", "BSc in Computer Science, JKUAT"],
      research_areas: ["Software Engineering", "Web Development", "Mobile Applications", "Human-Computer Interaction"],
      publications: 28,
      awards: ["Teaching Excellence Award 2023", "Industry Partnership Award 2022"]
    },
    {
      id: 5,
      name: "Dr. Lisa Wang",
      title: "Assistant Lecturer",
      role: "assistant_lecturer",
      specialization: "Internet of Things & Embedded Systems",
      bio: "Dr. Wang is an emerging researcher in IoT and embedded systems. She brings fresh perspectives to the department and is actively involved in collaborative research projects with international partners.",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
      email: "lisa.wang@aru.ac.tz",
      phone: "+255 22 277 5005",
      office_location: "CSM Building, Room 220",
      education: ["PhD in Electrical Engineering, Tsinghua University", "MSc in Embedded Systems, Delft University", "BSc in Computer Engineering, Beijing Institute of Technology"],
      research_areas: ["Internet of Things", "Embedded Systems", "Sensor Networks", "Smart Cities"],
      publications: 15,
      awards: ["Young Researcher Award 2023", "International Collaboration Award 2022"]
    },
    {
      id: 6,
      name: "Grace Mwangi",
      title: "Administrative Assistant",
      role: "admin",
      specialization: "Academic Administration",
      bio: "Grace ensures the smooth operation of the department's administrative functions. She has been with the department for over 10 years and is an invaluable member of the team.",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=764&q=80",
      email: "grace.mwangi@aru.ac.tz",
      phone: "+255 22 277 5006",
      office_location: "CSM Building, Room 101",
      education: ["MSc in Business Administration, University of Dar es Salaam", "BSc in Public Administration, Ardhi University"],
      research_areas: ["Academic Administration", "Student Services", "Quality Assurance"],
      publications: 0,
      awards: ["Outstanding Staff Member 2023", "Service Excellence Award 2022"]
    }
  ];

  const roleCategories = [
    { value: 'All', label: 'All Staff' },
    { value: 'head', label: 'Leadership' },
    { value: 'lecturer', label: 'Faculty' },
    { value: 'assistant_lecturer', label: 'Assistant Lecturers' },
    { value: 'admin', label: 'Administrative Staff' },
    { value: 'technical', label: 'Technical Staff' }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStaff(staticStaff);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredStaff = selectedRole === 'All' 
    ? staff 
    : staff.filter(member => member.role === selectedRole);

  const getRoleColor = (role: string) => {
    const colors: { [key: string]: string } = {
      'head': 'bg-purple-100 text-purple-800',
      'lecturer': 'bg-blue-100 text-blue-800',
      'assistant_lecturer': 'bg-green-100 text-green-800',
      'admin': 'bg-orange-100 text-orange-800',
      'technical': 'bg-gray-100 text-gray-800'
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

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

      {/* Role Filter */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {roleCategories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedRole(category.value)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedRole === category.value
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

      {/* Staff Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStaff.map((member, index) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                {/* Staff Photo */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                      {roleCategories.find(cat => cat.value === member.role)?.label}
                    </span>
                  </div>
                  {member.awards.length > 0 && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-orange-600 text-white p-2 rounded-full">
                        <Award size={16} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Staff Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-orange-600 font-semibold mb-3">{member.title}</p>
                  <p className="text-gray-600 text-sm mb-4">{member.specialization}</p>
                  
                  <p className="text-gray-700 text-sm mb-6 line-clamp-3">{member.bio}</p>

                  {/* Research Areas */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                      <BookOpen size={16} className="mr-2 text-orange-600" />
                      Research Areas
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {member.research_areas.slice(0, 3).map((area, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {area}
                        </span>
                      ))}
                      {member.research_areas.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{member.research_areas.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">{member.publications}</div>
                      <div className="text-xs text-gray-600">Publications</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">{member.awards.length}</div>
                      <div className="text-xs text-gray-600">Awards</div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail size={16} className="mr-2 text-orange-600" />
                      <span className="truncate">{member.email}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone size={16} className="mr-2 text-orange-600" />
                      <span>{member.phone}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin size={16} className="mr-2 text-orange-600" />
                      <span>{member.office_location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Our Team</h2>
          <p className="text-xl text-gray-600 mb-8">
            Are you passionate about computer science and mathematics education? We're always looking for talented individuals to join our growing team.
          </p>
          <button className="inline-flex items-center px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            View Open Positions
            <ExternalLink size={20} className="ml-2" />
          </button>
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

export default OurPeople;
