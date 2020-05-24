var express = require('express');
var router = express.Router();
var passport = require('passport');
var bcrypt = require('bcrypt');
var {
    v4: uuidv4
} = require('uuid');
var models = require('../models/');
var nodemailer = require('nodemailer');

async function sendRecoveryToken(emailAddress, recoveryToken) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'germaine.fritsch97@ethereal.email',
            pass: 'YnPmNnZu7C51RARtcb'
        }
    });

    let info = await transporter.sendMail({
        from: '"Germaine Fritsch" <germaine.fritsch97@ethereal.email>', // sender address
        to: emailAddress, // list of receivers
        subject: "Password Recovery - AMPSA GearTrak", // Subject line
        text: "doh. Here is your token: " + recoveryToken, // plain text body
        html: "<b>" + recoveryToken + "</b>" // html body
    });
}


/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/user');
  } else {
    res.render('index');
  }
});

/* GET logout page. */
router.get('/logout', function(req, res) {
  if (req.isAuthenticated()) {
    // remove remember token
    models.User.findByPk(req.user.id)
      .then((user) => {
        user.update( { rememberToken: null })
        .then( () => {
          req.logout();
          res.redirect('/');
      });
    }).catch((error) => {
      return done(error);
    });
  } else {
          res.redirect('/');
  }
});

/*
 * Complete Password Recovery
 */
router.get('/recovery/:rt', function(req, res, next) {
    res.render('recovery', {
        recoveryToken: req.params.rt
    });
});

router.post('/recovery', function(req, res) {
    if (req.body.npword1 != req.body.npword2) {
        req.flash('info', 'New passwords not identical.');
        req.session.cp = req.body;
        res.redirect('/recovery/' + req.body.recTok);
    } else {
        models.User.findOne({
            where: {
                recoveryToken: req.body.recTok
            }
        }).then((user) => {
            user.update({
                    password: bcrypt.hashSync(req.body.npword1, 10),
                    recoveryToken: null,
                    validated: true

                })
                .then(() => {
                    console.log('done the password change thing ****************************');
                    req.flash('info', 'password changed.');
                })
                .catch((error) => {
                    console.log('update error');
                    console.log(error);
                    req.flash('info', 'update failure');
                    req.flash('info', error);
                })
                .finally(() => {
                    console.log('update finally');
                });
        }).catch((error) => {
            console.log('findOne error:');
            console.log(error);
        }).finally(() => {
            console.log('findOne finally');
            res.redirect('/');
        });
    }
});

/*
 * Initiate Password Recovery
 */
router.get('/recover', function(req, res, next) {
    var pageData = {
        messages: req.flash('info')
    };
    res.render('recover', pageData);
});

router.post('/recover', function(req, res, next) {
    if (req.body.email == '') {
        req.flash('info', 'please supply your email address for password recovery');
        res.redirect('/recover');
    } else {
        models.User.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then((user) => {
                console.log(user.get());
                var rt = uuidv4();
                user.update({
                        recoveryToken: rt
                    })
                    .then(() => {
                        sendRecoveryToken(user.get().email, rt);
                    })
                    .catch((error) => {
                        req.flash('info', error);
                        res.redirect('/');
                    })
                    .finally(() => {
                        req.flash('info', 'Recovery token sent');
                        res.redirect('/');
                    });


            })
            .catch((error) => {
                req.flash('info', error);
                res.redirect('/');
            })
            .finally(() => {});
    }
});


/*
 * Change Password handler
 */
router.get('/changepassword', function(req, res, next) {
    if (req.isAuthenticated()) {
        var pageData = {
            isAuthenticated: req.isAuthenticated(),
            user: req.user
        };
        res.render('changepassword', pageData);
    } else {
        res.redirect('/');
    }
});

router.post('/changepassword', function(req, res) {
    if (req.isAuthenticated()) {
        console.log('req.user');
        console.log(req.user);
        console.log("req.user.password:" + req.body.opword);
        console.log("password1:" + req.body.npword1);
        console.log("password2:" + req.body.npword2);
        if (req.body.npword1 != req.body.npword2) {
            req.flash('info', 'New passwords not identical.');
            req.session.cp = req.body;
            res.redirect('/changepassword');
        } else if (!bcrypt.compareSync(req.body.opword, req.user.password)) {
            req.flash('info', 'Incorrect password provided');
            req.session.cp = req.body;
            res.redirect('/changepassword');
        } else {
            models.User.findByPk(req.user.id).then((user) => {
                user.update({
                    password: bcrypt.hashSync(req.body.npword1, 10)
                }).finally(() => {
                    console.log('done the password change thing ****************************');
                    req.flash('info', 'password changed.');
                    res.redirect('/');
                });
            });
        }
    }
});

/*
 * Login
 */
router.get('/login', function(req, res, next) {
    res.render('login', {
        title: 'LoginForm'
    })
});

router.post('/login',
    passport.authenticate('local', {
        //successRedirect: '/user',
        failureRedirect: '/login',
        //successFlash: 'Welcome!',
        failureFlash: 'Nope.'
    }),
    function(req,res,next) {
      if (!req.body.remember_me){ return next(); }
      var token=uuidv4();
        models.User.findByPk(req.user.id).then((user) => {
          user.update({
            rememberToken: token
          }).then(() => {
            res.cookie('remember_me',token,{path:'/',httpOnly:true,maxAge:604800000});
            console.log('remembering you....');
            return next();
          });
       });
    },
    function(req,res) {
      res.redirect('/user');
    }
);

/*
 * Register
 */
router.get('/register', function(req, res, next) {
    var pageData = {
        messages: req.flash('info'),
    };

    if (req.isAuthenticated()) {
        res.redirect('/');
    } else {
        res.render('register', pageData);
    }
});

router.post('/register',
    function(req, res) {
        if (req.isAuthenticated()) {
            res.redirect('/'); //possibly redirect to profile page?
        } else {
            var rt=uuidv4();
            models.User.create({
                    id: uuidv4(),
                    username: req.body.username,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: bcrypt.hashSync(uuidv4(), 10),
                    recoveryToken: rt
                })
                .then((user) => {
                        sendRecoveryToken(user.get().email, rt);
                        req.flash('info','please validate your email address and set your password');
                        res.redirect('/');
                })
                .catch((err) => {
                    console.log('register error');
                    console.log(err);
                })
                .finally(() => {
                    console.log('register finally');
                    res.redirect('/');
                });
        }
    }
);

module.exports = router;
