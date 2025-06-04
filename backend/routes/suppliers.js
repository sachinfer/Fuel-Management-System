const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Import the protect middleware
const { createSupplier, getAllSuppliers, getSupplierById, updateSupplier, deleteSupplier } = require('../models/Supplier');

// Protect all supplier routes
router.use(protect);

// @route   POST /api/suppliers
// @desc    Create a new supplier
// @access  Private (Admin/Manager role might be needed)
router.post('/', async (req, res) => {
  const { name, contact_info } = req.body;

  if (!name || !contact_info) {
    return res.status(400).json({ message: 'Name and contact info are required.' });
  }

  try {
    const supplierId = await createSupplier(name, contact_info);
    res.status(201).json({ message: 'Supplier created successfully', supplierId });
  } catch (error) {
    console.error('Error creating supplier:', error);
    res.status(500).json({ message: 'Error creating supplier.', error: error.message });
  }
});

// @route   GET /api/suppliers
// @desc    Get all suppliers
// @access  Private
router.get('/', async (req, res) => {
  try {
    const suppliers = await getAllSuppliers();
    res.status(200).json(suppliers);
  } catch (error) {
    console.error('Error getting suppliers:', error);
    res.status(500).json({ message: 'Error retrieving suppliers.', error: error.message });
  }
});

// @route   GET /api/suppliers/:id
// @desc    Get supplier by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const supplier = await getSupplierById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found.' });
    }
    res.status(200).json(supplier);
  } catch (error) {
    console.error('Error getting supplier by ID:', error);
    res.status(500).json({ message: 'Error retrieving supplier.', error: error.message });
  }
});

// @route   PUT /api/suppliers/:id
// @desc    Update supplier by ID
// @access  Private (Admin/Manager role might be needed)
router.put('/:id', async (req, res) => {
  const { name, contact_info } = req.body;
  const { id } = req.params;

  if (!name || !contact_info) {
    return res.status(400).json({ message: 'Name and contact info are required.' });
  }

  try {
    const affectedRows = await updateSupplier(id, name, contact_info);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Supplier not found.' });
    }
    res.status(200).json({ message: 'Supplier updated successfully.' });
  } catch (error) {
    console.error('Error updating supplier:', error);
    res.status(500).json({ message: 'Error updating supplier.', error: error.message });
  }
});

// @route   DELETE /api/suppliers/:id
// @desc    Delete supplier by ID
// @access  Private (Admin/Manager role might be needed)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const affectedRows = await deleteSupplier(id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Supplier not found.' });
    }
    res.status(200).json({ message: 'Supplier deleted successfully.' });
  } catch (error) {
    console.error('Error deleting supplier:', error);
    res.status(500).json({ message: 'Error deleting supplier.', error: error.message });
  }
});

module.exports = router; 