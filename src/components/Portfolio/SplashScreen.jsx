import { useState, useLayoutEffect } from 'react';

export default function SplashScreen({ onFinish }) {
  const [fadeOut, setFadeOut] = useState(false);

  useLayoutEffect(() => {
    // Bắt đầu fade out sau 1.5s
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1500);

    return () => clearTimeout(fadeTimer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#0A192F] flex items-center justify-center transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 opacity-20 blur-xl animate-pulse"></div>
          <div className="relative w-32 h-32 rounded-full p-[3px] bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 animate-spin-slow">
            <div className="w-full h-full rounded-full bg-[#0A192F] flex items-center justify-center overflow-hidden">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-full h-full object-contain p-4"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
          <span className="text-cyan-400 text-lg font-semibold ml-2">Đang tải...</span>
        </div>

        {/* Name */}
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
          Bùi Tấn Phát (MoiMoi)
        </h1>
      </div>
    </div>
  );
}
