const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/', adminController.adminDashboard);
router.post('/create-user', adminController.createUser);

module.exports = router;
