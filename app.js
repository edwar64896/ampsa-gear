const { v4: uuidv4 } = require('uuid');
var createError = require('http-errors');
var express = require('express');
var session=require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var url = require('url');
var logger = require('morgan');
var passport = require('passport') , LocalStrategy = require('passport-local').Strategy;
var RememberMeStrategy = require('passport-remember-me-extended').Strategy;
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var https = require('https');
var fs=require('fs');
var flash = require('connect-flash');

var models = require('./models/');

passport.use(new LocalStrategy(
  function(uname, pwd, done) {
    models.User.findOne({where: { username: uname }}).then((user) => {
			console.log('here is user:');
			console.log(user);
			if (user === null) {
 	     return done(null, false, { message: 'Incorrect username.' });
			}
 	    if (!bcrypt.compareSync(pwd, user.password)) {
				console.log('password:'+pwd);
				console.log('usr.password:'+user.password);
 	     	return done(null, false, { message: 'Incorrect password.' });
 	    } else {
				console.log('ok');
				return done(null,user);
			}
		}).catch((msg) => {
			console.log(msg);
		});
}));

passport.use(new RememberMeStrategy(
  function (token,done) {
    models.User.findOne( {
      where: {rememberToken: token}
    }).then( (user) => {
      if (!user) { return done(null,false);}
      return done (null,user);
    }).catch( (error) => {
      return done(error);
    })
  },
  function (user,done) {
    var token = uuidv4();
    models.User.findByPk(user.id)
      .then((user) => {
        user.update( { rememberToken: token })
        .then( () => {
          return done(null,token);
      });
    }).catch((error) => {
      return done(error);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  models.User.findByPk(id).then((user) => {
    done(null, user.get());
  });
});

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var autocompleteRouter = require('./routes/autocomplete');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'dogs', resave: true, saveUninitialized: false,
									genid: (req) => {
										console.log('inside session middleware genid function');
										console.log(`Request object sessionID from client: ${req.sessionID}`);
										return uuidv4(); }}
                  ));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('remember-me'));
app.use(flash());

app.use( (req,res,next) => {
  console.log('---------------------');
  console.log('setting locals');
  res.locals.isAuthenticated = req.user ? true : false;
  res.locals.user = req.user;
  res.locals.info = req.flash('info');
  res.locals.errors = req.flash('errors');
  console.log(res.locals);
  console.log('---------------------');
  next();
})



app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/autocomplete', autocompleteRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
