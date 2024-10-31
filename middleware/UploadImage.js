// middlewares/uploadImage.js
const { storage } = require('../config/Firebase');
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const multer = require('multer');

// Cấu hình multer để xử lý file từ trường 'image'
const upload = multer({ storage: multer.memoryStorage() }).single('file');

const uploadImageMiddleware = (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log(err)
      return res.status(500).json({
        success: false,
        message: 'Lưu file lỗi'
      });
    };
    // Kiểm tra nếu không có file
    if (!req.file) {
      return next(); // Không có file, tiếp tục xử lý các middleware sau
    }
    try {
      // Đặt tên file và tham chiếu đến Storage
      const fileName = `${Date.now()}-${req.file.originalname}`;
      const folderPath = 'image';
      const storageRef = ref(storage, folderPath+'/'+fileName);

      // Upload file lên Firebase Storage
      const snapshot = await uploadBytes(storageRef, req.file.buffer, {
        contentType: req.file.mimetype,
      });
      // Lấy URL nhúng của file
      const downloadURL = await getDownloadURL(snapshot.ref);
      // Gán URL cho req.body.avata (hoặc trường cần lưu)
      req.body.avata = downloadURL;
      req.body.image_url = downloadURL;
      // Tiếp tục đến controller
      next();
    } catch (error) {
      console.log(error)
      res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra'
      });
    };
  });
};

module.exports = uploadImageMiddleware;
