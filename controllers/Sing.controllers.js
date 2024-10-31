const Services = require('../services/Services');
const Sing = require('../models/Sing.models');
const Thumbnail = require('../models/Thumbnail.models');
const singRoute = {
  getSing: async(req, res) => {
    try{
      const parent = req.params?.parent;
      const sings = await Services.findMany(Sing, {parent: parent});
      res.status(200).json({
        success: true,
        Sings: sings
      });
    } catch(err) {
      console.log(err)
      res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra'
      });
    };
  },
  create: async(req, res) => {
    try{
    const data = req.body;
    const parent = req.body?.parent;
    await Services.Create(Sing, data);
    await Services.update(Thumbnail, parent, { $inc: { quantity: +1 }});
      res.status(200).json({
        success: true,
        message: 'Tạo thành công'
      });
    } catch(err) {
      console.log(err)
      res.status(500).json({
        success: false,
        message: 'Tạo thất bại'
      });
    };
  },
  deleteS: async(req, res) => {
    try {
      const id = req.params?.id;
      const sing = await Services.findById(Sing, id);
      if(!sing || !sing.parent) return res.status(404).json({
        success: false,
        message: 'Không tìm thấy bài hát'
      });
      const parent = sing.parent;
      await Services.deleteOne(Sing, id);
      await Services.update(Thumbnail, parent, { $inc: { quantity: -1 }});
      res.status(200).json({
        success: true,
        message: 'Xoá thành công',
      });
    } catch(err) {
      console.log(err)
      res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra'
      });
    };
  },
};
module.exports = singRoute;