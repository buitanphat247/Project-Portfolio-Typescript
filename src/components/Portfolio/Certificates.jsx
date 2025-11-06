import { useState, useEffect, useRef } from "react";

export default function Certificates() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="certificates" ref={sectionRef} className="min-h-screen bg-black py-20">
      <div className="container mx-auto px-4">
        <div
          className={`flex items-center justify-center gap-4 mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        >
          <div className="relative group cursor-pointer">
            <div className="px-8 py-4 flex items-center gap-3">
              <i className="fa-solid fa-certificate text-white text-xl"></i>
              <span className="text-white font-bold text-2xl tracking-wide">Certificate</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-500 rounded-full opacity-80 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_10px_rgba(251,146,60,0.5)]"></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={item}
                className={`bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 150}ms` : "0ms",
                  transitionDuration: "600ms",
                }}
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-400 rounded-lg flex items-center justify-center">
                    <i className="fa-solid fa-certificate text-white text-3xl"></i>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-orange-400 text-center mb-2">Certificate {item}</h3>
                <p className="text-gray-400 text-center text-sm">Mô tả Certificate sẽ được thêm vào đây</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

