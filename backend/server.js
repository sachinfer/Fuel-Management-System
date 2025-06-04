const express = require('express');
const mysql = require('mysql2/promise'); // Use promise-based version
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Import routes
const authRoutes = require('./routes/auth');
const tanksRoutes = require('./routes/tanks'); // Import tank routes
const suppliersRoutes = require('./routes/suppliers'); // Import supplier routes
const attendanceRoutes = require('./routes/attendance'); // Import attendance routes
const fuelPricesRoutes = require('./routes/fuelPrices'); // Import fuel price routes
const cashLogsRoutes = require('./routes/cashLogs'); // Import cash log routes

// Database connection pool
const pool = mysql.createPool({
  host: 'db', // Service name in docker-compose.yml
  user: process.env.MYSQL_USER || 'user',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'fuel_management',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

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

module.exports = { pool }; 