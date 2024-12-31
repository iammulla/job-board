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
      {/* Base circle with subtle pulse */}
      <circle cx="12" cy="12" r="11" fill="currentColor">
        <animate
          attributeName="opacity"
          values="1;0.9;1"
          dur="4s"
          repeatCount="indefinite"
        />
      </circle>
      
      {/* Robot face plate with hover effect */}
      <path
        d="M6 11C6 8.5 8.5 6.5 12 6.5C15.5 6.5 18 8.5 18 11V14.5C18 16 16.5 17 12 17C7.5 17 6 16 6 14.5V11Z"
        fill="#EEF2FF"
        fillOpacity="0.98"
        stroke="#C7D2FE"
        strokeWidth="0.5"
      >
        <animate
          attributeName="d"
          values="
            M6 11C6 8.5 8.5 6.5 12 6.5C15.5 6.5 18 8.5 18 11V14.5C18 16 16.5 17 12 17C7.5 17 6 16 6 14.5V11Z;
            M6 10.8C6 8.3 8.5 6.3 12 6.3C15.5 6.3 18 8.3 18 10.8V14.5C18 16 16.5 17 12 17C7.5 17 6 16 6 14.5V10.8Z;
            M6 11C6 8.5 8.5 6.5 12 6.5C15.5 6.5 18 8.5 18 11V14.5C18 16 16.5 17 12 17C7.5 17 6 16 6 14.5V11Z
          "
          dur="4s"
          repeatCount="indefinite"
        />
      </path>
      
      {/* Eyes with blink animation */}
      <g>
        <animate
          attributeName="opacity"
          values="1;1;0.1;1;1"
          dur="4s"
          repeatCount="indefinite"
        />
        {/* Left eye */}
        <circle cx="9" cy="11.5" r="1.3" fill="#818CF8">
          <animate
            attributeName="r"
            values="1.3;1.1;1.3"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="9" cy="11.5" r="0.5" fill="#4F46E5" />
        
        {/* Right eye */}
        <circle cx="15" cy="11.5" r="1.3" fill="#818CF8">
          <animate
            attributeName="r"
            values="1.3;1.1;1.3"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="15" cy="11.5" r="0.5" fill="#4F46E5" />
      </g>
      
      {/* Antenna with float animation */}
      <path
        d="M12 4V6.5"
        stroke="#C7D2FE"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <animate
          attributeName="d"
          values="
            M12 4V6.5;
            M12 3.8V6.3;
            M12 4V6.5
          "
          dur="4s"
          repeatCount="indefinite"
        />
      </path>
      
      {/* Antenna base */}
      <circle cx="12" cy="4" r="1" fill="#C7D2FE" />
    </svg>
  );
};

export default RollyIcon;
