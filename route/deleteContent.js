const express = require('express');
const deleteContent = require('../controller/deleteContentController')

const router = express.Router();

router.get('/', deleteContent.getContent);

router.delete('/deleteImage/:id', deleteContent.deleteImg);

router.delete('/deleteUser/:id', deleteContent.deleteUser);

module.exports = router;