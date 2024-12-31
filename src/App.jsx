import { useState, useRef } from 'react';
import { mockJobs } from './services/mockJobs.jsx';
import JobCard from './components/JobCard';
import FilterBar from './components/FilterBar';
import SwipeView from './components/SwipeView';
import LikedJobsPopup from './components/LikedJobsPopup';
import ProfileMenu from './components/ProfileMenu';
import LoginDropdown from './components/LoginDropdown';
import RoleArcLogo from './components/RoleArcLogo';
import { 
  ViewColumnsIcon, 
  ViewfinderCircleIcon,
  HeartIcon,
  MapPinIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

function App() {
  const [likedJobs, setLikedJobs] = useState([]);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'swipe'
  const [isLikedJobsOpen, setIsLikedJobsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const likedJobsButtonRef = useRef(null);
  const [filters, setFilters] = useState({
    roleType: [],
    workType: [],
    experienceLevel: [],
    location: ''
  });

  const handleLikeJob = (job) => {
    setLikedJobs(prev => {
      const isLiked = prev.some(likedJob => likedJob.id === job.id);
      if (isLiked) {
        return prev.filter(likedJob => likedJob.id !== job.id);
      }
      return [job, ...prev]; // Add new jobs to the beginning of the array
    });
  };

  const handleSkipJob = () => {
    // Optional: Add skip logic here if needed
  };

  const handleLogin = (email, password) => {
    console.log('Login clicked', { email, password });
    // Add your login logic here
    setIsAuthenticated(true);
  };

  const handleSignUp = () => {
    console.log('Sign up clicked');
    // Add your sign up logic here
    // You can navigate to sign up page or show sign up modal
  };

  const filteredJobs = mockJobs.filter(job => {
    // Filter by role type
    if (filters.roleType.length > 0 && !filters.roleType.includes(job.type)) {
      return false;
    }

    // Filter by work type (remote/onsite)
    if (filters.workType.length > 0) {
      const isRemoteJob = job.isRemote;
      const wantsRemote = filters.workType.includes('remote');
      const wantsOnsite = filters.workType.includes('onsite');
      if ((wantsRemote && !isRemoteJob) || (wantsOnsite && isRemoteJob)) {
        return false;
      }
    }

    // Filter by experience level
    if (
      filters.experienceLevel.length > 0 &&
      !filters.experienceLevel.includes(job.experience)
    ) {
      return false;
    }

    // Filter by location
    if (
      filters.location &&
      !job.location.toLowerCase().includes(filters.location.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-1.5 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-11">
            {/* Location */}
            <div className="flex items-center text-base text-white/80 hover:text-indigo-400 transition-colors cursor-pointer">
              <MapPinIcon className="h-5 w-5 mr-1" />
              <span>New York, USA</span>
            </div>
            
            {/* Navigation Links */}
            <div className="flex items-center space-x-4">
              <button 
                ref={likedJobsButtonRef}
                onClick={() => setIsLikedJobsOpen(!isLikedJobsOpen)}
                className="flex items-center text-sm text-white hover:text-gray-200 transition-colors relative"
              >
                <HeartIcon className="h-4 w-4 mr-1 text-white" />
                <span>Liked Jobs</span>
                {likedJobs.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 bg-black text-white rounded-full text-xs font-medium">
                    {likedJobs.length}
                  </span>
                )}
              </button>
              <ProfileMenu 
                isAuthenticated={isAuthenticated}
                onLogin={handleLogin}
                onSignUp={handleSignUp}
              />
              {!isAuthenticated && (
                <LoginDropdown 
                  onLogin={handleLogin}
                  onSignUp={handleSignUp}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <header className="text-center mb-12">
          <div className="mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <RoleArcLogo size={48} />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent">
                RoleArc
              </h1>
            </div>
            <p className="text-2xl text-gray-600 font-medium">Design your next role.</p>
            <div className="mt-6 max-w-2xl mx-auto">
              <p className="text-gray-500">
                AI-powered job matching that understands your skills and potential. 
                Swipe through personalized opportunities that align with your career goals.
              </p>
            </div>
          </div>
          
          <div className="flex justify-center space-x-12 text-center">
            <div className="px-4">
              <div className="text-2xl font-semibold text-indigo-600 mb-1">93%</div>
              <div className="text-sm text-gray-600">Match Accuracy</div>
            </div>
            <div className="px-4 border-l border-r border-gray-200">
              <div className="text-2xl font-semibold text-indigo-600 mb-1">10k+</div>
              <div className="text-sm text-gray-600">Active Roles</div>
            </div>
            <div className="px-4">
              <div className="text-2xl font-semibold text-indigo-600 mb-1">24hr</div>
              <div className="text-sm text-gray-600">Response Time</div>
            </div>
          </div>
        </header>

        <FilterBar 
          filters={filters} 
          onFilterChange={setFilters} 
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        <div className="w-full max-w-5xl mx-auto">
          {viewMode === 'list' ? (
            <div className="space-y-6 max-w-4xl mx-auto">
              {filteredJobs.map(job => (
                <JobCard
                  key={job.id}
                  job={job}
                  onLike={handleLikeJob}
                  isLiked={likedJobs.some(likedJob => likedJob.id === job.id)}
                />
              ))}
              {filteredJobs.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No jobs match your filters</p>
                </div>
              )}
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <SwipeView
                jobs={filteredJobs}
                onLike={handleLikeJob}
                onSkip={handleSkipJob}
              />
            </div>
          )}
        </div>
      </div>

      {/* Liked Jobs Popup */}
      <LikedJobsPopup
        isOpen={isLikedJobsOpen}
        onClose={() => setIsLikedJobsOpen(false)}
        likedJobs={likedJobs}
        buttonRef={likedJobsButtonRef}
      />
    </div>
  )
}

export default App
