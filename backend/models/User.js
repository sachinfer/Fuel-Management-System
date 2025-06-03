// User model and database interactions will be defined here 

const { pool } = require('../server');
const bcrypt = require('bcrypt');

const createUser = async (username, email, password, role) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
    const [result] = await pool.execute(
      'INSERT INTO Users (username, email, password_hash, role) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, role]
    );
    return result.insertId;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

module.exports = { createUser }; 