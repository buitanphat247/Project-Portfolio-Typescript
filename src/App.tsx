import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import WorkExperience from "./components/WorkExperience";
import Achievements from "./components/Achievements";
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
          
          <Routes>
            <Route path="/" element={
              <>
                <div id="home">
                  <Hero
                    name={portfolioData.personalInfo.name}
                    title={portfolioData.personalInfo.title}
                    bio={portfolioData.personalInfo.bio}
                    avatar={portfolioData.personalInfo.avatar}
                    location={portfolioData.personalInfo.location}
                  />
                </div>

                <div id="about">
                  <About
                    bio={portfolioData.personalInfo.bio}
                    personalInfo={portfolioData.personalInfo}
                  />
                </div>

                <div id="skills">
                  <Skills skills={portfolioData.skills} />
                </div>

                <div id="projects">
                  <Projects />
                </div>

                <div id="experience">
                  <Experience />
                </div>

                <div id="work-experience">
                  <WorkExperience />
                </div>

                <div id="achievements">
                  <Achievements />
                </div>

                <div id="contact">
                  <Contact contact={portfolioData.contact} />
                </div>
              </>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <Footer />
        </div>
      )}
    </>
  );
};

export default App;
