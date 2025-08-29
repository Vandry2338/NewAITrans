import React from 'react';
const signavioLogoPath = "/assets/SAP_Signavio_horz_R_pos_blugld-768x162_1752485787249.jpg";

interface SignavioLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function SignavioLogo({ width = 100, height = 30, className = "" }: SignavioLogoProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img 
        src={signavioLogoPath} 
        alt="SAP Signavio" 
        width={width}
        height={height}
        className="object-contain"
      />
    </div>
  );
}