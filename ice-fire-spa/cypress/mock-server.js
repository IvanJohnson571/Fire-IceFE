const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

app.use(express.json());

let isLoggedIn = false;

app.get('/api/auth/session', (req, res) => {
  console.log('Mock SESSION called');
  if (isLoggedIn) {
    res.status(200).json({
      isAuthenticated: true,
      user: { username: 'demo' }
    });
  } else {
    res.status(200).json({ isAuthenticated: false });
  }
});

app.post('/api/auth/login', (req, res) => {
  console.log('Mock LOGIN:', req.body);
  isLoggedIn = true;
  res.status(200).json({ success: true });
});

app.post('/api/auth/logout', (req, res) => {
  console.log('Mock LOGOUT');
  res.status(200).json({ success: true });
});

app.listen(4001, () => console.log('Mock API running on port 4001 (CORS enabled)'));
