var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');

const methodOverride = require('method-override');

const bcrypt = require('bcrypt-nodejs');

// router 함수 등록 부분
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const boardRouter = require('./routes/board');
const mapRouter = require('./routes/map');
const newsRouter = require('./routes/news');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(flash());
app.use(methodOverride("_method"));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  key: 'sid', // session key
  secret: 'secret_webbased', // session 비밀 키
  resave: false, // session 저장 여부
  saveUninitialized: true, // session 저장 되기 전 uninitialized 상태로 저장
  cookie : { // 쿠키 설정
    maxAge: 24000 * 60 * 60
  }
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/board', boardRouter);
app.use('/map', mapRouter);
app.use('/news', newsRouter);


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
