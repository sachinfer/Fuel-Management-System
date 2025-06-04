const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Import the protect middleware
const { createTank, getAllTanks, getTankById, updateTank, deleteTank } = require('../models/Tank');

// Protect all tank routes
router.use(protect);

// @route   POST /api/tanks
// @desc    Create a new tank
// @access  Private (Admin/Manager role might be needed in a real app)
router.post('/', async (req, res) => {
  const { tank_name, capacity, current_level, fuel_type } = req.body;

  if (!tank_name || !capacity || !current_level || !fuel_type) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const tankId = await createTank(tank_name, capacity, current_level, fuel_type);
    res.status(201).json({ message: 'Tank created successfully', tankId });
  } catch (error) {
    console.error('Error creating tank:', error);
    res.status(500).json({ message: 'Error creating tank.', error: error.message });
  }
});

// @route   GET /api/tanks
// @desc    Get all tanks
// @access  Private
router.get('/', async (req, res) => {
  try {
    const tanks = await getAllTanks();
    res.status(200).json(tanks);
  } catch (error) {
    console.error('Error getting tanks:', error);
    res.status(500).json({ message: 'Error retrieving tanks.', error: error.message });
  }
});

// @route   GET /api/tanks/:id
// @desc    Get tank by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const tank = await getTankById(req.params.id);
    if (!tank) {
      return res.status(404).json({ message: 'Tank not found.' });
    }
    res.status(200).json(tank);
  } catch (error) {
    console.error('Error getting tank by ID:', error);
    res.status(500).json({ message: 'Error retrieving tank.', error: error.message });
  }
});

// @route   PUT /api/tanks/:id
// @desc    Update tank by ID
// @access  Private (Admin/Manager role might be needed)
router.put('/:id', async (req, res) => {
  const { tank_name, capacity, current_level, fuel_type } = req.body;
  const { id } = req.params;

  if (!tank_name || !capacity || !current_level || !fuel_type) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const affectedRows = await updateTank(id, tank_name, capacity, current_level, fuel_type);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Tank not found.' });
    }
    res.status(200).json({ message: 'Tank updated successfully.' });
  } catch (error) {
    console.error('Error updating tank:', error);
    res.status(500).json({ message: 'Error updating tank.', error: error.message });
  }
});

// @route   DELETE /api/tanks/:id
// @desc    Delete tank by ID
// @access  Private (Admin/Manager role might be needed)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const affectedRows = await deleteTank(id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Tank not found.' });
    }
    res.status(200).json({ message: 'Tank deleted successfully.' });
  } catch (error) {
    console.error('Error deleting tank:', error);
    res.status(500).json({ message: 'Error deleting tank.', error: error.message });
  }
});

module.exports = router; 