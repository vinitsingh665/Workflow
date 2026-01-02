/**
 * SignIn.jsx
 *
 * Mock login screen.
 * No authentication logic here.
 *
 * Data flow:
 * - User enters user_id and role
 * - On login, data is sent to App.jsx
 * - App.jsx decides which dashboard to show
 */

import { useState } from "react";

export default function SignIn({ onLogin }) {
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");

  const handleLogin = () => {
    if (!userId || !role) {
      alert("Please enter user id and role");
      return;
    }

    // Send login data to parent (App.jsx)
    onLogin({
      user_id: Number(userId),
      role: role
    });
  };

  return (
    <div className="card">
      <h2>Sign In (Mock)</h2>

      <div>
        <input
          type="number"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>

      <div>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="EMPLOYEE">EMPLOYEE</option>
          <option value="MANAGER">MANAGER</option>
          <option value="FINANCE">FINANCE</option>
        </select>
      </div>

      <button className="primary" onClick={handleLogin}>Login</button>
    </div>
  );
}
