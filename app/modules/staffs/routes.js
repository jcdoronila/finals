var router = require('express').Router();
var authMiddleware = require('../auth/middlewares/auth');
router.use(authMiddleware.staffHasAuth);

//LOGOUT
function logout(req, res){
    res.render('auth/views/landing');
}

// GENERAL
function s_dash(req,res){
    res.render('staffs/general/views/dashboard');
}
function s_reports(req,res){
    res.render('staffs/general/views/reports');
}
function s_user(req,res){
    res.render('staffs/general/views/user');
}
function s_utils(req,res){
    res.render('staffs/general/views/utils');
}
// TRANSACTIONS

function s_classes(req,res){
    res.render('staffs/transactions/views/t-classes');
}
function s_event(req,res){
    res.render('staffs/transactions/views/t-event');
}

function s_freezed(req,res){
    res.render('staff/transactions/views/t-freezed');
}

function s_payment(req,res){
    res.render('staffs/transactions/views/t-payment');
}

function s_pending(req,res){
    res.render('staffs/transactions/views/t-pending');
}

function s_personal(req,res){
    res.render('staffs/transactions/views/t-personal');
}

function s_regular(req,res){
    res.render('staffs/transactions/views/t-regular');
}

// ROUTERS

router.get('/', s_dash);
router.get('/staffs', s_dash);
router.get('/staffs/reports', s_reports);
router.get('/staffs/user', s_user);
router.get('/staffs/utils', s_utils);


router.get('/staffs/classes', s_classes);
router.get('/staffs/event', s_event);
router.get('/staffs/freezed', s_freezed);
router.get('/staffs/payment', s_payment);
router.get('/staffs/pending', s_pending);
router.get('/staffs/personal', s_personal);
router.get('/staffs/regular', s_regular);

exports.staffs = router;