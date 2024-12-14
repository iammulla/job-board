import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  XMarkIcon, 
  HeartIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  BriefcaseIcon,
  HomeIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

const SwipeView = ({ jobs, onLike, onSkip }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  const currentJob = jobs[currentIndex];

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    if (currentIndex + newDirection >= 0 && currentIndex + newDirection < jobs.length) {
      setDirection(newDirection);
      setCurrentIndex(currentIndex + newDirection);
    }
  };

  const handleDragEnd = (e, { offset, velocity }) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
      onSkip(currentJob);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
      onLike(currentJob);
    }
  };

  const handleLike = () => {
    onLike(currentJob);
    if (currentIndex < jobs.length - 1) {
      setDirection(-1);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSkip = () => {
    onSkip(currentJob);
    if (currentIndex < jobs.length - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  if (!currentJob) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px] bg-white rounded-xl shadow-md w-full">
        <p className="text-xl text-gray-600 mb-4">No more jobs to show!</p>
        <button
          onClick={() => setCurrentIndex(0)}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Start Over
        </button>
      </div>
    );
  }

  const WorkLocationIcon = currentJob.isRemote ? HomeIcon : currentJob.isHybrid ? HomeIcon : BuildingOfficeIcon;
  const workLocationType = currentJob.isRemote ? "Remote" : currentJob.isHybrid ? "Hybrid" : "On-site";

  return (
    <div className="relative h-[600px] w-full bg-white rounded-xl shadow-md overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={handleDragEnd}
          className="absolute w-full h-full"
        >
          <div className="p-6 h-full flex flex-col w-full">
            <div className="flex items-start gap-4 mb-6">
              <img
                src={currentJob.logo}
                alt={`${currentJob.company} logo`}
                className="w-16 h-16 rounded-lg flex-shrink-0 bg-gray-100"
              />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {currentJob.title}
                </h2>
                <h3 className="text-lg text-gray-700">
                  {currentJob.company}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center text-gray-600">
                <MapPinIcon className="h-5 w-5 mr-2 text-gray-400" />
                <span>{currentJob.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <BriefcaseIcon className="h-5 w-5 mr-2 text-gray-400" />
                <span>{currentJob.type}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <CurrencyDollarIcon className="h-5 w-5 mr-2 text-gray-400" />
                <span>{currentJob.salary}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <WorkLocationIcon className="h-5 w-5 mr-2 text-gray-400" />
                <span>{workLocationType}</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">About the Role</h3>
                  <p className="text-gray-600">{currentJob.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Key Highlights</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {currentJob.highlights.map((highlight, index) => (
                      <li key={index} className="text-gray-600">{highlight}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Requirements</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {currentJob.requirements.map((req, index) => (
                      <li key={index} className="text-gray-600">{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4 pt-6 mt-6 border-t">
              <button
                onClick={handleSkip}
                className="p-4 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <XMarkIcon className="h-8 w-8 text-gray-600" />
              </button>
              <button
                onClick={handleLike}
                className="p-4 bg-primary-100 rounded-full hover:bg-primary-200 transition-colors"
              >
                <HeartIcon className="h-8 w-8 text-primary-600" />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          {jobs.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentIndex ? 'bg-primary-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SwipeView;
