const express = require('express');
const router = express.Router();
const { getUserImages, getUserVideos } = require('../controllers/userController');

// Simulate user authentication
async function authenticateUser(user, email, password) {
  const users = {
    user1: { email: 'user1@example.com', password: 'password123' },
    user2: { email: 'user2@example.com', password: 'password456' }
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(users[user] && users[user].email === email && users[user].password === password);
    }, 1000); // Simulate a delay for authentication
  });
}

// Route for login page
router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

// Route for handling login form submission
router.post('/login', async (req, res) => {
  try {
    const user = req.body.user; // Get user input from the form
    const email = req.body.email;
    const password = req.body.password;

    console.log('User:', user);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Login route accessed');

    // Validate user credentials and retrieve data
    const isValidUser = await authenticateUser(user, email, password);

    console.log('isValidUser:', isValidUser);

    if (isValidUser) {
      const images = await getUserImages(user);
      const videos = await getUserVideos(user);
      res.render('profile', { user, images, videos });
    } else {
      res.render('login', { error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.render('login', { error: 'An error occurred' });
  }
});

module.exports = router;
