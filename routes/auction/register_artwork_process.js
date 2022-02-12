var multer = require("multer");
var express = require("express");
const session = require("express-session");
var template = require("../../lib/template.js");
var router = express.Router();
const db = require("../../db.js");
const path = require("path");

var storage = multer.diskStorage({
  //저장하는 방식
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function (req, file, cb) {
    var extension = path.extname(file.originalname);
    cb(
      null,
      // cb 콜백함수를 통해 전송된 파일 이름 설정
      path.basename(file.originalname, extension) + Date.now() + extension //확장자를 포함한 파일 이름
    );
  },
});

//multer 미들웨어 등록
var upload = multer({storage: storage});

router.post(
  "/register_artwork_process",
  upload.single("art_file"), //input file 타입의 name 속성
  function (request, response) {
    var post = request.body;
    var art_name = post.art_name;
    var initial_price = post.initial_price;
    var upload_user = request.session.username; //세션 유지를 통한 유저 이름 가져오기
    var art_file = request.file.filename;
    var art_explain = post.art_explain;
    var time_ending = post.time_ending;
    var image = `/` + art_file; // /이미지이름
    var today = new Date();
    db.query(
      `INSERT INTO listing (art_name, initial_price, upload_user, art_file, art_explain, time_ending, time_starting) VALUES(?, ?, ?, ?, ?, ?, ?)`,
      [
        art_name,
        initial_price,
        upload_user,
        image,
        art_explain,
        time_ending,
        today,
      ],
      function (err, res) {
        if (err) {
          // response.writeHead(200, {Location: "/register_artwork_error"});
          // 작품 등록 실패 시 alert 띄우기 -> 프론트 확인 후 위 주석 삭제 부탁합니다.
          response.send(
            `<script type="text/javascript">alert("작품 등록에 실패했습니다.\n등록 형식을 확인해보세요.");window.location.href = '/register_artwork' </script>;`
          );
          // v.end();
          // console.log(err);
        } else {
          db.query(
            `SELECT listing_no FROM listing WHERE art_file = ?`,
            [image],
            // 작품 등록에 성공했다면 이름이 같을 수 없는 image를 통해 listing_no를 알아내서 bid table에도 속성을 추가해
            function (error, row) {
              if (err) {
                console.error(error);
              } else {
                const listing_no = row[0].listing_no;
                db.query(
                  //listing_no를 art_bid_no에, initial_price를 highest_bid에, upload_user를 bid_uplaod_user에 저장
                  `INSERT INTO bid(art_bid_no, highest_bid, bid_upload_user) VALUES(?, ?, ?)`,
                  [listing_no, initial_price, upload_user],
                  function (error, row) {
                    if (error) {
                      console.error(error);
                    } else {
                      // 작품 등록 성공 시 일단은 alert 띄우게 바꿈
                      // response.writeHead(302, {
                      //   Location: "/register_artwork_update",
                      // });
                      response.send(
                        `<script type="text/javascript">alert("작품이 성공적으로 등록되었습니다.");window.location.href = '/artwork_auction/' + ${listing_no} </script>;`
                      );
                      // response.end();
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  }
);

module.exports = router;
