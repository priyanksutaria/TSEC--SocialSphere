import React, { useState } from 'react';

const FacebookPostCreator = () => {
  const [postMessage, setPostMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [charCount, setCharCount] = useState(0);

  const accessToken = 'EAAM9zMmQC2kBO1BDQtEa31r2J9mJFTdlKUGUjuMPI6OS1lrTD9vrk2gky4vavs07sPafJRZAbi5rFzHz3FOqFKUKhlFfk3PviGLsUWdV7q00vJdjc6tXE6JOOToHwz7UPXNDThZAzi9hxr79InZBViBmJILbQIaf9Ht7rPO2Wn54sfeJXhsDnH757JYuKn6n6QsX09BS50JAtvDm8YtN2huL6QZD'; // Replace with your actual Facebook access token
  const userProfilePicture = `https://graph.facebook.com/me/picture?access_token=${accessToken}`;

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!postMessage.trim() && !imageUrl.trim()) {
      setError('Post must contain either a message or an image.');
      return;
    }

    try {
      let postData;
      let apiUrl;

      if (imageUrl.trim()) {
        // Post with an image
        apiUrl = `https://graph.facebook.com/v22.0/591873497331588/photos?access_token=${accessToken}`;
        postData = {
          url: imageUrl,
          caption: postMessage,
        };
      } else {
        // Post only text
        apiUrl = `https://graph.facebook.com/v22.0/591873497331588/feed?access_token=${accessToken}`;
        postData = {
          message: postMessage,
        };
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Post published successfully!');
        setPostMessage('');
        setImageUrl('');
        setCharCount(0);
      } else {
        throw new Error(data.error?.message || 'Failed to post.');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>
      <h3 style={{ marginBottom: '20px', fontSize: '20px', color: '#1d2129' }}>Create a New Facebook Post</h3>
      <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px' }}>
        <img src={userProfilePicture} alt="Profile" style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} />
        <textarea
          value={postMessage}
          onChange={(e) => {
            setPostMessage(e.target.value);
            setCharCount(e.target.value.length);
          }}
          placeholder="What's on your mind?"
          rows="4"
          maxLength="63206"
          style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #e4e6eb', resize: 'none' }}
        ></textarea>
      </div>

      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Enter image URL (optional)"
        style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #e4e6eb' }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', color: '#606770' }}>{charCount}/63206</span>
        <button type="submit" onClick={handlePostSubmit} style={{ padding: '8px 16px', borderRadius: '5px', backgroundColor: '#1877F2', color: 'white', border: 'none', cursor: 'pointer' }}>
          Post
        </button>
      </div>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      {success && <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>}
    </div>
  );
};

export default FacebookPostCreator;
