import React, { useState, useEffect } from 'react';
import './IMessageChat.css';
import './ChatInput.css';
import { messages } from '../data/messages';
import ChatInput from './ChatInput';

const Notch = () => <div className="notch"></div>;

const StatusBar = () => {
  const [time, setTime] = useState('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="status-bar">
      <span className="time">{time}</span>
      <div className="icons">
        <span className="signal">📶</span>
        <span className="wifi">📡</span>
        <span className="battery">🔋</span>
      </div>
    </div>
  );
};

const ChatHeader = () => {
  return (
    <div className="chat-header">
      <StatusBar />
      <div className="contact-info">
        <img src="/avatar.png" alt="Profile" className="profile-pic" />
        <span className="contact-name">Fred</span>
      </div>
    </div>
  );
};

const MessageGroup = ({ message }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, message.id * 1000);

    return () => clearTimeout(timeout);
  }, [message.id]);

  return (
    <div className={`message-group ${isVisible ? 'visible' : ''}`}>
      <div className={`message ${message.type}`}>
        {message.image && (
          <img src={message.image} alt="Project" className="image-message" />
        )}
        {message.content && <p>{message.content}</p>}
      </div>
    </div>
  );
};

const ChatContainer = () => {
  return (
    <div className="chat-container">
      {messages.map((message) => (
        <MessageGroup key={message.id} message={message} />
      ))}
    </div>
  );
};

const IMessageChat = () => {
  return (
    <div className="iphone-container">
      <div className="iphone-frame">
        <Notch />
        <ChatHeader />
        <ChatContainer />
        <ChatInput />
      </div>
    </div>
  );
};

export default IMessageChat; 