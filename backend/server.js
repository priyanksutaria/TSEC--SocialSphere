import express from 'express';
import cors from 'cors';
import { TwitterApi } from 'twitter-api-v2';

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Use OAuth 2.0 User Context instead of Bearer Token
const clientId = 'eDJHU2ZvNGJQV3hwamxCSC1vdXc6MTpjaQ';
const clientSecret = 'fiXR53SXlcqLq0mBSrDBl5gDDL83Zx0uvQYsKAuDqh4ixxUgpK';
const callbackUrl = 'http://localhost:5000';

// Initialize Twitter API client
const twitterClient = new TwitterApi({ clientId, clientSecret });

// Generate authentication link
app.get('/twitter/login', async (req, res) => {
  const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(callbackUrl, { scope: ['tweet.read', 'users.read', 'offline.access'] });

  // Store state and codeVerifier (for later validation)
  res.json({ url, state, codeVerifier });
});

// Handle OAuth callback
app.get('/auth/callback', async (req, res) => {
  const { state, code } = req.query;

  if (!code) {
    return res.status(400).send('Invalid Request: Missing authorization code');
  }

  try {
    // Exchange authorization code for access token
    const { client, accessToken, refreshToken } = await twitterClient.loginWithOAuth2({ code, codeVerifier: req.session.codeVerifier, redirectUri: callbackUrl });

    // Save tokens for later API calls
    req.session.accessToken = accessToken;
    req.session.refreshToken = refreshToken;

    res.send('Authentication successful! You can now fetch user data.');
  } catch (error) {
    console.error('OAuth Callback Error:', error);
    res.status(500).send('Authentication failed.');
  }
});

// Fetch authenticated user details
app.get('/twitter/user', async (req, res) => {
  if (!req.session.accessToken) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  try {
    const client = new TwitterApi(req.session.accessToken);
    const user = await client.v2.me();
    res.json(user.data);
  } catch (error) {
    console.error('❌ Error fetching Twitter user:', error);
    res.status(500).json({ error: 'Failed to fetch Twitter user', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
