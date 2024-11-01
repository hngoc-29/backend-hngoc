const routes = require('express').Router();
const uploadFile = require('../middleware/UploadFile');
const Sing = require('../controllers/Sing.controllers');
routes.get('/get/:parent', Sing.getSing);
routes.post('/create', uploadFile, Sing.create);
routes.delete('/delete/:id', Sing.deleteS);
routes.put('/update/:id', uploadFile, Sing.update);
module.exports = routes;