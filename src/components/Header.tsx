import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ProgressBar from "react-scroll-progress-bar";

interface HeaderProps {
  name: string;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ name, title }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Trang chủ" },
    { id: "about", label: "Giới thiệu" },
    { id: "skills", label: "Kỹ năng" },
    { id: "projects", label: "Dự án" },
    { id: "experience", label: "Kinh nghiệm" },
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
    <header className="fixed top-0 left-0 right-0 bg-gray-900/95 backdrop-blur-md shadow-lg z-50 border-b border-purple-500/30">
      {/* Progress Bar */}
     

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1
              className="text-xl font-bold !text-white"
              style={{ color: "white" }}
            >
              {name}
            </h1>
            <span
              className="ml-2 text-sm !text-white hidden sm:block"
              style={{ color: "white" }}
            >
              ({title})
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                to="/"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className={({ isActive }) => 
                  `text-white hover:text-purple-400 px-3 py-2 text-sm font-medium transition-all duration-200 cursor-pointer relative group ${
                    isActive ? 'text-purple-400' : ''
                  }`
                }
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-200 group-hover:w-full"></span>
              </NavLink>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="!text-white hover:text-purple-400 focus:outline-none focus:text-purple-400 cursor-pointer p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-200"
              style={{ color: "white" }}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900/95 border-t border-purple-500/30 backdrop-blur-md">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="!text-white hover:text-purple-400 hover:bg-gray-800/50 block px-3 py-2 text-base font-medium w-full text-left cursor-pointer rounded-lg transition-all duration-200"
                  style={{ color: "white" }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
