// backend/config/db.js
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// Criando conexão com o banco de dados MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();
