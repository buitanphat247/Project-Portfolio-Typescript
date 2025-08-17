import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

interface HeaderProps {
  name: string;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ name, title }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll effect with throttling
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 20;
          setScrolled(isScrolled);

          // Calculate scroll progress
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
          setScrollProgress(progress);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Trang chủ" },
    { id: "about", label: "Giới thiệu" },
    { id: "skills", label: "Kỹ năng" },
    { id: "projects", label: "Dự án" },
    { id: "experience", label: "Kinh nghiệm" },
    { id: "achievements", label: "Thành tích" },
    { id: "contact", label: "Liên hệ" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? "bg-gray-900/98 backdrop-blur-xl shadow-2xl border-b border-purple-500/50"
          : "bg-gray-900/90 backdrop-blur-md shadow-lg border-b border-purple-500/30"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with hover effect */}
          <div className="flex items-center group">
            <h1 className="text-xl font-bold !text-white transition-all duration-300 group-hover:text-purple-400 cursor-pointer">
              {name}
            </h1>
            {/* <span className="ml-2 text-sm !text-white hidden sm:block opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:text-purple-300">
              ({title})
            </span> */}
          </div>

          {/* Desktop Navigation with enhanced effects */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item, index) => (
              <NavLink
                key={item.id}
                to="/"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className={({ isActive }) =>
                  `!text-white hover:text-purple-400 px-3 py-2 text-sm font-medium transition-all duration-300 cursor-pointer relative group transform hover:scale-105 ${
                    isActive ? "text-purple-400" : ""
                  }`
                }
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full rounded-full"></span>
                <span className="absolute inset-0 bg-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></span>
              </NavLink>
            ))}
          </nav>

          {/* Enhanced Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="!text-white hover:text-purple-400 focus:outline-none focus:text-purple-400 cursor-pointer p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-300 transform hover:scale-110 active:scale-95"
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute top-0 left-0 w-6 h-0.5 bg-current transform transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-2.5" : ""
                  }`}
                ></span>
                <span
                  className={`absolute top-2.5 left-0 w-6 h-0.5 bg-current transform transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`absolute top-5 left-0 w-6 h-0.5 bg-current transform transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation with animations */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900/95 border-t border-purple-500/30 backdrop-blur-md">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="!text-white hover:text-purple-400 hover:bg-gray-800/50 block px-3 py-3 text-base font-medium w-full text-left cursor-pointer rounded-lg transition-all duration-300 transform hover:translate-x-2 hover:scale-105 active:scale-95"
                style={{
                  animationDelay: `${index * 100}ms`,
                  transform: isMenuOpen ? "translateX(0)" : "translateX(-20px)",
                  opacity: isMenuOpen ? 1 : 0,
                  transition: `all 0.3s ease ${index * 100}ms`,
                }}
              >
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

             {/* Progress Bar */}
       <div
         className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 transform origin-left transition-transform duration-150 ease-out rounded-r-full"
         style={{
           transform: `scaleX(${scrollProgress})`,
         }}
       ></div>
    </header>
  );
};

export default Header;
