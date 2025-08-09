import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Monitor,
  Wifi,
  Book,
  Coffee,
  Users,
  Zap,
  MapPin,
  Clock,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const backgroundImages = [
  {
    title: "Industrial Automation Lab",
    img: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "ICT Room",
    img: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "AI & Data Science Lab",
    img: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Computer Systems Lab",
    img: "https://images.pexels.com/photos/256302/pexels-photo-256302.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

const amenities = [
  {
    title: "Modern Technology",
    icon: Monitor,
    desc: "Latest hardware and software resources for learning.",
  },
  {
    title: "High-Speed Internet",
    icon: Wifi,
    desc: "Reliable connectivity campus-wide.",
  },
  {
    title: "Learning Resources",
    icon: Book,
    desc: "Comprehensive library and digital resources.",
  },
  {
    title: "Comfortable Spaces",
    icon: Coffee,
    desc: "Good environment to study around the campus.",
  },
  {
    title: "Collaboration Areas",
    icon: Users,
    desc: "Spaces for group work, projects and different collaboration among students.",
  },
  {
    title: "24/7 Access",
    icon: Zap,
    desc: "Key facilities available round the clock.",
  },
];

const Facilities: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const currentImage = backgroundImages[currentIndex];

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Hero/Intro */}
      <section className="py-20 px-4 text-center bg-gradient-to-br from-blue-900 to-orange-700 text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Facilities & Equipment
        </h1>
        <p className="text-lg md:text-2xl font-light max-w-2xl mx-auto">
          Modern spaces and technology supporting excellence in education and
          research.
        </p>
      </section>

      {/* Full-width Background Slideshow */}
      <section
        className="relative w-full h-[400px] md:h-[600px] flex items-center justify-center text-center text-white border-b-4 border-orange-500"
        style={{
          backgroundImage: `url(${currentImage.img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 1s ease-in-out",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

        {/* Title Overlay */}
        <div className="relative z-10 px-4">
          <h2 className="text-3xl md:text-5xl font-bold">
            {currentImage.title}
          </h2>
        </div>
      </section>

      {/* Innovation Hub Brief */}
      <section className="max-w-4xl mx-auto mt-48 px-4 text-center md:text-left">
        <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center font-sans">
          AI & NEXTGEN Innovate Hub
        </h2>
        <div className="bg-gray-50 rounded-xl p-8 shadow-md border-l-4 border-orange-600">
          
          <p className="text-gray-500 text-md mb-6">
            This Hub is a dynamic space designed to foster creativity,
            experimentation, and entrepreneurial growth. It supports students
            and researchers in developing real-world solutions through
            collaboration, prototyping, and mentorship. From AI research to IoT
            and startup incubation, the hub connects talent with opportunity and
            technology.
          </p>
          <a
            href="http://localhost:5174/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-300"
          >
            Visit our Hub Website
          </a>
        </div>
      </section>
      {/* Amenities */}
      <section className=" px-4 bg-gradient-to-br mt-52 ">
        <h2 className="text-5xl font-bold text-orange-600 text-center mb-6">
          Facility Amenities
        </h2>
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {amenities.map((a) => (
            <div
              key={a.title}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center border-l-4 border-orange-600"
            >
              <a.icon size={32} className="mb-2 text-blue-900" />
              <h3 className="text-lg font-semibold text-blue-900 mb-1">
                {a.title}
              </h3>
              <p className="text-gray-600 text-sm">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 mt-14 mb-14 bg-gradient-to-r text-center">
        <h2 className="text-3xl font-bold mb-4 text-orange-600">
          Want to Experience Our Facilities?
        </h2>
        <p className="mb-6 text-lg text-gray-400">
          Schedule a visit or connect with our team to learn more.
        </p>
        <Link
          className="bg-orange-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition duration-300"
          to="/contact"
        >
          Book a Visit
        </Link>
      </section>
    </div>
  );
};

export default Facilities;
