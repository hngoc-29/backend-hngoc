const CheckPass = require('../middleware/CheckPassword');
const HashPass = require('../middleware/HashPass');
const UploadImage = require('../middleware/UploadImage');
const routes = require('express').Router();
const User = require('../controllers/User.controllers');
routes.post('/info/:id', User.getSelf);
routes.get('/', User.getAllUser);
routes.delete('/delete/:id', User.deleteUser);
routes.put('/update/:id', UploadImage, User.updateUser);
routes.put('/update-password/:id', CheckPass, HashPass,User.updateUser);
routes.get('/search', User.searchUser);
module.exports = routes;