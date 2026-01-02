# 🚀 Approval Workflow System

A production-style **role-based expense approval workflow platform** with **multi-level approvals**, **immutable audit logs**, and a **premium enterprise UI**.

This project demonstrates how real-world organizations manage expense approvals with strict authorization rules and full traceability.

---

## 🧠 Problem Statement

Organizations require a structured and auditable process to approve expense requests while ensuring:

- Role-based authorization
- Multi-level approvals for high-value expenses
- Complete audit trail for compliance
- Clean and intuitive user experience

This system addresses all of the above requirements.

---

## ✨ Key Features

### 🔐 Role-Based Workflow
- **EMPLOYEE** – Create expense requests
- **MANAGER** – Review and approve/reject requests
- **FINANCE** – Final approval for high-value expenses

### 🔁 Approval Logic
- Amount **≤ 10,000** → Manager approval only
- Amount **> 10,000** → Manager → Finance approval

### 📜 Audit Logging (Compliance Grade)
- Every action is logged:
  - Request creation
  - Approval
  - Rejection
- Logs include:
  - Old value
  - New value
  - Action performer
  - Timestamp
- Logs are immutable and read-only

### 📊 Audit Logs Dashboard
- Dedicated compliance page
- Table-style enterprise UI
- Chronological activity tracking
- **CSV export** for reporting and audits

### 🎨 Premium UI
- White + Gold luxury color palette
- Clean SaaS-style layout
- Subtle micro-animations
- Light / Gold theme toggle

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- MySQL
- REST APIs
- Centralized audit logging

### Frontend
- React (Vite)
- React Hooks
- React Router
- Custom CSS (no UI libraries)

---

## 🗂 Project Structure

```
Approval_workflow/
├── backend/
│ ├── config/
│ ├── controllers/
│ ├── routes/
│ ├── services/
│ ├── utils/
│ ├── app.js
│ └── server.js
│
├── front-end/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── services/
│ │ ├── App.jsx
│ │ └── main.jsx
│ └── index.css
│
└── README.md
```

---

## 🔄 Workflow Overview

1. Employee creates an expense request
2. Request status becomes `PENDING_MANAGER`
3. Manager reviews the request
   - Approve → goes to Finance if amount > 10,000
   - Reject → workflow ends
4. Finance reviews (if required)
   - Approve → request marked `APPROVED`
   - Reject → workflow ends
5. Every step is logged in `audit_logs`

---

## 🧪 Testing the System

### Sample Users
| Name  | Role     |
|------|----------|
| Amit | EMPLOYEE |
| Rahul| MANAGER  |
| Neha | FINANCE  |

### Recommended Test Scenarios
- Low amount expense (≤ 10,000)
- High amount expense (> 10,000)
- Manager rejection
- Finance rejection
- Invalid approval attempts
- Audit log verification
- CSV export validation

---

## ▶️ How to Run Locally

### 1️⃣ Backend Setup
```bash
cd backend
npm install
node server.js
```
### 2️⃣ Frontend Setup
``` bash
cd front-end
npm install
npm run dev
```
## 📥 CSV Export

Audit logs can be exported directly from the UI using the **Export CSV** button.  
This supports compliance reporting, audits, and offline analysis.

---

## 🧠 Design Decisions

- **No Redux** – State is managed using React hooks for simplicity and clarity  
- **No UI libraries** – Full control over UI/UX and styling decisions  
- **Backend-enforced rules** – Frontend only sends intent; all validation happens server-side  
- **Central audit logger** – Prevents bypassing audit logging and ensures traceability  

---

## 🔒 Security & Integrity

- Role-based action validation  
- Invalid approval attempts blocked on the backend  
- Immutable audit logs for compliance  
- No direct database manipulation from the frontend  

---

## 📌 Future Enhancements

- JWT-based authentication  
- Pagination and filtering  
- Admin role with full visibility  
- Analytics dashboard  
- Deployment (Vercel + Render)  
- Database transactions  
- Email notifications  