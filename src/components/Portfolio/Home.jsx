import TypingEffect from './TypingEffect';
import { profileConfig } from '../../config/profile.config';

export default function Home() {
  return (
    <div id="home" className="min-h-screen flex items-center justify-center bg-[#0A192F] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(0,255,255,0.05)_100%)]"></div>
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-2xl md:text-3xl text-cyan-400">Xin chào, tôi là</p>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Bùi Tấn Phát (MoiMoi)
            </h1>
            <p className="text-3xl md:text-4xl text-cyan-300">
              <TypingEffect 
                texts={[
                  'Full Stack Developer',
                  'Frontend Developer',
                  'Backend Developer',
                  'Mobile App Developer'
                ]} 
                speed={100} 
                deleteSpeed={50}
                pauseTime={2000}
              />
            </p>
            <div className="flex items-center gap-2 text-gray-400 text-lg md:text-xl">
              <i className="fa-solid fa-location-dot text-cyan-400"></i>
              <span>Bà Rịa - Vũng Tàu, Việt Nam</span>
            </div>
            <p className="text-gray-400 leading-relaxed text-lg md:text-xl text-justify">
              Tôi là một nhà phát triển web và mobile đầy đam mê, thích khám phá các công nghệ mới để xây dựng những ứng dụng sáng tạo, 
              giúp cải thiện cuộc sống và trải nghiệm người dùng.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => {
                  const contact = document.getElementById('contact');
                  if (contact) {
                    contact.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-[background-color,transform,box-shadow] duration-150 ease-out cursor-pointer transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 will-change-transform"
              >
                Liên hệ với tôi
              </button>
              <button 
                onClick={() => {
                  const projects = document.getElementById('projects');
                  if (projects) {
                    projects.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-6 py-3 border-2 border-cyan-400 hover:bg-cyan-400 hover:text-black rounded-lg transition-[background-color,color,transform,box-shadow] duration-150 ease-out cursor-pointer transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/50 will-change-transform"
              >
                Xem dự án
              </button>
            </div>
            <div className="flex gap-4 mt-6">
              <a 
                href={profileConfig.socialLinks.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-[color,transform,filter] duration-150 ease-out cursor-pointer transform hover:scale-125 hover:rotate-12 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] will-change-transform"
                aria-label="GitHub Profile"
              >
                <i className="fa-brands fa-github text-2xl"></i>
              </a>
              <a 
                href={profileConfig.socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-[color,transform,filter] duration-150 ease-out cursor-pointer transform hover:scale-125 hover:rotate-12 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] will-change-transform"
                aria-label="LinkedIn Profile"
              >
                <i className="fa-brands fa-linkedin text-2xl"></i>
              </a>
              <a 
                href={profileConfig.socialLinks.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-[color,transform,filter] duration-150 ease-out cursor-pointer transform hover:scale-125 hover:rotate-12 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] will-change-transform"
                aria-label="Facebook Profile"
              >
                <i className="fa-brands fa-facebook text-2xl"></i>
              </a>
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="relative group cursor-pointer">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 opacity-20 blur-xl group-hover:opacity-40 group-hover:blur-2xl transition-all duration-500 animate-pulse"></div>
              
              {/* Main avatar container */}
              <div className="relative w-64 h-64 rounded-full p-[3px] bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-[0_0_50px_rgba(34,211,238,0.6)]">
                <div className="w-full h-full rounded-full bg-black overflow-hidden relative">
                  <img
                    src="/avatar.jpg"
                    alt="Bùi Tấn Phát"
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                  />
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-500 rounded-full"></div>
                </div>
              </div>
              
              {/* Animated border ring */}
              <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30 group-hover:border-cyan-400/60 transition-all duration-500 animate-spin-slow"></div>
              
              {/* Checkmark badge */}
              <div className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-12 shadow-[0_0_20px_rgba(34,211,238,0.8)] z-30 border-2 border-black">
                <i className="fa-solid fa-check text-white text-xl"></i>
              </div>
              
              {/* Floating particles effect */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-500"></div>
                <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-700 delay-100"></div>
                <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-cyan-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-900 delay-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


