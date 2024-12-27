import React, { useState, useRef, useEffect } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const ProfileMenu = ({ isAuthenticated, onLogin, onSignUp }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center text-sm text-white hover:text-gray-200 transition-colors relative"
      >
        <UserCircleIcon className="h-4 w-4 mr-1 text-white" />
        <span>Profile</span>
      </button>

      <AnimatePresence>
        {showDropdown && buttonRef.current && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 6px)',
              right: 0,
              transform: 'translateX(0)',
            }}
            className="z-50 w-48 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div className="p-4 space-y-4">
              {isAuthenticated ? (
                <>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Account Settings</h3>
                    <button
                      className="mt-1 block w-full text-left px-3 py-2 text-sm text-gray-900 rounded-md border border-gray-300 hover:border-indigo-400 transition-colors"
                      onClick={() => {
                        console.log('Account Settings clicked');
                        setShowDropdown(false);
                      }}
                    >
                      Manage Account
                    </button>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Resume</h3>
                    <button
                      className="mt-1 block w-full text-left px-3 py-2 text-sm text-gray-900 rounded-md border border-gray-300 hover:border-indigo-400 transition-colors"
                      onClick={() => {
                        console.log('Update Resume clicked');
                        setShowDropdown(false);
                      }}
                    >
                      Update Resume
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Login</h3>
                    <button
                      className="mt-1 block w-full text-left px-3 py-2 text-sm text-gray-900 rounded-md border border-gray-300 hover:border-indigo-400 transition-colors"
                      onClick={() => {
                        onLogin();
                        setShowDropdown(false);
                      }}
                    >
                      Sign In
                    </button>
                  </div>
                  <div className="border-t border-gray-100 pt-4">
                    <button
                      className="w-full bg-indigo-400 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
                      onClick={() => {
                        onSignUp();
                        setShowDropdown(false);
                      }}
                    >
                      Create Account
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileMenu;
