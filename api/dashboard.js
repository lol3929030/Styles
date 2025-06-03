// api/dashboard.js
export default function handler(req, res) {
  const cookies = req.headers.cookie || '';
  const cookieMap = Object.fromEntries(cookies.split('; ').map(c => c.split('=')));
  const userId = cookieMap['discord_user_id'];

  const allowedIds = ['1346479568390717490', '1347234240604930090'];

  if (!userId || !allowedIds.includes(userId)) {
    return res.status(403).send('Access Denied');
  }

  res.setHeader('Content-Type', 'text/html');
  res.end(`
    <h1>Dashboard</h1>
    <p>Welcome, User ID: ${userId}</p>
    <a href="/">Logout</a>
  `);
}