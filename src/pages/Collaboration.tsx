import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
// import {
//   Building,
//   Globe,
//   Handshake,
//   TrendingUp,
//   ExternalLink,
//   Calendar,
// } from 'lucide-react';

const partners = [
  { name: 'Microsoft Tanzania', type: 'Industry', region: 'Local', logo: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'University of Dar es Salaam', type: 'Academic', region: 'Local', logo: 'https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'IBM Research Africa', type: 'Research', region: 'International', logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Vodacom Tanzania', type: 'Industry', region: 'Local', logo: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'CRDB Bank', type: 'Financial', region: 'Local', logo: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Carnegie Mellon Univers', type: 'Academic', region: 'International', logo: 'https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'MIT Media Lab', type: 'Research', region: 'International', logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Tanzania Commission for Science and Technology', type: 'Government', region: 'Local', logo: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Thomas Moore University of Applied Sciences', type: 'International', region: 'International', logo: 'https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg?auto=compress&cs=tinysrgb&w=400' },
];

const projects = [
  {
    title: 'Smart City Solutions',
    partners: 'Microsoft, UDSM',
    desc: 'IoT, AI analytics, and citizen services for Dar es Salaam.',
    duration: '2023–2025',
  },
    {
    title: 'Smart City Solutions',
    partners: 'Microsoft, UDSM',
    desc: 'IoT, AI analytics, and citizen services for Dar es Salaam.',
    duration: '2023–2025',
  },
    {
    title: 'Smart City Solutions',
    partners: 'Microsoft, UDSM',
    desc: 'IoT, AI analytics, and citizen services for Dar es Salaam.',
    duration: '2023–2025',
  },
  {
    title: 'AI for Healthcare',
    partners: 'Carnegie Mellon',
    desc: 'Deep learning for medical image analysis and diagnostics.',
    duration: '2023–2026',
  },
  {
    title: 'Mobile Banking Security',
    partners: 'Vodacom, CRDB',
    desc: 'Blockchain and biometrics for secure mobile money systems.',
    duration: '2023–2024',
  },
  {
    title: 'Quantum Computing Initiative',
    partners: 'IBM, MIT',
    desc: 'Quantum algorithms targeting logistics and financial optimization.',
    duration: '2024–2027',
  },
];

const Collaboration: React.FC = () => (
  <div className="bg-white min-h-screen flex flex-col">
    {/* Hero/Intro */}
    <section className="py-20 px-4 text-center bg-gradient-to-br from-blue-900 to-orange-700 text-white">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
        Collaborations & Partnerships
      </h1>
      <p className="text-lg md:text-2xl font-light max-w-2xl mx-auto">
        Building strong local and global alliances to power real-world innovation, research, and industry transformation.
      </p>
    </section>

    {/* Intro Statement */}
    <section className="max-w-5xl mx-auto mt-16 px-4 text-center">
      <p className="text-gray-500 text-xl leading-relaxed max-w-3xl mx-auto">
        Collaboration is at the core of our mission. We engage with top academic institutions,
        research organizations, and industry leaders to co-develop impactful solutions. From
        smart cities to AI in healthcare, our partnerships drive innovation, provide hands-on
        experience for students, and solve real challenges in Tanzania and beyond.
      </p>
    </section>

    {/* Partners Section */}
    <section className="max-w-5xl mx-auto mt-20 px-4">
      <h2 className="text-5xl text-center font-bold text-orange-600 mb-6">Our Partners</h2>

      {/* Local Partners */}
      <h3 className="text-xl font-semibold text-orange-600 text-center mb-6">Local Partners</h3>
      <div className="grid md:grid-cols-3 gap-6 mb-12 ">
        {partners.filter(p => p.region === 'Local').map((p) => (
          <div key={p.name} className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center border-l-4 border-green-600 pl-6 ">
            <img src={p.logo} alt={p.name} className="w-24 h-24 rounded-full object-cover mb-3" />
            <h3 className="text-lg font-semibold text-blue-900 mb-1">{p.name}</h3>
            <p className="text-gray-500 text-xs">{p.type} Partner</p>
          </div>
        ))}
      </div>

      {/* International Partners */}
      <h3 className="text-xl font-semibold text-orange-600 mb-6 text-center">International Partners</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {partners.filter(p => p.region === 'International').map((p) => (
          <div key={p.name} className="bg-white rounded-3xl shadow-md p-6 flex flex-col items-center border-l-4 border-orange-600 pl-6">
            <img src={p.logo} alt={p.name} className="w-24 h-24 rounded-full object-cover mb-3" />
            <h3 className="text-lg font-semibold text-blue-900 mb-1">{p.name}</h3>
            <p className="text-gray-500 text-xs">{p.type} Partner</p>
          </div>
        ))}
      </div>
    </section>

    {/* Joint Projects */}
    <section className="max-w mx-auto mt-24 px-4">
      <h2 className="text-5xl font-bold text-orange-600 mb-6 text-center">Joint Projects</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.title}
            className="bg-white rounded-xl shadow-md p-6  border-l-4 border-orange-600 flex flex-col"
          >
            <h3 className="text-lg font-semibold text-blue-900 mb-2">{proj.title}</h3>
            <p className="text-orange-600 text-xs mb-1">{proj.partners}</p>
            <p className="text-gray-600 text-sm mb-2 flex-1">{proj.desc}</p>
             <Link
              to="/projects"
              className="inline-flex items-center text-orange-600 font-semibold hover:underline"
            >
              View Project <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        ))}
      </div>
    </section>

   
    <section className="mt-24 bg-gradient-to-r  text-white py-16 text-center px-4">
      <h2 className="text-3xl font-bold mb-4 text-orange-600">Interested in Partnering with Us?</h2>
      <p className="text-lg mb-6">We welcome academic institutions, corporations, and innovators to join us.</p>
      <a
        href="/contact"
        className="bg-orange-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-orange-900 transition"
      >
        Contact Us
      </a>
    </section>
  </div>
);

export default Collaboration;
