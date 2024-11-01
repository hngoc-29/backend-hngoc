// middlewares/uploadFiles.js
const {
  storage
} = require('../config/Firebase');
const {
  ref,
  uploadBytes,
  getDownloadURL
} = require("firebase/storage");
const multer = require('multer');

// Cấu hình multer để nhận nhiều trường tệp khác nhau
const upload = multer( {
  storage: multer.memoryStorage()
}).fields([{
    name: 'audio', maxCount: 1
  },
  {
    name: 'image', maxCount: 1
  },
]);

const uploadFilesMiddleware = (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log('File upload error:', err);
      return res.status(500).json({
        success: false,
        message: 'Lỗi tải lên tệp'
      });
    }

    try {
      // Xử lý tệp âm thanh nếu có
      if (req.files && req.files.audio) {
        const audioFile = req.files.audio[0];
        const audioFileName = `${Date.now()}-${audioFile.originalname}`;
        const audioStorageRef = ref(storage, `audio/${audioFileName}`);

        const audioSnapshot = await uploadBytes(audioStorageRef, audioFile.buffer, {
          contentType: audioFile.mimetype,
        });
        req.body.audio_url = await getDownloadURL(audioSnapshot.ref);
      }

      // Xử lý tệp ảnh nếu có
      if (req.files && req.files.image) {
        const imageFile = req.files.image[0];
        const imageFileName = `${Date.now()}-${imageFile.originalname}`;
        const imageStorageRef = ref(storage, `images/${imageFileName}`);

        const imageSnapshot = await uploadBytes(imageStorageRef, imageFile.buffer, {
          contentType: imageFile.mimetype,
        });
        req.body.image_url = await getDownloadURL(imageSnapshot.ref);
        req.body.avata = await getDownloadURL(imageSnapshot.ref);
      }

      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra khi tải tệp lên Firebase'
      });
    }
  });
};

module.exports = uploadFilesMiddleware;