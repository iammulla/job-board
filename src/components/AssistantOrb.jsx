import React, { useState, useRef, useEffect } from 'react';
import { XMarkIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import RollyIcon from './RollyIcon';

const Message = ({ content, isUser }) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isTyping, setIsTyping] = useState(!isUser);

  useEffect(() => {
    if (!isUser) {
      setDisplayedContent('');
      setIsTyping(true);
      let currentText = '';
      let currentIndex = 0;

      const typingInterval = setInterval(() => {
        if (currentIndex < content.length) {
          currentText += content[currentIndex];
          setDisplayedContent(currentText);
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 20); // Faster typing speed, more natural feel

      return () => clearInterval(typingInterval);
    } else {
      setDisplayedContent(content);
    }
  }, [content, isUser]);

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`rounded-2xl px-4 py-2 max-w-[80%] ${
        isUser ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-900'
      }`}>
        <p className="text-sm whitespace-pre-line">
          {isUser ? content : displayedContent}
          {isTyping && <span className="animate-pulse">|</span>}
        </p>
      </div>
    </div>
  );
};

const AssistantOrb = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);
  const [suggestions, setSuggestions] = useState([
    'How to use RoleArc?',
    'How to apply for jobs?',
    'Talk to a consultant'
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).substring(7));
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (messageText) => {
    if (!messageText.trim() || isTyping) return;

    // Mark as interacted when first message is sent
    setHasInteracted(true);
    
    // Add user message immediately
    setMessages(prev => [...prev, { type: 'user', content: messageText }]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          sessionId
        }),
      });

      const data = await response.json();
      
      setMessages(prev => [...prev, { type: 'assistant', content: data.content }]);
      setSuggestions(data.suggestions || []);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        type: 'assistant',
        content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment."
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleSuggestion = (suggestion) => {
    setInputValue(suggestion);
    sendMessage(suggestion);
  };

  const resetChat = () => {
    setMessages([]);
    setSuggestions([
      'How to use RoleArc?',
      'How to apply for jobs?',
      'Talk to a consultant'
    ]);
    setHasInteracted(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 right-0 w-96 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
          >
            {/* Chat Header */}
            <div className="p-4 bg-gradient-to-r from-indigo-400 to-indigo-600 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RollyIcon size={24} />
                  <h3 className="font-semibold">Rolly - Your Job Search Assistant</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={resetChat}
                    className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                    title="Reset conversation"
                  >
                    <ArrowPathIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-4">
              {messages.length === 0 && !hasInteracted ? (
                <div className="space-y-4">
                  <Message 
                    content="👋 Hi! I'm Rolly, your job search assistant. I can help you navigate RoleArc, apply to jobs, and connect with role consultants. What would you like to know?" 
                    isUser={false} 
                  />
                  <div className="mt-4">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestion(suggestion)}
                        className="block w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 text-sm text-gray-700 transition-colors mb-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 active:bg-gray-200"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((message, index) => (
                    <Message
                      key={index}
                      content={message.content}
                      isUser={message.type === 'user'}
                    />
                  ))}
                  {isTyping && (
                    <div className="flex items-center gap-2 text-gray-500">
                      <div className="animate-pulse">
                        <RollyIcon size={20} />
                      </div>
                      <p className="text-sm">Typing...</p>
                    </div>
                  )}
                  {!isTyping && suggestions.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestion(suggestion)}
                          className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-sm text-gray-700 rounded-full transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 active:bg-gray-200"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your question..."
                  disabled={isTyping}
                  className="flex-1 px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isTyping || !inputValue.trim()}
                  className="px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors disabled:opacity-50"
                >
                  Send
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-3 rounded-full shadow-lg transition-colors ${
          isOpen ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600 hover:bg-indigo-50'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <RollyIcon size={24} />
      </motion.button>
    </div>
  );
};

export default AssistantOrb;
