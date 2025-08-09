import React from 'react';
import { BookOpen, Users, ClipboardList, CalendarDays, Briefcase, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation'; 

const Masters = () => {
  const overviewRef = useScrollAnimation();

  return (
    <div className="bg-white text-blue-900">

      {/* Hero */}
      <section className="py-24 px-4 bg-gradient-to-br from-blue-900 to-orange-600 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Masters in Information Systems Management</h1>
        <p className="text-lg max-w-2xl mx-auto font-light">
          Shape the future of technology with leadership, systems thinking, and cutting-edge IT strategy.
        </p>
      </section>

      {/* Overview */}
      <div ref={overviewRef}>
        <section className="max-w-6xl mx-auto py-20 px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
              <BookOpen className="text-orange-600" /> Overview
            </h2>
            <p className="text-gray-700 leading-relaxed">
              The MSc in Information Systems Management is a two-year postgraduate program that blends theory, research, and real-world practice. It prepares professionals to lead IT strategies, optimize enterprise systems, and drive innovation in organizations across industries. The curriculum equips students with a solid foundation in data-driven decision-making, IT governance, and digital transformation.
            </p>
          </div>
          <img src="https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Overview" className="rounded-xl shadow-lg" />
        </section>
      </div>

      {/* Objectives */}
        <div ref={overviewRef}>
        <section className="bg-blue-50 py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 flex items-center gap-2">
              <ClipboardList className="text-orange-600" /> Program Objectives
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-gray-700 text-lg">
              <ul className="list-disc list-inside space-y-2">
                <li>Equip students with managerial and technical skills for strategic decision-making.</li>
                <li>Enable professionals to bridge gaps between business and IT.</li>
                <li>Promote innovative thinking in designing enterprise systems.</li>
              </ul>
              <ul className="list-disc list-inside space-y-2">
                <li>Encourage critical evaluation of emerging technologies.</li>
                <li>Support the development of research and analytical skills.</li>
                <li>Foster a culture of ethical and sustainable technology use.</li>
              </ul>
            </div>
          </div>
        </section>
        </div>
    

      {/* Learning Outcomes */}
       <div ref={overviewRef}></div>
        <section className="max-w-6xl mx-auto py-20 px-4">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Users className="text-orange-600" /> Learning Outcomes
          </h2>
          <p className="text-gray-700 mb-6">
            Upon completion of the program, graduates will be able to:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
            <li>Design, manage, and evaluate secure and scalable information systems.</li>
            <li>Lead digital transformation initiatives within an organization.</li>
            <li>Apply best practices in IT governance and risk management.</li>
            <li>Utilize data analytics for informed strategic decision-making.</li>
            <li>Conduct academic and applied research in the field of information systems.</li>
          </ul>
        </section>
      

      {/* Curriculum Structure */}
   <div ref={overviewRef}>
        <section className="bg-blue-50 py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
              <BookOpen className="text-orange-600" /> Curriculum Structure
            </h2>
            <p className="text-gray-700 mb-4">
              The program includes coursework, seminars, and a final research project or thesis:
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-gray-700">
              <ul className="list-disc list-inside space-y-1">
                <li>Enterprise Architecture & Integration</li>
                <li>Advanced Database Management</li>
                <li>Information Security & Risk</li>
                <li>IT Governance & Compliance</li>
              </ul>
              <ul className="list-disc list-inside space-y-1">
                <li>Business Intelligence & Analytics</li>
                <li>Research Methods in IT</li>
                <li>Digital Transformation Strategy</li>
                <li>Capstone Project / Thesis</li>
              </ul>
            </div>
          </div>
        </section>
        </div>
     

      {/* Duration & Entry Requirements */}
       <div ref={overviewRef}>
        <section className="max-w-6xl mx-auto py-20 px-4">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <CalendarDays className="text-orange-600" /> Duration & Entry Requirements
          </h2>
          <p className="text-gray-700 mb-4 text-lg">
            The program is offered in:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>2 years full-time</li>
            <li>3 years part-time</li>
          </ul>
          <h3 className="text-xl font-semibold mt-6 mb-2">Entry Requirements:</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Bachelor’s degree in Information Systems, Computer Science, or a related field.</li>
            <li>Relevant work experience (preferred but not mandatory).</li>
            <li>Proof of English language proficiency for international applicants.</li>
          </ul>
        </section>
        </div>
    

      {/* Career Opportunities */}
       <div ref={overviewRef}>
        <section className="  py-20 px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Career Opportunities</h2>
          <p className="max-w-3xl mx-auto mb-10 text-lg font-light">
            Graduates can pursue roles across public and private sectors, including:
          </p>
          <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto text-left ">
            {[
              'IT Project Manager',
              'Enterprise Architect',
              'Information Systems Analyst',
              'Chief Information Officer (CIO)',
              'Business Intelligence Specialist',
              'Technology Consultant',
            ].map((role) => (
              <div
                key={role}
                className="bg-white/10  rounded-lg p-4 w-64 shadow-md text-2xl border-l-4 border-orange-600"
              >
                <Briefcase className="mb-2 text-orange-400" />
                <p className="text-sm">{role}</p>
              </div>
            ))}
          </div>
        </section>
        </div>
     

      {/* Call to Action */}
     <div ref={overviewRef}>
        <section className="py-20 px-4 text-center bg-gradient-to-r  ">
          <h2 className="text-5xl font-bold mb-4 text-orange-600">Apply for the Masters Program</h2>
          <p className="text-lg mb-6 text-gray-400">
            Ready to level up your career in Information Systems Management?
          </p>
          <a
            href="/apply"
            className="inline-flex items-center gap-2 text-white  bg-orange-600  px-6 py-3 rounded-full font-semibold hover:bg-orange-100 transition"
          >
            Apply Now <ArrowRight size={18} />
          </a>
        </section>
     </div>
    </div>
  );
};

export default Masters;
