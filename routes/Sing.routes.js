const routes = require('express').Router();
const uploadFile = require('../middleware/UploadFile');
const Sing = require('../controllers/Sing.controllers');
const checkUser = require('../middleware/CheckUser');
//get sing
routes.get('/sing/:id', checkUser.checkSelf, checkUser.checkVerify, Sing.getSing);
//get sing theo id parent
routes.get('/get/:parent', checkUser.checkSelf, checkUser.checkVerify, Sing.getManySing);
//tao sing
routes.post('/create', checkUser.checkSelf, checkUser.checkAdmin, uploadFile, Sing.create);
//xoa nhac
routes.delete('/delete/:id', checkUser.checkSelf, checkUser.checkAdmin, Sing.deleteS);
//sua nhac
routes.put('/update/:id', checkUser.checkSelf, checkUser.checkAdmin, uploadFile, Sing.update);
module.exports = routes;