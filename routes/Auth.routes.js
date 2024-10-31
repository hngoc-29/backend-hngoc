const routes = require('express').Router();
const Auth = require('../controllers/Auth.controllers');
const CheckPass = require('../middleware/CheckPassword');
const HashPass = require('../middleware/HashPass');
//register
routes.post('/register', HashPass, Auth.register);
//login
routes.post('/login', CheckPass, Auth.login);
//logout
routes.post('/logout/:id', Auth.logout)
//new code
routes.post('/code/:id', Auth.newCode);
//verify
routes.post('/verify/:id', Auth.verify);
//refresh token
routes.post('/refresh/:id', Auth.refresh);
module.exports = routes;