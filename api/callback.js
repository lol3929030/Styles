// pages/api/callback.js

export default async function handler(req, res) {
  const code = req.query.code;

  if (!code) {
    return res.status(400).json({ error: 'Missing code parameter' });
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.1379407670519271485,
        client_secret: process.env.hnU9GKx8lhvvRpOaS_L4EMONH4pn95_z,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: 'https://styles-beta.vercel.app/api/callback',
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      return res.status(tokenResponse.status).json({ error: tokenData });
    }

    // Fetch user info with access token
    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const userData = await userResponse.json();

    // You can set cookies, sessions, or redirect here
    // For simplicity, just return user info
    res.status(200).json({ user: userData });
  } catch (error) {
    res.status(500).json({ error: 'Error during OAuth process' });
  }
}
