/**
 * Fetch audit logs
 * Read-only API for dashboard
 */

const db = require("../config/db");

exports.getAuditLogs = async (req, res) => {
  try {
    const [rows] = await db.promise().query(
      `SELECT *
       FROM audit_logs
       ORDER BY performed_at DESC`
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch audit logs",
      error: error.message
    });
  }
};
