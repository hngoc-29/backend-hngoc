const CheckPass = require('../middleware/CheckPassword');
const HashPass = require('../middleware/HashPass');
const uploadFile = require('../middleware/UploadFile');
const checkUser = require('../middleware/CheckUser');
const routes = require('express').Router();
const User = require('../controllers/User.controllers');
//get info
routes.post('/info/:id', checkUser.checkSelf, User.getSelf);
//get all user
routes.get('/', checkUser.checkSelf, checkUser.checkAdmin, User.getAllUser);
//xoa nguoi dung
routes.delete('/delete/:id', checkUser.checkSelf, User.deleteUser);
//update thong tin
routes.put('/update/:id', checkUser.checkSelf, uploadFile, User.updateUser);
//update mat khau
routes.put('/update-password/:id', checkUser.checkSelf ,CheckPass, HashPass,User.updateUser);
//tim nguoi dung
routes.get('/search', User.searchUser);
module.exports = routes;