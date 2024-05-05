const express = require('express');
const mysql = require('mysql2'); // שימוש ב-require כאן
require('dotenv').config();

const app = express();

// התחברות לבסיס הנתונים
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
}).promise();

// נתיבים
app.get('/users', async (req, res) => {
    try {
      const connection = await pool.getConnection();
      const [rows, fields] = await connection.query('SELECT * FROM users');
      res.json(rows);
      connection.release();
    } catch (error) {
      console.error('Error getting users:', error);
      res.status(500).json({ error: 'Error getting users' });
    }
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});