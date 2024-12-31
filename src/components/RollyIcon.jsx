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
      <circle cx="12" cy="12" r="10" fill="currentColor">
        <animate
          attributeName="opacity"
          values="1;0.9;1"
          dur="4s"
          repeatCount="indefinite"
        />
      </circle>
      
      {/* Robot face plate with hover effect */}
      <path
        d="M7 11.5C7 9.5 9 8 12 8C15 8 17 9.5 17 11.5V14C17 15 16 16 12 16C8 16 7 15 7 14V11.5Z"
        fill="#EEF2FF"
        fillOpacity="0.95"
      >
        <animate
          attributeName="d"
          values="
            M7 11.5C7 9.5 9 8 12 8C15 8 17 9.5 17 11.5V14C17 15 16 16 12 16C8 16 7 15 7 14V11.5Z;
            M7 11.3C7 9.3 9 7.8 12 7.8C15 7.8 17 9.3 17 11.3V14C17 15 16 16 12 16C8 16 7 15 7 14V11.3Z;
            M7 11.5C7 9.5 9 8 12 8C15 8 17 9.5 17 11.5V14C17 15 16 16 12 16C8 16 7 15 7 14V11.5Z
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
        <circle cx="9.5" cy="12" r="1" fill="#818CF8">
          <animate
            attributeName="r"
            values="1;0.8;1"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="14.5" cy="12" r="1" fill="#818CF8">
          <animate
            attributeName="r"
            values="1;0.8;1"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
      
      {/* Antenna with float animation */}
      <path
        d="M12 6V8"
        stroke="#C7D2FE"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <animate
          attributeName="d"
          values="
            M12 6V8;
            M12 5.8V7.8;
            M12 6V8
          "
          dur="4s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
};

export default RollyIcon;
