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
        d="M6.5 11.2C6.5 8.8 8.8 7 12 7C15.2 7 17.5 8.8 17.5 11.2V14C17.5 15.2 16.5 16.5 12 16.5C7.5 16.5 6.5 15.2 6.5 14V11.2Z"
        fill="#EEF2FF"
        fillOpacity="0.95"
      >
        <animate
          attributeName="d"
          values="
            M6.5 11.2C6.5 8.8 8.8 7 12 7C15.2 7 17.5 8.8 17.5 11.2V14C17.5 15.2 16.5 16.5 12 16.5C7.5 16.5 6.5 15.2 6.5 14V11.2Z;
            M6.5 11C6.5 8.6 8.8 6.8 12 6.8C15.2 6.8 17.5 8.6 17.5 11V14C17.5 15.2 16.5 16.5 12 16.5C7.5 16.5 6.5 15.2 6.5 14V11Z;
            M6.5 11.2C6.5 8.8 8.8 7 12 7C15.2 7 17.5 8.8 17.5 11.2V14C17.5 15.2 16.5 16.5 12 16.5C7.5 16.5 6.5 15.2 6.5 14V11.2Z
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
        <circle cx="9" cy="11.8" r="1.2" fill="#818CF8">
          <animate
            attributeName="r"
            values="1.2;1;1.2"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="15" cy="11.8" r="1.2" fill="#818CF8">
          <animate
            attributeName="r"
            values="1.2;1;1.2"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
      
      {/* Antenna with float animation */}
      <path
        d="M12 4.5V7"
        stroke="#C7D2FE"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <animate
          attributeName="d"
          values="
            M12 4.5V7;
            M12 4.2V6.7;
            M12 4.5V7
          "
          dur="4s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
};

export default RollyIcon;
