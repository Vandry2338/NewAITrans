import React from 'react';
const certisLogoPath = "/assets/certis_1752496703688.png";

interface CertisLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export const CertisLogo: React.FC<CertisLogoProps> = ({ 
  width = 120, 
  height = 40, 
  className = "" 
}) => {
  return (
    <img 
      src={certisLogoPath}
      alt="Certis CISCO - Securing Your World"
      width={width} 
      height={height} 
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
};