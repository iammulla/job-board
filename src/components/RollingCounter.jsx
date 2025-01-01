import React, { useEffect, useState } from 'react';
import { motion, useSpring, animate } from 'framer-motion';

const RollingCounter = ({ value, duration = 2 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    const controls = animate(0, value, {
      duration,
      onUpdate: (latest) => {
        setDisplayValue(Math.floor(latest));
      },
      ease: "easeOut"
    });

    return () => controls.stop();
  }, [value, duration]);

  return (
    <span className="tabular-nums">
      {displayValue.toLocaleString()}
    </span>
  );
};

export default RollingCounter;
