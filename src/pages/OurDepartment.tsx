import React from 'react';
import { Users, Target, Eye, Calendar, Award, Globe, BookOpen, TrendingUp } from 'lucide-react';
import { useDepartmentInfo } from '../hooks/useDepartment';
import { useMilestones } from '../hooks/useMilestones';
import { useAchievements } from '../hooks/useAchievements';
import { useResearchAreas } from '../hooks/useResearchAreas';
import { DepartmentInfo, DepartmentMilestone, DepartmentAchievement, ResearchArea } from '../types/api';

const OurDepartment: React.FC = () => {
  // Fetch data from API
  const { data: departmentInfo = [], isLoading: deptLoading, error: deptError } = useDepartmentInfo();
  const { data: milestones = [], isLoading: milestoneLoading, error: milestoneError } = useMilestones();
  const { data: achievements = [], isLoading: achievementLoading, error: achievementError } = useAchievements();
  const { data: researchAreas = [], isLoading: researchLoading, error: researchError } = useResearchAreas();

  // Fallback static data if API fails
  const fallbackMilestones: DepartmentMilestone[] = [
    { id: 1, year: "2001", title: "Department Founded", description: "Established as part of Ardhi University's commitment to technology education", is_active: true, display_order: 1 },
    { id: 2, year: "2005", title: "First Graduates", description: "Celebrated our first batch of computer science graduates", is_active: true, display_order: 2 },
    { id: 3, year: "2010", title: "Research Expansion", description: "Launched comprehensive research programs in AI and cybersecurity", is_active: true, display_order: 3 },
    { id: 4, year: "2015", title: "Industry Partnerships", description: "Established partnerships with major tech companies and organizations", is_active: true, display_order: 4 },
    { id: 5, year: "2020", title: "Digital Transformation", description: "Pioneered online learning and remote research capabilities", is_active: true, display_order: 5 },
    { id: 6, year: "2023", title: "AI Research Center", description: "Opened state-of-the-art AI research facility with cutting-edge equipment", is_active: true, display_order: 6 }
  ];

  const fallbackAchievements: DepartmentAchievement[] = [
    { id: 1, icon_name: "Users", number: "500+", label: "Graduates", description: "Successful alumni working in leading organizations", is_active: true, display_order: 1 },
    { id: 2, icon_name: "BookOpen", number: "50+", label: "Research Papers", description: "Published in international journals and conferences", is_active: true, display_order: 2 },
    { id: 3, icon_name: "Award", number: "25+", label: "Awards", description: "Recognition for excellence in education and research", is_active: true, display_order: 3 },
    { id: 4, icon_name: "Globe", number: "15+", label: "Countries", description: "International partnerships and collaborations", is_active: true, display_order: 4 }
  ];

  const fallbackResearchAreas: ResearchArea[] = [
    {
      id: 1,
      name: "Artificial Intelligence & Machine Learning",
      description: "Advancing AI research with focus on healthcare, education, and sustainable development",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      key_faculty: [],
      is_active: true,
      display_order: 1
    },
    {
      id: 2,
      name: "Cybersecurity & Network Security",
      description: "Protecting digital infrastructure and developing secure systems for Tanzania and Africa",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
      key_faculty: [],
      is_active: true,
      display_order: 2
    },
    {
      id: 3,
      name: "Data Science & Analytics",
      description: "Leveraging big data to solve complex problems in business, government, and society",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      key_faculty: [],
      is_active: true,
      display_order: 3
    },
    {
      id: 4,
      name: "Software Engineering & Development",
      description: "Building robust, scalable software solutions for diverse industries and applications",
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      key_faculty: [],
      is_active: true,
      display_order: 4
    }
  ];

  // Process milestones to show max 10: first is establishment (oldest), rest are most recent
  const processedMilestones = (() => {
    if (milestones.length === 0) return fallbackMilestones;
    
    // Sort by year (ascending) - oldest first
    const sorted = [...milestones].sort((a, b) => {
      // Convert year to number for proper numeric comparison
      const yearA = parseInt(a.year) || 0;
      const yearB = parseInt(b.year) || 0;
      return yearA - yearB;
    });
    
    // The first (oldest) is the establishment milestone
    // Take max 10 items: establishment first, then next 9 most recent
    const limited = sorted.slice(0, 10);
    
    return limited.length > 0 ? limited : sorted.slice(-10);
  })();

  const milestoneData = processedMilestones;
  const achievementData = achievements.length > 0 ? achievements : fallbackAchievements;
  const researchAreaData = researchAreas.length > 0 ? researchAreas : fallbackResearchAreas;
  const departmentData = departmentInfo.length > 0 ? departmentInfo[0] : null;

  // Handle loading states
  if (deptLoading || milestoneLoading || achievementLoading || researchLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading department information...</p>
          </div>
        </div>
      </div>
    );
  }

  // Handle errors
  if (deptError) console.error('Error loading department info:', deptError);
  if (milestoneError) console.error('Error loading milestones:', milestoneError);
  if (achievementError) console.error('Error loading achievements:', achievementError);
  if (researchError) console.error('Error loading research areas:', researchError);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {departmentData?.name || "Our Department"}
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              {departmentData?.description || "Discover our journey, mission, and commitment to excellence in computer science and mathematics education at Ardhi University."}
            </p>
          </div>
        </div>
      </section>

      {/* Welcome Message */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Welcome from the Head of Department</h2>
              <div className="bg-gradient-to-r from-orange-50 to-blue-50 p-6 rounded-xl border-l-4 border-orange-600">
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  "{departmentData?.head_message || "Welcome to the Department of Computer Systems and Mathematics at Ardhi University. We are at the forefront of technological innovation and academic excellence in Tanzania and East Africa."}"
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {departmentData?.description || "Our department is committed to providing world-class education, conducting cutting-edge research, and preparing our students to become the next generation of technology leaders. We believe in the power of technology to transform lives and drive sustainable development."}
                </p>
              </div>
              <div className="mt-6 flex items-center">
                <img 
                  src={departmentData?.head_photo || "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"} 
                  alt={departmentData?.head_name || "Head of Department"} 
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-semibold text-gray-900">{departmentData?.head_name || "Dr. Maria Santos"}</p>
                  <p className="text-orange-600">{departmentData?.head_title || "Head of Department"}</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80" 
                alt="Department Building" 
                className="rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Vision */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye size={32} className="text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                {departmentData?.vision || "To be the leading center of excellence in computer science and mathematics education, research, and innovation in East Africa, producing graduates who drive technological advancement and sustainable development."}
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target size={32} className="text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                {departmentData?.mission || "To provide high-quality education, conduct innovative research, and foster partnerships that advance computer science and mathematics while addressing real-world challenges in Tanzania and beyond."}
              </p>
            </div>

            {/* Values */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp size={32} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
              <ul className="text-gray-600 space-y-2 text-left">
                {departmentData?.values_list && departmentData.values_list.length > 0 ? (
                  departmentData.values_list.map((value, index) => (
                    <li key={index}>• {value}</li>
                  ))
                ) : (
                  <>
                    <li>• Excellence in Education</li>
                    <li>• Innovation in Research</li>
                    <li>• Integrity in All Actions</li>
                    <li>• Collaboration & Partnership</li>
                    <li>• Social Responsibility</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Achievements</h2>
            <p className="text-xl text-gray-600">Proud milestones and accomplishments that define our excellence</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievementData.map((achievement, index) => {
              // Get the icon component based on icon_name
              const getIcon = (iconName: string) => {
                const icons: { [key: string]: React.ReactNode } = {
                  'Users': <Users size={24} />,
                  'BookOpen': <BookOpen size={24} />,
                  'Award': <Award size={24} />,
                  'Globe': <Globe size={24} />,
                  'Target': <Target size={24} />,
                  'Eye': <Eye size={24} />,
                  'Calendar': <Calendar size={24} />,
                  'TrendingUp': <TrendingUp size={24} />
                };
                return icons[iconName] || <Award size={24} />;
              };

              return (
                <div key={achievement.id} className="text-center group">
                  <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                    <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                      {getIcon(achievement.icon_name)}
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{achievement.number}</div>
                    <div className="text-lg font-semibold text-gray-700 mb-2">{achievement.label}</div>
                    <div className="text-sm text-gray-600">{achievement.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Research Excellence</h2>
            <p className="text-xl text-gray-600">Cutting-edge research areas that drive innovation and impact</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {researchAreaData.map((area, index) => (
              <div key={area.id} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300">
                <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                  <img
                    src={area.image}
                    alt={area.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{area.name}</h3>
                <p className="text-gray-600 mb-6">{area.description}</p>
                {area.key_faculty && area.key_faculty.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Key Faculty:</h4>
                    <div className="flex flex-wrap gap-2">
                      {area.key_faculty.slice(0, 3).map((faculty, idx) => (
                        <span key={idx} className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
                          {faculty.name}
                        </span>
                      ))}
                      {area.key_faculty.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                          +{area.key_faculty.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">Key milestones in our department's history</p>
          </div>
          
          {milestoneData.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No milestones available at the moment.</p>
            </div>
          ) : (
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-500 to-blue-500 rounded-full"></div>
              
              <div className="space-y-12">
                {milestoneData.map((milestone, index) => (
                <div key={milestone.id} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                      <div className="text-2xl font-bold text-orange-600 mb-2">{milestone.year}</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center relative z-10">
                    <Calendar size={16} className="text-white" />
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Department History */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our History</h2>
            <p className="text-xl text-gray-600">A legacy of excellence in education and innovation</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Founding & Early Years</h3>
              <p className="text-gray-700 mb-4">
                The Computer Systems & Mathematics Department was established in 2001 as part of Ardhi University's 
                commitment to technology education and innovation in Tanzania. From the beginning, our mission has been 
                to provide high-quality education in computer science, software engineering, and applied mathematics.
              </p>
              <p className="text-gray-700 mb-4">
                Our first decade focused on building a strong foundation with dedicated faculty, modern facilities, and 
                industry partnerships. We graduated our first cohort of computer science professionals in 2005, setting 
                a standard of excellence that continues to this day.
              </p>
              <div className="flex items-center text-orange-600 font-semibold">
                <TrendingUp size={20} className="mr-2" />
                <span>Pioneering Technology Education</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Growth & Excellence</h3>
              <p className="text-gray-700 mb-4">
                Throughout the 2010s, we expanded our research capabilities and established specialized laboratories 
                in artificial intelligence, cybersecurity, and data science. Our commitment to innovation led to the 
                development of cutting-edge programs that prepare students for the evolving tech landscape.
              </p>
              <p className="text-gray-700 mb-4">
                Strategic partnerships with industry leaders, government institutions, and international universities 
                have enhanced our curriculum and research output. Our graduates have gone on to lead major technology 
                projects across Africa and beyond, demonstrating the impact of our rigorous academic programs.
              </p>
              <div className="flex items-center text-blue-600 font-semibold">
                <Award size={20} className="mr-2" />
                <span>Award-Winning Programs</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Modern Era (2020-Present)</h3>
              <p className="text-gray-700 mb-4">
                The COVID-19 pandemic accelerated our digital transformation initiatives. We successfully transitioned 
                to online and hybrid learning models, ensuring continuity of education while maintaining our high standards. 
                Our new AI Research Center opened in 2023, featuring state-of-the-art equipment for machine learning and 
                data analytics research.
              </p>
              <p className="text-gray-700 mb-4">
                Today, we continue to innovate with new programs in emerging technologies, enhanced industry collaborations, 
                and increased focus on solving real-world problems through research and innovation.
              </p>
              <div className="flex items-center text-green-600 font-semibold">
                <Globe size={20} className="mr-2" />
                <span>Global Impact Through Innovation</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-orange-600 rounded-xl shadow-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Our Commitment</h3>
              <p className="text-white/90 mb-4">
                As we look toward the future, the Computer Systems & Mathematics Department remains committed to:
              </p>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-start">
                  <div className="bg-white/20 rounded-full p-1 mr-3 mt-1">
                    <Users size={16} />
                  </div>
                  <span>Developing the next generation of technology leaders</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-white/20 rounded-full p-1 mr-3 mt-1">
                    <BookOpen size={16} />
                  </div>
                  <span>Advancing research in cutting-edge technologies</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-white/20 rounded-full p-1 mr-3 mt-1">
                    <Target size={16} />
                  </div>
                  <span>Solving real-world problems in Tanzania and Africa</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-white/20 rounded-full p-1 mr-3 mt-1">
                    <Award size={16} />
                  </div>
                  <span>Maintaining excellence in teaching and research</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl text-blue-100 mb-8">
            Be part of our journey in advancing computer science and mathematics education in East Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
              Explore Programs
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-900 transition-all duration-300 transform hover:scale-105">
              Apply Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurDepartment;




