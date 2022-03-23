const express = require('express');
const router = express.Router();
const { saveImg, create, getBlog, getBlgContent } = require('../controller/md');
const validateRequest = require('../middleware/validate');
const {
  saveImgSchema,
  createSchema,
  getSchema,
  getBlogContentSchema
} = require('../validation/md.schema');

router.get('/', validateRequest(getSchema), getBlog);
router.post('/save-img', validateRequest(saveImgSchema), saveImg);
router.post('/create', validateRequest(createSchema), create);
router.get('/blog', validateRequest(getBlogContentSchema), getBlgContent)

module.exports = router;
