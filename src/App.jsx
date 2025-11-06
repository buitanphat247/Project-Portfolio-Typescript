import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminUI from "./layout/admin.ui";
import Dashboard from "./components/Dashboard";
import SkillCategories from "./components/SkillCategories";
import Skills from "./components/Skills";
import Portfolio from "./pages/Portfolio";
import Projects from "./components/Projects";
import AchievementCategories from "./components/AchievementCategories";
import Achievements from "./components/Achievements";

const App = () => {
  return (
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
  );
};

export default App;
