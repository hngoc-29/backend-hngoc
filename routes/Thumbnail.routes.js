const routes = require('express').Router();
const UploadImage = require('../middleware/UploadImage');
const thumbnailRoute = require('../controllers/Thumbnail.controllers');
routes.post('/create', UploadImage,thumbnailRoute.create);
routes.get('/', thumbnailRoute.getAll);
routes.delete('/delete/:id', thumbnailRoute.deleteT);
routes.put('/update/:id', UploadImage,thumbnailRoute.update);
module.exports = routes;