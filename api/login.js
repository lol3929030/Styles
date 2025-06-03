// api/login.js
export default function handler(req, res) {
  const clientId = '1379407670519271485';
  const redirectUri = 'https://styles-beta.vercel.app/api/callback'; // replace with your actual domain
  const scope = 'identify';

  const authUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scope}`;

  res.redirect(authUrl);
}