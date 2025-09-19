const express = require('express');
const getUser = require('../controller/getUserController')

const router = express.Router();

router.get('/:id', getUser.getUser);

router.get('/', getUser.getUsers);

router.post('/', getUser.createUser);

module.exports = router;