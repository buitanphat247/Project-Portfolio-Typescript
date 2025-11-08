import { useState, useEffect, useRef } from "react";
import { Modal } from "antd";
import { projectsApi } from "../../api/projects.api";
import LazyImage from "../LazyImage";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const filters = [
    { id: "all", label: "All" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "fullstack", label: "Fullstack" },
    { id: "app", label: "App/Tool" },
    { id: "docs", label: "Docs" },
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
      // Sử dụng requestAnimationFrame để đảm bảo DOM đã render xong
      requestAnimationFrame(() => {
        // Đợi thêm một frame nữa để đảm bảo layout đã ổn định
        requestAnimationFrame(() => {
          try {
            const buttonRect = activeButton.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            
            // Tính toán position: lấy vị trí tương đối của button so với container
            // Sử dụng getBoundingClientRect để xử lý chính xác với flex-wrap
            const left = buttonRect.left - containerRect.left;
            const width = buttonRect.width;
            
            // Đảm bảo giá trị hợp lệ
            if (width > 0 && left >= 0) {
              setUnderlineStyle({
                width: width,
                left: left,
              });
            }
          } catch (error) {
            console.error('Error updating underline:', error);
          }
        });
      });
    }
  };

  useEffect(() => {
    if (isVisible) {
      // Delay một chút để đảm bảo DOM đã render, đặc biệt khi tabs wrap
      const timer = setTimeout(() => {
        updateUnderline(activeFilter);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [activeFilter, isVisible]);

  useEffect(() => {
    const handleResize = () => {
      if (isVisible) {
        // Delay khi resize để đợi layout ổn định
        setTimeout(() => {
          updateUnderline(activeFilter);
        }, 100);
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
    // Update underline sau khi state đã update, delay lâu hơn để đảm bảo layout ổn định
    setTimeout(() => {
      updateUnderline(filterId);
      setFilterAnimated(true);
    }, 200);
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

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const getCategoryLabel = (categoryId) => {
    const category = filters.find((f) => f.id === categoryId);
    return category ? category.label : categoryId;
  };

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
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-10 w-20 bg-gray-800 rounded animate-pulse"></div>
      ))}
    </div>
  );

  return (
    <section id="projects" ref={sectionRef} className="min-h-screen bg-[#0A192F] py-12 sm:py-20">
      <div className="container mx-auto px-4">
        {/* Title */}
        {loading ? (
          <SkeletonTitle />
        ) : (
          <div
            className={`flex items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-16 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
            }`}
          >
            <div className="relative group cursor-pointer">
              <div className="px-4 sm:px-8 py-3 sm:py-4 flex items-center gap-2 sm:gap-3">
                <i className="fa-solid fa-folder-open text-white text-lg sm:text-xl"></i>
                <span className="text-white font-bold text-xl sm:text-2xl tracking-wide">Dự Án</span>
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
            className={`relative flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-12 flex-wrap transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
            }`}
            style={{ position: 'relative' }}
          >
            {filters.map((filter) => (
              <button
                key={filter.id}
                ref={(el) => (filterRefs.current[filter.id] = el)}
                onClick={() => handleFilterClick(filter.id)}
                className="relative group cursor-pointer"
              >
                <div className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 flex items-center gap-2">
                  <span className="text-white font-semibold text-sm sm:text-base md:text-lg">{filter.label}</span>
                </div>
              </button>
            ))}
            {/* Sliding Underline - chỉ hiển thị trên desktop */}
            {underlineStyle.width > 0 && (
              <div
                className="hidden md:block absolute bottom-0 h-1 bg-gradient-to-r from-green-500 via-cyan-400 to-blue-500 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                style={{
                  width: `${underlineStyle.width}px`,
                  left: `${underlineStyle.left}px`,
                  transform: 'translateZ(0)', // Force GPU acceleration
                }}
              ></div>
            )}
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
            <div key={animationKey} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  onClick={() => handleProjectClick(project)}
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
                      <LazyImage
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <i className="fa-solid fa-image text-gray-600 text-4xl"></i>
                      </div>
                    )}
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
                            onClick={(e) => e.stopPropagation()}
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
                            onClick={(e) => e.stopPropagation()}
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

      {/* Modal Chi Tiết Dự Án */}
      <Modal
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
        width={800}
        className="project-detail-modal"
        maskStyle={{
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
        }}
        styles={{
          content: {
            backgroundColor: '#0A192F',
            padding: 0,
            borderRadius: '8px',
          },
          header: {
            backgroundColor: '#0A192F',
            borderBottom: '1px solid #1e293b',
            padding: '20px 24px',
            borderRadius: '8px 8px 0 0',
          },
          body: {
            backgroundColor: '#0A192F',
            padding: '24px',
          },
        }}
        wrapClassName="project-modal-wrapper"
      >
        {selectedProject && (
          <div className="text-white">
            {/* Ảnh đại diện */}
            {selectedProject.imageUrl && (
              <div className="w-full h-64 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden mb-6">
                <LazyImage
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            )}

            {/* Tiêu đề */}
            <h2 className="text-3xl font-bold text-cyan-400 mb-4">{selectedProject.title}</h2>

            {/* Mô tả */}
            {selectedProject.description && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">Mô tả</h3>
                <p className="text-gray-300 leading-relaxed">{selectedProject.description}</p>
              </div>
            )}

            {/* Categories */}
            {(() => {
              const projectCategories = selectedProject.categories || (selectedProject.category ? [selectedProject.category] : []);
              return projectCategories.length > 0 ? (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Danh mục</h3>
                  <div className="flex flex-wrap gap-2">
                    {projectCategories.map((cat, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm border border-cyan-500/30"
                      >
                        {getCategoryLabel(cat)}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null;
            })()}

            {/* Tech Stack Icons */}
            {selectedProject.tags && selectedProject.tags.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Công nghệ sử dụng</h3>
                <div className="flex flex-wrap gap-4">
                  {selectedProject.tags.map((tag, tagIndex) => (
                    <div
                      key={tagIndex}
                      className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700"
                    >
                      <div className="text-2xl flex items-center justify-center" dangerouslySetInnerHTML={{ __html: tag }} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-700">
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors cursor-pointer"
                >
                  <i className="fa-brands fa-github text-xl"></i>
                  <span>GitHub</span>
                </a>
              )}
              {selectedProject.deployUrl && (
                <a
                  href={selectedProject.deployUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors cursor-pointer"
                >
                  <i className="fa-solid fa-external-link-alt"></i>
                  <span>Xem dự án</span>
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
