// Needed Resources
const express = require('express');
const router = new express.Router();
const loginController = require('../controller/loginController');

// Route to build login page
router.get('/', loginController.getLoginPage);
router.get('/google', loginController.getAuthenticated);
router.get('/api/session/oauth/google', loginController.sendAuthUrl);
router.get('/logout', loginController.logoutUser);

module.exports = router;