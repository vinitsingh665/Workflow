/**
 * api.js
 *
 * This file is the single source of truth
 * for all backend API calls.
 *
 * Why this exists:
 * - Components should not know backend URLs
 * - Easy to change base URL later
 * - Clean separation of concerns
 */

const BASE_URL = "http://localhost:5000/api";

/**
 * Create Expense Request
 * Used by EMPLOYEE
 */
export const createExpenseRequest = async (payload) => {
  const response = await fetch(`${BASE_URL}/requests/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  return response.json();
};

/**
 * Approve / Reject Request
 * Used by MANAGER / FINANCE
 */
export const takeApprovalAction = async (payload) => {
  const response = await fetch(`${BASE_URL}/approvals/action`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  return response.json();
};

/**
 * Fetch all requests
 * (Later backend can filter by role)
 */
export const fetchRequests = async () => {
  const response = await fetch(`${BASE_URL}/requests`);
  return response.json();
};

export const fetchRequestsByRole = async (role) => {
  const res = await fetch(
    `http://localhost:5000/api/requests/by-role?role=${role}`
  );
  return res.json();
};

/**
 * Fetch audit logs
 */
export const fetchAuditLogs = async () => {
  const res = await fetch("http://localhost:5000/api/audit-logs");
  return res.json();
};

