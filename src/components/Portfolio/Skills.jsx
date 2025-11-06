import { useState, useEffect, useRef } from "react";
import { skillsApi } from "../../api/skills.api";
import { skillCategoriesApi } from "../../api/skillCategories.api";

export default function Skills() {
  const [categories, setCategories] = useState([]);
  const [skillsByCategory, setSkillsByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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
  }, [loading]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [categoriesData, skillsData] = await Promise.all([skillCategoriesApi.getAll(), skillsApi.getAllWithoutPagination()]);

      setCategories(categoriesData);

      // Nhóm skills theo categoryId
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

  if (loading) {
    return (
      <section id="skills" className="min-h-screen bg-black py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 mb-16">
            <div className="relative group cursor-pointer">
              <div className="px-8 py-4 flex items-center gap-3">
                <i className="fa-solid fa-code text-white text-xl"></i>
                <span className="text-white font-bold text-2xl tracking-wide">Skills</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-cyan-400 to-blue-500 rounded-full opacity-80 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
      <section id="skills" className="min-h-screen bg-black flex items-center justify-center py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="relative">
              <div className="px-8 py-4 flex items-center gap-3">
                <i className="fa-solid fa-code text-white text-xl"></i>
                <span className="text-white font-bold text-2xl tracking-wide">Skills</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-cyan-400 to-blue-500 rounded-full opacity-80 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto">
            <p className="text-center text-red-400 text-xl">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" ref={sectionRef} className="min-h-screen bg-gray-950 py-20">
      <div className="container mx-auto px-4">
        <div className={`flex items-center justify-center gap-4 mb-16 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
        }`} style={{ visibility: isVisible ? "visible" : "visible" }}>
          <div className="relative group cursor-pointer">
            <div className="px-8 py-4 flex items-center gap-3">
              <i className="fa-solid fa-code text-white text-xl"></i>
              <span className="text-white font-bold text-2xl tracking-wide">Skills</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-cyan-400 to-blue-500 rounded-full opacity-80 group-hover:opacity-100  transition-all duration-300 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto">
          {categories.length === 0 ? (
            <p className="text-center text-gray-400 text-xl">Chưa có danh mục kỹ năng nào</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {categories.map((category, index) => {
                const categoryData = skillsByCategory[category.id];
                const skills = categoryData?.skills || [];

                return (
                  <div
                    key={category.id}
                    className={`bg-gray-900 border border-gray-800 rounded-xl p-8 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                    style={{
                      transitionDelay: isVisible ? `${index * 150}ms` : "0ms",
                      transitionDuration: "600ms",
                      visibility: "visible",
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
                            className="flex items-center gap-3 bg-gray-800 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer group"
                          >
                            {skill.iconHtml && (
                              <div
                                className="text-xl group-hover:scale-110 transition-transform"
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
      </div>
    </section>
  );
}
