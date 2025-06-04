const jwt = require('jsonwebtoken');

// Secret key for JWT (should be the same as in auth.js)
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret'; // TODO: Replace with a secure secret

const protect = (req, res, next) => {
  let token;

  // Check for token in Authorization header (Bearer token)
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, jwtSecret);

      // Attach user info to request (excluding password hash)
      // In a real app, you might fetch user from DB here based on decoded.userId
      req.user = { id: decoded.userId, role: decoded.role }; 

      next(); // Proceed to the next middleware or route handler

    } catch (error) {
      console.error('Token verification failed:', error);
      res.status(401).json({ message: 'Not authorized, token failed.' });
    }
  }

  if (!token) {
    // No token provided
    res.status(401).json({ message: 'Not authorized, no token.' });
  }
};

module.exports = { protect }; 