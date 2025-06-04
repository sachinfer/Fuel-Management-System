const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Import the protect middleware
const { createUser, findUserByEmail, updateUser, deleteUser } = require('../models/User'); // Import user model functions
const bcrypt = require('bcrypt'); // Import bcrypt for potential password changes (though not implementing here)

// Protect all staff routes
router.use(protect);

// @route   POST /api/staff
// @desc    Create a new staff member (Admin only in a real app)
// @access  Private
router.post('/', async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Basic role validation (consider more robust validation and authorization)
  const validRoles = ['admin', 'manager', 'cashier', 'staff'];
  if (!validRoles.includes(role.toLowerCase())) {
    return res.status(400).json({ message: 'Invalid role specified.' });
  }

  try {
    // You might want to check for existing user with the same email/username here
    const userId = await createUser(username, email, password, role.toLowerCase());
    res.status(201).json({ message: 'Staff member created successfully', userId });
  } catch (error) {
    console.error('Error creating staff member:', error);
    // Handle specific errors like duplicate entry
    if (error.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: 'User with this email or username already exists.' });
    }
    res.status(500).json({ message: 'Error creating staff member.', error: error.message });
  }
});

// @route   GET /api/staff
// @desc    Get all staff members (Admin/Manager only in a real app)
// @access  Private
router.get('/', async (req, res) => {
  try {
    // In a real app, you might want to exclude sensitive info like password_hash
    const [rows] = await pool.execute('SELECT id, username, email, role FROM Users');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error getting staff members:', error);
    res.status(500).json({ message: 'Error retrieving staff members.', error: error.message });
  }
});

// @route   GET /api/staff/:id
// @desc    Get staff member by ID (Admin/Manager only in a real app)
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    // In a real app, exclude sensitive info
    const [rows] = await pool.execute('SELECT id, username, email, role FROM Users WHERE id = ?', [req.params.id]);
    const user = rows[0];

    if (!user) {
      return res.status(404).json({ message: 'Staff member not found.' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error getting staff member by ID:', error);
    res.status(500).json({ message: 'Error retrieving staff member.', error: error.message });
  }
});

// @route   PUT /api/staff/:id
// @desc    Update staff member details (excluding password - Admin/Manager only)
// @access  Private
router.put('/:id', async (req, res) => {
  const { username, email, role } = req.body;
  const { id } = req.params;

  if (!username || !email || !role) {
    return res.status(400).json({ message: 'Username, email, and role are required.' });
  }

   // Basic role validation (consider more robust validation and authorization)
  const validRoles = ['admin', 'manager', 'cashier', 'staff'];
  if (!validRoles.includes(role.toLowerCase())) {
    return res.status(400).json({ message: 'Invalid role specified.' });
  }

  try {
    const affectedRows = await updateUser(id, username, email, role.toLowerCase());
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Staff member not found.' });
    }
    res.status(200).json({ message: 'Staff member updated successfully.' });
  } catch (error) {
     console.error('Error updating staff member:', error);
    // Handle specific errors like duplicate entry
    if (error.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: 'User with this email or username already exists.' });
    }
    res.status(500).json({ message: 'Error updating staff member.', error: error.message });
  }
});

// @route   DELETE /api/staff/:id
// @desc    Delete staff member (Admin only)
// @access  Private
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const affectedRows = await deleteUser(id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Staff member not found.' });
    }
    res.status(200).json({ message: 'Staff member deleted successfully.' });
  } catch (error) {
    console.error('Error deleting staff member:', error);
    res.status(500).json({ message: 'Error deleting staff member.', error: error.message });
  }
});

module.exports = router; 