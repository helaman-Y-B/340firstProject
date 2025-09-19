const express = require('express');
const getUser = require('../controller/getUserController')

const router = express.Router();

router.get('/:id', getUser.getUser);

module.exports = router;