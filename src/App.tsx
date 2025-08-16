import React, { useState, useEffect } from "react";
import SplashScreen from "./components/SplashScreen";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { portfolioData } from "./data/portfolioData";

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <>
      {showSplash ? (
        <SplashScreen onComplete={handleSplashComplete} />
      ) : (
        <div className="min-h-screen bg-gray-900">
          <Header
            name={portfolioData.personalInfo.name}
            title={portfolioData.personalInfo.title}
          />

          <Hero
            name={portfolioData.personalInfo.name}
            title={portfolioData.personalInfo.title}
            bio={portfolioData.personalInfo.bio}
            avatar={portfolioData.personalInfo.avatar}
            location={portfolioData.personalInfo.location}
          />

          <About
            bio={portfolioData.personalInfo.bio}
            personalInfo={portfolioData.personalInfo}
          />

          <Skills skills={portfolioData.skills} />

          <Projects />

          <Experience />

          <Contact contact={portfolioData.contact} />

          <Footer />
        </div>
      )}
    </>
  );
};

export default App;
