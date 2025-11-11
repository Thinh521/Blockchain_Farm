const express = require('express');
const router = express.Router();
const { getImageById } = require('../controllers/ImageController');
const upload = require('../middlewares/upload')

router.get('/:publicId', getImageById);

module.exports = router;
