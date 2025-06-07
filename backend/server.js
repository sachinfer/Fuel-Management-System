const express = require('express');
const mysql = require('mysql2/promise'); // Keep this for type hints if needed elsewhere, but pool is moved
const cors = require('cors'); // Import the cors middleware
// No longer need to import pool here as it's handled in database.js

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors()); // Use cors middleware before your routes

// Import routes
const authRoutes = require('./routes/auth');
const tanksRoutes = require('./routes/tanks'); // Import tank routes
const suppliersRoutes = require('./routes/suppliers'); // Import supplier routes
const attendanceRoutes = require('./routes/attendance'); // Import attendance routes
const fuelPricesRoutes = require('./routes/fuelPrices'); // Import fuel price routes
const cashLogsRoutes = require('./routes/cashLogs'); // Import cash log routes

// Test database connection
app.get('/db-test', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    res.send('Database connection successful!');
    connection.release(); // Release the connection back to the pool
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).send('Database connection failed.');
  }
});

app.get('/', (req, res) => {
  res.send('Fuel Management System Backend');
});

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/tanks', tanksRoutes); // Mount tank routes
app.use('/api/suppliers', suppliersRoutes); // Mount supplier routes
app.use('/api/attendance', attendanceRoutes); // Mount attendance routes
app.use('/api/fuel-prices', fuelPricesRoutes); // Mount fuel price routes
app.use('/api/cash-logs', cashLogsRoutes); // Mount cash log routes

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 