const express = require('express');
const router = express.Router();

const hello = require('./hello');
const weather = require('./weather');

router.use('/hello', hello);
router.use('/weather', weather);

module.exports = router;
