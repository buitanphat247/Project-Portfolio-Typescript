import { useState, useEffect, useRef } from "react";

export default function Header() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });
  const menuRefs = useRef({});
  const menuContainerRef = useRef(null);

  const menuItems = [
    { id: "home", label: "Trang chủ" },
    { id: "skills", label: "Kỹ năng" },
    { id: "projects", label: "Dự án" },
    { id: "achievements", label: "Thành tích" },
    { id: "contact", label: "Liên hệ" },
  ];

  const updateUnderline = (sectionId) => {
    const activeButton = menuRefs.current[sectionId];
    const container = menuContainerRef.current;
    if (activeButton && container) {
      const buttonRect = activeButton.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setUnderlineStyle({
        width: buttonRect.width,
        left: buttonRect.left - containerRect.left,
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = menuItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].offsetTop <= scrollPosition) {
          setActiveSection(menuItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Delay một chút để đảm bảo DOM đã render
    const timer = setTimeout(() => {
      updateUnderline(activeSection);
    }, 100);
    return () => clearTimeout(timer);
  }, [activeSection]);

  useEffect(() => {
    const handleResize = () => {
      updateUnderline(activeSection);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeSection]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/95 backdrop-blur-sm shadow-lg shadow-cyan-500/20" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-white font-bold text-xl hover:text-cyan-400 transition-all duration-300 cursor-pointer transform hover:scale-105"
          >
            Bùi Tấn Phát (MoiMoi)
          </button>
          <ul 
            ref={menuContainerRef}
            className="hidden md:flex items-center gap-x-10 relative"
          >
            {menuItems.map((item) => (
              <li
                key={item.id}
                ref={(el) => (menuRefs.current[item.id] = el)}
                onClick={() => scrollToSection(item.id)}
                className={`text-white hover:text-cyan-400 transition-colors duration-200 cursor-pointer pb-2 ${
                  activeSection === item.id ? "text-cyan-400" : ""
                }`}
              >
                {item.label}
              </li>
            ))}
            {/* Sliding Underline */}
            <div
              className="absolute bottom-0 h-1 bg-gradient-to-r from-green-500 via-cyan-400 to-blue-500 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(34,211,238,0.5)]"
              style={{
                width: `${underlineStyle.width}px`,
                left: `${underlineStyle.left}px`,
              }}
            ></div>
          </ul>
        </div>
      </nav>
    </header>
  );
}
