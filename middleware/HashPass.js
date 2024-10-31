const bcrypt = require('bcryptjs');
const HashPass = async(req, res, next) => {
  try {
    const password = req.body?.password;
    if (!password) {
      return res.status(404).json({
        success: false,
        message: 'Chưa nhập mật khẩu'
      });
    };
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    req.body.password = hash;
    next();
  } catch(err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: 'Có lỗi xảy ra'
    });
  };
}
module.exports = HashPass;