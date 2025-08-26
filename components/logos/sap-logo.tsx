interface SAPLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function SAPLogo({ className = "", width = 80, height = 40 }: SAPLogoProps) {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 455 225" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="sapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0073E6" />
          <stop offset="50%" stopColor="#004C99" />
          <stop offset="100%" stopColor="#002F66" />
        </linearGradient>
      </defs>
      <g fill="url(#sapGradient)">
        {/* S */}
        <path d="M0 112.5c0-62.1 50.4-112.5 112.5-112.5s112.5 50.4 112.5 112.5c0 20.8-5.7 40.3-15.6 57l-96.9-57 96.9-57c9.9 16.7 15.6 36.2 15.6 57z"/>
        
        {/* A */}
        <path d="M227.5 0h112.5c62.1 0 112.5 50.4 112.5 112.5s-50.4 112.5-112.5 112.5H227.5l56.25-112.5L227.5 0z"/>
        
        {/* P */}
        <path d="M227.5 0v225h112.5c62.1 0 112.5-50.4 112.5-112.5S402.1 0 340 0H227.5z"/>
      </g>
      
      {/* SAP Text */}
      <g fill="currentColor">
        <text x="50" y="180" fontSize="48" fontWeight="bold" fontFamily="Arial, sans-serif">SAP</text>
      </g>
    </svg>
  );
}