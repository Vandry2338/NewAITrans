import React from 'react';
const jouleLogoPath = "/assets/Joule (1)_1752485787249.png";

interface JouleLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function JouleLogo({ width = 75, height = 30, className = "" }: JouleLogoProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img 
        src={jouleLogoPath} 
        alt="SAP Joule" 
        width={width}
        height={height}
        className="object-contain"
        style={{ 
          filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
          background: 'transparent'
        }}
      />
    </div>
  );
}