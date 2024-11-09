const routes = require('express').Router();
const Auth = require('../controllers/Auth.controllers');
const CheckPass = require('../middleware/CheckPassword');
const HashPass = require('../middleware/HashPass');
const checkUser = require('../middleware/CheckUser');
//register
routes.post('/register', HashPass, Auth.register);
//login
routes.post('/login', CheckPass, Auth.login);
//logout
routes.post('/logout/:id', checkUser.checkSelf, Auth.logout)
//new code
routes.post('/code/:id', checkUser.checkSelf, Auth.newCode);
//verify
routes.post('/verify/:id', checkUser.checkSelf, Auth.verify);
//refresh token
routes.post('/refresh/:id', checkUser.checkSelf, Auth.refresh);
//forget password
routes.post('/reset', Auth.forgetPassword);
//set new pass
routes.post('/newpass', checkUser.checkUserNoId, HashPass, Auth.resetpass);
module.exports = routes;