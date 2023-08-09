const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'User Profile' });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  // Replace the following logic with your authentication check
  if (email === 'user1@example.com' && password === 'password123') {
    res.redirect(`/auth/user1/profile`);
  } else {
    res.render('login', { error: 'Invalid credentials' });
  }
});

module.exports = router;
