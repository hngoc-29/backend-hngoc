const routes = require('express').Router();
const Sing = require('../controllers/Sing.controllers');
routes.get('/get/:parent', Sing.getSing);
routes.post('/create', Sing.create);
routes.delete('/delete/:id', Sing.deleteS);

module.exports = routes;