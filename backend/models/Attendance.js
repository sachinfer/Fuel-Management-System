const { pool } = require('../server');

// Function to record user clock-in
const createAttendanceRecord = async (user_id, date, clock_in_time) => {
  try {
    const [result] = await pool.execute(
      'INSERT INTO Attendance (user_id, date, clock_in_time) VALUES (?, ?, ?)',
      [user_id, date, clock_in_time]
    );
    return result.insertId;
  } catch (error) {
    console.error('Error creating attendance record:', error);
    throw error;
  }
};

// Function to update attendance record with clock-out time
const updateAttendanceRecordClockOut = async (id, clock_out_time) => {
  try {
    const [result] = await pool.execute(
      'UPDATE Attendance SET clock_out_time = ? WHERE id = ?',
      [clock_out_time, id]
    );
    return result.affectedRows;
  } catch (error) {
    console.error('Error updating attendance record:', error);
    throw error;
  }
};

// Function to retrieve attendance records
const getAttendanceRecords = async (user_id = null, startDate = null, endDate = null) => {
  try {
    let query = 'SELECT * FROM Attendance';
    const params = [];
    const conditions = [];

    if (user_id) {
      conditions.push('user_id = ?');
      params.push(user_id);
    }

    if (startDate) {
      conditions.push('date >= ?');
      params.push(startDate);
    }

    if (endDate) {
      conditions.push('date <= ?');
      params.push(endDate);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY date DESC, clock_in_time DESC'; // Order by date and time descending

    const [rows] = await pool.execute(query, params);
    return rows;
  } catch (error) {
    console.error('Error retrieving attendance records:', error);
    throw error;
  }
};

// Other attendance-related database functions will be added here

module.exports = { createAttendanceRecord, updateAttendanceRecordClockOut, getAttendanceRecords }; 