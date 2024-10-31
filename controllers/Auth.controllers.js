const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Services = require('../services/Services');
const User = require('../models/User.models');
const {
  setRefreshTokenCookie,
  clearCookie,
} = require('../JwtAndCookie/Cookie');
const {
  create_access_token,
  create_refresh_token
} = require('../JwtAndCookie/Jwt');
const sendMail = require('../config/Nodemailer.config');
const routesAuth = {
  //register
  register: async(req, res) => {
    try {
      const data = req.body;
      const resService = await Services.Create(User, data);
      res.status(200).json({
        success: true,
        message: 'Đăng kí thành công',
      });
    } catch(err) {
      if(err.code === 11000) return res.status(400).json({
        success: false,
        message: 'Email hoặc tên người dùng đã tồn tại',
      });
      res.status(500).json({
        success: false,
        message: 'Đăng kí thất bại',
      });
    };
  },
  //login
  login: async(req, res) => {
    try {
      const user = await Services.findOne(User, {
        email: req.body?.email
      }, '-code -refresh -password');
      const access_token = create_access_token({...user._doc});
      const refresh_token = create_refresh_token(user.id);
      await Services.update(User, user.id, {
        refresh: refresh_token
      })
      setRefreshTokenCookie(res, refresh_token);
      res.status(200).json({
        success: true,
        message: 'Đăng nhập thành công',
        access_token,
        user,
      });
    } catch(err) {
      res.status(500).json({
        success: false,
        message: 'Đăng nhập thất bại'
      });
    }
  },
  //new code verify
  newCode: async(req, res) => {
    try {
      const user = await Services.findById(User, req.params?.id);
      if (!user?.code) return res.status(401).json({
        success: false,
        message: 'Tài khoản đã xác minh'
      });
      const code_verify = Math.floor(Math.random()*1000000);
      await Services.update(User, req.params?.id, {
        code: code_verify
      });
      sendMail(user.email, code_verify);
      return res.status(200).json({
        success: true,
        message: 'Gửi mã thành công',
      })
    } catch(err) {
      res.status(500).json({
        success: false,
        message: 'Gửi mã thất bại',
      })
    }
  },
  //logout
  logout: async(req, res) => {
    try {
      const id = req?.params?.id;
      Services.update(User, id, {
        refresh: ''
      });
      clearCookie(res);
      res.status(200).json({
        success: true,
        message: 'Đăng xuất thành công',
      });
    } catch(err) {
      res.status(500).json('Đăng xuất thất bại');
    };
  },
  //verify
  verify: async(req, res) => {
    try {
      const id = req.params?.id;
      const _code = req.body?.code;
      const user = await Services.findById(User, id, '-password');
      if (_code != user.code) {
        return res.status(500).json({
          success: false,
          message: 'Mã xác minh không chính xác'
        });
      };
      await Services.update(User, id, {
        code: null,
        verify: true
      });
      res.status(200).json({
        success: true,
        message: 'Xác minh thành công',
      });
    } catch(err) {
      res.status(500).json({
        success: false,
        message: 'Xác minh thất bại',
      });
    };
  },
  //refresh token
  refresh: async(req, res) => {
    try {
      const id = req.params?.id;
      const user = await Services.findById(User, id, '-code -refresh -password');
      if (!user) return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng'
      });
      const access_token = create_access_token( {
        ...user._doc
      });
      const refresh_token = create_refresh_token(id);
      await Services.update(User, id, {
        refresh: refresh_token
      });
      setRefreshTokenCookie(res, refresh_token);
      res.status(200).json({
        success: true,
        message: 'Refresh thành công',
        access_token,
      });
    } catch(err) {
      res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra',
      });
    };
  },
}
module.exports = routesAuth;