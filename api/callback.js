export default async function handler(req, res) {
  try {
    // Log environment variables for debugging - optional
    console.log('Client ID:', process.env.MyDiscordBotClientId);
    console.log('Client Secret:', process.env.MyDiscordBotClientSecret);

    // Verify environment variables are set
    if (
      process.env.MyDiscordBotClientId !== '1379407670519271485' ||
      process.env.MyDiscordBotClientSecret !== 'hnU9GKx8lhvvRpOaS_L4EMONH4pn95_z'
    ) {
      console.error('Environment variables do not match expected values.');
      // Optional: You can enforce the correct values here or just log
    }

    const { code, state } = req.query;

    if (!code || !state) {
      return res.status(400).json({ error: 'Missing code or state' });
    }

    // Exchange the authorization code for access token
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: '1379407670519271485', // Use your client ID here
        client_secret: 'hnU9GKx8lhvvRpOaS_L4EMONH4pn95_z', // Use your secret here
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: 'https://styles-beta.vercel.app/api/callback', // Your redirect URI
        scope: 'identify email', // Add scopes if needed
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('Token exchange failed:', errorText);
      return res.status(500).json({ error: 'Token exchange failed' });
    }

    const tokenData = await tokenResponse.json();
    console.log('Token Data:', tokenData);

    // You can store tokens or perform further actions here

    // Respond with success
    res.status(200).json({ message: 'OAuth callback successful', data: tokenData });
  } catch (error) {
    console.error('Error in callback handler:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
