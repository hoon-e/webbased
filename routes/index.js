var express = require('express');
var router = express.Router();

// index 페이지
router.get('/', function(req, res, next) {

  let session = req.session;

  res.render('index', {session: session});
});

module.exports = router;
/*
router.post('/', (req, res)=>{

  var msg = req.body.region;

  var region_key = {
    "서울" : 11,
    "부산" : 26,
    "대구" : 27,
    "인천" : 28,
    "광주" : 29,
    "대전" : 30,
    "울산" : 31,
    "세종" : 36,
    "경기" : 41,
    "제주" : 50,
    "전북" : 45,
  };

  // var region = [11, 26, 27, 28, 29, 30, 31, 36, 41, 42, 43, 44, 45, 46, 47, 48, 50]
  const key = '50740735-900B-3919-BF9E-065E325B7541';
  // 서울, 부산, 대구, 인천, 광주, 대전, 울산, 세종, 경기, 강원, 충북, 충남, 전북, 전남, 경북, 경남, 제주

  var params = '&' + encodeURIComponent("key") + '=' + key + '&' + encodeURIComponent("attrFilter") + '=' + 'ctprvn_cd' + ':=:' + region_key[msg];

  return axios.get('http://api.vworld.kr/req/data?domain=http://localhost:8080&data=LT_C_ADSIDO_INFO&format=json&crs=EPSG:4326&request=GetFeature'+params)
    .then(response=>{
      console.log('json was successfully loaded');
      console.log(response.data.response.result.featureCollection);
      var value = response.data.response.result.featureCollection.features[0].properties.ctp_kor_nm;
      var geom = response.data.response.result.featureCollection.features[0].geometry['coordinates'];
      res.send({region: value, geometry: geom});
  }).catch((error)=>{
    console.error(error);
  });
});

module.exports = router;
*/