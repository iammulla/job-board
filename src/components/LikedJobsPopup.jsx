import React, { useEffect, useRef } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const LikedJobsPopup = ({ isOpen, onClose, likedJobs, buttonRef }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target) && 
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && buttonRef.current && (
        <motion.div
          ref={popupRef}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          style={{
            position: 'absolute',
            top: buttonRef.current.getBoundingClientRect().bottom + 8,
            left: buttonRef.current.getBoundingClientRect().left,
            transform: 'translateX(-50%)',
          }}
          className="z-50 w-80 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="text-sm font-medium text-gray-900">Liked Jobs</h3>
          </div>

          {/* Job list */}
          <div className="max-h-80 overflow-y-auto">
            {likedJobs.length === 0 ? (
              <div className="py-8">
                <p className="text-sm text-gray-500 text-center">No liked jobs yet</p>
              </div>
            ) : (
              <div className="py-1">
                {likedJobs.map((job) => (
                  <div 
                    key={job.id} 
                    className="px-4 py-2 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={job.logo}
                        alt={`${job.company} logo`}
                        className="h-8 w-8 rounded-lg flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {job.title}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {job.company} • {job.location}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {likedJobs.length > 0 && (
            <div className="border-t border-gray-100">
              <a
                href="/liked-jobs"
                className="flex items-center justify-center px-4 py-3 text-sm text-primary-600 hover:text-primary-700 hover:bg-gray-50 transition-colors rounded-b-lg"
              >
                See all liked jobs
                <ChevronRightIcon className="ml-1 h-4 w-4" />
              </a>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LikedJobsPopup;
