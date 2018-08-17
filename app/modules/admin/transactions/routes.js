var express = require('express');
var router = express.Router();
var db = require('../../../../lib/database')();
var authMiddleware = require('../auth/middlewares/auth');
router.use(authMiddleware.hasAuth);


function logout(req, res){
    res.render('auth/views/login')
}
function m_branch(req, res){
    res.render('./m-branch')
}
function m_category(req, res){
    res.render('./m-category')
}
function m_classes(req, res){
    res.render('./m-class')
}
function m_discount(req, res){
    res.render('./m-discount')
}
function m_facility(req, res){
    res.render('./m-facility')
}
function m_general(req, res){
    res.render('./m-general')
}
function m_membership(req, res){
    res.render('./m-membership')
}
function m_program(req, res){
    res.render('./m-program')
}
function m_specialization(req, res){
    res.render('./m-specialization')
}
function m_staff(req, res){
    res.render('./m-staff')
}
function m_trainer(req, res){
    res.render('./m-trainer')
}

router.get('/', logout);
router.get('/branch', m_branch);
router.get('/category', m_category);
router.get('/class', m_classes);
router.get('/discount', m_discount);
router.get('/facility', m_facility);
router.get('/general', m_general);
router.get('//membership', m_membership);
router.get('/program', m_program);
router.get('/specialty', m_specialty);
router.get('/staff', m_staff);
router.get('/trainer', m_trainer);

exports.mainte = router;