// controllers/uploadController.js
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

const uploadImage = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'test',
    });

    // Delete local file after upload
    fs.unlinkSync(file.path);

    res.status(200).json({
      public_id: result.public_id,
      url: result.secure_url,
    });

  } catch (err) {
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};

module.exports = { uploadImage };
