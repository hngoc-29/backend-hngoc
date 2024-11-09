const jwt = require('jsonwebtoken');
const create_access_token = (user) => jwt.sign(user, process.env.ACCESS_TOKEN, {
  expiresIn: '20m',
});

const create_refresh_token = (id) => jwt.sign({
  id
}, process.env.REFRESH_TOKEN, {
  expiresIn: '7d'
});

const create_reset_token = (user) => jwt.sign(user, process.env.RESET_TOKEN, {
  expiresIn: '15m'
});


module.exports = {
  create_access_token,
  create_refresh_token,
  create_reset_token,
}