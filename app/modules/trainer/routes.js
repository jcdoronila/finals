var router = require('express').Router();
var express = require('express');
var authMiddleware = require('../auth/middlewares/auth');
router.use(authMiddleware.trainerHasAuth);

var indexController = require('./controllers/index');
router.get('/', indexController);

// ---------- F U N C T I O N S ---------- //

// LOGOUT
function logout(req, res){
    res.render('auth/views/landing');
}

// SUB-MODULE-NAME FUNCTION
/*
    Bale functions muna bago mag router. Sa function, ganito format:

    function function_name(req, res){
        res.render('trainer/views/example');  //yung example di na need ng .pug extention
    }
*/
function t_dash(req, res){
    res.render('trainer/views/dashboard');
}

// ---------- R O U T E R S ---------- //

// SUB-MODULE NAME ROUTER
/*
    Sa router naman ganito format:

    router.get('/urllink', function_name);
*/
router.get('/', t_dash);
exports.trainer = router;