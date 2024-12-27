import React, { useState } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline';

const ProfileMenu = ({ isAuthenticated, onLogin, onSignUp }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center text-sm text-white hover:text-gray-200 transition-colors"
      >
        <UserCircleIcon className="h-4 w-4 mr-1 text-white" />
        <span>Profile</span>
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
          {isAuthenticated ? (
            <>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  console.log('Account Settings clicked');
                  setShowDropdown(false);
                }}
              >
                Account Settings
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  console.log('Update Resume clicked');
                  setShowDropdown(false);
                }}
              >
                Update Resume
              </button>
            </>
          ) : (
            <>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  onLogin();
                  setShowDropdown(false);
                }}
              >
                Login
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  onSignUp();
                  setShowDropdown(false);
                }}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
