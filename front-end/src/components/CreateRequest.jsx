/**
 * CreateRequest.jsx
 *
 * Employee expense request creation screen.
 *
 * Data flow:
 * - User enters amount
 * - API call goes to backend
 * - Backend creates request + audit log
 * - UI shows success / error message
 */

import { useState } from "react";
import { createExpenseRequest } from "../services/api";

export default function CreateRequest({ user }) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!amount) {
      alert("Please enter amount");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await createExpenseRequest({
        amount: Number(amount),
        user_id: user.user_id,
        role: user.role
      });

      setMessage(response.message || "Request created successfully");
      setAmount("");
    } catch (error) {
        console.log(error);
        
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3>Create Expense Request</h3>

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button className="primary"  onClick={handleSubmit} disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}
