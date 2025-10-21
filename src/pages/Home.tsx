import React from "react";
import Hero from "../components/Hero";
import ProjectShowcase from "../components/ProjectShowcase";
import NewsSection from "../components/NewsSection";
import PartnersSection from "../components/PartnersSection";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ProjectShowcase />
      <NewsSection />
      <PartnersSection />
    </div>
  );
};

export default Home;
