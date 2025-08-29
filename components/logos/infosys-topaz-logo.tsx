import React from 'react';
const infosysTopazLogoPath = "/assets/infosys_topaz_logo_1752487168145.jpeg";

interface InfosysTopazLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function InfosysTopazLogo({ width = 100, height = 30, className = "" }: InfosysTopazLogoProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img 
        src={infosysTopazLogoPath} 
        alt="Infosys Topaz" 
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