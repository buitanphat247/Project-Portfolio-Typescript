import { useState, useEffect, useRef } from "react";
import { profileConfig } from "../../config/profile.config";

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Tạo mailto link với form data
    const subject = encodeURIComponent(formData.subject || "Liên hệ từ Portfolio");
    const body = encodeURIComponent(`Tên: ${formData.name}\nEmail: ${formData.email}\n\nTin nhắn:\n${formData.message}`);
    const mailtoLink = `mailto:${profileConfig.contact.email}?subject=${subject}&body=${body}`;

    // Mở email client
    window.location.href = mailtoLink;

    // Reset form sau 1 giây
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" ref={sectionRef} className="min-h-screen py-20 bg-[#0A192F]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4">Liên Hệ</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 via-cyan-400 to-blue-500 mx-auto mb-4 rounded-full"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">Hãy liên hệ với tôi nếu bạn có bất kỳ câu hỏi nào hoặc muốn hợp tác trong dự án.</p>
        </div>

        {/* Contact Information Cards */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          {/* Email Card */}
          <div className="bg-gray-900 border-2 border-gray-800 rounded-xl p-6 text-center cursor-pointer">
            <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-envelope text-cyan-400 text-2xl"></i>
            </div>
            <h3 className="text-white font-semibold uppercase text-sm mb-2">Email</h3>
            <a href={`mailto:${profileConfig.contact.email}`} className="text-gray-300 hover:text-cyan-400 transition-colors duration-150 ease-out cursor-pointer">
              {profileConfig.contact.email}
            </a>
          </div>

          {/* Phone Card */}
          <div className="bg-gray-900 border-2 border-gray-800 rounded-xl p-6 text-center cursor-pointer">
            <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-phone text-cyan-400 text-2xl"></i>
            </div>
            <h3 className="text-white font-semibold uppercase text-sm mb-2">Phone</h3>
            <a href={`tel:${profileConfig.contact.phone}`} className="text-gray-300 hover:text-cyan-400 transition-colors duration-150 ease-out cursor-pointer">
              {profileConfig.contact.phone}
            </a>
          </div>

          {/* Location Card */}
          <div className="bg-gray-900 border-2 border-gray-800 rounded-xl p-6 text-center cursor-pointer">
            <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-location-dot text-cyan-400 text-2xl"></i>
            </div>
            <h3 className="text-white font-semibold uppercase text-sm mb-2">Location</h3>
            <p className="text-gray-300">Hồ Chí Minh, Việt Nam</p>
          </div>
        </div>

        {/* Connect Section */}
        <div
          className={`mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          style={{ transitionDelay: "400ms" }}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-6">Kết nối với tôi</h3>
          <div className="flex justify-center gap-4">
            {profileConfig.socialLinks.github && (
              <a
                href={profileConfig.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-cyan-500/20 rounded-lg flex items-center justify-center hover:bg-cyan-500/30 transition-[background-color,transform] duration-150 ease-out transform hover:scale-110 border border-cyan-500/30 cursor-pointer will-change-transform"
                aria-label="GitHub"
              >
                <i className="fa-brands fa-github text-cyan-400 text-xl"></i>
              </a>
            )}
            {profileConfig.socialLinks.linkedin && (
              <a
                href={profileConfig.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-cyan-500/20 rounded-lg flex items-center justify-center hover:bg-cyan-500/30 transition-[background-color,transform] duration-150 ease-out transform hover:scale-110 border border-cyan-500/30 cursor-pointer will-change-transform"
                aria-label="LinkedIn"
              >
                <i className="fa-brands fa-linkedin-in text-cyan-400 text-xl"></i>
              </a>
            )}
            {profileConfig.socialLinks.facebook && (
              <a
                href={profileConfig.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-cyan-500/20 rounded-lg flex items-center justify-center hover:bg-cyan-500/30 transition-[background-color,transform] duration-150 ease-out transform hover:scale-110 border border-cyan-500/30 cursor-pointer will-change-transform"
                aria-label="Facebook"
              >
                <i className="fa-brands fa-facebook-f text-cyan-400 text-xl"></i>
              </a>
            )}
          </div>
        </div>

        {/* Contact Form */}
        <div
          className={`max-w-2xl mx-auto transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          style={{ transitionDelay: "600ms" }}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">Gửi tin nhắn cho tôi</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Tên của bạn"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-gray-500 transition-[border-color] duration-150 ease-out hover:border-cyan-500/50"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email của bạn"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-gray-500 transition-[border-color] duration-150 ease-out hover:border-cyan-500/50"
                />
              </div>
            </div>
            <div>
              <input
                type="text"
                name="subject"
                placeholder="Chủ đề"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-gray-500 transition-all duration-300 hover:border-cyan-500/50"
              />
            </div>
            <div>
              <textarea
                name="message"
                placeholder="Tin nhắn của bạn"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-gray-500 transition-all duration-300 hover:border-cyan-500/50 resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-[background-color,transform,box-shadow] duration-150 ease-out cursor-pointer transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 font-semibold disabled:opacity-50 disabled:cursor-not-allowed will-change-transform"
            >
              {isSubmitting ? "Đang gửi..." : "Gửi tin nhắn"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
