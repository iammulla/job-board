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
      {/* Base circle */}
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      
      {/* Robot face plate */}
      <path
        d="M6 11C6 8.79086 8.79086 6 12 6C15.2091 6 18 8.79086 18 11V15C18 16.1046 17.1046 17 16 17H8C6.89543 17 6 16.1046 6 15V11Z"
        fill="#EEF2FF"  /* indigo-50 */
        fillOpacity="0.95"
      />
      
      {/* Eyes */}
      <circle cx="9" cy="12" r="1.25" fill="#818CF8">  {/* indigo-400 */}
        <animate
          attributeName="r"
          values="1.25;1;1.25"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="15" cy="12" r="1.25" fill="#818CF8">  {/* indigo-400 */}
        <animate
          attributeName="r"
          values="1.25;1;1.25"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      
      {/* Antenna */}
      <path
        d="M12 3.5V5.5M12 5.5C13.1046 5.5 14 4.60457 14 3.5V3"
        stroke="#C7D2FE"  /* indigo-200 */
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <animate
          attributeName="d"
          values="M12 3.5V5.5M12 5.5C13.1046 5.5 14 4.60457 14 3.5V3;
                  M12 3.5V5.5M12 5.5C13.1046 5.5 14.5 4.60457 14 3.5V3;
                  M12 3.5V5.5M12 5.5C13.1046 5.5 14 4.60457 14 3.5V3"
          dur="3s"
          repeatCount="indefinite"
        />
      </path>
      
      {/* Mouth/Speaker */}
      <path
        d="M9 14.5C9.5 15.5 10.5 16 12 16C13.5 16 14.5 15.5 15 14.5"
        stroke="#818CF8"  /* indigo-400 */
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Signal waves */}
      <path
        d="M19 10C19.5 11 19.5 13 19 14M5 10C4.5 11 4.5 13 5 14"
        stroke="#C7D2FE"  /* indigo-200 */
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <animate
          attributeName="opacity"
          values="1;0.5;1"
          dur="2s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
};

export default RollyIcon;
