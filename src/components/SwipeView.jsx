import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import JobCard from './JobCard';
import ResumeUpload from './ResumeUpload';
import RollingCounter from './RollingCounter';

const SwipeView = ({ jobs = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasResume, setHasResume] = useState(false);
  const [resumeData, setResumeData] = useState(null);
  const [likedJobs, setLikedJobs] = useState(new Set());
  const [showUpload, setShowUpload] = useState(true);

  const handleResumeUpload = async (file) => {
    setResumeData({
      skills: ['React', 'JavaScript', 'Node.js', 'Python'],
      experience: '3-5 years',
      education: 'Bachelor\'s in Computer Science',
    });
    setHasResume(true);
    setShowUpload(false);
  };

  const handleLike = () => {
    setLikedJobs(new Set([...likedJobs, jobs[currentIndex].id]));
    setCurrentIndex((prev) => Math.min(prev + 1, jobs.length - 1));
  };

  const handleDislike = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, jobs.length - 1));
  };

  const getJobWithRoleMatch = (job) => {
    if (!hasResume) return job;
    const matchScore = Math.random() * 0.5 + 0.3;
    return {
      ...job,
      roleMatch: {
        score: matchScore,
        matchingSkills: resumeData.skills.filter(() => Math.random() > 0.5),
        missingRequirements: job.requirements.filter(() => Math.random() > 0.7),
      },
    };
  };

  return (
    <div className="relative min-h-screen bg-gray-100 p-4">
      <AnimatePresence>
        {showUpload && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8"
          >
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Upload Your Resume
              </h2>
              <p className="text-gray-600">
                Get personalized job matches based on your experience
              </p>
            </div>
            <ResumeUpload onUpload={handleResumeUpload} />
          </motion.div>
        )}
      </AnimatePresence>

      {currentIndex < jobs.length && (
        <>
          {/* Stats Section */}
          <div className="text-center mb-6">
            <div className="flex justify-center items-center gap-8 mb-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-primary-600">93%</span>
                <span className="text-gray-600">Match Accuracy</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-primary-600">
                  <RollingCounter value={12000} /> +
                </span>
                <span className="text-gray-600">Jobs Landed</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-primary-600">24hr</span>
                <span className="text-gray-600">Response Time</span>
              </div>
            </div>
          </div>

          <JobCard
            job={getJobWithRoleMatch(jobs[currentIndex])}
            hasResume={hasResume}
            onLike={handleLike}
            onDislike={handleDislike}
            isLiked={likedJobs.has(jobs[currentIndex].id)}
            controls={true}
          />
        </>
      )}

      {currentIndex >= jobs.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-8"
        >
          <h3 className="text-xl font-semibold text-gray-900">
            No more jobs to show
          </h3>
          <p className="text-gray-600">Check back later for new opportunities</p>
        </motion.div>
      )}
    </div>
  );
};

export default SwipeView;
