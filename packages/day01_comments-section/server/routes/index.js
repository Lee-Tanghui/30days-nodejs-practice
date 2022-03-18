const express = require('express');
const router = express.Router();

const comment = require('./comment');
const user = require('./user');

router.use('/comment', comment);
router.use('/user', user);

module.exports = router;
