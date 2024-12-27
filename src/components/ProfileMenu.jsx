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
            {isAuthenticated ? (
              <div>
                <button
                  className="block w-full text-left px-4 py-3 text-sm text-gray-900 hover:text-indigo-400 hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    console.log('Account Settings clicked');
                    setShowDropdown(false);
                  }}
                >
                  Account Settings
                </button>
                <div className="border-t border-gray-100">
                  <button
                    className="block w-full text-left px-4 py-3 text-sm text-gray-900 hover:text-indigo-400 hover:bg-gray-50 transition-colors rounded-b-lg"
                    onClick={() => {
                      console.log('Update Resume clicked');
                      setShowDropdown(false);
                    }}
                  >
                    Update Resume
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <button
                  className="block w-full text-left px-4 py-3 text-sm text-gray-900 hover:text-indigo-400 hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    onLogin();
                    setShowDropdown(false);
                  }}
                >
                  Login
                </button>
                <div className="border-t border-gray-100">
                  <button
                    className="block w-full text-left px-4 py-3 text-sm text-gray-900 hover:text-indigo-400 hover:bg-gray-50 transition-colors rounded-b-lg"
                    onClick={() => {
                      onSignUp();
                      setShowDropdown(false);
                    }}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileMenu;
