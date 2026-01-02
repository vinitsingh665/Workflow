/**
 * App.jsx
 *
 * Root component.
 * Handles mock authentication, routing and logout.
 */

import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import AuditLogsPage from "./pages/AuditLogsPage";

export default function App() {
  const [user, setUser] = useState(null);

  // Logout handler (mock logout)
  const handleLogout = () => {
    setUser(null);
  };

  // If user not logged in
  if (!user) {
    return <SignIn onLogin={setUser} />;
  }

  return (
    <BrowserRouter>
      <div className="container">
        {/* ===== Top Navigation ===== */}
        <nav className="top-nav">
          <div className="nav-left">
            <Link to="/">Dashboard</Link>

            {(user.role === "MANAGER" ||
              user.role === "FINANCE") && (
              <Link to="/audit-logs">Audit Logs</Link>
            )}
          </div>

          <div className="nav-right">
            <span className="muted">
              {user.role} • ID {user.user_id}
            </span>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </nav>

        {/* ===== Page Content ===== */}
        <Routes>
          <Route
            path="/"
            element={<Dashboard user={user} />}
          />

          <Route
            path="/audit-logs"
            element={<AuditLogsPage />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
