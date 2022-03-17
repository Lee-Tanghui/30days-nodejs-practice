const express = require('express');
const router = express.Router();

const { toggleLike } = require('../controller/user');
const { toggleLikeSchema } = require('../validation/user.schema');
const validateRequest = require('../middleware/validate');

router.post('/like', validateRequest(toggleLikeSchema), toggleLike);

module.exports = router;
