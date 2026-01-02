/**
 * MySQL connection file
 * This runs once when the app starts
 */

const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    return;
  }
  console.log("MySQL connected successfully");
});

module.exports = db;

exports.getAuditLogs = async (req, res) => {
  try {
    const [rows] = await require("../config/db")
      .promise()
      .query("SELECT * FROM audit_logs ORDER BY performed_at DESC");

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
