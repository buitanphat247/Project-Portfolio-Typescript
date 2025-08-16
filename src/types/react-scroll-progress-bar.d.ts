declare module 'react-scroll-progress-bar' {
  import React from 'react';

  interface ScrollProgressBarProps {
    height?: string;
    color?: string;
    gradient?: boolean;
    gradientColor?: string;
    style?: React.CSSProperties;
    className?: string;
    onLoad?: () => void;
    onScroll?: (progress: number) => void;
  }

  const ScrollProgressBar: React.FC<ScrollProgressBarProps>;
  export default ScrollProgressBar;
}
