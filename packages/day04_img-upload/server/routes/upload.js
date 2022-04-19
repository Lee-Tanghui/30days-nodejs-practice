const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadImage, getList, getImage } = require('../controller/upload');
const validateImage = require('../middleware/validateImage');
const validateRequest = require('../middleware/validate');
const { getListSchema, getImageSchema } = require('../validation/upload.schema');
const upload = multer();

router.post('/', [upload.any(), validateImage()], uploadImage);
router.get('/image', validateRequest(getImageSchema), getImage);
router.get('/', validateRequest(getListSchema), getList);

module.exports = router;
