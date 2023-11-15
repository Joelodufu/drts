const mysql = require("mysql2");

const db = mysql.createPool({
  host: process.env.DEV_DB_HOST,
  user: process.env.DEV_DB_USER_NAME,
  password: process.env.DEV_DB_PASSWORD,
  database: process.env.DEV_DB_NAME,
});

module.exports = db;
