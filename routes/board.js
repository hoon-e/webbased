var express = require('express');
var flash = require('connect-flash');
var router = express.Router();

const mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",

    database: "criminal"
  });

  connection.connect();

// 게시판 메인화면
router.get('/', function(req, res, next){

    let session = req.session;

    connection.query("SELECT * FROM board;", 1, function(err, result, fields){
        if(err){
            console.log('불러오기 쿼리문에 오류가 있습니다.');
            res.redirect('/');
        }
        else{
            res.redirect('/board/page/1');

            // res.render('board/index', {board: result, session: session});
        }
    });
});

// 페이징 처리
router.get('/page/:currentPage', function(req,res,next){

    let session = req.session;

    // 페이지당 게시물 수
    let page_size = 6;

    // 페이지의 갯수
    let page_list_size = 6;

    // limit 변수
    let number = 0;

    // 총 게시물 갯수
    let total_board = 0;

    connection.query("SELECT count(*) as count FROM board", function(err, result, fields){
        if(err){
            console.log('페이지네이션 실패!');
            return;
        }
        
        total_board = result[0].count;

        var currentPage = req.params.currentPage;

        if(total_board < 0){
            total_board = 0;
        }

        // 페이지 수
        let totalPage = Math.ceil(total_board / page_size);
        // 전체 세트 수
        let totalSet = Math.ceil(totalPage / page_list_size);
        // 현재 세트 번호
        let currentSet = Math.ceil(currentPage / page_list_size);
        // 출력될 페이지 번호
        let startPage = ((currentSet-1)*6)+1;
        // 현재 세트에서 출력될 마지막 페이지
        let endPage = (startPage + page_list_size) -1;

        if(currentPage < 0){
            number = 0;
        }else{
            number = (currentPage-1) * 6;
        }

        let result2 = {
            "currentPage" : currentPage,
            "page_list_size" : page_list_size,
            "page_size" : page_size,
            "totalPage" : totalPage,
            "totalSet" : totalSet,
            "currentSet" : currentSet,
            "startPage" : startPage,
            "endPage" : endPage
        };

        connection.query("SELECT * from board order by board_id desc limit ?,?", [number, page_size], function(err, result, fields){
            if(err){
                console.log('페이징 에러');
                console.log(err);
                return;
            }

            res.render('board/page', {data: result, page: result2, session: session});
        })
    });
});

router.get('/create', function(req,res,next){
    let session = req.session;

    res.render('board/create', {
        session: session
    });
});

router.post('/create', function(req,res,next){

    const session = req.session;
    const body = req.body;

    connection.query("INSERT INTO board (board_writer, board_title, board_text) VALUES (?, ?, ?)", [session.user_id, body.board_title, body.board_text], function(err, result, fields){
        if(err){
            console.log('board create 쿼리문에 오류가 있습니다.');
            res.redirect('/board/create');
        }
        else{
            res.redirect('/board');
        }
    });
});

router.get('/edit/:board_id', function(req,res,next){
    
    const session = req.session;

    const boardID = req.params.board_id;

    connection.query("SELECT * FROM board WHERE board_id=?", boardID, function(err, result, fields){
        if(err){
            console.log('수정 쿼리문에 오류가 있습니다.');
            res.redirect('/board');
        }
        else{
            if( session.user_id == result[0].board_writer ){
                console.log(result);
                res.render('board/edit', {post: result, session: session});
            }
            else{
                res.redirect('/board');
            }
        }
    });
});

router.get('/delete/:board_id', function(req,res,next){
    const boardID = req.params.board_id;

    connection.query("DELETE FROM board WHERE board_id=?", boardID, function(err, result, fields){
        if(err){
            console.log('삭제하기 오류');
            res.redirect('/board');
        }
        else{
            res.redirect('/board');
        }
    });
});

module.exports = router;