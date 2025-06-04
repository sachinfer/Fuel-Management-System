const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Import the protect middleware
const { getAllFuelPrices, getFuelPriceByType, setFuelPrice, deleteFuelPriceByType } = require('../models/FuelPrice');

// Protect all fuel price routes (Admin/Manager role might be needed for setting/deleting)
router.use(protect);

// @route   GET /api/fuel-prices
// @desc    Get all fuel prices
// @access  Private
router.get('/', async (req, res) => {
  try {
    const fuelPrices = await getAllFuelPrices();
    res.status(200).json(fuelPrices);
  } catch (error) {
    console.error('Error getting fuel prices:', error);
    res.status(500).json({ message: 'Error retrieving fuel prices.', error: error.message });
  }
});

// @route   GET /api/fuel-prices/:fuel_type
// @desc    Get fuel price by type
// @access  Private
router.get('/:fuel_type', async (req, res) => {
  try {
    const fuelPrice = await getFuelPriceByType(req.params.fuel_type);
    if (fuelPrice === null) {
      return res.status(404).json({ message: 'Fuel type not found.' });
    }
    res.status(200).json({ fuel_type: req.params.fuel_type, price: fuelPrice });
  } catch (error) {
    console.error('Error getting fuel price by type:', error);
    res.status(500).json({ message: 'Error retrieving fuel price.', error: error.message });
  }
});

// @route   POST /api/fuel-prices
// @desc    Set or update fuel price (Admin/Manager only)
// @access  Private
router.post('/', async (req, res) => {
  const { fuel_type, price } = req.body;

  if (!fuel_type || price === undefined) {
    return res.status(400).json({ message: 'Fuel type and price are required.' });
  }

  // Basic price validation (ensure it's a positive number)
  if (typeof price !== 'number' || price < 0) {
       return res.status(400).json({ message: 'Price must be a non-negative number.' });
  }

  try {
    // setFuelPrice handles both insert and update
    const affectedRows = await setFuelPrice(fuel_type, price);
     if (affectedRows > 0) {
         res.status(200).json({ message: `Fuel price for ${fuel_type} set/updated successfully.` });
     } else {
          // This case should ideally not be reached if setFuelPrice works as intended
         res.status(500).json({ message: 'Error setting fuel price.' });
     }
  } catch (error) {
    console.error('Error setting fuel price:', error);
    res.status(500).json({ message: 'Error setting fuel price.', error: error.message });
  }
});

// @route   DELETE /api/fuel-prices/:fuel_type
// @desc    Delete fuel price by type (Admin/Manager only)
// @access  Private
router.delete('/:fuel_type', async (req, res) => {
  const { fuel_type } = req.params;

  try {
    const affectedRows = await deleteFuelPriceByType(fuel_type);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Fuel type not found.' });
    }
    res.status(200).json({ message: `Fuel price for ${fuel_type} deleted successfully.` });
  } catch (error) {
    console.error('Error deleting fuel price:', error);
    res.status(500).json({ message: 'Error deleting fuel price.', error: error.message });
  }
});

module.exports = router; 