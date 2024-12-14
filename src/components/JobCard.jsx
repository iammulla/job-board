import {
  MapPinIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  HeartIcon as HeartOutlineIcon,
  ChevronRightIcon,
  HomeIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const JobCard = ({ job, onLike, onDislike, isLiked, controls, className = '' }) => {
  const WorkLocationIcon = job.isRemote ? HomeIcon : job.isHybrid ? HomeIcon : BuildingOfficeIcon;
  const workLocationType = job.isRemote ? "Remote" : job.isHybrid ? "Hybrid" : "On-site";

  const handleHeartClick = (e) => {
    e.preventDefault();
    onLike(job.id);
  };

  const handleXClick = (e) => {
    e.preventDefault();
    onDislike?.(job.id);
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md border border-gray-100 w-full mx-auto ${className}`}>
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Company Logo */}
          <img
            src={job.logo}
            alt={`${job.company} logo`}
            className="w-12 h-12 rounded-lg flex-shrink-0 bg-gray-100"
          />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 truncate">
                  {job.title}
                </h2>
                <p className="text-sm text-gray-600 mb-2">{job.company}</p>
              </div>

              <button
                onClick={handleHeartClick}
                className="p-2 hover:bg-gray-50 rounded-full transition-colors duration-200 flex-shrink-0"
                aria-label={isLiked ? "Unlike job" : "Like job"}
              >
                {isLiked ? (
                  <HeartSolidIcon className="h-5 w-5 text-primary-500" />
                ) : (
                  <HeartOutlineIcon className="h-5 w-5 text-gray-400 hover:text-primary-500" />
                )}
              </button>
            </div>

            {/* Job Details */}
            <div className="grid grid-cols-2 gap-2 mb-3 mt-2">
              <div className="flex items-center text-sm text-gray-600">
                <MapPinIcon className="h-4 w-4 mr-1.5 text-gray-400" />
                <span className="truncate">{job.location}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <BriefcaseIcon className="h-4 w-4 mr-1.5 text-gray-400" />
                <span className="truncate">{job.type}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CurrencyDollarIcon className="h-4 w-4 mr-1.5 text-gray-400" />
                <span className="truncate">{job.salary}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <WorkLocationIcon className="h-4 w-4 mr-1.5 text-gray-400" />
                <span className="truncate">{workLocationType}</span>
              </div>
            </div>

            {/* Key Highlights */}
            <div className="mt-3">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Key Highlights:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                {job.highlights.slice(0, 2).map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span className="text-sm">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Apply Button */}
        <div className="mt-4 flex justify-end">
          <a
            href={job.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
          >
            View Details
            <ChevronRightIcon className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
