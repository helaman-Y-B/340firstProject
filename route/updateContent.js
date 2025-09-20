const express = require('express');
const update = require('../controller/updateContentController')
const { userValidationRules, imageValidationRule, validateUser, validateImage } = require('../middleware/validation');

const router = express.Router();

router.get('/', update.getContent);

router.put('/updateImage/:id', imageValidationRule, validateImage, update.updateImg);

router.put('/updateUser/:id', userValidationRules, validateUser, update.updateUser);

module.exports = router;