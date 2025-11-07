import { useState, useEffect } from 'react';
import { profileConfig } from '../../config/profile.config';

export default function FloatingSocialLinks() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let rafId = null;

    const handleScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          setIsVisible(window.scrollY > 300);
          rafId = null;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      name: 'Facebook',
      icon: 'fa-brands fa-facebook-f',
      url: profileConfig.socialLinks.facebook,
      bgColor: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      name: 'Twitter',
      icon: 'fa-brands fa-x-twitter',
      url: '#',
      bgColor: 'bg-cyan-400 hover:bg-cyan-500',
    },
    {
      name: 'LinkedIn',
      icon: 'fa-brands fa-linkedin-in',
      url: profileConfig.socialLinks.linkedin,
      bgColor: 'bg-blue-700 hover:bg-blue-800',
    },
    {
      name: 'Instagram',
      icon: 'fa-brands fa-instagram',
      url: '#',
      bgColor: 'bg-gradient-to-br from-pink-500 via-red-500 to-orange-500 hover:from-pink-600 hover:via-red-600 hover:to-orange-600',
    },
    {
      name: 'GitHub',
      icon: 'fa-brands fa-github',
      url: profileConfig.socialLinks.github,
      bgColor: 'bg-gray-800 hover:bg-gray-700',
    },
  ];

  return (
    <div className="hidden sm:flex fixed right-3 sm:right-6 bottom-6 z-40 flex-col gap-3 sm:gap-4">
      {socialLinks.map((social, index) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-10 h-10 sm:w-12 sm:h-12 ${social.bgColor} rounded-full flex items-center justify-center text-white transition-[transform,box-shadow] duration-150 ease-out cursor-pointer transform hover:scale-110 hover:shadow-lg will-change-transform`}
          aria-label={social.name}
          style={{
            animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
          }}
        >
          <i className={`${social.icon} text-base sm:text-lg`}></i>
        </a>
      ))}
      
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-400 to-cyan-500 hover:from-green-500 hover:to-cyan-600 rounded-full flex items-center justify-center text-white transition-[background,transform,box-shadow] duration-150 ease-out cursor-pointer transform hover:scale-110 hover:shadow-lg animate-fadeInUp will-change-transform"
          aria-label="Scroll to top"
        >
          <i className="fa-solid fa-arrow-up text-base sm:text-lg"></i>
        </button>
      )}
      
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

