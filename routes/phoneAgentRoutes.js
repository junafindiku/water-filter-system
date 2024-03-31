const express = require('express');
const router = express.Router();
const phoneAgentController = require('../controllers/phoneAgentController');

// Define routes for phone agent functionalities
router.get('/', phoneAgentController.phoneAgentDashboard);
router.get('sales-agent-schedule', phoneAgentController.getSalesAgentSchedule);

module.exports = router;
