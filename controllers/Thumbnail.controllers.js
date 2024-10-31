const Services = require('../services/Services');
const Thumbnail = require('../models/Thumbnail.models');
const Thumbnails = {
  create: async(req, res) => {
    try{
    const data = req.body;
    await Services.Create(Thumbnail, data);
    res.status(200).json({
        success: true,
        message: 'Tạo thành công',
      });
    } catch(err) {
      console.log(err)
      res.status(500).json({
        success: true,
        message: 'Có lỗi xảy ra',
      });
    };
  },
  deleteT: async(req, res) => {
    try {
      const id = req.params?.id;
      await Services.deleteOne(Thumbnail, id);
      res.status(200).json({
        success: true,
        message: 'Xoá thành công',
      });
    } catch(err) {
      console.log(err)
      res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra',
      });
    };
  },
  getAll: async(req, res) => {
    try{
      const thumbnail = await Services.findAll(Thumbnail);
      res.status(200).json({
        success: true,
        message: 'Thành công',
        Thumbnails: thumbnail
      });
    } catch(err) {
      console.log(err)
      res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra',
      });
    };
  },
  update: async(req, res) => {
    try{
      const id = req.params?.id;
      const data = req.body;
      await Services.update(Thumbnail, id, data);
      res.status(200).json({
        success: true,
        message: 'Cập nhật thành công',
      });
    } catch(err) {
      console.log(err)
      res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra',
      });
    };
  },
};
module.exports = Thumbnails;