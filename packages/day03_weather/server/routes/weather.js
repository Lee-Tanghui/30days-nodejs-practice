const express = require('express');
const router = express.Router();
const { getWeatherData, getCityData, getTest } = require('../controller/weather');
const validateRequest = require('../middleware/validate');
const { getWeatherDataSchema } = require('../validation/weather.schame');

router.get('/', validateRequest(getWeatherDataSchema), getWeatherData);
router.get('/city', getCityData);
router.get('/test', getTest)

module.exports = router;
