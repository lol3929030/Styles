// api/callback.js
import axios from 'axios';

export default async function handler(req, res) {
  const code = req.query.code;

  const clientId = '1379407670519271485';
  const clientSecret = 'hnU9GKx8lhvvRpOaS_L4EMONH4pn95_z';
  const redirectUri = 'https://your-vercel-domain.vercel.app/api/callback'; // replace accordingly

  if (!code) {
    return res.status(400).send('No code provided');
  }

  try {
    const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri,
    }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const accessToken = tokenResponse.data.access_token;

    const userResponse = await axios.get('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    const user = userResponse.data;

    // Set cookie with user ID (simple approach)
    res.setHeader('Set-Cookie', `discord_user_id=${user.id}; HttpOnly; Path=/; Max-Age=86400`);
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('OAuth failed');
  }
}