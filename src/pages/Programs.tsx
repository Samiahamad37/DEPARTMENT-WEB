import React, { useState } from 'react';
import { BookOpen, GraduationCap, ChevronRight, Users, Globe, Lightbulb } from 'lucide-react';

const allPrograms = [
  {
    title: 'Bsc.Computer Systems Networks',
    icon: BookOpen,
    desc: 'BSc in Computer Systems Networking, Information Systems Management, and Data Science.',
    highlights: ['ABET Accredited', 'Industry Internships', 'Capstone Projects'],
    to: '/networking',
    type: 'undergraduate',
  },
   {
    title: 'Bsc.Infomationa Systems Management ',
    icon: BookOpen,
    desc: 'BSc in Computer Systems Networking, Information Systems Management, and Data Science.',
    highlights: ['ABET Accredited', 'Industry Internships', 'Capstone Projects'],
    to: '/information',
    type: 'undergraduate',
  },
   {
    title: 'Bsc.Data Science',
    icon: BookOpen,
    desc: 'BSc in Computer Systems Networking, Information Systems Management, and Data Science.',
    highlights: ['ABET Accredited', 'Industry Internships', 'Capstone Projects'],
    to: '/data',
    type: 'undergraduate',
  },
 
  {
    title: 'Msc.Information Systems Management',
    icon: GraduationCap,
    desc: 'Information Systems Management.',
    highlights: ['Research Assistantships', 'Conference Opportunities', 'Industry Collaboration'],
    to: '/masters',
    type: 'postgraduate',
  },
];

const extras = [
  {
    title: 'Global Perspective',
    icon: Globe,
    desc: 'Our curriculum integrates international standards, preparing students to excel globally.',
  },
  {
    title: 'Industry Collaboration',
    icon: Users,
    desc: 'We partner with tech companies, research bodies, and incubators to offer real-world experience.',
  },
  {
    title: 'Innovation Culture',
    icon: Lightbulb,
    desc: 'Innovation is central. We encourage students to build startups, research, and creative projects.',
  },
];

const Programs: React.FC = () => {
  const [filter, setFilter] = useState<'undergraduate' | 'postgraduate'>('undergraduate');

  const filteredPrograms = allPrograms.filter((prog) => prog.type === filter);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-br from-blue-900 to-orange-700 text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Our Programs</h1>
        <p className="text-lg md:text-2xl font-light max-w-2xl mx-auto">
          Explore our comprehensive undergraduate and postgraduate programs.
        </p>
      </section>

      {/* Filter Navbar */}
      <div className="flex justify-center mt-12 space-x-4 px-4">
        {(['undergraduate', 'postgraduate'] as const).map((key) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-5 py-2 rounded-full font-medium border transition ${
              filter === key
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-blue-900 hover:bg-orange-100'
            }`}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>

      {/* Program Cards */}
      <section className="max-w-5xl mx-auto mt-10 px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {filteredPrograms.map((prog) => (
            <a
              key={prog.title}
              href={prog.to}
              className="block bg-white rounded-xl shadow-md p-8 border border-l-4 border-green-600 pl-6 hover:shadow-lg transition"
            >
              <prog.icon size={40} className="mb-3 text-orange-600" />
              <h3 className="text-xl font-bold text-blue-900 mb-2">{prog.title}</h3>
              <p className="text-gray-600 mb-4">{prog.desc}</p>
              <span className="inline-flex items-center text-orange-600 font-medium">
                Learn More <ChevronRight size={16} className="ml-1" />
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mt-24 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6">
          Why Choose Our Programs?
        </h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 text-left">
          {extras.map((extra) => (
            <div
              key={extra.title}
              className="bg-blue-50 border border-l-4 border-orange-600 p-6 rounded-xl shadow-sm"
            >
              <extra.icon size={32} className="text-blue-900 mb-3" />
              <h3 className="font-semibold text-blue-900 mb-2">{extra.title}</h3>
              <p className="text-gray-700 text-sm">{extra.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="mt-24 bg-gradient-to-r   py-16 text-center px-4 mb-40">
        <h2 className="text-5xl font-bold mb-4 text-orange-600">Ready to Begin Your Journey?</h2>
        <p className="text-lg mb-6 text-gray-400" >Discover how our programs can transform your future.</p>
        <a
          href="/contact"
          className="bg-orange-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-orange-100 transition"
        >
          Get in Touch
        </a>
      </section>
    </div>
  );
};

export default Programs;
