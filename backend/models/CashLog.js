const { pool } = require('../server');

// Function to create a new cash log entry
const createCashLog = async (user_id, cash_amount, note) => {
  try {
    // Get the current timestamp for the entry
    const timestamp = new Date();
    const [result] = await pool.execute(
      'INSERT INTO Cash_Logs (user_id, cash_amount, timestamp, note) VALUES (?, ?, ?, ?)',
      [user_id, cash_amount, timestamp, note]
    );
    return result.insertId;
  } catch (error) {
    console.error('Error creating cash log entry:', error);
    throw error;
  }
};

// Function to retrieve cash log entries
const getCashLogs = async (user_id = null, startDate = null, endDate = null) => {
  try {
    let query = 'SELECT * FROM Cash_Logs';
    const params = [];
    const conditions = [];

    if (user_id) {
      conditions.push('user_id = ?');
      params.push(user_id);
    }

    if (startDate) {
      conditions.push('timestamp >= ?');
      params.push(startDate);
    }

    if (endDate) {
      conditions.push('timestamp <= ?');
      params.push(endDate);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY timestamp DESC'; // Order by timestamp descending

    const [rows] = await pool.execute(query, params);
    return rows;
  } catch (error) {
    console.error('Error retrieving cash log entries:', error);
    throw error;
  }
};

// Other cash log related database functions will be added here

module.exports = { createCashLog, getCashLogs }; 