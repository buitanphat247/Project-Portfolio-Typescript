import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminUI from "./layout/admin.ui";
import Dashboard from "./components/Dashboard";
import SkillCategories from "./components/SkillCategories";
import Skills from "./components/Skills";
import Portfolio from "./pages/Portfolio";
import Projects from "./components/Projects";
import AchievementCategories from "./components/AchievementCategories";
import Achievements from "./components/Achievements";
import SplashScreen from "./components/Portfolio/SplashScreen";

const App = () => {
  // Initialize from localStorage - chỉ hiển thị splash nếu chưa từng xem
  const [showSplash, setShowSplash] = useState(() => {
    const hasSeenSplash = localStorage.getItem("showedSplashscreen");
    return !JSON.parse(hasSeenSplash || "false");
  });

  useEffect(() => {
    if (!showSplash) return;
    
    const timer = setTimeout(() => {
      // Update local state to trigger component rerender
      setShowSplash(false);
      // Update localStorage for next time app is mounted
      localStorage.setItem("showedSplashscreen", JSON.stringify(true));
    }, 2000); // splash 2s chỉ lần đầu

    return () => clearTimeout(timer);
  }, [showSplash]);

  // Render router luôn, splash screen overlay lên trên
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/admin" element={<AdminUI />}>
            <Route path="skill-categories" element={<SkillCategories />} />
            <Route path="skills" element={<Skills />} />
            <Route path="projects" element={<Projects />} />
            <Route path="achievement-categories" element={<AchievementCategories />} />
            <Route path="achievements" element={<Achievements />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {showSplash && <SplashScreen onFinish={() => {}} />}
    </>
  );
};

export default App;
