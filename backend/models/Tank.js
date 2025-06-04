const { pool } = require('../server');

// Function to create a new tank
const createTank = async (tank_name, capacity, current_level, fuel_type) => {
  try {
    const [result] = await pool.execute(
      'INSERT INTO Tanks (tank_name, capacity, current_level, fuel_type) VALUES (?, ?, ?, ?)',
      [tank_name, capacity, current_level, fuel_type]
    );
    return result.insertId;
  } catch (error) {
    console.error('Error creating tank:', error);
    throw error;
  }
};

// Function to get all tanks
const getAllTanks = async () => {
  try {
    const [rows] = await pool.execute('SELECT * FROM Tanks');
    return rows;
  } catch (error) {
    console.error('Error getting all tanks:', error);
    throw error;
  }
};

// Function to get a tank by ID
const getTankById = async (id) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM Tanks WHERE id = ?', [id]);
    return rows[0]; // Return the first row if tank is found, otherwise undefined
  } catch (error) {
    console.error('Error getting tank by ID:', error);
    throw error;
  }
};

// Function to update a tank
const updateTank = async (id, tank_name, capacity, current_level, fuel_type) => {
  try {
    const [result] = await pool.execute(
      'UPDATE Tanks SET tank_name = ?, capacity = ?, current_level = ?, fuel_type = ? WHERE id = ?',
      [tank_name, capacity, current_level, fuel_type, id]
    );
    return result.affectedRows;
  } catch (error) {
    console.error('Error updating tank:', error);
    throw error;
  }
};

// Function to delete a tank
const deleteTank = async (id) => {
  try {
    const [result] = await pool.execute('DELETE FROM Tanks WHERE id = ?', [id]);
    return result.affectedRows;
  } catch (error) {
    console.error('Error deleting tank:', error);
    throw error;
  }
};

// Other tank-related database functions will be added here

module.exports = { createTank, getAllTanks, getTankById, updateTank, deleteTank }; 