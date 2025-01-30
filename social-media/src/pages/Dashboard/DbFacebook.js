import React, { useState, useEffect } from 'react';
import { FaThumbsUp, FaComment, FaShare } from 'react-icons/fa';

const FacebookFeed = () => {
  const [userData, setUserData] = useState(null);
  const [feedData, setFeedData] = useState(null);
  const [error, setError] = useState(null);

  const accessToken = 'EAAM9zMmQC2kBOzmr1BCVAYIDcKenhgbNATeGPfJ8c29AHYOD08c7APC6kWEotkRBC6KZCG4WZAy41ejFWRDUoDHOlo8kj9Pbsv0dKciuQSHe5l1z2DxFwruFPl26AsFeBSrtZA4IoileIvSA9EcI8Y16iaLfLmeVRNysPRvQRfmZCg9cijYKLAJYAw8smltH4nl6G4jzDFruHruTAENNRhzLuAZDZD'; // Replace with your actual Facebook access token

  useEffect(() => {
    const fetchFacebookData = async () => {
      try {
        const userResponse = await fetch(`https://graph.facebook.com/v19.0/591873497331588?fields=id,name&access_token=${accessToken}`);
        if (!userResponse.ok) {
          throw new Error(`Error fetching user data: ${userResponse.status} ${userResponse.statusText}`);
        }
        const userData = await userResponse.json();
        setUserData(userData);

        const feedResponse = await fetch(`https://graph.facebook.com/v19.0/591873497331588/feed?fields=id,message,created_time,full_picture,reactions.summary(true)&access_token=${accessToken}`);
        if (!feedResponse.ok) {
          throw new Error(`Error fetching feed data: ${feedResponse.status} ${feedResponse.statusText}`);
        }
        const feedData = await feedResponse.json();
        setFeedData(feedData);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching Facebook data:', error);
      }
    };

    fetchFacebookData();
  }, [accessToken]);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '680px', margin: '0 auto', padding: '20px' }}>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {feedData ? (
        <div>
          <div style={{ marginBottom: '20px' }}>
            {feedData.data.map((post, index) => (
              <div key={index} style={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                padding: '16px',
                marginBottom: '16px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                  <img src={`https://graph.facebook.com/${userData?.id}/picture`} alt="Profile" style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '8px' }} />
                  <div>
                    <p style={{ margin: '0', fontSize: '14px', fontWeight: '600', color: '#1d2129' }}>{userData?.name}</p>
                    <p style={{ margin: '0', fontSize: '12px', color: '#606770' }}>{new Date(post.created_time).toLocaleString()}</p>
                  </div>
                </div>
                {post.full_picture && <img src={post.full_picture} alt="Post" style={{ width: '100%', borderRadius: '8px', marginBottom: '12px' }} />}
                <p style={{ margin: '0 0 12px', fontSize: '14px', color: '#1d2129' }}>{post.message || 'No message content'}</p>
                {post.reactions && post.reactions.summary && (
                  <div style={{ display: 'flex', alignItems: 'center', padding: '8px 0', borderTop: '1px solid #e4e6eb', borderBottom: '1px solid #e4e6eb' }}>
                    <span style={{ fontSize: '14px', color: '#606770', marginRight: '8px' }}>👍 {post.reactions.summary.total_count} Likes</span>
                  </div>
                )}
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
            ))}
          </div>
        </div>
      ) : (
        <p style={{ color: '#606770' }}>Loading feed...</p>
      )}
    </div>
  );
};

const App = () => (
  <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', padding: '20px' }}>
    <FacebookFeed />
  </div>
);

export default App;