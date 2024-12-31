import React from 'react';

const RollyIcon = ({ className = '', size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Main chat bubble shape */}
      <path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z"
        fill="currentColor"
        fillOpacity="0.9"
      />
      
      {/* Robot eyes */}
      <circle cx="8" cy="12" r="2" fill="white" />
      <circle cx="16" cy="12" r="2" fill="white" />
      
      {/* Antenna */}
      <path
        d="M12 2V4M12 4C13.1046 4 14 4.89543 14 6V6.5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Smile */}
      <path
        d="M9 16C9.5 17 10.5 18 12 18C13.5 18 14.5 17 15 16"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default RollyIcon;
