const routes = require('express').Router();
const uploadFile = require('../middleware/UploadFile');
const thumbnailRoute = require('../controllers/Thumbnail.controllers');
routes.post('/create', uploadFile,thumbnailRoute.create);
routes.get('/', thumbnailRoute.getAll);
routes.delete('/delete/:id', thumbnailRoute.deleteT);
routes.put('/update/:id', uploadFile,thumbnailRoute.update);
module.exports = routes;