const express = require('express');
const router = express.Router();

const md = require('./md');

router.use('/md', md);

module.exports = router;
