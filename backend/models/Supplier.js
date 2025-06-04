const { pool } = require('../server');

// Function to create a new supplier
const createSupplier = async (name, contact_info) => {
  try {
    const [result] = await pool.execute(
      'INSERT INTO Suppliers (name, contact_info) VALUES (?, ?)',
      [name, contact_info]
    );
    return result.insertId;
  } catch (error) {
    console.error('Error creating supplier:', error);
    throw error;
  }
};

// Function to get all suppliers
const getAllSuppliers = async () => {
  try {
    const [rows] = await pool.execute('SELECT * FROM Suppliers');
    return rows;
  } catch (error) {
    console.error('Error getting all suppliers:', error);
    throw error;
  }
};

// Function to get a supplier by ID
const getSupplierById = async (id) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM Suppliers WHERE id = ?', [id]);
    return rows[0]; // Return the first row if supplier is found, otherwise undefined
  } catch (error) {
    console.error('Error getting supplier by ID:', error);
    throw error;
  }
};

// Function to update a supplier
const updateSupplier = async (id, name, contact_info) => {
  try {
    const [result] = await pool.execute(
      'UPDATE Suppliers SET name = ?, contact_info = ? WHERE id = ?',
      [name, contact_info, id]
    );
    return result.affectedRows;
  } catch (error) {
    console.error('Error updating supplier:', error);
    throw error;
  }
};

// Function to delete a supplier
const deleteSupplier = async (id) => {
  try {
    const [result] = await pool.execute('DELETE FROM Suppliers WHERE id = ?', [id]);
    return result.affectedRows;
  } catch (error) {
    console.error('Error deleting supplier:', error);
    throw error;
  }
};

// Other supplier-related database functions will be added here

module.exports = { createSupplier, getAllSuppliers, getSupplierById, updateSupplier, deleteSupplier }; 