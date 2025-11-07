import { profileConfig } from '../../config/profile.config';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-gray-900 py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-12">
          {/* About */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-3 sm:mb-4">
              Bùi Tấn Phát
            </h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Full Stack Developer với đam mê tạo ra những sản phẩm công nghệ chất lượng cao.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-3 sm:mb-4">
              Liên hệ
            </h3>
            <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <a 
                href={`mailto:${profileConfig.contact.email}`} 
                className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors duration-200 cursor-pointer group"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-900 rounded-lg flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors flex-shrink-0">
                  <i className="fa-solid fa-envelope text-cyan-400 text-sm sm:text-base"></i>
                </div>
                <span className="break-all">{profileConfig.contact.email}</span>
              </a>
              <a 
                href={`tel:${profileConfig.contact.phone}`} 
                className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors duration-200 cursor-pointer group"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-900 rounded-lg flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors flex-shrink-0">
                  <i className="fa-solid fa-phone text-cyan-400 text-sm sm:text-base"></i>
                </div>
                <span>{profileConfig.contact.phone}</span>
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-3 sm:mb-4">
              Theo dõi
            </h3>
            <div className="flex gap-2 sm:gap-3">
              {profileConfig.socialLinks.github && (
                <a
                  href={profileConfig.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-900 rounded-lg flex items-center justify-center hover:bg-gray-800 border border-gray-800 hover:border-cyan-500/50 transition-all duration-200 cursor-pointer"
                  aria-label="GitHub"
                >
                  <i className="fa-brands fa-github text-gray-300 hover:text-cyan-400 text-lg sm:text-xl transition-colors"></i>
                </a>
              )}
              {profileConfig.socialLinks.linkedin && (
                <a
                  href={profileConfig.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-900 rounded-lg flex items-center justify-center hover:bg-gray-800 border border-gray-800 hover:border-cyan-500/50 transition-all duration-200 cursor-pointer"
                  aria-label="LinkedIn"
                >
                  <i className="fa-brands fa-linkedin text-gray-300 hover:text-cyan-400 text-xl transition-colors"></i>
                </a>
              )}
              {profileConfig.socialLinks.facebook && (
                <a
                  href={profileConfig.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-900 rounded-lg flex items-center justify-center hover:bg-gray-800 border border-gray-800 hover:border-cyan-500/50 transition-all duration-200 cursor-pointer"
                  aria-label="Facebook"
                >
                  <i className="fa-brands fa-facebook text-gray-300 hover:text-cyan-400 text-xl transition-colors"></i>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-900 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} Bùi Tấn Phát. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

