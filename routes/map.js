var express = require('express');
const mysql = require('mysql');
var router = express.Router();

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",

  database: "criminal",
  multipleStatements: true
});

router.get('/', function(req, res, next){

    let session = req.session;

    res.render('map/index', {session: session});
});

router.get('/show/:province', function(req, res, next){

    let session = req.session;
    let province = req.params.province;
    let crime_province;

    switch(province){
      case "gyeonggi":
        crime_province = "경기";
        break;
      case "seoul":
        crime_province = "서울";
        break;
      case "gangwon":
        crime_province = "강원";
        break;
      case "incheon":
        crime_province = "인천";
        break;
      case "chungnam":
        crime_province = "충남";
        break;
      case "chungbuk":
        crime_province = "충북";
        break;
      case "daejeon":
        crime_province = "대전";
        break;
      case "sejong":
        crime_province = "세종";
        break;
      case "jeonbuk":
        crime_province = "전북";
        break;
      case "jeonnam":
        crime_province = "전남";
        break;
      case "gwangju":
        crime_province = "광주";
        break;
      case "gyeongbuk":
        crime_province = "경북";
        break;
      case "gyeongnam":
        crime_province = "경남";
        break;
      case "ulsan":
        crime_province = "울산";
        break;
      case "busan":
        crime_province = "부산";
        break;
      case "daegu":
        crime_province = "대구";
        break;
      case "jeju":
        crime_province = "제주";
        break;
    }

    connection.query('SELECT * FROM map WHERE id=?;' + 'SELECT * FROM crime_info WHERE province=?;' , [province, crime_province], function(err, result, fields){
      if(err){
        console.log('하지마');
      }else{
        res.render('map/show', {province :result[0][0],
        crime_info: result[1], session: session});
      }
    });
});

module.exports = router;
