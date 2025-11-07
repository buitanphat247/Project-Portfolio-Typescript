import { useState, useEffect, useRef } from "react";
import { achievementsApi } from "../../api/achievements.api";
import { achievementCategoriesApi } from "../../api/achievementCategories.api";

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animated, setAnimated] = useState(false);
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
            setAnimated(false);
            setTimeout(() => {
              setAnimated(true);
            }, 100);
          } else {
            setIsVisible(false);
            setAnimated(false);
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
      const [achievementsData, categoriesData] = await Promise.all([
        achievementsApi.getAll(),
        achievementCategoriesApi.getAll(),
      ]);
      setAchievements(achievementsData);
      setCategories(categoriesData);
    } catch (err) {
      setError("Không thể tải thành tích. Vui lòng thử lại.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryName = (categoryId) => {
    if (!categoryId) return '';
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : '';
  };

  const SkeletonCard = () => (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-gray-800 rounded-lg animate-pulse"></div>
        <div className="w-20 h-6 bg-gray-800 rounded-full animate-pulse"></div>
      </div>
      <div className="h-6 bg-gray-800 rounded mb-2 animate-pulse"></div>
      <div className="h-4 bg-gray-800 rounded mb-4 animate-pulse"></div>
      <div className="w-24 h-6 bg-gray-800 rounded-full animate-pulse"></div>
    </div>
  );

  if (loading) {
    return (
      <section id="achievements" ref={sectionRef} className="py-12 sm:py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <div
            className={`flex items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
            }`}
          >
            <div className="relative group cursor-pointer">
              <div className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex items-center gap-2 sm:gap-3">
                <i className="fa-solid fa-trophy text-white text-lg sm:text-xl"></i>
                <span className="text-white font-bold text-xl sm:text-2xl tracking-wide">Thành tích</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-cyan-400 to-blue-500 rounded-full opacity-80 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {[...Array(6)].map((_, i) => (
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
      <section id="achievements" ref={sectionRef} className="py-12 sm:py-20 bg-gray-950 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <p className="text-center text-red-400 text-base sm:text-xl">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="achievements" ref={sectionRef} className="py-12 sm:py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div
          className={`flex items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        >
          <div className="relative group cursor-pointer">
            <div className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex items-center gap-2 sm:gap-3">
              <i className="fa-solid fa-trophy text-white text-lg sm:text-xl"></i>
              <span className="text-white font-bold text-xl sm:text-2xl tracking-wide">Thành Tích</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-cyan-400 to-blue-500 rounded-full opacity-80 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="max-w-7xl mx-auto">
          {achievements.length === 0 ? (
            <p className="text-center text-gray-400 text-xl">Chưa có thành tích nào</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {achievements.map((achievement, index) => {
                const categoryName = getCategoryName(achievement.categoryId || achievement.category);
                return (
                  <div
                    key={achievement.id}
                    className="bg-gray-900 border-2 border-gray-800 rounded-xl p-6 cursor-pointer"
                    style={{
                      opacity: animated ? 1 : 0,
                      transform: animated ? 'translateY(0)' : 'translateY(2.5rem)',
                      transition: animated 
                        ? `opacity 600ms ease-out ${index * 100}ms, transform 600ms ease-out ${index * 100}ms`
                        : 'opacity 0ms, transform 0ms',
                    }}
                  >
                    {/* Icon và Category Tag */}
                    <div className="flex items-start justify-between mb-4">
                      {/* Icon Box */}
                      {achievement.iconHtml ? (
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center shadow-lg">
                          <div
                            className="text-white text-xl"
                            dangerouslySetInnerHTML={{ __html: achievement.iconHtml }}
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center shadow-lg">
                          <i className="fa-solid fa-trophy text-white text-xl"></i>
                        </div>
                      )}

                      {/* Category Tag */}
                      {categoryName && (
                        <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-purple-500 text-white text-xs font-semibold rounded-full border border-purple-400/30">
                          {categoryName}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-2">{achievement.title}</h3>

                    {/* Description */}
                    {achievement.description && (
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{achievement.description}</p>
                    )}

                    {/* Date Range Tag */}
                    {achievement.dateRange && (
                      <div className="mt-4">
                        <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-purple-500 text-white text-xs font-semibold rounded-full border border-purple-400/30">
                          {achievement.dateRange}
                        </span>
                      </div>
                    )}
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
