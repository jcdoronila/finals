var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
router.use(authMiddleware.hasAuth);


function logout(req, res){
    res.render('auth/views/login');
}
function dashboard(req, res){
    res.render('views/dashboard');
}
function reports(req, res){
    res.render('views/reports');
}
function users(req, res){
    res.render('views/user');
}
function utils(req, res){
    res.render('views/utils');
}

router.get('/', logout);
router.get('/program', dashboard);
router.get('/specialty', reports);
router.get('/staff', users);
router.get('/trainer', utils);

module.exports = router;