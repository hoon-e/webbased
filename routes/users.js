var express = require('express');
const mysql = require('mysql');
var router = express.Router();
const crypto = require('crypto');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",

  database: "criminal"
});

connection.connect();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.cookies){
    console.log(req.cookies);
  }
  res.send('웰캄');
});

// 회원가입 post
router.post('/join', function(req, res, next){

  let session = req.session;
  
  var body = req.body;

  let pass = body.password;

  let salt = "webbased"+ Math.round(Math.random()*1000);

  let hashPassword = crypto.createHash("sha512").update(pass+salt).digest("base64");

  connection.query("SELECT * FROM user WHERE id=?", body.id, function(err, data){
    if(data.length == 0){
      connection.query("INSERT INTO user (id, password, name, age, salt) VALUES (?, ?, ?, ?, ?)", [body.id, hashPassword, body.name, body.age, salt], function(err, result, fields){
        if(err){
          console.log('쿼리문에 오류가 있습니다.');
          res.redirect('/users/join');
        }
        else{
          res.redirect('/users/login');
        }
      });
    }else{
      var error_message = "중복되는 아이디가 있습니다.";
      res.render('users/join', {error: error_message});
    }
  });

  
});

// 회원가입 get
router.get('/join', function(req, res, next){
  var error_message = "없음!"
  res.render('users/join', {error: error_message});
});

// 로그인 get
router.get('/login', function(req, res, next){
  let session = req.session;
  var error_message = "없음";

  res.render('users/login', {
    session : session, error: error_message
  });
});

// 로그인 후 메인 화면 get
router.get('/login_main', function(req, res, next){
  let session = req.session;

  res.render('users/login_main', {session : session});
});

// 로그인 post
router.post('/login', function(req,res,next){
  let session = req.session;

  let body = req.body;

  connection.query("SELECT * FROM user WHERE id=?", body.id, function(err, result, fields){
    try{
      console.log(result[0]);

      let dbPassword = result[0].password;
      let inputPassword = body.password;
      let salt = result[0].salt;
      
      let hashPassword = crypto.createHash('sha512').update(inputPassword+salt).digest("base64");

      if(dbPassword == hashPassword){
        console.log('비밀번호 일치');

        req.session.user_id = body.id;
        res.render('map/index', {session: session});
      }
      else{
        console.log('비밀번호 불일치');
        var error_message = "비밀번호가 일치하지않습니다.";
        res.render('users/login', {session: session, error: error_message});
    }
    }catch(err){
      var error_message = "아이디가 존재하지 않습니다.";
      res.render('users/login', {session: session, error: error_message});
    }
  });
});

router.get('/logout', function(req,res,next){
  req.session.destroy();
  res.clearCookie('sid');

  res.redirect('/users/login');
});

module.exports = router;
