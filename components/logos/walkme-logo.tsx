import React from 'react';

export const WalkMeLogo: React.FC<{ className?: string }> = ({ className = "h-8" }) => {
  return (
    <svg 
      viewBox="0 0 200 80" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* WalkMe logo text and design */}
      {/* Black "walk" text */}
      <text x="10" y="55" fontSize="32" fontFamily="Arial, sans-serif" fontWeight="400" fill="#000000">walk</text>
      
      {/* Blue speech bubble with "me" */}
      <g transform="translate(95, 25)">
        {/* Speech bubble shape */}
        <path 
          d="M 0 15 C 0 7 7 0 15 0 L 65 0 C 73 0 80 7 80 15 L 80 25 C 80 33 73 40 65 40 L 30 40 L 15 50 L 15 40 L 15 40 C 7 40 0 33 0 25 Z" 
          fill="#0099E0"
        />
        {/* "me" text in white */}
        <text x="40" y="28" fontSize="28" fontFamily="Arial, sans-serif" fontWeight="400" fill="#FFFFFF" textAnchor="middle">me</text>
      </g>
    </svg>
  );
};

export default WalkMeLogo;