import { useState, useEffect, useRef } from "react";
import { projectsApi } from "../../api/projects.api";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [filterAnimated, setFilterAnimated] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });
  const filterRefs = useRef({});
  const filterContainerRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filters = [
    { id: "all", label: "All" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "fullstack", label: "Fullstack" },
    { id: "app", label: "App/Tool" },
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (!sectionRef.current || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setFilterAnimated(false);
            setTimeout(() => {
              setFilterAnimated(true);
            }, 100);
          } else {
            setIsVisible(false);
            setFilterAnimated(false);
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

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectsApi.getAll();
      setProjects(data);
    } catch (err) {
      setError("Không thể tải dự án. Vui lòng thử lại.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateUnderline = (filterId) => {
    const activeButton = filterRefs.current[filterId];
    const container = filterContainerRef.current;
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
      // Delay một chút để đảm bảo DOM đã render
      const timer = setTimeout(() => {
        updateUnderline(activeFilter);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activeFilter, isVisible]);

  useEffect(() => {
    const handleResize = () => {
      if (isVisible) {
        updateUnderline(activeFilter);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeFilter, isVisible]);

  const handleFilterClick = (filterId) => {
    if (filterId === activeFilter) return;
    setFilterAnimated(false);
    setAnimationKey((prev) => prev + 1);
    setActiveFilter(filterId);
    setTimeout(() => {
      setFilterAnimated(true);
    }, 100);
  };

  // Trigger animation khi scroll vào section
  useEffect(() => {
    if (isVisible && !filterAnimated) {
      const timer = setTimeout(() => {
        setFilterAnimated(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => {
          // Backward compatibility: nếu project cũ có category thì convert thành mảng
          const projectCategories = p.categories || (p.category ? [p.category] : []);
          return projectCategories.includes(activeFilter);
        });

  const SkeletonCard = () => (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
      <div className="h-48 bg-gray-800 animate-pulse"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-800 rounded mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-800 rounded mb-4 animate-pulse"></div>
        <div className="flex gap-2 mb-4">
          <div className="w-8 h-8 bg-gray-800 rounded animate-pulse"></div>
          <div className="w-8 h-8 bg-gray-800 rounded animate-pulse"></div>
        </div>
        <div className="flex items-center justify-between">
          <div className="w-6 h-6 bg-gray-800 rounded animate-pulse"></div>
          <div className="h-4 w-24 bg-gray-800 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  const SkeletonTitle = () => (
    <div className="flex items-center justify-center gap-4 mb-16">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 bg-gray-800 rounded animate-pulse"></div>
        <div className="h-8 w-32 bg-gray-800 rounded animate-pulse"></div>
      </div>
    </div>
  );

  const SkeletonFilters = () => (
    <div className="flex items-center justify-center gap-4 mb-12 flex-wrap">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-10 w-20 bg-gray-800 rounded animate-pulse"></div>
      ))}
    </div>
  );

  return (
    <section id="projects" ref={sectionRef} className="min-h-screen bg-[#0A192F] py-20">
      <div className="container mx-auto px-4">
        {/* Title */}
        {loading ? (
          <SkeletonTitle />
        ) : (
          <div
            className={`flex items-center justify-center gap-4 mb-16 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
            }`}
          >
            <div className="relative group cursor-pointer">
              <div className="px-8 py-4 flex items-center gap-3">
                <i className="fa-solid fa-folder-open text-white text-xl"></i>
                <span className="text-white font-bold text-2xl tracking-wide">Dự Án</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-cyan-400 to-blue-500 rounded-full opacity-80 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        {loading ? (
          <SkeletonFilters />
        ) : (
          <div
            ref={filterContainerRef}
            className={`relative flex items-center justify-center gap-4 mb-12 flex-wrap transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
            }`}
          >
            {filters.map((filter) => (
              <button
                key={filter.id}
                ref={(el) => (filterRefs.current[filter.id] = el)}
                onClick={() => handleFilterClick(filter.id)}
                className="relative group cursor-pointer"
              >
                <div className="px-6 py-3 flex items-center gap-2">
                  <span className="text-white font-semibold text-lg">{filter.label}</span>
                </div>
              </button>
            ))}
            {/* Sliding Underline */}
            <div
              className="absolute bottom-0 h-1 bg-gradient-to-r from-green-500 via-cyan-400 to-blue-500 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(34,211,238,0.5)]"
              style={{
                width: `${underlineStyle.width}px`,
                left: `${underlineStyle.left}px`,
              }}
            ></div>
          </div>
        )}

        {/* Projects Grid */}
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : error ? (
            <p className="text-center text-red-400 text-xl">{error}</p>
          ) : filteredProjects.length === 0 ? (
            <p className="text-center text-gray-400 text-xl">Chưa có dự án nào</p>
          ) : (
            <div key={animationKey} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="bg-gray-900 border-2 border-gray-800 rounded-xl overflow-hidden cursor-pointer"
                  style={{
                    opacity: filterAnimated ? 1 : 0,
                    transform: filterAnimated ? 'translateY(0)' : 'translateY(2.5rem)',
                    transition: filterAnimated 
                      ? `opacity 600ms ease-out ${index * 100}ms, transform 600ms ease-out ${index * 100}ms`
                      : 'opacity 0ms, transform 0ms',
                  }}
                >
                  {/* Project Image/Banner */}
                  <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden">
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextElementSibling.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <div className={`w-full h-full flex items-center justify-center ${project.imageUrl ? "hidden" : ""}`}>
                      <i className="fa-solid fa-image text-gray-600 text-4xl"></i>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="px-5 py-4 space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-cyan-400 mb-2">{project.title}</h3>
                      {project.description && <p className="text-gray-400 text-sm line-clamp-2">{project.description}</p>}

                      {/* Tech Stack Icons (Tags) */}
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-4 mb-4 mt-3">
                          {project.tags.map((tag, tagIndex) => (
                            <div key={tagIndex} className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                              <div className="text-xl flex items-center justify-center" dangerouslySetInnerHTML={{ __html: tag }} />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Action Links */}
                    <div>
                      <div className="flex items-center justify-between ">
                        {project.githubUrl ? (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-cyan-400 transition-colors duration-150 ease-out cursor-pointer"
                            aria-label="GitHub"
                          >
                            <i className="fa-brands fa-github text-xl"></i>
                          </a>
                        ) : (
                          <div></div>
                        )}
                        {project.deployUrl ? (
                          <a
                            href={project.deployUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2 cursor-pointer"
                          >
                            <span className="text-sm">View Project</span>
                            <i className="fa-solid fa-arrow-right"></i>
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
