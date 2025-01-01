import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ResumeUpload = ({ onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const validateFile = (file) => {
    if (!file) return 'Please select a file';
    if (!file.name.match(/\.(pdf|doc|docx)$/i)) {
      return 'Please upload a PDF or Word document';
    }
    if (file.size > 5 * 1024 * 1024) {
      return 'File size should be less than 5MB';
    }
    return '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFileSelection(droppedFile);
  };

  const handleFileSelection = (selectedFile) => {
    const validationError = validateFile(selectedFile);
    if (validationError) {
      setError(validationError);
      setFile(null);
      return;
    }
    setError('');
    setFile(selectedFile);
    onUpload(selectedFile);
  };

  const handleFileInput = (e) => {
    const selectedFile = e.target.files[0];
    handleFileSelection(selectedFile);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <motion.div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'
        } transition-colors duration-300`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="space-y-4">
          <div className="flex justify-center">
            <svg
              className={`w-16 h-16 ${
                isDragging ? 'text-indigo-500' : 'text-gray-400'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">
            {file ? 'Resume uploaded!' : 'Upload your resume'}
          </h3>
          <p className="text-sm text-gray-500">
            {file
              ? file.name
              : 'Drag and drop your resume here, or click to select'}
          </p>
          {error && (
            <p className="text-sm text-red-500 font-medium">{error}</p>
          )}
          <input
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={handleFileInput}
            id="resume-upload"
          />
          <button
            onClick={() => document.getElementById('resume-upload').click()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Select File
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ResumeUpload;
