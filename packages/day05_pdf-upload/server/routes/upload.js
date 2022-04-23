const express = require('express');

const { uploadFile } = require('../controller/upload');

const router = express.Router();


router.post('/', uploadFile);

module.exports = router;
