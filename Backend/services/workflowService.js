/**
 * workflowService.js
 *
 * This file contains PURE business rules.
 * No HTTP, no req/res, no Express.
 *
 * Interview point:
 * Business rules should never live in controllers.
 */

class WorkflowService {

  /**
   * Validate whether the current role
   * is allowed to act on the request status
   */
  static validateApproval(role, currentStatus) {

    // Manager can act only when manager approval is pending
    if (role === "MANAGER" && currentStatus !== "PENDING_MANAGER") {
      throw new Error("Manager is not allowed to act at this stage");
    }

    // Finance can act only when finance approval is pending
    if (role === "FINANCE" && currentStatus !== "PENDING_FINANCE") {
      throw new Error("Finance is not allowed to act at this stage");
    }
  }

  /**
   * Decide next status after approval
   * based on amount and current status
   */
  static getNextStatus(amount, currentStatus) {

    // Case 1: Amount <= 10,000
    // Only manager approval required
    if (amount <= 10000 && currentStatus === "PENDING_MANAGER") {
      return "APPROVED";
    }

    // Case 2: Amount > 10,000
    // Manager approves first
    if (amount > 10000 && currentStatus === "PENDING_MANAGER") {
      return "PENDING_FINANCE";
    }

    // Case 3: Finance gives final approval
    if (amount > 10000 && currentStatus === "PENDING_FINANCE") {
      return "APPROVED";
    }

    // Any other case is invalid
    throw new Error("Invalid workflow transition");
  }
}

module.exports = WorkflowService;
