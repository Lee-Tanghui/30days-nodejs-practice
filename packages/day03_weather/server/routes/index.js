const express = require('express');
const router = express.Router();

const weather = require('./weather');

router.use('/weather', weather);

module.exports = router;
