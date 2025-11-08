import { useState, useEffect, useRef } from "react";
import { skillsApi } from "../../api/skills.api";
import { skillCategoriesApi } from "../../api/skillCategories.api";

export default function SkillsAndCertificates() {
  const [activeTab, setActiveTab] = useState("skills");
  const [categories, setCategories] = useState([]);
  const [skillsByCategory, setSkillsByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [skillsAnimated, setSkillsAnimated] = useState(false);
  const [certificatesAnimated, setCertificatesAnimated] = useState(false);
  const sectionRef = useRef(null);
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });
  const tabRefs = useRef({});
  const tabContainerRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!sectionRef.current || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Trigger animation khi scroll vào section dựa trên tab active
            if (activeTab === "skills") {
              setSkillsAnimated(false);
              setTimeout(() => {
                setSkillsAnimated(true);
              }, 100);
            } else if (activeTab === "certificates") {
              setCertificatesAnimated(false);
              setTimeout(() => {
                setCertificatesAnimated(true);
              }, 100);
            }
          } else {
            // Reset animation state khi scroll ra khỏi section
            setIsVisible(false);
            setSkillsAnimated(false);
            setCertificatesAnimated(false);
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
  }, [loading, activeTab]);

  const updateUnderline = (tabId) => {
    const activeButton = tabRefs.current[tabId];
    const container = tabContainerRef.current;
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
    if (isVisible) {
      const timer = setTimeout(() => {
        updateUnderline(activeTab);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activeTab, isVisible]);

  useEffect(() => {
    const handleResize = () => {
      if (isVisible) {
        updateUnderline(activeTab);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeTab, isVisible]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [categoriesData, skillsData] = await Promise.all([skillCategoriesApi.getAll(), skillsApi.getAllWithoutPagination()]);

      setCategories(categoriesData);

      const grouped = {};
      categoriesData.forEach((cat) => {
        grouped[cat.id] = {
          category: cat,
          skills: [],
        };
      });

      skillsData.forEach((skill) => {
        if (grouped[skill.categoryId]) {
          grouped[skill.categoryId].skills.push(skill);
        }
      });

      setSkillsByCategory(grouped);
    } catch (err) {
      setError("Không thể tải dữ liệu. Vui lòng thử lại.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const SkeletonCard = () => (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-10 h-10 bg-gray-700 rounded-lg animate-pulse"></div>
        <div className="h-8 w-40 bg-gray-700 rounded-lg animate-pulse"></div>
      </div>
      <div className="flex flex-wrap gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 bg-gray-800 px-4 py-3 rounded-lg">
            <div className="w-5 h-5 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-5 w-20 bg-gray-700 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );

  const SkeletonTitle = () => (
    <div className="flex items-center justify-center gap-8 mb-16">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 bg-gray-800 rounded animate-pulse"></div>
        <div className="h-8 w-24 bg-gray-800 rounded animate-pulse"></div>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 bg-gray-800 rounded animate-pulse"></div>
        <div className="h-8 w-32 bg-gray-800 rounded animate-pulse"></div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <section id="skills" ref={sectionRef} className="min-h-screen bg-gray-950 py-12 sm:py-20">
        <div className="container mx-auto px-4">
          {/* Tab Navigation Skeleton */}
          <SkeletonTitle />
          <div className="max-w-7xl mx-auto">
            {/* Skills Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {[...Array(4)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="skills" className="min-h-screen bg-gray-950 flex items-center justify-center py-12 sm:py-20">
        <div className="container mx-auto px-4">
          <p className="text-center text-red-400 text-base sm:text-xl">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" ref={sectionRef} className="min-h-screen bg-gray-950 py-8">
      <div className="container mx-auto px-4">
        {/* Tab Navigation */}
        <div
          ref={tabContainerRef}
          className={`relative flex items-center justify-center gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        >
          <button
            ref={(el) => (tabRefs.current["skills"] = el)}
            onClick={() => {
              setActiveTab("skills");
              setCertificatesAnimated(false);
              // Trigger animation khi click vào tab skills
              setTimeout(() => {
                setSkillsAnimated(true);
              }, 50);
            }}
            className="relative group cursor-pointer"
          >
            <div className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex items-center gap-2 sm:gap-3">
              <i className="fa-solid fa-code text-white text-lg sm:text-xl"></i>
              <span className="text-white font-bold text-lg sm:text-xl md:text-2xl tracking-wide">Skills</span>
            </div>
          </button>

          <button
            ref={(el) => (tabRefs.current["certificates"] = el)}
            onClick={() => {
              setActiveTab("certificates");
              setSkillsAnimated(false);
              // Trigger animation khi click vào tab certificates
              setTimeout(() => {
                setCertificatesAnimated(true);
              }, 50);
            }}
            className="relative group cursor-pointer"
          >
            <div className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex items-center gap-2 sm:gap-3">
              <i className="fa-solid fa-certificate text-white text-lg sm:text-xl"></i>
              <span className="text-white font-bold text-lg sm:text-xl md:text-2xl tracking-wide">Certificate</span>
            </div>
          </button>

          {/* Sliding Underline */}
          <div
            className="absolute bottom-0 h-1 bg-gradient-to-r from-green-500 via-cyan-400 to-blue-500 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(34,211,238,0.5)]"
            style={{
              width: `${underlineStyle.width}px`,
              left: `${underlineStyle.left}px`,
            }}
          ></div>
        </div>

        {/* Tab Content */}
        <div className="max-w-7xl mx-auto">
          {/* Skills Tab */}
          {activeTab === "skills" && (
            <div className="transition-all duration-500">
              {categories.length === 0 ? (
                <p className="text-center text-gray-400 text-base sm:text-xl">Chưa có danh mục kỹ năng nào</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                  {categories.map((category, index) => {
                    const categoryData = skillsByCategory[category.id];
                    const skills = categoryData?.skills || [];

                    return (
                      <div
                        key={category.id}
                        className="bg-gray-900 border-2 border-gray-800 rounded-xl p-8 cursor-pointer"
                        style={{
                          opacity: skillsAnimated ? 1 : 0,
                          transform: skillsAnimated ? 'translateY(0)' : 'translateY(2.5rem)',
                          transition: skillsAnimated 
                            ? `opacity 600ms ease-out ${index * 150}ms, transform 600ms ease-out ${index * 150}ms`
                            : 'opacity 0ms, transform 0ms',
                        }}
                      >
                        <div className="flex items-center gap-4 mb-6">
                          {category.iconHtml && <div className="text-3xl" dangerouslySetInnerHTML={{ __html: category.iconHtml }} />}
                          <h3 className="text-2xl md:text-3xl font-semibold text-cyan-400">{category.name}</h3>
                        </div>
                        <div className="flex flex-wrap gap-4">
                          {skills.length === 0 ? (
                            <p className="text-gray-500 text-base">Chưa có kỹ năng nào</p>
                          ) : (
                            skills.map((skill) => (
                              <div
                                key={skill.id}
                                className="flex items-center gap-3 bg-gray-800 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-150 ease-out cursor-pointer group"
                              >
                                {skill.iconHtml && (
                                  <div
                                    className="text-xl group-hover:scale-110 transition-transform duration-150 ease-out will-change-transform"
                                    dangerouslySetInnerHTML={{ __html: skill.iconHtml }}
                                  />
                                )}
                                <span className="text-gray-300 text-base group-hover:text-cyan-400 transition-colors">{skill.name}</span>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Certificates Tab */}
          {activeTab === "certificates" && (
            <div className="transition-all duration-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {[1, 2, 3, 4, 5, 6].map((item, index) => (
                  <div
                    key={item}
                    className="bg-gray-900 border-2 border-gray-800 rounded-xl p-6 cursor-pointer"
                    style={{
                      opacity: certificatesAnimated ? 1 : 0,
                      transform: certificatesAnimated ? 'translateY(0)' : 'translateY(2.5rem)',
                      transition: certificatesAnimated 
                        ? `opacity 600ms ease-out ${index * 150}ms, transform 600ms ease-out ${index * 150}ms`
                        : 'opacity 0ms, transform 0ms',
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
          )}
        </div>
      </div>
    </section>
  );
}
