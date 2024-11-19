import React, { useState, useEffect, useRef } from 'react';
import './IMessageChat.css';
import './ChatInput.css';
import ChatInput from './ChatInput';

// Initial messages data
const initialMessages = [
    {
      id: 1,
      type: 'received',
      content: 'Hey there! 👋 Want to know more about me?'
    },
    {
      id: 2,
      type: 'sent',
      content: 'Sure! Tell me about yourself'
    },
    {
      id: 3,
      type: 'received',
      content: "I'm a UI designer with 5 years of experience specializing in user-centered design and interface development."
    }
];

// Separate MessageGroup component
const MessageGroup = ({ message }) => {
    console.log('Rendering message:', message);
    return (
      <div className="message-group">
        <div className={`message ${message.type}`}>
          {message.content}
        </div>
      </div>
    );
};

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

const IMessageChat = () => {
    const [messages, setMessages] = useState(initialMessages);
    const chatContainerRef = useRef(null);
    
    useEffect(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, []);
  
    const handleSendMessage = (messageText) => {
      const newMessage = {
        id: messages.length + 1,
        type: 'sent',
        content: messageText,
        timestamp: new Date().toISOString()
      };
      
      setMessages([...messages, newMessage]);
    };
  
    return (
      <div className="iphone-container">
        <div className="iphone-frame">
          <Notch />
          <ChatHeader />
          <div className="chat-container" ref={chatContainerRef}>
            {messages.map((message) => (
              <MessageGroup key={message.id} message={message} />
            ))}
          </div>
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    );
};

export default IMessageChat;