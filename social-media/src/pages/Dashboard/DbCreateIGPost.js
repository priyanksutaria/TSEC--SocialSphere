import React, { useState } from 'react';

const InstagramConnect = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Replace these with your actual values
  const igUserId = '17841472108405468'; // Instagram Business or Creator account ID
  const accessToken = 'EAAM9zMmQC2kBO1BDQtEa31r2J9mJFTdlKUGUjuMPI6OS1lrTD9vrk2gky4vavs07sPafJRZAbi5rFzHz3FOqFKUKhlFfk3PviGLsUWdV7q00vJdjc6tXE6JOOToHwz7UPXNDThZAzi9hxr79InZBViBmJILbQIaf9Ht7rPO2Wn54sfeJXhsDnH757JYuKn6n6QsX09BS50JAtvDm8YtN2huL6QZD';
  const imageUrl = 'https://picsum.photos/200/300'; // URL of the image to post
  const caption = 'Hello, Instagram!'; // Caption for the post

  // Step 1: Create a media container
  const createMediaContainer = async () => {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${igUserId}/media`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image_url: imageUrl,
          caption: caption,
          access_token: accessToken,
        }),
      }
    );

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message);
    }
    return data.id; // Returns the container ID
  };

  // Step 2: Publish the media container
  const publishMedia = async (containerId) => {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${igUserId}/media_publish`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          creation_id: containerId,
          access_token: accessToken,
        }),
      }
    );

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message);
    }
    return data; // Returns the published media ID
  };

  // Combine both steps to post to Instagram
  const postToInstagram = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Step 1: Create media container
      const containerId = await createMediaContainer();
      console.log('Media Container ID:', containerId);

      // Step 2: Publish media container
      const publishedMedia = await publishMedia(containerId);
      console.log('Published Media:', publishedMedia);

      setSuccess(true);
    } catch (error) {
      console.error('Error posting to Instagram:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Post to Instagram</h1>
      <button onClick={postToInstagram} disabled={loading} style={styles.button}>
        {loading ? 'Posting...' : 'Post Image to Instagram'}
      </button>

      {error && <p style={styles.error}>Error: {error}</p>}
      {success && <p style={styles.success}>Posted successfully!</p>}
    </div>
  );
};

// Basic styles for the component
const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#405DE6',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
  success: {
    color: 'green',
    marginTop: '10px',
  },
};

export default InstagramConnect;