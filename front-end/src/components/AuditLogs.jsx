/**
 * AuditLogs.jsx
 *
 * Enterprise-grade audit logs table
 * with CSV export functionality.
 */

import { useEffect, useState } from "react";
import { fetchAuditLogs } from "../services/api";

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const loadLogs = async () => {
      const data = await fetchAuditLogs();
      setLogs(data || []);
    };

    loadLogs();
  }, []);

  /**
   * Export audit logs to CSV
   */
  const exportCSV = () => {
    if (!logs.length) return;

    const headers = [
      "Entity",
      "Entity ID",
      "Action",
      "Performed By",
      "Performed At"
    ];

    const rows = logs.map((log) => [
      log.entity,
      log.entity_id,
      log.action,
      log.performed_by,
      log.performed_at
    ]);

    const csvContent =
      headers.join(",") +
      "\n" +
      rows.map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "audit_logs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!logs.length) {
    return <p className="muted">No audit logs available</p>;
  }

  return (
    <div className="card">
      <div className="audit-header">
        <div>
          <h3>Audit Logs</h3>
          <p className="muted">
            Immutable system activity trail
          </p>
        </div>

        <button
          className="export-btn"
          onClick={exportCSV}
        >
          ⬇ Export CSV
        </button>
      </div>

      <div className="table-wrapper">
        <table className="audit-table">
          <thead>
            <tr>
              <th>Entity</th>
              <th>Action</th>
              <th>User</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr key={log.log_id}>
                <td>
                  {log.entity} #{log.entity_id}
                </td>
                <td>
                  <span className="badge">
                    {log.action}
                  </span>
                </td>
                <td>User {log.performed_by}</td>
                <td>
                  {new Date(
                    log.performed_at
                  ).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
