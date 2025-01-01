import React from 'react';
import { motion } from 'framer-motion';

const RoleMatch = ({ score, skills, requirements }) => {
  // Calculate percentage match for visual elements
  const matchPercentage = Math.min(Math.round(score * 100), 100);
  const matchColor = score >= 0.8 ? 'green' : score >= 0.6 ? 'yellow' : 'red';
  
  const colorClasses = {
    green: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      border: 'border-green-200',
      progress: 'bg-green-500',
    },
    yellow: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      border: 'border-yellow-200',
      progress: 'bg-yellow-500',
    },
    red: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      border: 'border-red-200',
      progress: 'bg-red-500',
    },
  };

  const colors = colorClasses[matchColor];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-lg p-4 ${colors.bg} ${colors.border} border`}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className={`font-semibold ${colors.text}`}>Role Match</h3>
          <span className={`font-bold ${colors.text}`}>{matchPercentage}%</span>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${matchPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`h-full ${colors.progress}`}
          />
        </div>

        {/* Matching skills */}
        <div className="space-y-2">
          <h4 className={`text-sm font-medium ${colors.text}`}>Matching Skills</h4>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Missing requirements */}
        {requirements.length > 0 && (
          <div className="space-y-2">
            <h4 className={`text-sm font-medium ${colors.text}`}>
              Areas for Growth
            </h4>
            <ul className={`text-sm ${colors.text} list-disc list-inside`}>
              {requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default RoleMatch;
