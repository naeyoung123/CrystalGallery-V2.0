var express = require("express");
var router = express.Router();
var template = require("../../lib/template.js");
var author = require("../../lib/author.js");
const db = require("../../db.js");

router.get("/register_artwork", function (request, response) {
  var title = "작품 등록";
  var head = `
    <style>
        main>.container {
            padding: 60px 15px 0;
        }

        body {
            text-align: center;
            background-color: rgb(0, 0, 0);
            color : rgb(255,255,255);
        }
    </style>
    `;
  var body = `
    <main class="flex-shrink-0">
        <br><br><br>
        <div class="container">
        <center>
        <br><br>
            <h2>경매 작품을 등록하세요.</h2>
            <form action="/register_artwork_process" method="post" enctype="multipart/form-data">
                작품명 <input type="text" name="art_name" placeholder="작품명">
                <br>
                작성자: ${request.session.username} <br>
                시작 코인 </label><input type="number" name="initial_price" placeholder="시작 코인">
                <br>
                파일 첨부 <input type = "file" name="art_file">
                <br>
                작품 설명 <textarea class="input" name="art_explain" placeholder="작품 설명"></textarea>
                <br>
                경매 마감 시간 <input type = "datetime-local" name="time_ending"><br>
                <div class="submit_btn">
                    <input id="submit_button" size="sm" type="submit" value="저장">
                </div>
            </form>
            </div>
        <br><br>
        </center>
        </div>
    </main>
    `;
  var html = template.HTML(
    title,
    head,
    body,
    author.statusUI(request, response)
  );
  response.send(html);
});

module.exports = router;
