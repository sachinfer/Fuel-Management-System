const express = require('express');
const mysql = require('mysql2/promise'); // Use promise-based version
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Import authentication routes
const authRoutes = require('./routes/auth');

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

// Mount authentication routes
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = { pool }; 