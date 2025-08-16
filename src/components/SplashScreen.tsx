import React, { useState, useEffect } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    'Khởi tạo ứng dụng...',
    'Tải dữ liệu...',
    'Chuẩn bị giao diện...',
    'Hoàn tất!'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const stepTimer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(stepTimer);
          return steps.length - 1;
        }
        return prev + 1;
      });
    }, 400);

    return () => {
      clearInterval(timer);
      clearInterval(stepTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_25%,rgba(147,51,234,0.1)_50%,transparent_75%)] bg-[length:20px_20px] animate-pulse"></div>
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_25%,rgba(236,72,153,0.1)_50%,transparent_75%)] bg-[length:20px_20px] animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="text-center relative z-10">
        {/* Holographic Logo */}
        <div className="mb-12 relative">
          <div className="w-40 h-40 mx-auto relative">
            {/* Outer Ring */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full animate-spin" style={{animationDuration: '8s'}}></div>
            {/* Inner Ring */}
            <div className="absolute inset-2 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 rounded-full animate-spin" style={{animationDuration: '6s', animationDirection: 'reverse'}}></div>
            {/* Core */}
            <div className="absolute inset-4 bg-black rounded-full flex items-center justify-center">
              <span className="text-7xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">P</span>
            </div>
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse"></div>
          </div>
        </div>

        {/* Holographic Text */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              Bùi Tấn Phát
            </span>
          </h1>
          <p className="text-xl text-gray-300 font-mono tracking-wider">
            <span className="text-cyan-400">FULL</span> STACK <span className="text-purple-400">DEVELOPER</span>
          </p>
        </div>

        {/* Advanced Progress Bar */}
        <div className="w-96 mx-auto mb-8">
          <div className="relative">
            {/* Background Track */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-full h-4 overflow-hidden border border-gray-700/50">
              {/* Progress Fill */}
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/50 via-purple-500/50 to-pink-500/50 rounded-full blur-sm"></div>
              </div>
            </div>
            {/* Progress Percentage */}
            <div className="absolute -top-8 right-0">
              <span className="text-sm font-mono text-cyan-400 bg-black/50 px-2 py-1 rounded border border-cyan-400/30">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        </div>

        {/* Holographic Step Display */}
        <div className="mb-10">
          <div className="bg-black/30 backdrop-blur-md border border-cyan-400/30 rounded-lg px-6 py-4 inline-block">
            <p className="text-lg font-mono text-cyan-300 tracking-wider">
              <span className="text-purple-400">[</span> {steps[currentStep]} <span className="text-purple-400">]</span>
            </p>
          </div>
        </div>

        {/* Advanced Loading Indicator */}
        <div className="flex justify-center space-x-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="relative">
              <div className={`w-4 h-4 rounded-full transition-all duration-500 ${
                currentStep >= i 
                  ? 'bg-gradient-to-r from-cyan-400 to-purple-500 shadow-lg shadow-cyan-400/50' 
                  : 'bg-gray-600'
              }`}></div>
              {/* Pulse Ring */}
              {currentStep >= i && (
                <div className="absolute inset-0 w-4 h-4 rounded-full bg-cyan-400/30 animate-ping"></div>
              )}
            </div>
          ))}
        </div>

        {/* Status Bar */}
        <div className="mt-8 text-xs font-mono text-gray-400 tracking-wider">
          <span className="text-cyan-400">SYSTEM</span> <span className="text-gray-500">|</span> 
          <span className="text-purple-400"> READY</span> <span className="text-gray-500">|</span> 
          <span className="text-pink-400"> ONLINE</span>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
