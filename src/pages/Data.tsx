import { BookOpen, Users, ClipboardList, CalendarDays, Briefcase, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation'; 

const Data = () => {
  const overviewRef = useScrollAnimation();

  return (
    <div className="bg-white text-blue-900">

      {/* Hero */}
      <section className="py-24 px-4 bg-gradient-to-br from-blue-900 to-orange-600 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Bachelor in Data Science</h1>
        <p className="text-lg max-w-2xl mx-auto font-light">
          
            Transform data into actionable insights with advanced analytics, machine learning, and big data technologies.
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
               
                The Bachelor in Data Science is a four-year undergraduate program that combines computer science, statistics, and domain expertise to prepare students for careers in data analysis, machine learning, and big data technologies. The curriculum emphasizes practical skills in data manipulation, statistical modeling, and predictive analytics.
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
                <li>Equip students with foundational skills in programming, statistics, and data analysis.</li>
                <li>Enable professionals to extract insights from complex datasets.</li>
                <li>Promote innovative thinking in applying machine learning techniques.</li>
                
              </ul>
              <ul className="list-disc list-inside space-y-2">
                <li>Encourage critical evaluation of data-driven solutions.</li>
                <li>Support the development of research and analytical skills.</li>
                <li>Foster a culture of ethical data use and privacy awareness.</li>
             
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
            <li>Analyze and interpret complex datasets using statistical methods.</li>
            <li>Develop and implement machine learning models for predictive analytics.</li>
            <li>Utilize big data technologies to process and analyze large volumes of data.</li>
            <li>Communicate data-driven insights effectively to stakeholders.</li>
           
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
            <li>3 years full-time</li>
           
          </ul>
          <h3 className="text-xl font-semibold mt-6 mb-2">Entry Requirements:</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            
            <li>A recognized undergraduate degree in a related field.</li>
            <li>Proficiency in programming languages (Python, R, SQL).</li>
            <li>Basic understanding of statistics and data analysis.</li>
            <li>Strong analytical and problem-solving skills.</li>
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
                'Data Analyst',
                'Machine Learning Engineer',
                'Data Scientist',
                'Business Intelligence Analyst',
                'Big Data Engineer',
                'Research Scientist'
             
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
          <h2 className="text-5xl font-bold mb-4 text-orange-600">Apply for the Bachelor Program</h2>
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

export default Data;
