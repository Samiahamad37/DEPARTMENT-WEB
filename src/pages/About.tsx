import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Target,
  Eye,
  Clock,
  Users,
  Award,
  BookOpen,
  ChevronRight,
  Building2,
  Globe,
  Quote,
  ChevronDown,
  Mail,
  Phone,
  GraduationCap,
} from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import image1 from "../assets/photo1.jpeg";

const missionCards = [
  {
    icon: Target,
    title: "Mission",
    desc: "Deliver world-class education and research in computer systems and mathematics, empowering students for global impact.",
  },
  {
    icon: Eye,
    title: "Vision",
    desc: "To be Africa's leading center for computational sciences and innovation.",
  },
  {
    icon: Award,
    title: "Values",
    desc: "Excellence, Innovation, Collaboration, Integrity, Diversity.",
  },
];

const leadership = [
  {
    name: "Dr. Godfrey Luwemba",
    role: "Head of Department",
    img: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
];

const staffMembers = [
  {
    id: 1,
    name: "Dr. Godfrey Luwemba",
    role: "Head of Department & Professor",
    department: "Computer Systems & Mathematics",
    img: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
    email: "g.luwemba@university.ac.tz",
    phone: "+255 123 456 789",
    education: "PhD in Computer Science, University of Cambridge",
    specialization: "Distributed Systems, Network Security",
    experience: "15+ years in academia and research",
    publications: "50+ peer-reviewed publications",
    bio: "Dr. Luwemba leads our department with expertise in distributed systems and network security. He has been instrumental in establishing partnerships with international institutions and advancing research in computational sciences."
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    role: "Director of Research & Professor",
    department: "Computer Systems & Mathematics",
    img: "https://images.pexels.com/photos/3184300/pexels-photo-3184300.jpeg?auto=compress&cs=tinysrgb&w=400",
    email: "m.chen@university.ac.tz",
    phone: "+255 123 456 790",
    education: "PhD in Applied Mathematics, MIT",
    specialization: "Machine Learning, Data Science, Mathematical Modeling",
    experience: "20+ years in research and development",
    publications: "80+ research papers in top-tier journals",
    bio: "Prof. Chen oversees our research initiatives and has made significant contributions to machine learning applications in healthcare and finance. He leads multiple international research collaborations."
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    role: "Academic Coordinator & Associate Professor",
    department: "Computer Systems & Mathematics",
    img: "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=400",
    email: "e.rodriguez@university.ac.tz",
    phone: "+255 123 456 791",
    education: "PhD in Software Engineering, Stanford University",
    specialization: "Software Architecture, Cloud Computing, DevOps",
    experience: "12+ years in industry and academia",
    publications: "35+ conference and journal publications",
    bio: "Dr. Rodriguez coordinates our academic programs and brings extensive industry experience from her work at major tech companies. She specializes in modern software development practices and cloud technologies."
  },
  {
    id: 4,
    name: "Dr. James Mwangi",
    role: "Senior Lecturer",
    department: "Computer Systems & Mathematics",
    img: "https://images.pexels.com/photos/3184302/pexels-photo-3184302.jpeg?auto=compress&cs=tinysrgb&w=400",
    email: "j.mwangi@university.ac.tz",
    phone: "+255 123 456 792",
    education: "PhD in Cybersecurity, University of Oxford",
    specialization: "Cybersecurity, Cryptography, Information Security",
    experience: "10+ years in cybersecurity research",
    publications: "25+ security-focused research papers",
    bio: "Dr. Mwangi leads our cybersecurity initiatives and has developed several innovative security protocols. He regularly consults for government agencies and private organizations on security matters."
  },
  {
    id: 5,
    name: "Dr. Sarah Kimani",
    role: "Lecturer & Lab Coordinator",
    department: "Computer Systems & Mathematics",
    img: "https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=400",
    email: "s.kimani@university.ac.tz",
    phone: "+255 123 456 793",
    education: "PhD in Human-Computer Interaction, University of Edinburgh",
    specialization: "HCI, UI/UX Design, Mobile Computing",
    experience: "8+ years in user experience research",
    publications: "20+ HCI and design publications",
    bio: "Dr. Kimani coordinates our computer labs and focuses on human-computer interaction research. She has designed several award-winning mobile applications and leads our UI/UX research group."
  }
];

const milestones = [
  { year: "1995", event: "Department founded" },
  { year: "2005", event: "First MSc program launched" },
  { year: "2010", event: "Research center established" },
  { year: "2020", event: "AI Lab opened" },
  { year: "2024", event: "ABET accreditation achieved" },
];

const testimonials = [
  {
    quote:
      "The department gave me the tools to thrive in a global tech environment.",
    name: "Rajabu Shabani.",
    role: "Software Engineer, NEC",
    image: image1,
  },
  {
    quote: "Supportive faculty and world-class labs made all the difference.",
    name: "John M.",
    role: "PhD Student, MIT",
    image:
      "https://images.pexels.com/photos/3184302/pexels-photo-3184302.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
];

const partners = [
  {
    name: "MIT",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/MIT_logo.svg",
  },
  {
    name: "IBM",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
  },
  {
    name: "UNESCO",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/UNESCO_logo.svg",
  },
];

const About: React.FC = () => {
  const ref = useScrollAnimation();
  const [selectedStaff, setSelectedStaff] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Hero */}
      <section className="py-20 px-4 text-center bg-gradient-to-br from-blue-900 to-orange-700 text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          About Our Department
        </h1>
        <p className="text-lg md:text-2xl font-light max-w-2xl mx-auto">
          Pioneering education and research in computer systems and mathematics
          since 1995.
        </p>
      </section>

      {/* leadership */}
      <section className="max-w-5xl mx-auto mt-20 px-4 items-center">
        <h2 className="text-2xl font-bold text-blue-900 mb-8 text-center">
          HEAD OF DEPARTMENT
        </h2>

        <div className="flex justify-center">
          {leadership.map((t) => (
            <div
              key={t.name}
              className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100 flex flex-col w-full max-w-md"
            >
              <img
                src={t.img}
                alt={t.role}
                className="w-full h-96 object-cover"
              />
              <div className="p-6 flex flex-col items-center text-center">
                <p className="font-semibold text-blue-900 text-xl">{t.name}</p>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Staff Members Dropdown Section */}
      <section className="max-w-5xl mx-auto mt-20 px-4">
        <h2 className="text-2xl font-bold text-blue-900 mb-8 text-center">
          Staff Members
        </h2>
        
        {/* Dropdown Menu */}
        <div className="relative mb-8 flex justify-center">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full max-w-md flex items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-3 shadow-sm hover:bg-gray-50 transition-colors duration-200"
          >
            <span className="text-gray-700">
              {selectedStaff ? staffMembers.find(s => s.id === selectedStaff)?.name : "Select a staff member"}
            </span>
            <ChevronDown 
              className={`text-gray-500 transition-transform duration-200 ${
                isDropdownOpen ? 'rotate-180' : ''
              }`} 
              size={20} 
            />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 w-full max-w-md bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
              {staffMembers.map((staff) => (
                <button
                  key={staff.id}
                  onClick={() => {
                    setSelectedStaff(staff.id);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0"
                >
                  <div className="font-medium text-gray-900">{staff.name}</div>
                  <div className="text-sm text-gray-600">{staff.role}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Selected Staff Details */}
        {selectedStaff && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            {(() => {
              const staff = staffMembers.find(s => s.id === selectedStaff);
              if (!staff) return null;
              
              return (
                <div className="md:flex">
                  {/* Staff Image */}
                  <div className="md:w-1/3">
                    <img
                      src={staff.img}
                      alt={staff.name}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  
                  {/* Staff Details */}
                  <div className="md:w-2/3 p-6">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-blue-900 mb-2">{staff.name}</h3>
                      <p className="text-lg text-orange-600 font-semibold mb-1">{staff.role}</p>
                      <p className="text-gray-600">{staff.department}</p>
                    </div>
                    
                    {/* Contact Information */}
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center text-gray-700">
                        <Mail size={16} className="mr-2 text-blue-600" />
                        <span className="text-sm">{staff.email}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Phone size={16} className="mr-2 text-blue-600" />
                        <span className="text-sm">{staff.phone}</span>
                      </div>
                    </div>
                    
                    {/* Education */}
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <GraduationCap size={18} className="mr-2 text-orange-600" />
                        <h4 className="font-semibold text-gray-900">Education</h4>
                      </div>
                      <p className="text-gray-700 text-sm">{staff.education}</p>
                    </div>
                    
                    {/* Specialization */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Specialization</h4>
                      <p className="text-gray-700 text-sm">{staff.specialization}</p>
                    </div>
                    
                    {/* Experience & Publications */}
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Experience</h4>
                        <p className="text-gray-700 text-sm">{staff.experience}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Publications</h4>
                        <p className="text-gray-700 text-sm">{staff.publications}</p>
                      </div>
                    </div>
                    
                    {/* Biography */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Biography</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">{staff.bio}</p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </section>

      {/* Mission, Vision, Values */}
      <section className="max-w-5xl mx-auto mt-20 px-4">
        <h2 className="text-2xl font-bold text-blue-900 mb-8 text-center">
          Our Mission, Vision, and Values
        </h2>
        
        <div ref={ref} className="grid md:grid-cols-3 gap-6">
          {missionCards.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center border-l-4 border-orange-600"
            >
              <card.icon className="text-blue-900 mb-4" size={48} />
              <h3 className="text-xl font-bold text-blue-900 mb-4">
                {card.title}
              </h3>
              <p className="text-gray-600">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-5xl mx-auto mt-20 px-4">
        <h2 className="text-2xl font-bold text-blue-900 mb-8 text-center">
          Why Choose Us?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg shadow text-left">
            <Users className="text-orange-600 mb-2" size={30} />
            <h4 className="font-semibold text-blue-900">Expert Faculty</h4>
            <p className="text-sm text-gray-600">
              World-class professors with industry and research experience.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow text-left">
            <Building2 className="text-orange-600 mb-2" size={30} />
            <h4 className="font-semibold text-blue-900">Modern Facilities</h4>
            <p className="text-sm text-gray-600">
              State-of-the-art labs and computing infrastructure.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow text-left">
            <BookOpen className="text-orange-600 mb-2" size={30} />
            <h4 className="font-semibold text-blue-900">Advanced Curriculum</h4>
            <p className="text-sm text-gray-600">
              Programs designed for future-ready careers.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow text-left">
            <Clock className="text-orange-600 mb-2" size={30} />
            <h4 className="font-semibold text-blue-900">Flexible Learning</h4>
            <p className="text-sm text-gray-600">
              Blended modes for working professionals and researchers.
            </p>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="max-w-5xl mx-auto mt-20 px-4">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Our Journey</h2>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {milestones.map((m, i) => (
            <div key={m.year} className="flex flex-col items-center">
              <div className="bg-orange-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mb-2">
                {m.year}
              </div>
              <div className="text-blue-900 font-semibold text-center mb-2">
                {m.event}
              </div>
              {i < milestones.length - 1 && (
                <div className="hidden md:block h-1 w-16 bg-blue-200 mx-auto" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-4xl mx-auto mt-20 px-4 text-center">
        <h2 className="text-2xl font-bold text-blue-900 mb-8">
          What Our Alumni Say
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100 flex flex-col"
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-full h-96 object-cover "
              />
              <div className="p-6 flex flex-col items-center text-center">
                <Quote size={24} className="text-orange-600 mb-2" />
                <p className="text-gray-700 italic mb-4">"{t.quote}"</p>
                <p className="font-semibold text-blue-900">{t.name}</p>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Collaborations */}
      <section className="max-w-5xl mx-auto mt-20 px-4 text-center">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">
          Our Collaborations
        </h2>
        <div className="flex flex-wrap justify-center gap-10">
          {partners.map((p) => (
            <div
              key={p.name}
              className="w-28 h-20 flex items-center justify-center p-2 bg-white rounded shadow"
            >
              <img
                src={p.logo}
                alt={p.name}
                className="max-h-12 object-contain"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r text-center mt-20">
        <h2 className="text-3xl font-bold mb-4 text-orange-600">
          Ready to Learn More?
        </h2>
        <p className="mb-6 text-lg">
          Explore our programs, connect with faculty, and be part of a
          transformative journey.
        </p>
        <Link
          className="bg-white text-blue-900 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition duration-300"
          to="/programs"
        >
          Explore Programs
        </Link>
      </section>
    </div>
  );
};

export default About;
