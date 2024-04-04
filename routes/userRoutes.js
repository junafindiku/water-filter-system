const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const adm = require('../controllers/adminController');
const salesAgentController = require('../controllers/salesAgentController');
const phoneAgentController = require('../controllers/phoneAgentController');
const {makeSureIs} = require('../middlewares/authMiddleware');

router.get('/', authController.index);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

//admin routes
router.get('/admin', makeSureIs('admin'), adm.adminDashboard);
router.post('/admin/user/add', makeSureIs('admin'), adm.createUser);

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