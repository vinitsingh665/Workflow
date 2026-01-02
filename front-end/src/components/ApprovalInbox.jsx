/**
 * ApprovalInbox.jsx
 *
 * Used by MANAGER and FINANCE roles.
 *
 * Data flow:
 * - On mount → fetch requests from backend
 * - User clicks Approve / Reject
 * - API call sent with role + user_id
 * - List refreshes after action
 */

import { useEffect, useState } from "react";
import { fetchRequestsByRole, takeApprovalAction } from "../services/api";

export default function ApprovalInbox({ user }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loadRequests = async () => {
  setLoading(true);
  try {
    const data = await fetchRequestsByRole(user.role);
    setRequests(data || []);
  } catch (err) {
    console.log(err);
    
    setMessage("Failed to load requests");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
  const loadRequests = async () => {
    setLoading(true);
    try {
      const data = await fetchRequestsByRole(user.role);
      setRequests(data || []);
    } catch (err) {
        console.log(err);
        
      setMessage("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  loadRequests();
}, [user.role]);


  const handleAction = async (request_id, action) => {
    try {
      await takeApprovalAction({
        request_id,
        action,
        role: user.role,
        user_id: user.user_id
      });
      loadRequests(); // refresh inbox after action
    } catch (err) {
        console.log(err);
        
      setMessage("Action failed");
    }
  };

  if (loading) return <p>Loading approval inbox...</p>;

  if (!requests.length) {
    return <p>No requests available</p>;
  }

  return (
   <div className="card">
  <h3>Approval Inbox</h3>
  <p className="muted" style={{ marginTop: "8px" }}>
    {message}
  </p>
  <p className="muted">Requests pending your approval</p>

  {requests.map((req) => (
    <div key={req.request_id} className="request-card">
      <p><strong>Request ID:</strong> {req.request_id}</p>
      <p><strong>Amount:</strong> ₹{req.amount}</p>
      <p>
        <strong>Status:</strong>{" "}
        <span className="badge">{req.status}</span>
      </p>

      <div className="actions">
        <button
          className="success"
          onClick={() => handleAction(req.request_id, "APPROVE")}
        >
          Approve
        </button>

        <button
          className="danger"
          onClick={() => handleAction(req.request_id, "REJECT")}
        >
          Reject
        </button>
      </div>
    </div>
  ))}
</div>



  );
}
