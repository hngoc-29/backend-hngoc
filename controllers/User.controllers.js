const User = require('../models/User.models');
const Services = require('../services/Services');
const routesUser = {
  getSelf: async(req, res) => {
    try {
      const user = await Services.findById(User, req.params?.id, '-codetoken -password');
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy người dùng',
        });
      }
      res.status(200).json({
        success: true,
        message: 'Thành công',
        user,
      });
    } catch(err) {
      res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra',
      });
    };
  },
  getAllUser: async(req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const skip = (page - 1) * limit;
      const user = await User.find({}).select().skip(skip).limit(limit);
      const totalUsers = await User.countDocuments();
      res.status(200).json({
        success: true,
        message: 'Thành công',
        totalPages: Math.ceil(totalUsers / limit),
        limit,
        currentPage: page,
        user,
      });
    } catch(err) {
      res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra',
      });
    };
  },
  deleteUser: async(req, res) => {
    try {
      const id = req.params?.id;
      await Services.deleteOne(User, id);
      res.status(200).json({
        success: true,
        message: 'Xoá thành công',
      });
    } catch(err) {
      res.status(500).json({
        success: false,
        message: 'Đã xảy ra lỗi',
      });
    };
  },
  updateUser: async (req, res) => {
    try {
      const id = req.params?.id;
      const data = req.body;
      Services.update(User, id, data);
      res.status(200).json({
        success: true,
        message: 'Cập nhật thành công'
      });
    } catch(err) {
      res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra',
      });
    };
  },
  searchUser: async(req, res) => {
    try {
      const email = req.query?.email;
      if(!email) res.status(404).json({
        success: false,
        message: 'Chưa nhập email'
      });
      const user = await Services.findMany(User, {email: {
        $regex: email, $options: 'i'
      }}, '-codetoken -password');
      res.status(200).json({
        success: true,
        user,
      });
    } catch(err) {
      res.status(500).json({
        success: false,
        message: 'Tìm thất bại'
      });
    };
  },
}
module.exports = routesUser;