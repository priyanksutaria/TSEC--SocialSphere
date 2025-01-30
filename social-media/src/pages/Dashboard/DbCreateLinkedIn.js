import React, { useState } from 'react';

const LinkedInPostCreator = () => {
  const [postMessage, setPostMessage] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [charCount, setCharCount] = useState(0);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!postMessage.trim()) {
      setError('Post must contain a message.');
      return;
    }

    const postData = {
      caption: postMessage,
      title: 'New Post',
      type: 'TEXT',
      brand_id: 'cm6icuadl0735ygpg7p8g0vh9',
      workspace_id: 'cm6icts6y072zygpgebgiuk2u'
    };

    try {
      const response = await fetch('https://api.gosocialx.com/api/v1/social/linkedin/postcontent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtNmljdG05czA3Mnh5Z3BnMjBmOG04ZXEiLCJlbWFpbCI6InZhbnNobTI3MDNAZ21haWwuY29tIiwibmFtZSI6IlZhbnNoIiwiaWF0IjoxNzM4MTgyMzUzLCJleHAiOjE3NDA3NzQzNTN9.2AD2BWc5qUuOoXKjyWzhubW3uSLoJRYliTpERMiKW1g`
        },
        body: JSON.stringify(postData)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Post published successfully!');
        setPostMessage('');
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
      <h3 style={{ marginBottom: '20px', fontSize: '20px', color: '#1d2129' }}>Create a New LinkedIn Post</h3>
      <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px' }}>
        <textarea
          value={postMessage}
          onChange={(e) => {
            setPostMessage(e.target.value);
            setCharCount(e.target.value.length);
          }}
          placeholder="What's on your mind?"
          rows="4"
          maxLength="3000"
          style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #e4e6eb', resize: 'none' }}
        ></textarea>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', color: '#606770' }}>{charCount}/3000</span>
        <button type="submit" onClick={handlePostSubmit} style={{ padding: '8px 16px', borderRadius: '5px', backgroundColor: '#0077b5', color: 'white', border: 'none', cursor: 'pointer' }}>
          Post
        </button>
      </div>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      {success && <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>}
    </div>
  );
};

export default LinkedInPostCreator;