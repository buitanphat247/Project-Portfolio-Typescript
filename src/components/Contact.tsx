import React from "react";
import type { Contact as ContactType } from "../interface/data.interface";

interface ContactProps {
  contact: ContactType;
}

const Contact: React.FC<ContactProps> = ({ contact }) => {
  const contactInfo = [
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      ),
      label: "Email",
      value: "tan270407@gmail.com",
      href: "mailto:tan270407@gmail.com",
    },
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
      ),
      label: "Phone",
      value: "0984380205",
      href: "tel:0984380205",
    },
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
            clipRule="evenodd"
          />
        </svg>
      ),
      label: "Location",
      value: "Hồ Chí Minh, Việt Nam",
      href: undefined,
    },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/buitanphat247",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/buitanphat247",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/btanphat",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      name: "Zalo",
      url: "https://zalo.me/0984380205",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm-1-6h2v2h-2v-2zm0-8h2v6h-2V8z"/>
        </svg>
      ),
    },
  ];

  return (
    <section
      id="contact"
      className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden"
    >
      {/* Mysterious background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-20 h-20 sm:w-32 sm:h-32 bg-blue-500/20 rounded-full blur-2xl sm:blur-3xl"></div>
        <div className="absolute top-20 sm:top-40 right-5 sm:right-20 w-16 h-16 sm:w-24 sm:h-24 bg-purple-500/20 rounded-full blur-xl sm:blur-2xl"></div>
        <div className="absolute bottom-10 sm:bottom-20 left-1/4 sm:left-1/3 w-24 h-24 sm:w-40 sm:h-40 bg-cyan-500/20 rounded-full blur-2xl sm:blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 mb-4 sm:mb-6">
            Liên hệ với tôi
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto mb-4 sm:mb-6 shadow-lg shadow-blue-400/25"></div>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed px-4">
            Hãy liên hệ với tôi nếu bạn có bất kỳ câu hỏi nào hoặc muốn hợp tác
            trong dự án.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Contact Information Cards */}
          <div className="mb-12 sm:mb-16">
            <h3 className="text-xl sm:text-2xl font-semibold text-slate-200 mb-6 sm:mb-8 text-center">
              Thông tin liên hệ
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="group">
                  {info.href ? (
                    <a
                      href={info.href}
                      className="block p-4 sm:p-6 md:p-8 bg-slate-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 cursor-pointer transform hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-xl sm:hover:shadow-2xl hover:shadow-blue-500/10"
                    >
                      <div className="text-center">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:from-blue-500/40 group-hover:to-cyan-500/40 transition-all duration-500 border border-blue-500/30">
                          <div className="text-blue-400 group-hover:text-cyan-300 transition-colors duration-500">
                            {info.icon}
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-400 mb-2 sm:mb-3 font-medium uppercase tracking-wide group-hover:text-slate-300 transition-colors duration-300">
                          {info.label}
                        </p>
                        <p className="text-slate-200 font-semibold text-sm sm:text-base md:text-lg group-hover:text-cyan-300 transition-colors duration-500 break-words">
                          {info.value}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <div className="block p-4 sm:p-6 md:p-8 bg-slate-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-slate-700/50 cursor-pointer hover:border-blue-500/50 transition-all duration-500 transform hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-xl sm:hover:shadow-2xl hover:shadow-blue-500/10">
                      <div className="text-center">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:from-blue-500/40 group-hover:to-cyan-500/40 transition-all duration-500 border border-blue-500/30">
                          <div className="text-blue-400 group-hover:text-cyan-300 transition-colors duration-500">{info.icon}</div>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-400 mb-2 sm:mb-3 font-medium uppercase tracking-wide group-hover:text-slate-300 transition-colors duration-300">
                          {info.label}
                        </p>
                        <p className="text-slate-200 font-semibold text-sm sm:text-base md:text-lg group-hover:text-cyan-300 transition-colors duration-500 break-words">
                          {info.value}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="mb-12 sm:mb-16">
            <h4 className="text-xl sm:text-2xl font-semibold text-slate-200 mb-6 sm:mb-8 text-center">
              Kết nối với tôi
            </h4>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
              {socialLinks.map(
                (social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-3 sm:p-4 bg-slate-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 cursor-pointer transform hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-xl sm:hover:shadow-2xl hover:shadow-blue-500/10"
                    title={social.name}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:from-blue-500/40 group-hover:to-cyan-500/40 transition-all duration-500 border border-blue-500/30">
                      <div className="text-blue-400 group-hover:text-cyan-300 transition-colors duration-500">
                        {social.icon}
                      </div>
                    </div>
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
