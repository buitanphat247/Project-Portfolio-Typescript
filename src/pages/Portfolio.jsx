import Header from '../components/Portfolio/Header';
import Home from '../components/Portfolio/Home';
import SkillsAndCertificates from '../components/Portfolio/SkillsAndCertificates';
import Projects from '../components/Portfolio/Projects';
import Achievements from '../components/Portfolio/Achievements';
import Contact from '../components/Portfolio/Contact';
import Footer from '../components/Portfolio/Footer';
import FloatingSocialLinks from '../components/Portfolio/FloatingSocialLinks';

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-[#0A192F]">
      <Header />
      <main>
        <Home />
        <SkillsAndCertificates />
        <Projects />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <FloatingSocialLinks />
    </div>
  );
}

