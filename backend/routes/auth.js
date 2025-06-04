// Authentication routes will be defined here 

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/User');
const { protect } = require('../middleware/authMiddleware'); // Import the protect middleware

// Secret key for JWT (replace with a strong, unique key and store securely)
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret'; // TODO: Replace with a secure secret

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

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      // User not found
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Compare provided password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      // Passwords don't match
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Generate JWT
    const payload = { userId: user.id, role: user.role };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' }); // Token expires in 1 hour

    res.status(200).json({ token });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in.', error: error.message });
  }
});

// Get authenticated user details (Protected route)
router.get('/me', protect, (req, res) => {
  // req.user is populated by the protect middleware
  res.status(200).json(req.user);
});

module.exports = router; 