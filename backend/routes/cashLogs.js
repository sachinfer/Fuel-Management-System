const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Import the protect middleware
const { createCashLog, getCashLogs } = require('../models/CashLog'); // Import CashLog model functions

// Protect all cash log routes
router.use(protect);

// @route   POST /api/cash-logs
// @desc    Create a new cash log entry
// @access  Private (Cashier/Manager/Admin role might be needed)
router.post('/', async (req, res) => {
  const { cash_amount, note } = req.body;
  const user_id = req.user.id; // Get user ID from authenticated user

  if (cash_amount === undefined) {
    return res.status(400).json({ message: 'Cash amount is required.' });
  }

  // Basic validation for cash_amount (should be a number)
  if (typeof cash_amount !== 'number') {
       return res.status(400).json({ message: 'Cash amount must be a number.' });
  }

  try {
    const cashLogId = await createCashLog(user_id, cash_amount, note);
    res.status(201).json({ message: 'Cash log entry created successfully', cashLogId });
  } catch (error) {
    console.error('Error creating cash log entry:', error);
    res.status(500).json({ message: 'Error creating cash log entry.', error: error.message });
  }
});

// @route   GET /api/cash-logs
// @desc    Get cash log entries (can filter by user_id, startDate, endDate)
// @access  Private
router.get('/', async (req, res) => {
  const { userId, startDate, endDate } = req.query; // Get filters from query parameters
  const requestingUserRole = req.user.role; // Get role of the user making the request

   // In a real app, implement role-based access control here for viewing logs
  let filterUserId = userId; // Default to the requested userId filter
   // Example: Allow managers/admins to see all logs, staff/cashiers only their own
   if (requestingUserRole !== 'admin' && requestingUserRole !== 'manager') {
        filterUserId = req.user.id; // Restrict to their own ID if not admin/manager
   }

   // Validate date formats if provided
   // TODO: Add more robust date validation

  try {
    const cashLogs = await getCashLogs(filterUserId, startDate, endDate);
    res.status(200).json(cashLogs);
  } catch (error) {
    console.error('Error retrieving cash logs:', error);
    res.status(500).json({ message: 'Error retrieving cash logs.', error: error.message });
  }
});

module.exports = router; 