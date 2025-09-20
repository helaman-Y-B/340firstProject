const express = require('express');
const getUser = require('../controller/getUserController')
const { userValidationRules, validateUser } = require('../middleware/validation');

const router = express.Router();

router.get('/:id', getUser.getUser);

router.get('/', getUser.getUsers);

router.post('/', userValidationRules, validateUser, getUser.createUser);

module.exports = router;