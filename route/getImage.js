const express = require('express');
const getImg = require('../controller/getImgController')

const router = express.Router();

router.get('/:id', getImg.getImage);

router.get('/', getImg.getImages);

router.post('/', getImg.postImage);

module.exports = router;