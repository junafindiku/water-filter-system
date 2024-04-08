const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const adm = require('../controllers/adminController');
const marketingManagerController = require('../controllers/marketingManagerController');
const salesAgentController = require('../controllers/salesAgentController');
const phoneAgentController = require('../controllers/phoneAgentController');
const {makeSureIs} = require('../middlewares/authMiddleware');

router.get('/', authController.index);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

//admin routes
router.get('/admin', makeSureIs('admin'), adm.adminDashboard);
router.post('/admin/user/add', makeSureIs('admin'), adm.createUser);

//marketing manager routes
router.post('/manager/calls/add', makeSureIs('manager'), marketingManagerController.allocateCalls);
router.post('/manager/adjust-schedule/:agentId', makeSureIs('manager'), marketingManagerController.adjustSalesAgentSchedule);
router.get('/manager/view-schedules/', makeSureIs('manager'), marketingManagerController.viewSalesAgentSchedules);
router.get('/manager/view-sales-agent-statistics/', makeSureIs('manager'), marketingManagerController.viewSalesAgentStatistics);
router.get('/manager/view-phone-agent-statistics/', makeSureIs('manager'), marketingManagerController.viewPhoneAgentStatistics);


//sales agent routes
router.post('/sales-agent/setup-schedule', makeSureIs('sales agent'), salesAgentController.setupSchedule);
router.get('/sales-agent/view-scheduled-meetings', makeSureIs('sales agent'), salesAgentController.viewScheduledMeetings);
router.get('/sales-agent', makeSureIs('sales agent'), salesAgentController.salesAgentDashboard);
router.post('/sales-agent/meeting/add', makeSureIs('sales agent'), salesAgentController.setupInstantMeeting);
router.post('/sales-agent/log-meeting-outcome', makeSureIs('sales agent'), salesAgentController.logMeetingOutcome);
router.post('/sales-agent/add-reference', makeSureIs('sales agent'), salesAgentController.addReference);

//phone agent routes
router.get('/phone-agent', makeSureIs('phone agent'), phoneAgentController.phoneAgentDashboard);
router.get('/phone-agent/sales-agent-schedule', makeSureIs('phone agent'), phoneAgentController.getSalesAgentSchedule);

// GET/POST/DELETE /admin/user

// /admin/user/add
// /admin/user/delete
// /admin/user/edit

module.exports = router;