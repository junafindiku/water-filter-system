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
router.post('/manager/calls/add', marketingManagerController.allocateCalls);
router.post('/manager/adjust-schedule/:agentId', marketingManagerController.adjustSalesAgentSchedule);
router.get('/manager/view-schedules/', marketingManagerController.viewSalesAgentSchedules);
router.get('/manager/view-sales-agent-statistics/', marketingManagerController.viewSalesAgentStatistics);
router.get('/manager/view-phone-agent-statistics/', marketingManagerController.viewPhoneAgentStatistics);


//sales agent routes
router.post('/salesagent/setup-work-schedule', salesAgentController.setupSchedule);
router.get('/salesagent/view-scheduled-meetings', salesAgentController.viewScheduledMeetings);

//phone agent routes
router.get('/phoneagent', phoneAgentController.phoneAgentDashboard);
router.get('/phoneagent/sales-agent-schedule', phoneAgentController.getSalesAgentSchedule);

// GET/POST/DELETE /admin/user

// /admin/user/add
// /admin/user/delete
// /admin/user/edit

// /api/add POST object=user/schedule/role
// /api/delete
// /api/edit

module.exports = router;