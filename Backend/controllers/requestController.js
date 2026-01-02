/**
 * requestController.js
 *
 * Handles creation of expense requests.
 *
 * Rules:
 * - Only EMPLOYEE can create request
 * - Initial status is always PENDING_MANAGER
 * - Audit log is mandatory
 */

const db = require("../config/db");
const logAudit = require("../utils/auditLogger");

exports.createExpenseRequest = async (req, res) => {
  try {
    const { amount, user_id, role } = req.body;

    // Basic validation
    if (!amount || !user_id || !role) {
      return res.status(400).json({
        message: "amount, user_id and role are required"
      });
    }

    // Role check
    if (role !== "EMPLOYEE") {
      return res.status(403).json({
        message: "Only EMPLOYEE can create expense requests"
      });
    }

    // Initial workflow status
    const status = "PENDING_MANAGER";

    // Insert expense request
    const [result] = await db.promise().query(
      `INSERT INTO requests (amount, status, created_by)
       VALUES (?, ?, ?)`,
      [amount, status, user_id]
    );

    const requestId = result.insertId;

    // Audit log for creation
    await logAudit({
      entity: "REQUEST",
      entity_id: requestId,
      action: "CREATE",
      old_value: null,
      new_value: {
        amount,
        status
      },
      performed_by: user_id
    });

    return res.status(201).json({
      message: "Expense request created successfully",
      request_id: requestId,
      status
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to create expense request",
      error: error.message
    });
  }
};

/**
 * Fetch all requests
 * Used by MANAGER and FINANCE dashboards
 */
exports.getAllRequests = async (req, res) => {
  try {
    const [rows] = await require("../config/db")
      .promise()
      .query("SELECT * FROM requests ORDER BY created_at DESC");

    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch requests",
      error: error.message
    });
  }
};

/**
 * Fetch requests based on role
 * - MANAGER → PENDING_MANAGER
 * - FINANCE → PENDING_FINANCE
 */
exports.getRequestsByRole = async (req, res) => {
  try {
    const { role } = req.query;

    let query = "SELECT * FROM requests";
    let params = [];

    if (role === "MANAGER") {
      query += " WHERE status = 'PENDING_MANAGER'";
    }

    if (role === "FINANCE") {
      query += " WHERE status = 'PENDING_FINANCE'";
    }

    query += " ORDER BY created_at DESC";

    const [rows] = await require("../config/db")
      .promise()
      .query(query, params);

    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch requests",
      error: error.message
    });
  }
};
