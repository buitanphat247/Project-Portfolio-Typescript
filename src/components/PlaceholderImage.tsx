import React from 'react';

interface PlaceholderImageProps {
  width: number;
  height: number;
  text: string;
  bgColor?: string;
  textColor?: string;
  className?: string;
}

const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  width,
  height,
  text,
  bgColor = '#6366F1',
  textColor = '#FFFFFF',
  className = ''
}) => {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: bgColor,
        color: textColor,
        fontSize: `${Math.min(width, height) / 8}px`,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '16px',
        wordBreak: 'break-word'
      }}
    >
      {text}
    </div>
  );
};

export default PlaceholderImage;
