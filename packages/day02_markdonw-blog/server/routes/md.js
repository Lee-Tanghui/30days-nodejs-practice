const express = require('express');
const router = express.Router();
const { saveImg, create, getBlog } = require('../controller/md');
const validateRequest = require('../middleware/validate');
const { saveImgSchema, createSchema } = require('../validation/md.schema');

router.get('/', getBlog)
router.post('/save-img', validateRequest(saveImgSchema), saveImg);
router.post('/create', validateRequest(createSchema), create);

module.exports = router;
