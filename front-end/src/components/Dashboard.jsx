/**
 * Dashboard.jsx
 *
 * Central role-based dashboard controller.
 *
 * Responsibilities:
 * - Decide what a user sees based on role
 * - Keep App.jsx clean
 * - Do NOT contain business logic
 *
 * Role behavior:
 * - EMPLOYEE → CreateRequest
 * - MANAGER  → ApprovalInbox + AuditLogs
 * - FINANCE  → ApprovalInbox + AuditLogs
 */

import CreateRequest from "./CreateRequest";
import ApprovalInbox from "./ApprovalInbox";


export default function Dashboard({ user }) {
  // Safety check (should not happen in normal flow)
  if (!user || !user.role) {
    return <p className="muted">Invalid user session</p>;
  }

  // EMPLOYEE DASHBOARD
  if (user.role === "EMPLOYEE") {
    return (
      <div>
        <h2>Employee Dashboard</h2>
        <p className="muted">
          Create and track your expense requests
        </p>

        <CreateRequest user={user} />
      </div>
    );
  }

  // MANAGER & FINANCE DASHBOARD
  if (user.role === "MANAGER" || user.role === "FINANCE") {
    return (
      <div>
        <h2>{user.role} Dashboard</h2>
        <p className="muted">
          Review pending approvals and audit history
        </p>

        {/* Approval actions */}
        <ApprovalInbox user={user} />

        
      </div>
    );
  }

  // Fallback
  return <p className="muted">Unauthorized role</p>;
}
