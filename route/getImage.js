const express = require('express');
const getImg = require('../controller/getImgController')

const router = express.Router();

router.get('/:id', getImg.getImage);

module.exports = router;