const express = require('express');
const update = require('../controller/updateContentController')

const router = express.Router();

router.get('/', update.getContent);

router.put('/updateImage/:id', update.updateImg);

router.put('/updateUser/:id', update.updateUser);

module.exports = router;