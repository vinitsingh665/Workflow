/**
 * approvalRoutes.js
 *
 * Routes for approval / rejection actions
 */

const express = require("express");
const router = express.Router();
const approvalController = require("../controllers/approvalController");

// Manager / Finance approve or reject
router.post("/action", approvalController.takeApprovalAction);

module.exports = router;
