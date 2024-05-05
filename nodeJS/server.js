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



const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});