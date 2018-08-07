var router = require('express').Router();

var authMiddleware = require('../auth/middlewares/auth');

router.use(authMiddleware.hasAuth);
router.use('/general', require('./general/routes'));

function dash(req,res){
    res.render('admin/general/views/dashboard');
}
router.get('/', dash, authMiddleware.hasAuth);

exports.dash = router;