import React, { useState, useRef, useEffect } from 'react';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const LoginDropdown = ({ onLogin, onSignUp }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
    setEmail('');
    setPassword('');
    setShowDropdown(false);
  };

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center text-sm text-white hover:text-gray-200 transition-colors"
      >
        <ArrowRightOnRectangleIcon className="h-4 w-4 mr-1 text-white" />
        <span>Login / Sign Up</span>
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
              top: buttonRef.current.getBoundingClientRect().bottom + 8,
              right: 0,
              transform: 'translateX(0)',
            }}
            className="z-50 w-80 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            {/* Form */}
            <div className="p-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Email</h3>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-indigo-400 placeholder-gray-500 bg-white focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 hover:border-indigo-400 transition-colors"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Password</h3>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-indigo-400 placeholder-gray-500 bg-white focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 hover:border-indigo-400 transition-colors"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-400 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
                >
                  Login
                </button>
              </form>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100">
              <button
                onClick={() => {
                  onSignUp();
                  setShowDropdown(false);
                }}
                className="flex items-center justify-center px-4 py-3 text-sm text-indigo-400 hover:text-indigo-500 hover:bg-gray-50 transition-colors rounded-b-lg w-full"
              >
                Not a member? Sign Up
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginDropdown;
