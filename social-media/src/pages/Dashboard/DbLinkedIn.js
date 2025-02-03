import React, { useState, useEffect } from 'react';
import { FaThumbsUp, FaComment, FaShare } from 'react-icons/fa';

const LinkedInFeed = () => {
  const [feedData, setFeedData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const accessToken = '';

  useEffect(() => {
    const fetchLinkedInFeed = async () => {
      try {
        const response = await fetch('https://api.gosocialx.com/api/v1', {
          method: 'GET',
          headers: {
            'Authorization': accessToken,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching LinkedIn feed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setFeedData(data.posts || []); // Assuming the API returns an array of posts under the key "posts"
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        console.error('Error fetching LinkedIn feed:', error);
      }
    };

    fetchLinkedInFeed();
  }, [accessToken]);

  if (loading) {
    return <p style={{ color: '#606770', textAlign: 'center' }}>Loading LinkedIn feed...</p>;
  }

  if (error) {
    return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '680px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', fontSize: '24px', color: '#1d2129' }}>LinkedIn Feed</h2>

      {feedData.length > 0 ? (
        feedData.map((post, index) => (
          <div key={index} style={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
            padding: '16px',
            marginBottom: '16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <img
                src={post.author?.profilePicture || 'https://via.placeholder.com/40'}
                alt="Profile"
                style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '8px' }}
              />
              <div>
                <p style={{ margin: '0', fontSize: '14px', fontWeight: '600', color: '#1d2129' }}>
                  {post.author?.name || 'Unknown User'}
                </p>
                <p style={{ margin: '0', fontSize: '12px', color: '#606770' }}>
                  {new Date(post.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt="Post"
                style={{ width: '100%', borderRadius: '8px', marginBottom: '12px' }}
              />
            )}

            <p style={{ margin: '0 0 12px', fontSize: '14px', color: '#1d2129' }}>
              {post.caption || 'No caption available'}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-around', padding: '8px 0' }}>
              <button style={{ border: 'none', backgroundColor: 'transparent', fontSize: '14px', color: '#606770', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <FaThumbsUp style={{ marginRight: '4px' }} /> Like
              </button>
              <button style={{ border: 'none', backgroundColor: 'transparent', fontSize: '14px', color: '#606770', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <FaComment style={{ marginRight: '4px' }} /> Comment
              </button>
              <button style={{ border: 'none', backgroundColor: 'transparent', fontSize: '14px', color: '#606770', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <FaShare style={{ marginRight: '4px' }} /> Share
              </button>
            </div>
          </div>
        ))
      ) : (
        <p style={{ color: '#606770', textAlign: 'center' }}>No posts available.</p>
      )}
    </div>
  );
};

export default LinkedInFeed;
