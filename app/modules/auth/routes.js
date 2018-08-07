var express = require('express');
var loginRouter = express.Router();
var logoutRouter = express.Router();

var authMiddleware = require('./middlewares/auth');

loginRouter.route('/')
    .get(authMiddleware.noAuthed, (req, res) => {
        res.render('auth/views/login', req.query);
    })
    .post((req, res) => {
        var db = require('../../lib/database')();

        db.query(`SELECT * FROM tbluser WHERE usertype=1 && useremail="${req.body.userID}"`, (err, results, fields) => {
            if (err) throw err;
            if (results.length === 0) return res.redirect('/noAuth');

            var user = results[0];

            if (user.userpassword !== req.body.password) return res.redirect('/login?incorrect');
            delete user.password;
            
            req.session.user = user;

            return res.redirect('/');
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