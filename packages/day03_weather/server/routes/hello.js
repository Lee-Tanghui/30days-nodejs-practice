const express = require('express');
const router = express.Router();
const { getHello } = require('../controller/hello');

router.get('/', getHello);

module.exports = router;
