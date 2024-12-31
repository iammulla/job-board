import React from 'react';

const RoleArcLogo = ({ className = '', size = 40 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Arc shape */}
      <path
        d="M8 20C8 13.3726 13.3726 8 20 8C26.6274 8 32 13.3726 32 20"
        stroke="url(#gradient)"
        strokeWidth="4"
        strokeLinecap="round"
        className="transition-all duration-300"
      />
      
      {/* Arrow */}
      <path
        d="M20 14L26 20L20 26"
        stroke="url(#gradient)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-all duration-300"
      />

      {/* Gradient definition */}
      <defs>
        <linearGradient id="gradient" x1="8" y1="8" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#818CF8" /> {/* indigo-400 */}
          <stop offset="1" stopColor="#4F46E5" /> {/* indigo-600 */}
        </linearGradient>
      </defs>
    </svg>
  );
};

export default RoleArcLogo;
