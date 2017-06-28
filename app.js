var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var index = require('./routes/index');
var user = require('./routes/user');
var auth = require('./auth/index')

var authMiddleware = require('./auth/middleware.js')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

app.use(authMiddleware.checkTokenSetUser);

app.use('/auth', auth)
app.use('/', index);
app.use('/user', authMiddleware.ensureLoggedIn, user);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || res.statusCode || 500);
;

  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  })
});

module.exports = app;
