var router = require('express').Router();
var db = require('../../lib/database')();
var express = require('express');
var authMiddleware = require('../auth/middlewares/auth');
router.use(authMiddleware.memberHasAuth);

var indexController = require('./controllers/index');
router.get('/dashboard', indexController);

//view profile
function viewProf(req, res, next){
db.query('SELECT * FROM tbluser WHERE tbluser.usertype = 2 AND userid = ?', [req.session.member.userid], function(err,results,fields) {
    if(err) return res.send(err);
    req.viewProf = results;
    return next();
  })
}















// ---------- F U N C T I O N S ---------- //

/*// LOGOUT
function logout(req, res){
    res.render('auth/views/landing');
}*/

//    FUNCTION
function dashboard(req, res,next){
    res.render('member/views/dashboard',{profs: req.viewProf});
    return next();
}
function profile(req, res,next){
    res.render('member/views/profile',{profs: req.viewProf})
    return next();
}
function pricing(req, res,next){
    res.render('member/views/pricing',{profs: req.viewProf});
}
function eventss(req, res,next){
    res.render('member/views/events',{profs: req.viewProf});
    return next();
}
function classes(req, res,next){
    res.render('member/views/classes',{profs: req.viewProf});
    return next();
}
function announcements(req, res,next){
    res.render('member/views/announcements',{profs: req.viewProf});
    return next();
}
function trainer(req, res,next){
    res.render('member/views/trainer',{profs: req.viewProf});
    return next();
}

//    ROUTER
router.get('/',viewProf, dashboard);
router.get('/profile',viewProf, profile);
/*router.get('/pricing',viewProf, pricing);*/
router.get('/classes',viewProf, classes);
router.get('/events',viewProf, eventss);
router.get('/announcements',viewProf, announcements);
router.get('/trainer',viewProf, trainer);
/*router.get('/logout', logout);
*/
exports.member = router;