import React from 'react';
import { motion } from 'framer-motion';
import { 
  XMarkIcon, 
  HeartIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  BriefcaseIcon,
  HomeIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import RoleMatch from './RoleMatch';

const JobCard = ({ 
  job, 
  onLike, 
  onDislike, 
  isLiked, 
  controls = true,
  hasResume = false,
  className = '' 
}) => {
  const WorkLocationIcon = job.isRemote ? HomeIcon : job.isHybrid ? HomeIcon : BuildingOfficeIcon;
  const workLocationType = job.isRemote ? "Remote" : job.isHybrid ? "Hybrid" : "On-site";

  return (
    <motion.div
      className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}
    >
      <div className="p-6">
        {/* Company logo and name */}
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-1 flex items-start gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              {job.logo ? (
                <img
                  src={job.logo}
                  alt={`${job.company} logo`}
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : (
                <span className="text-xl font-bold text-gray-400">
                  {job.company.charAt(0)}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{job.title}</h2>
              <h3 className="text-base text-gray-700">{job.company}</h3>
            </div>
          </div>
          
          {/* Like button */}
          <button
            onClick={onLike}
            className="p-2 hover:bg-gray-50 rounded-full transition-colors"
          >
            {isLiked ? (
              <HeartSolidIcon className="h-6 w-6 text-rose-500" />
            ) : (
              <HeartIcon className="h-6 w-6 text-gray-400 hover:text-rose-500" />
            )}
          </button>
        </div>

        {/* Role match if resume is uploaded */}
        {hasResume && job.roleMatch && (
          <div className="mb-4">
            <RoleMatch
              score={job.roleMatch.score}
              skills={job.roleMatch.matchingSkills}
              requirements={job.roleMatch.missingRequirements}
            />
          </div>
        )}

        {/* Job details */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <MapPinIcon className="h-4 w-4 mr-2 text-gray-400" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <BriefcaseIcon className="h-4 w-4 mr-2 text-gray-400" />
            <span>{job.type}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <CurrencyDollarIcon className="h-4 w-4 mr-2 text-gray-400" />
            <span>{job.salary}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <WorkLocationIcon className="h-4 w-4 mr-2 text-gray-400" />
            <span>{workLocationType}</span>
          </div>
        </div>

        {/* Job description */}
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-medium text-gray-900 mb-2">About the Role</h3>
            <p className="text-sm text-gray-600">{job.description}</p>
          </div>

          {job.highlights && (
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-2">Key Highlights</h3>
              <ul className="list-disc pl-5 space-y-1.5">
                {job.highlights.map((highlight, index) => (
                  <li key={index} className="text-sm text-gray-600">{highlight}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h3 className="text-base font-medium text-gray-900 mb-2">Requirements</h3>
            <ul className="list-disc pl-5 space-y-1.5">
              {job.requirements.map((req, index) => (
                <li key={index} className="text-sm text-gray-600">{req}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action buttons */}
        {controls && (
          <div className="flex justify-center space-x-4 pt-6 mt-6 border-t">
            <button
              onClick={onDislike}
              className="p-4 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <XMarkIcon className="h-8 w-8 text-gray-600" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default JobCard;
