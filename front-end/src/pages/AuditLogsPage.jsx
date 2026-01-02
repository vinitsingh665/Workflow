/**
 * AuditLogsPage.jsx
 *
 * Dedicated compliance page.
 * Read-only audit trail.
 */

import AuditLogs from "../components/AuditLogs";

export default function AuditLogsPage() {
  return (
    <div>
      <h2>Audit Logs</h2>
      <p className="muted">
        System-wide immutable audit trail
      </p>

      <AuditLogs />
    </div>
  );
}
