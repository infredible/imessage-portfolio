import React, { useState, useRef, useEffect } from 'react';
import './ChatInput.css';

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef(null);
  const plusButtonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside both the popover and the plus button
      if (
        popoverRef.current && 
        !popoverRef.current.contains(event.target) &&
        !plusButtonRef.current.contains(event.target)
      ) {
        setIsPopoverOpen(false);
      }
    };

    // Add event listener when popover is open
    if (isPopoverOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopoverOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      console.log('Message sent:', message);
      setMessage('');
    }
  };

  const PopoverMenu = () => (
    <div 
      ref={popoverRef}
      className={`popover-menu ${isPopoverOpen ? 'open' : ''}`}
    >
      <button className="popover-item">
        <span className="popover-icon">📷</span>
        <span>Photo</span>
      </button>
      <button className="popover-item">
        <span className="popover-icon">📎</span>
        <span>File</span>
      </button>
      <button className="popover-item">
        <span className="popover-icon">🎨</span>
        <span>Design</span>
      </button>
      <button className="popover-item">
        <span className="popover-icon">🔗</span>
        <span>Link</span>
      </button>
    </div>
  );

  return (
    <div className="chat-input-container">
      <PopoverMenu />
      <form onSubmit={handleSubmit} className="input-form">
        <button 
          type="button" 
          className="plus-button"
          ref={plusButtonRef}
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path 
              fill="currentColor" 
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
            />
          </svg>
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="iMessage"
          className="message-input"
        />
        <button 
          type="submit" 
          className={`send-button ${message.trim() ? 'active' : ''}`}
          disabled={!message.trim()}
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path 
              fill="currentColor" 
              d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatInput; 