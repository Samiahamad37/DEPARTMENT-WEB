import React from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  ArrowUp,
  Clock,
  Globe,
  GraduationCap,
} from "lucide-react";
import { useContactInfo } from "../hooks/useContact";
import { useSocialMedia } from "../hooks/useSocialMedia";
import { useDepartmentInfo } from "../hooks/useDepartment";
import { ContactInfo, SocialMedia, DepartmentInfo } from "../types/api";

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Fetch data from API
  const {
    data: contactInfo = [],
    isLoading: contactLoading,
    error: contactError,
  } = useContactInfo();
  const {
    data: socialMedia = [],
    isLoading: socialLoading,
    error: socialError,
  } = useSocialMedia();
  const {
    data: departmentInfo = [],
    isLoading: deptLoading,
    error: deptError,
  } = useDepartmentInfo();

  // Use API data or fallback to static data
  const contactData = contactInfo.length > 0 ? contactInfo[0] : null;
  const socialData = socialMedia.length > 0 ? socialMedia : [];
  const departmentData = departmentInfo.length > 0 ? departmentInfo[0] : null;

  // Handle errors
  if (contactError) console.error("Error loading contact info:", contactError);
  if (socialError) console.error("Error loading social media:", socialError);
  if (deptError) console.error("Error loading department info:", deptError);

  const quickLinks = [
    { path: "/about", label: "About Us" },
    { path: "/about/people", label: "Our People" },
    { path: "/about/department", label: "Our Department" },
    { path: "/programmes", label: "Programmes" },
    { path: "/research", label: "Research & Innovation" },
    { path: "/facilities", label: "Facilities" },
    { path: "/outreach", label: "Outreach & Impact" },
    { path: "/about/hire-students", label: "Hire Our Students" },
  ];

  const academicLinks = [
    { path: "/programmes-undergraduate", label: "Undergraduate Programs" },
    { path: "/programmes-graduate", label: "Graduate Programs" },
    { path: "/research", label: "Research Areas" },
    { path: "/facilities", label: "Laboratories" },
    { path: "/news", label: "News & Events" },
  ];

  const supportLinks = [
    { path: "/contact", label: "Contact Us" },
    { path: "/about/hire-students", label: "Industry Partners" },
    { path: "/outreach", label: "Community Outreach" },
    { path: "#", label: "Student Portal" },
    { path: "#", label: "Staff Portal" },
  ];

  return (
    <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-blue-500 transform rotate-12 scale-150"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Department Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">CSM</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">
                  {departmentData?.name || "Computer Systems & Mathematics"}
                </h3>
                <p className="text-blue-200 text-sm">
                  {departmentData?.university || "Ardhi University"}
                </p>
              </div>
            </div>

            <p className="text-blue-200 mb-6 leading-relaxed">
              {departmentData?.description ||
                "Empowering the next generation of innovators through cutting-edge education, research, and technological advancement. We are committed to excellence in computer science and mathematics education in East Africa."}
            </p>

            {/* Social Media */}
            <div className="flex space-x-4 mb-6">
              {socialData.length > 0 ? (
                socialData.map((social) => {
                  const getIcon = (platform: string) => {
                    const icons: { [key: string]: React.ReactNode } = {
                      facebook: <Facebook size={20} />,
                      twitter: <Twitter size={20} />,
                      linkedin: <Linkedin size={20} />,
                      instagram: <Globe size={20} />,
                      youtube: <Globe size={20} />,
                      website: <Globe size={20} />,
                    };
                    return icons[platform] || <Globe size={20} />;
                  };

                  return (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-800 hover:bg-blue-700 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
                    >
                      {getIcon(social.platform)}
                    </a>
                  );
                })
              ) : (
                <>
                  <a
                    href="#"
                    className="bg-blue-800 hover:bg-blue-700 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
                  >
                    <Facebook size={20} />
                  </a>
                  <a
                    href="#"
                    className="bg-blue-800 hover:bg-blue-700 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
                  >
                    <Twitter size={20} />
                  </a>
                  <a
                    href="#"
                    className="bg-blue-800 hover:bg-blue-700 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href="#"
                    className="bg-blue-800 hover:bg-blue-700 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
                  >
                    <Globe size={20} />
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Order Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center">
              <GraduationCap size={20} className="mr-2 text-orange-400" />
              Academic Programs
            </h4>
            <ul className="space-y-3">
              {academicLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-blue-200 hover:text-orange-400 transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-orange-400 transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-blue-200 hover:text-orange-400 transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-orange-400 transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Information</h4>
            <div className="space-y-4">
              <div className="flex items-start group">
                <MapPin
                  size={18}
                  className="mr-3 mt-1 text-orange-400 flex-shrink-0"
                />
                <div>
                  <p className="text-blue-200 text-sm leading-relaxed">
                    {contactData?.address ||
                      "Ardhi University\nP.O. Box 35176\nDar es Salaam, Tanzania"}
                  </p>
                </div>
              </div>

              <div className="flex items-center group">
                <Phone
                  size={18}
                  className="mr-3 text-orange-400 flex-shrink-0"
                />
                <div>
                  <p className="text-blue-200 text-sm">
                    {contactData?.phone || "+255 22 277 5004"}
                  </p>
                  <p className="text-blue-300 text-xs">Main Office</p>
                </div>
              </div>

              <div className="flex items-center group">
                <Mail
                  size={18}
                  className="mr-3 text-orange-400 flex-shrink-0"
                />
                <div>
                  <p className="text-blue-200 text-sm">
                    {contactData?.email || "info@csm.aru.ac.tz"}
                  </p>
                  <p className="text-blue-300 text-xs">General Inquiries</p>
                </div>
              </div>

              <div className="flex items-center group">
                <Clock
                  size={18}
                  className="mr-3 text-orange-400 flex-shrink-0"
                />
                <div>
                  <p className="text-blue-200 text-sm">
                    {contactData?.office_hours ||
                      "Mon - Fri: 8:00 AM - 5:00 PM"}
                  </p>
                  <p className="text-blue-300 text-xs">Office Hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-center lg:text-left">
              <p className="text-blue-200 text-sm">
                &copy; {new Date().getFullYear()} Department of Computer Systems
                & Mathematics, Ardhi University. All rights reserved.
              </p>
              <p className="text-blue-300 text-xs mt-1">
                Proudly serving Tanzania and East Africa since 2001
              </p>
            </div>

            <div className="flex items-center space-x-6">
              <Link
                to="/contact"
                className="text-blue-200 hover:text-orange-400 transition-colors duration-300 text-sm"
              >
                Contact Us
              </Link>
              <Link
                to="/about"
                className="text-blue-200 hover:text-orange-400 transition-colors duration-300 text-sm"
              >
                About Us
              </Link>
            </div>

            <button
              onClick={scrollToTop}
              className="bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
