const jwt = require('jsonwebtoken');
const User = require('../models/User.models');
const Services = require('../services/Services');
require('dotenv').config();
const getToken = (bearer_token, secret) => {
  const token = bearer_token.slice(7);
  try {
    const decode = jwt.verify(token, secret);
    return decode;
  } catch(err) {
    return 'Jwt Wrong'
  };
  return token;
};
const CheckUser = {
  checkSelf: async(req, res, next) => {
    const bearer_token = req.headers.authorization;
    if (!bearer_token) return res.status(401).json({
      success: false,
      message: 'Bạn không có quyền thực hiện hành động này'
    });
    const decode = getToken(bearer_token, process.env.ACCESS_TOKEN);
    const id = req.params.id;
    if (decode == 'Jwt Wrong' || !decode._id) return res.status(401).json({
      success: false,
      message: 'Bạn không có quyền thực hiện hành động này'
    });
    const user = await Services.findById(User, decode._id);
    if (!user) return res.status(401).json({
      success: false,
      message: 'Không tìm thấy người dùng'
    });
    if (user.role == 'Admin') {
      req.user = user;
      return next();
    }
    if (id && id != decode._id) return res.status(401).json({
      success: false,
      message: 'Không tìm thấy người dùng'
    });
    req.user = user;
    next();
  },
  checkUserNoId: async(req, res, next) => {
    const bearer_token = req.headers.authorization;
    if (!bearer_token) return res.status(401).json({
      success: false,
      message: 'Bạn không có quyền thực hiện hành động này'
    });
    const decode = getToken(bearer_token, process.env.RESET_TOKEN);
    const id = req.params.id;
    if (decode == 'Jwt Wrong' || !decode._id) return res.status(401).json({
      success: false,
      message: 'Bạn không có quyền thực hiện hành động này'
    });
    const user = await Services.findById(User, decode._id);
    if (!user) return res.status(401).json({
      success: false,
      message: 'Không tìm thấy người dùng'
    });
    req.user = user;
    next();
  },
  checkAdmin: async(req, res, next) => {
    const role = req?.user?.role;
    if (role != 'Admin') return res.status(401).json({
      success: false,
      message: 'Bạn không có quyền thực hiện hành động này'
    });
    next();
  },
  checkVerify: async(req, res, next) => {
    const user = req.user;
    if (!user.verify) return res.status(401).json({
      success: false,
      noVerify: true,
      message: 'Tài khoản chưa được xác minh'
    });
    next();
  },
}
module.exports = CheckUser;