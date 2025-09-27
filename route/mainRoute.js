// Needed Resources
const express = require('express');
const router = new express.Router();
const mainController = require('../controller/mainPageController');

// Route to build main page
router.get('/', mainController.getMainPage);

module.exports = router;