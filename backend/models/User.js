// User model and database interactions will be defined here 

const { pool } = require('../config/database');
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

const findUserByEmail = async (email) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM Users WHERE email = ?', [email]);
    return rows[0]; // Return the first row if user is found, otherwise undefined
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw error;
  }
};

// Function to update a user
const updateUser = async (id, username, email, role) => {
  try {
    const [result] = await pool.execute(
      'UPDATE Users SET username = ?, email = ?, role = ? WHERE id = ?',
      [username, email, role, id]
    );
    return result.affectedRows;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Function to delete a user
const deleteUser = async (id) => {
  try {
    const [result] = await pool.execute('DELETE FROM Users WHERE id = ?', [id]);
    return result.affectedRows;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

module.exports = { createUser, findUserByEmail, updateUser, deleteUser }; 