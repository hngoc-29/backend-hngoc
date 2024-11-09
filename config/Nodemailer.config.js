const nodemailer = require('nodemailer');
require('dotenv').config();
// Thiết lập transporter

const sendMail = (email, code, type) => {
  let message,
  title;
  if (type === 'verify') {
    title = 'Xác minh email của bạn'
    message = `<p>
    Để xác minh email của bạn, vui lòng nhập mã bên dưới vào mục mã xác minh, mã xác minh chỉ có hiệu lực trong 15 phút.
    </p>
    <div style='height: 200px; position: relative; display: flex; justify-content: center;'>
    <span style='font-size: 40px;font-weight: 500;letter-spacing: 0.5em; margin-top:50px'>${code}</span>
    <div style='position: absolute; bottom: 0; width: 100%; height: 2px; background-color: gray;'></div>
    </div>`;
  } else {
    title = 'Thay đổ mật khẩu'
    message = `
    <p>
    Nhấn vào nút bên dưới để đổi mật khẩu.
    </p>
    <div style='height: 200px; position: relative; display: flex; justify-content: center;'>
    <div style='margin-top: 15px; text-align: center;'>
    <a style='text-decoration: none; color: white; background-color: green; padding: 10px 20px; border-radius: 5px;' href='${process.env.DOMAIN_FRONTEND}/resetpassword?${code}'>Nhấn vào đây</a>
    </div>
    </div>
    <p>
    Cảm ơn bạn đã trở thành người dùng quan trọng của chúng tôi.
    </p>
    `
  }
  const formMail = `
  <div style='margin: 0 15px;'>
  <div>
  <h1>${title}</h1>
  <div style='text-align: center;'>
  <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhz055DVg2I6bmtE3Z85Kgx8xF5Va5Vee-0A&s' alt='vite' style='width: 80px; padding: 20px;'>
  </div>
  ${message}
  <p>
  Cảm ơn bạn đã trở thành người dùng quan trọng của chúng tôi.
  </p>
  </div>
  </div>
  `
  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.NODE_PORT,
    secure: true,
    service: 'gmail',
    auth: {
      user: process.env.GMAIL,
      pass: process.env.PASSWORD
    }
  });
  const mailOptions = {
    from: '"HNgoc Website" hngocverifyemail@gmail.com',
    to: email,
    subject: 'Xác minh email',
    html: formMail,
  };
  transporter.sendMail(mailOptions);
}
module.exports = sendMail;