const User = require('../models/User.models');
const Services = require('../services/Services');
const CheckPassword = async(req, res, next) => {
  try {
    const password = req.body?.passIn;
    const id = req.params?.id;
    const email = req.body?.email;
    if (!password) {
      return res.status(404).json({
        success: false,
        message: 'Chưa nhập mật khẩu'
      });
    };
    if (id){
      var user = await Services.findById(User, id);
    } else if (email) {
        var user = await Services.findOne(User, {
      email
    }, '-code -refresh');
      };
      if(!user) return res.status(404).json({
      success: false,
      message: 'Không tìm thấy người dùng'
    });
    const result = await Services.checkPass(password, user?.password);
    if (!result) return res.status(401).json({
      success: false,
      message: 'Thông tin sai',
    });
    next();
  } catch(err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: 'Có lỗi xảy ra'
    });
  };
};

module.exports = CheckPassword;