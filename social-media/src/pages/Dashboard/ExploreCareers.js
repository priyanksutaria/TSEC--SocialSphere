import React from 'react';
import './Chatbot.css'; // Import the CSS for styling

const Chatbot = () => {
  return (
    <div className="chatbot-container">
      <h1>Career Guidance Chatbot</h1>
      <p className="intro-text">
        Ask our AI-powered chatbot any questions about different career paths, required skills, and job opportunities!
      </p>
      <div className="chatbot-frame">
        <iframe
          width="350"
          height="430"
          allow="microphone;"
          src="https://console.dialogflow.com/api-client/demo/embedded/14a831fd-4c49-4a5d-8bb1-2fbb94772210"
          title="Career Chatbot"
        ></iframe>
      </div>
    </div>
  );
};

export default Chatbot;
