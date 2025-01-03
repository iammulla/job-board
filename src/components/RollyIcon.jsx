import React from 'react';

const RollyIcon = ({ className = '', size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`rolly-icon ${className}`}
      style={{ minWidth: size, minHeight: size }}
    >
      {/* Base circle with subtle pulse */}
      <circle cx="12" cy="12" r="11" fill="#C4B5FD">
        <animate
          attributeName="opacity"
          values="1;0.92;1"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
      
      {/* Large circular face plate */}
      <circle
        cx="12"
        cy="12"
        r="10.5"
        fill="#DDD6FE"
        stroke="#000000"
        strokeWidth="0.4"
      />
      
      {/* Eyes with blink animation */}
      <g>
        <animate
          attributeName="opacity"
          values="1;1;0.1;1;1"
          dur="3s"
          repeatCount="indefinite"
        />
        {/* Left eye */}
        <circle cx="8" cy="12" r="1.5" fill="#000000" />
        {/* Right eye */}
        <circle cx="16" cy="12" r="1.5" fill="#000000" />
      </g>
      
      {/* Antenna */}
      <path
        d="M12 3V1.5"
        stroke="#000000"
        strokeWidth="0.6"
        strokeLinecap="round"
      >
        <animate
          attributeName="d"
          values="
            M12 3V1.5;
            M12 3V1.8;
            M12 3V1.5
          "
          dur="3s"
          repeatCount="indefinite"
        />
      </path>
      <circle
        cx="12"
        cy="1"
        r="0.7"
        fill="#000000"
      >
        <animate
          attributeName="r"
          values="0.7;0.8;0.7"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};

export default RollyIcon;
