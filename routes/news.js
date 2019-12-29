var express = require('express');
const axios = require('axios');
var router = express.Router();
const request = require('request');
const cheerio = require('cheerio');

router.get('/:query', function(req, res, next){
    let session = req.session;

    let url = "https://search.naver.com/search.naver?&where=news&refresh_start=0&start="

    let search =  req.params.query;
    
    console.log(search);

    let query = "&query=" + search;

    // 뉴스 받아오기 ( 5개 페이지 )
    axios.all([axios.get(encodeURI(url+1+query)), axios.get(encodeURI(url+11+query)), axios.get(encodeURI(url+21+query)), axios.get(encodeURI(url+31+query)), axios.get(encodeURI(url+41+query)), axios.get(encodeURI(url+51+query))])
    .then( axios.spread((res1, res2, res3, res4, res5) => {
            result = [];

            const $1 = cheerio.load(res1.data);
            const $2 = cheerio.load(res2.data);
            const $3 = cheerio.load(res3.data);
            const $4 = cheerio.load(res4.data);
            const $5 = cheerio.load(res5.data);

            let titleArr = [0,0,0,0,0];
            let pressArr = [0,0,0,0,0];
            let textArr = [0,0,0,0,0];

            titleArr[0] = $1("._sp_each_title");
            titleArr[1] = $2("._sp_each_title");
            titleArr[2] = $3("._sp_each_title");
            titleArr[3] = $4("._sp_each_title");
            titleArr[4] = $5("._sp_each_title");

            pressArr[0] = $1("._sp_each_source");
            pressArr[1] = $2("._sp_each_source");
            pressArr[2] = $3("._sp_each_source");
            pressArr[3] = $4("._sp_each_source");
            pressArr[4] = $5("._sp_each_source");

            textArr[0] = $1("ul.type01 dl dd:nth-child(3)");
            textArr[1] = $2("ul.type01 dl dd:nth-child(3)");
            textArr[2] = $3("ul.type01 dl dd:nth-child(3)");
            textArr[3] = $4("ul.type01 dl dd:nth-child(3)");
            textArr[4] = $5("ul.type01 dl dd:nth-child(3)");

            for(let k = 0 ; k < titleArr.length; k++){
                for(let j = 0; j < titleArr[k].length; j++){
                    result.push({title: titleArr[k][j], press: pressArr[k][j], text: textArr[k][j]});
                }
            }

            res.render('news/index', {news: result, session: session});
        })
    ).catch((error) => {
        console.log(error);
    });
});

router.get('/', function(req, res, next){

    let session = req.session;

    let url = "https://search.naver.com/search.naver?&where=news&refresh_start=0&start="

    let query = "&query=" + "범죄";

    // 뉴스 받아오기 ( 5개 페이지 )
    axios.all([axios.get(encodeURI(url+1+query)), axios.get(encodeURI(url+11+query)), axios.get(encodeURI(url+21+query)), axios.get(encodeURI(url+31+query)), axios.get(encodeURI(url+41+query)), axios.get(encodeURI(url+51+query))])
    .then( axios.spread((res1, res2, res3, res4, res5) => {
            result = [];

            const $1 = cheerio.load(res1.data);
            const $2 = cheerio.load(res2.data);
            const $3 = cheerio.load(res3.data);
            const $4 = cheerio.load(res4.data);
            const $5 = cheerio.load(res5.data);

            let titleArr = [0,0,0,0,0];
            let pressArr = [0,0,0,0,0];
            let textArr = [0,0,0,0,0];

            titleArr[0] = $1("._sp_each_title");
            titleArr[1] = $2("._sp_each_title");
            titleArr[2] = $3("._sp_each_title");
            titleArr[3] = $4("._sp_each_title");
            titleArr[4] = $5("._sp_each_title");

            pressArr[0] = $1("._sp_each_source");
            pressArr[1] = $2("._sp_each_source");
            pressArr[2] = $3("._sp_each_source");
            pressArr[3] = $4("._sp_each_source");
            pressArr[4] = $5("._sp_each_source");

            textArr[0] = $1("ul.type01 dl dd:nth-child(3)");
            textArr[1] = $2("ul.type01 dl dd:nth-child(3)");
            textArr[2] = $3("ul.type01 dl dd:nth-child(3)");
            textArr[3] = $4("ul.type01 dl dd:nth-child(3)");
            textArr[4] = $5("ul.type01 dl dd:nth-child(3)");

            for(let k = 0 ; k < titleArr.length; k++){
                for(let j = 0; j < titleArr[k].length; j++){
                    result.push({title: titleArr[k][j], press: pressArr[k][j], text: textArr[k][j]});
                }
            }

            res.render('news/index', {news: result, session: session});
        })
    ).catch((error) => {
        console.log(error);
    });
});

module.exports = router;