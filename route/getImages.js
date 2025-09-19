const express = require('express');
const getImgs = require('../controller/getImgController')

const router = express.Router();

router.get('/', getImgs.getImages);

module.exports = router;