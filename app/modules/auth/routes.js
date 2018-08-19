var express = require('express');
var loginRouter = express.Router();
var logoutRouter = express.Router();
var db = require('../../lib/database')();
// var nodemailer = require('nodemailer');

var authMiddleware = require('./middlewares/auth');

//view membership
function dropMem(req, res, next){
  db.query('SELECT u.*, b.* from tblmemrates u join tblcat b ON u.memcat = b.membershipID where b.status=1',function(err, results, fields){
    if(err) return res.send(err);
    req.dropMem = results;
    return next();
  })
}
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
    .get(authMiddleware.adminNoAuth,viewSpecial,viewBranch, dropMem, (req, res) => {
        res.render('auth/views/landing', {drop: req.dropMem, specs: req.viewSpecial, bras: req.viewBranch});
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


/*function codegen() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvqxyz1234567890";
    for (var i = 0; i < 7; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
    }

signupRouter.route('/')
    .get(authMiddleware.noAuthed, (req, res) => {
        res.render('auth/views/landing', req.query);
    })
    .post((req, res) => {
        var db = require('../../lib/database')();
            var autogen= codegen();
            fullname =(req.body.fname +" "+ req.body.lname);
            TIN = (req.body.tin1 +'-'+ req.body.tin2 +'-'+ req.body.tin3 +'-'+ req.body.tin4)
                if(TIN == "undefined-undefined-undefined-undefined"){
                    TIN = "null";
                }
            code = autogen;
                db.query("INSERT INTO tbluser ( intUID, strName, strEmail, strAddress, intContact, strPassword, strUserType, boolStatus, strStatus, strCompanyName, strUserTIN) VALUES ( ?, ?, ?, ?, ?, ?, 'user', 1, 'New', ?, ?) ",
                    [ UID, fullname, req.body.email, req.body.address, req.body.number, code, req.body.comp, TIN], (err, results, fields)=>{
                    if (err) console.log(err);
                        else{
                            mailer.sendMail({
                                from: 'amacortrading123@gmail.com',
                                to: req.body.email,
                                subject: 'User Password',
                                html:
                                    "<center>"+
                                    "<h2 style='background-color:#0095DD; width:50%; font-size:28px; padding:5px;'> AMACOR TRADING INTERNATIONAL </h2> </center>"+ "<hr>"+
                                    "<p>Good Day " +fullname+ ", your user password is "+
                                    "<b style='font-size:15px; background:#5FAEE3; width:30%; padding:5px;'>" +code+ "</b></p>"+
                                    "<p> You may change your password in your dashboard account </p>",
                                template: 'send', //name ng html file na irerender
                                },
                                function(err, response){
                                    if(err){
                                        console.log("Bad email");
                                        console.log(err);
                                    }
                                    else{
                                        console.log("passcode sent");
                                        }
                                    }
                                );
                            res.redirect('/signup?success');
                            }
                    });
        });*/

logoutRouter.get('/', (req, res) => {
    req.session.destroy(err => {
        if (err) throw err;
        res.redirect('/login');
    });
});

exports.login = loginRouter;
exports.logout = logoutRouter;