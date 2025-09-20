const express = require('express');
const getImg = require('../controller/getImgController')
const { imageValidationRule, validateImage } = require('../middleware/validation');

const router = express.Router();

router.get('/:id', getImg.getImage);

router.get('/', getImg.getImages);

router.post('/', imageValidationRule, validateImage, getImg.postImage);

module.exports = router;