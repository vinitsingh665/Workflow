/**
 * approvalController.js
 *
 * Handles approval and rejection of expense requests.
 *
 * Rules enforced:
 * - Manager can act only on PENDING_MANAGER
 * - Finance can act only on PENDING_FINANCE
 * - Invalid approvals are blocked
 * - Every action is audit logged
 */

const db = require("../config/db");
const WorkflowService = require("../services/workflowService");
const logAudit = require("../utils/auditLogger");

exports.takeApprovalAction = async (req, res) => {
  try {
    const { request_id, action, role, user_id } = req.body;

    // Basic validation
    if (!request_id || !action || !role || !user_id) {
      return res.status(400).json({
        message: "request_id, action, role and user_id are required"
      });
    }

    // Fetch request
    const [rows] = await db.promise().query(
      "SELECT * FROM requests WHERE request_id = ?",
      [request_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Request not found" });
    }

    const request = rows[0];
    const oldStatus = request.status;

    // Validate role vs workflow stage
    WorkflowService.validateApproval(role, request.status);

    // Handle rejection (final)
    if (action === "REJECT") {
      await db.promise().query(
        "UPDATE requests SET status = 'REJECTED' WHERE request_id = ?",
        [request_id]
      );

      await logAudit({
        entity: "REQUEST",
        entity_id: request_id,
        action: "REJECT",
        old_value: { status: oldStatus },
        new_value: { status: "REJECTED" },
        performed_by: user_id
      });

      return res.json({
        message: "Request rejected successfully",
        status: "REJECTED"
      });
    }

    // Handle approval
    if (action === "APPROVE") {
      const nextStatus = WorkflowService.getNextStatus(
        request.amount,
        request.status
      );

      await db.promise().query(
        "UPDATE requests SET status = ? WHERE request_id = ?",
        [nextStatus, request_id]
      );

      // Store approval trail
      await db.promise().query(
        `INSERT INTO approvals (request_id, approver_role, action)
         VALUES (?, ?, ?)`,
        [request_id, role, "APPROVED"]
      );

      // Audit log
      await logAudit({
        entity: "REQUEST",
        entity_id: request_id,
        action: "APPROVE",
        old_value: { status: oldStatus },
        new_value: { status: nextStatus },
        performed_by: user_id
      });

      return res.json({
        message: "Approval processed successfully",
        status: nextStatus
      });
    }

    return res.status(400).json({ message: "Invalid action" });

  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};
