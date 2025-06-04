const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Import the protect middleware
const { createAttendanceRecord, updateAttendanceRecordClockOut, getAttendanceRecords } = require('../models/Attendance');

// Protect all attendance routes
router.use(protect);

// @route   POST /api/attendance/clock-in
// @desc    Record user clock-in
// @access  Private
router.post('/clock-in', async (req, res) => {
  const { date, clock_in_time } = req.body;
  const user_id = req.user.id; // Get user ID from authenticated user

  if (!user_id || !date || !clock_in_time) {
    return res.status(400).json({ message: 'User ID, date, and clock-in time are required.' });
  }

  try {
    // In a real app, you might want to check if a clock-in already exists for the day
    const attendanceId = await createAttendanceRecord(user_id, date, clock_in_time);
    res.status(201).json({ message: 'Clock-in recorded successfully', attendanceId });
  } catch (error) {
    console.error('Error recording clock-in:', error);
    res.status(500).json({ message: 'Error recording clock-in.', error: error.message });
  }
});

// @route   PUT /api/attendance/clock-out/:id
// @desc    Record user clock-out
// @access  Private
router.put('/clock-out/:id', async (req, res) => {
  const { id } = req.params;
  const { clock_out_time } = req.body;

  if (!clock_out_time) {
    return res.status(400).json({ message: 'Clock-out time is required.' });
  }

  try {
    // You might want to verify the attendance record belongs to the authenticated user
    const affectedRows = await updateAttendanceRecordClockOut(id, clock_out_time);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Attendance record not found.' });
    }
    res.status(200).json({ message: 'Clock-out recorded successfully.' });
  } catch (error) {
    console.error('Error recording clock-out:', error);
    res.status(500).json({ message: 'Error recording clock-out.', error: error.message });
  }
});

// @route   GET /api/attendance
// @desc    Get attendance records (can filter by user_id, startDate, endDate)
// @access  Private
router.get('/', async (req, res) => {
  const { userId, startDate, endDate } = req.query; // Get filters from query parameters
  const requestingUserRole = req.user.role; // Get role of the user making the request

  // In a real app, implement role-based access control here
  // For example, only 'admin' or 'manager' can view all records, staff can only view their own
  let filterUserId = userId; // Default to the requested userId filter
  if (requestingUserRole === 'staff' && (!userId || userId !== req.user.id.toString())) {
    // If staff, only allow viewing their own records, ignore userId filter if provided and not their own
    filterUserId = req.user.id; 
  }

  try {
    const records = await getAttendanceRecords(filterUserId, startDate, endDate);
    res.status(200).json(records);
  } catch (error) {
    console.error('Error retrieving attendance records:', error);
    res.status(500).json({ message: 'Error retrieving attendance records.', error: error.message });
  }
});

module.exports = router; 