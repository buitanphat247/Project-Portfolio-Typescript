import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminUI from "./layout/admin.ui";
import Dashboard from "./components/Dashboard";
import SkillCategories from "./components/SkillCategories";
import Skills from "./components/Skills";
import Portfolio from "./pages/Portfolio";
import Projects from "./components/Projects";
import AchievementCategories from "./components/AchievementCategories";
import Achievements from "./components/Achievements";
import SplashScreen from "./components/Portfolio/SplashScreen";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import ExportData from "./components/ExportData";
import ImportData from "./components/ImportData";

const App = () => {
  // Initialize from sessionStorage - chỉ hiển thị splash nếu chưa xem trong session này
  const [showSplash, setShowSplash] = useState(() => {
    const hasSeenSplash = sessionStorage.getItem("showedSplashscreen");
    return !JSON.parse(hasSeenSplash || "false");
  });

  useEffect(() => {
    if (!showSplash) return;
    
    const timer = setTimeout(() => {
      // Update local state to trigger component rerender
      setShowSplash(false);
      // Update sessionStorage - sẽ bị xóa khi đóng tab
      sessionStorage.setItem("showedSplashscreen", JSON.stringify(true));
    }, 2000); // splash 2s chỉ lần đầu

    return () => clearTimeout(timer);
  }, [showSplash]);

  // Render router luôn, splash screen overlay lên trên
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminUI />
              </ProtectedRoute>
            }
          >
            <Route path="skill-categories" element={<SkillCategories />} />
            <Route path="skills" element={<Skills />} />
            <Route path="projects" element={<Projects />} />
            <Route path="achievement-categories" element={<AchievementCategories />} />
            <Route path="achievements" element={<Achievements />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="export" element={<ExportData />} />
            <Route path="import" element={<ImportData />} />
            <Route path="" element={<Navigate to="/admin/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {showSplash && <SplashScreen onFinish={() => {}} />}
    </>
  );
};

export default App;
