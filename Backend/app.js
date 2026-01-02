const express = require("express");
const cors = require('cors');

const app = express();

/**
 * CORS MUST be before routes
 * Otherwise browser blocks request
 */
app.use(cors());

app.use(express.json());

// Routes
const requestRoutes = require("./routes/requestRoutes");
const approvalRoutes = require("./routes/approvalRoutes");

app.use("/api/requests", requestRoutes);
app.use("/api/approvals", approvalRoutes);

const auditRoutes = require("./routes/auditRoutes");
app.use("/api/audit-logs", auditRoutes);


module.exports = app;
