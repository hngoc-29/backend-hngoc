const routes = require('express').Router();
const uploadFile = require('../middleware/UploadFile');
const thumbnailRoute = require('../controllers/Thumbnail.controllers');
const checkUser = require('../middleware/CheckUser');
//tao Thumbnail
routes.post('/create', checkUser.checkSelf, checkUser.checkAdmin, uploadFile, thumbnailRoute.create);
//get all Thumbnail
routes.get('/', checkUser.checkSelf, thumbnailRoute.getAll);
//delete Thumbnail
routes.delete('/delete/:id', checkUser.checkSelf, checkUser.checkAdmin, thumbnailRoute.deleteT);
//update Thumbnail
routes.put('/update/:id', checkUser.checkSelf, checkUser.checkAdmin, uploadFile, thumbnailRoute.update);
module.exports = routes;