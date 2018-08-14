var express = require('express');
var loginRouter = express.Router();
var logoutRouter = express.Router();

var authMiddleware = require('./middlewares/auth');

loginRouter.route('/')
    .get(authMiddleware.adminNoAuth, (req, res) => {
        res.render('auth/views/landing', req.query);
    })
    // .get(authMiddleware.trainerNoAuth, (req, res) => {
    //     res.render('auth/views/landing', req.query);
    // })
    // .get(authMiddleware.memberNoAuth, (req, res) => {
    //     res.render('auth/views/landing', req.query);
    // })
    // .get(authMiddleware.staffHasAuth, (req, res) => {
    //     res.render('auth/views/landing', req.query);
    // })
    .post((req, res) => {
        var db = require('../../lib/database')();

        db.query(`SELECT * FROM tbluser WHERE useremail="${req.body.userID}"`, (err, results, fields) => {
            if (err) throw err;
            if (results.length === 0) return res.redirect('/login?unauthorized');

            var user = results[0];

            if (user.userpassword !== req.body.password) return res.redirect('/login?incorrect');
            // delete user.password;
            
            // req.session.user = user;

            // return res.redirect('/');
            
            switch(user.usertype)
            {
                case 1: delete user.password;
                        req.session.user = user;
                        console.log(req.session);
                        return res.redirect('/');
                        break;
                case 2: delete user.password;
                        req.session.trainer = user;
                        console.log(req.session);
                        return res.redirect('/trainer');
                        break;
                case 3: delete user.password;
                        req.session.user = user;
                        console.log(req.session);
                        return res.redirect('/member');
                        break;
                case 4: delete user.password;
                        req.session.staff = user;
                        console.log(req.session);
                        return res.redirect('/staffs');
                        break;
            }

            // if (user.strPassword == req.body.password || user.strType == "admin") res.redirect('/login?incorrect');
            // delete user.password;
            
            // req.session.user = user;

            // return res.redirect('/admin');

        });
    });

logoutRouter.get('/', (req, res) => {
    req.session.destroy(err => {
        if (err) throw err;
        res.redirect('/login');
    });
});

exports.login = loginRouter;
exports.logout = logoutRouter;