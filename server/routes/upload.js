// routes/upload.js
const express = require('express');
const router = express.Router();
const { uploadImage } = require('../controllers/uploadController');
const upload = require('../middleware/multer');

router.post('/upload', upload.single('file'), uploadImage);

module.exports = router;
