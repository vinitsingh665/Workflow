/**
 * requestRoutes.js
 *
 * Routes related to expense request creation
 */

const express = require("express");
const router = express.Router();
const requestController = require("../controllers/requestController");

// Create expense request (EMPLOYEE only)
router.post("/create", requestController.createExpenseRequest);

router.get("/", requestController.getAllRequests);
router.get("/by-role", requestController.getRequestsByRole);


module.exports = router;
