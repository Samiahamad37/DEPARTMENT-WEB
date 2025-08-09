import React from 'react';
import {
  Brain,
  Database,
  Shield,
  Cpu,
  Code,
  BarChart3,
  BookOpen,
  Users,
  ChevronRight,
} from 'lucide-react';

const researchAreas = [
  {
    title: 'AI & Machine Learning',
    icon: Brain,
    desc: 'Deep learning, computer vision, NLP, and smart systems.',
  },
  {
    title: 'Data Science & Analytics',
    icon: Database,
    desc: 'Big data, predictive analytics, and statistical modeling.',
  },
  {
    title: 'Cybersecurity',
    icon: Shield,
    desc: 'Network security, cryptography, and digital forensics.',
  },
  {
    title: 'Systems Architecture',
    icon: Cpu,
    desc: 'Embedded, high-performance, and energy-efficient computing.',
  },
  {
    title: 'Software Engineering',
    icon: Code,
    desc: 'Cloud, DevOps, and scalable distributed systems.',
  },
  {
    title: 'Mathematical Modeling',
    icon: BarChart3,
    desc: 'Optimization, simulation, and computational mathematics.',
  },
];

const labs = [
  {
    name: 'AI Research Lab',
    desc: 'High-performance computing for AI/ML research.',
    to: '/facilities',
  },
  {
    name: 'Cybersecurity Lab',
    desc: 'Isolated networks and forensics tools for security research.',
    to: '/facilities',
  },
  {
    name: 'Data Analytics Center',
    desc: 'Big data processing and visualization.',
    to: '/facilities',
  },
  {
    name: 'IoT & Embedded Lab',
    desc: 'Prototyping and testing for IoT devices.',
    to: '/facilities',
  },
];

const services = [
  {
    title: 'IT Consulting',
    icon: Users,
    desc: 'Digital transformation and IT strategy for organizations.',
  },
  {
    title: 'Data Analysis',
    icon: BarChart3,
    desc: 'Statistical analysis and predictive modeling.',
  },
  {
    title: 'Software Development',
    icon: Code,
    desc: 'Custom software and web/mobile apps.',
  },
  {
    title: 'Training Programs',
    icon: BookOpen,
    desc: 'Professional development and certification courses.',
  },
];

const Research: React.FC = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">

      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-br from-blue-900 to-orange-700 text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Research & Services</h1>
        <p className="text-lg md:text-2xl font-light max-w-3xl mx-auto">
          Advancing knowledge and innovation in technology and mathematics for real-world impact.
        </p>
      </section>

      {/* Research Focus Areas */}
      <section className="max-w-6xl mx-auto mt-20 px-4">
        <h2 className="text-2xl font-bold text-blue-900 mb-8">Research Focus Areas</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {researchAreas.map((area) => (
            <div
              key={area.title}
              className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center border border-gray-100 hover:shadow-lg transition"
            >
              <area.icon size={40} className="mb-3 text-orange-600 transition-transform group-hover:scale-110" />
              <h3 className="text-xl font-bold text-blue-900 mb-2">{area.title}</h3>
              <p className="text-gray-600 text-sm">{area.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Research Labs */}
      <section className="max-w-6xl mx-auto mt-24 px-4">
        <h2 className="text-2xl font-bold text-blue-900 mb-8">Research Laboratories</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {labs.map((lab) => (
            <a
              key={lab.name}
              href={lab.to}
              className="block bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg hover:border-orange-600 transition"
            >
              <h3 className="text-lg font-semibold text-blue-900 mb-2">{lab.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{lab.desc}</p>
              <span className="inline-flex items-center text-orange-600 font-medium">
                See Facility <ChevronRight size={16} className="ml-1" />
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Community & Industry Services */}
      <section className="max-w-6xl mx-auto mt-24 mb-20 px-4">
        <h2 className="text-2xl font-bold text-blue-900 mb-8">Community & Industry Services</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {services.map((srv) => (
            <div
              key={srv.title}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center border border-gray-100 hover:shadow-lg transition"
            >
              <srv.icon size={32} className="mb-3 text-blue-900" />
              <h3 className="text-lg font-semibold text-blue-900 mb-1">{srv.title}</h3>
              <p className="text-gray-600 text-sm">{srv.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Research;
