const express = require('express');
const router = express.Router();

const hello = require('./hello');
const md = require('./md');

router.use('/hello', hello);
router.use('/md', md);

module.exports = router;
