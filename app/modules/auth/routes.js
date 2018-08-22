var express = require('express');
var loginRouter = express.Router();
var logoutRouter = express.Router();
var SignupRouter = express.Router();
var db = require('../../lib/database')();
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');

var authMiddleware = require('./middlewares/auth');

var mailer = nodemailer.createTransport({
    service: 'gmail',
    port: 25,
    secure: true,
    auth:{
        user: 'ateamsupmanila@gmail.com',
        pass: 'ateammanila'
    },
    tls:{
        rejectUnauthorized:false
    }
});
mailer.use('compile', hbs({
    viewpath: '',
    extname:'.html'
}));



//view membership
function viewMembership(req, res, next){
  db.query('SELECT u.*, b.*, s.* from tblmemrates u inner join tblcat b ON u.memcat = b.membershipID JOIN tblmemclass s ON s.memclassid=u.memclass where b.status=1',function(err, results, fields){
    if(err) return res.send(err);
    req.viewMembership = results;
    return next();
  })
}

//view membership classes
function viewHie(req, res, next){
  db.query('SELECT * FROM tblmemclass WHERE status=1',function(err, results, fields){
    if(err) return res.send(err);
    req.viewHie = results;
    return next();
  })
}

//view category
/*function viewCategory(req, res, next){
  db.query('SELECT * FROM tblcat WHERE status=1',function(err, results, fields){
    if(err) return res.send(err);
    req.viewCategory = results;
    return next();
  })
}*/

//view special
function viewSpecial(req, res, next){
  db.query('SELECT * FROM tblspecial WHERE status=1',function(err, results, fields){
    if(err) return res.send(err);
    req.viewSpecial = results;
    return next();
  })
}

//view branch
function viewBranch(req, res, next){
  db.query('SELECT u.*, b.* from tbluser u join tblbranch b ON u.userid = b.user where u.usertype = 4  ',function(err, results, fields){
      console.log(results)
      if(err) return res.send(err);
      req.viewBranch = results;
      return next();
    })
}


loginRouter.route('/')
    .get(authMiddleware.adminNoAuth,viewSpecial,viewBranch, viewHie,viewMembership, (req, res) => {
        res.render('auth/views/landing', {drop: req.viewHie, specs: req.viewSpecial, bras: req.viewBranch, cats:req.viewMembership});
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

        db.query(`SELECT * FROM tbluser WHERE useremail="${req.body.userID}" OR userusername="${req.body.userID}"`, (err, results, fields) => {
            if (err) throw err;
            if (results.length === 0) return res.redirect('/login?henlo');

            var user = results[0];

            if (user.userpassword !== req.body.password) return res.redirect('/login?incorrect');
            // delete user.password;
            
            // req.session.user = user;

            // return res.redirect('/');
            
            // switch(user.usertype)
            // {
            //     case 1: delete user.password;
            //             req.session.user = user;
            //             console.log(req.session);
            //             return res.redirect('/');
            //             break;
            //     case 2: delete user.password;
            //             req.session.trainer = user;
            //             console.log(req.session);
            //             return res.redirect('/trainer');
            //             break;
            //     case 3: delete user.password;
            //             req.session.user = user;
            //             console.log(req.session);
            //             return res.redirect('/member');
            //             break;
            //     case 4: delete user.password;
            //             req.session.staff = user;
            //             console.log(req.session);
            //             return res.redirect('/staffs');
            //             break;
            // }
            if (user.usertype == 1)
            {
                delete user.password;
                req.session.user = user;
                console.log(req.session);
                return res.redirect('/');
            }
                else if (user.usertype == 2)
                {
                    delete user.password;
                    req.session.trainer = user;
                    console.log(req.session);
                    return res.redirect('/trainer');
                }
                    else if (user.usertype == 3)
                    {
                        delete user.password;
                        req.session.member = user;
                        console.log(req.session);
                        return res.redirect('/member');
                    }
                        else if (user.usertype == 4)
                        {
                            delete user.password;
                            req.session.staff = user;
                            console.log(req.session);
                            return res.redirect('/staffs');
                        }


            // if (user.strPassword == req.body.password || user.strType == "admin") res.redirect('/login?incorrect');
            // delete user.password;
            
            // req.session.user = user;

            // return res.redirect('/admin');

        });
    });


function codegen() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvqxyz1234567890";
    for (var i = 0; i < 7; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
    }


SignupRouter.route('/')
    .get(authMiddleware.noAuthed, (req, res) => {
        res.render('auth/views/landing', req.query);
    })
    .post((req, res) => {
        var db = require('../../lib/database')();
            var autogen= codegen();
            fullname =(req.body.fname +" "+ req.body.lname);
            code = autogen;
                db.query("INSERT INTO tbluser (userfname, userlname, usergender, userbday, useraddress, usermobile, useremail, userusername, memrateid, branch, specialization, usertype,paymentcode ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 8, ? ) ",
                    [ req.body.fname, req.body.lname, req.body.gen, req.body.bday, req.body.addr, req.body.mobile, req.body.email, req.body.username, req.body.membership, req.body.branch, req.body.specs, autogen], (err, results, fields)=>{
                    if (err) console.log(err);
                        else{
                            mailer.sendMail({
                                from: 'ateamsupmanila@gmail.com',
                                to:req.body.email,
                                subject:'Payment Code ',
                                html:
                                    "<center>"+
                                    "<h2 style='background-color:#ffbb00; width:50%; font-size:28px; padding:5px;'> A-TEAM FITNESS CENTER </h2> </center>"+ "<hr>"+
                                    "<p> Greetings, " +fullname+ ", your payment code is: "+
                                    "<b style='font-size:15px; background:#5FAEE3; width:30%; padding:5px;'>" +code+ "</b></p>"+
                                    "<p> Please pay the amount to activate your account. Thanks </p>",
                                template: 'send', //name ng html file na irerender
                                },
                                function(err, response){
                                    if(err){
                                        console.log("Payment code NOT sent!");
                                        console.log(err);
                                    }
                                    else{
                                        console.log("Payment code sent!");
                                        }
                                    }
                                );
                            res.redirect('/login');
                            }
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
exports.Signup = SignupRouter