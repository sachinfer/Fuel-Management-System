// Authentication routes will be defined here 

const express = require('express');
const router = express.Router();
const { createUser } = require('../models/User');

// Register a new user
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  // Basic validation (more comprehensive validation should be added)
  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const userId = await createUser(username, email, password, role);
    res.status(201).json({ message: 'User registered successfully', userId });
  } catch (error) {
    // Handle potential errors, e.g., duplicate email or username
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering user.', error: error.message });
  }
});

module.exports = router; 