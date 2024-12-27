import React from 'react';
import { CheckCircleIcon, StarIcon, MapPinIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

const ScoreBar = ({ score, label, icon: Icon }) => {
  // Convert score to percentage
  const percentage = Math.round(score * 100);
  
  // Determine color based on score
  const getColor = (score) => {
    if (score >= 0.8) return 'bg-green-500';
    if (score >= 0.6) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  return (
    <div className="flex items-center space-x-2">
      <Icon className="h-4 w-4 text-gray-400" />
      <div className="flex-1">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${getColor(score)} transition-all duration-300`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
      <span className="text-xs font-medium text-gray-600">{percentage}%</span>
    </div>
  );
};

const MatchScore = ({ scores }) => {
  const { success, location, compensation, final } = scores;

  return (
    <div className="mt-4 pt-4 border-t border-gray-100">
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-gray-900">Overall Match</span>
          <span className="text-sm font-medium text-indigo-600">
            {Math.round(final * 100)}%
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${Math.round(final * 100)}%` }}
          />
        </div>
      </div>

      <div className="space-y-2">
        <ScoreBar
          score={success}
          label="Success Rate"
          icon={CheckCircleIcon}
        />
        <ScoreBar
          score={location}
          label="Location Match"
          icon={MapPinIcon}
        />
        <ScoreBar
          score={compensation}
          label="Compensation Match"
          icon={CurrencyDollarIcon}
        />
      </div>
    </div>
  );
};

export default MatchScore;
