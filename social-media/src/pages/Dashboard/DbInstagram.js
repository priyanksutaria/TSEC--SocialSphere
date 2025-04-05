import React, { useState, useEffect } from 'react';
import { FaHeart, FaComment, FaPaperPlane, FaBookmark } from 'react-icons/fa';

const InstagramFeed = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [mediaData, setMediaData] = useState([]);
  const [error, setError] = useState(null);

  const ACCESS_TOKEN = "IGAAImERmTpN9BZAE9UNW9zZAWdYZATgwZAHJyVDF5d0Y4ZA2pZARWp0OHhJdDZAIaW4ycWlON3lpNDVnM2NUQ1NyQW9qanNRMno3ZAGN1RkRwYmFOazI5VVBjWVNUa2JJby1YX3ZAyZA04zX0xTTmN1RTlsTnEtOUZAleU9ueVZAHU3dZAd2Y0MAZDZD"; // Replace with your Instagram access token

  useEffect(() => {
    const fetchInstagramData = async () => {
      try {
        // Fetch user profile
        const profileResponse = await fetch(
          `https://graph.instagram.com/me?fields=id,username,media_count,profile_picture_url&access_token=${ACCESS_TOKEN}`
        );
        if (!profileResponse.ok) {
          throw new Error(`Error fetching profile: ${profileResponse.status} ${profileResponse.statusText}`);
        }
        const profileData = await profileResponse.json();
        setUserProfile(profileData);

        // Fetch user media (posts)
        const mediaResponse = await fetch(
          `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,timestamp,like_count&access_token=${ACCESS_TOKEN}`
        );
        if (!mediaResponse.ok) {
          throw new Error(`Error fetching media: ${mediaResponse.status} ${mediaResponse.statusText}`);
        }
        const mediaData = await mediaResponse.json();
        setMediaData(mediaData.data || []);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching Instagram data:', error);
      }
    };

    fetchInstagramData();
  }, [ACCESS_TOKEN]);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#fafafa' }}>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {mediaData.length > 0 ? (
        <div>
          {mediaData.map((post, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                border: '1px solid #dbdbdb',
                marginBottom: '24px',
              }}
            >
              {/* Post Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px',
                  borderBottom: '1px solid #dbdbdb',
                }}
              >
                <img
                  src={userProfile?.profile_picture_url}
                  alt="Profile"
                  style={{ width: '32px', height: '32px', borderRadius: '50%', marginRight: '12px' }}
                />
                <div>
                  <p style={{ margin: '0', fontSize: '14px', fontWeight: '600', color: '#262626' }}>
                    {userProfile?.username}
                  </p>
                  <p style={{ margin: '0', fontSize: '12px', color: '#8e8e8e' }}>
                    {new Date(post.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Post Media */}
              {post.media_url && (
                <img
                  src={post.media_url}
                  alt="Post"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              )}

              {/* Post Actions */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px',
                  borderBottom: '1px solid #dbdbdb',
                }}
              >
                <div style={{ display: 'flex', gap: '16px' }}>
                  <button style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
                    <FaHeart size={24} color="#262626" />
                  </button>
                  <button style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
                    <FaComment size={24} color="#262626" />
                  </button>
                  <button style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
                    <FaPaperPlane size={24} color="#262626" />
                  </button>
                </div>
                <button style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
                  <FaBookmark size={24} color="#262626" />
                </button>
              </div>

              {/* Post Details */}
              <div style={{ padding: '12px' }}>
                {post.like_count && (
                  <p style={{ margin: '0 0 8px', fontSize: '14px', fontWeight: '600', color: '#262626' }}>
                    {post.like_count} likes
                  </p>
                )}
                <p style={{ margin: '0', fontSize: '14px', color: '#262626' }}>
                  <span style={{ fontWeight: '600', marginRight: '4px' }}>{userProfile?.username}</span>
                  {post.caption || 'No caption'}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: '#8e8e8e', textAlign: 'center' }}>Loading feed...</p>
      )}
    </div>
  );
};

const App = () => (
  <div style={{ backgroundColor: '#fafafa', minHeight: '100vh', padding: '20px' }}>
    <InstagramFeed />
  </div>
);

export default App;
