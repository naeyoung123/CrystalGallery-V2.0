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
          response.writeHead(200, {Location: "/register_artwork_error"});
          v.end();
          console.log(err);
        } else {
          response.writeHead(302, {Location: "/register_artwork_update"});
          response.end();
        }
      }
    );
  }
);

module.exports = router;
