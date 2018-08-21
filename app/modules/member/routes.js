var router = require('express').Router();
var express = require('express');
var authMiddleware = require('../auth/middlewares/auth');
router.use(authMiddleware.memberHasAuth);

var indexController = require('./controllers/index');
router.get('/', indexController);

// ---------- F U N C T I O N S ---------- //

// LOGOUT
function logout(req, res){
    res.render('auth/views/landing');
}

//    FUNCTION
function dashboard(req, res){
    res.render('member/views/dashboard');
}
function profile(req, res){
    res.render('member/views/profile');
}
function pricing(req, res){
    res.render('member/views/pricing');
}
function classevents(req, res){
    res.render('member/views/classevents');
}
function announcements(req, res){
    res.render('member/views/announcements');
}


//    ROUTER
router.get('/', dashboard);
router.get('/dashboard', dashboard);
router.get('/profile', profile);
router.get('/pricing', pricing);
router.get('/classevents', classevents);
router.get('/announcements', announcements);
router.get('/logout', logout);

exports.member = router;