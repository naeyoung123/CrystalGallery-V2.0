var express = require("express");
var router = express.Router();
var template = require("../../lib/template.js");
var author = require("../../lib/author.js");
const db = require("../../db.js");
var path = require('path');

router.get("/artwork_auction/:listing_no", function(request, response) {
    /* url에서 listing_no 번호만 가져오기 */
    var listing_no = path.parse(request.params.listing_no).base;
    console.log("listing_no은" + listing_no + "입니다.");

    var title = "작품 경매";
    var head = `
        <style>
        #wrapper {
            width: 100%
            height: 800px;
            border: 1px solid #d1d1d1;
            margin-top: auto;
        }

        #image {
           width: 50%;
           height: 500px;
           float: left;
           padding:10px;
           border: 1px solid #d1d1d1;

        }

        #contents {
            width: 50%;
            height: 500px;
            float: right;
            text-align: left;
            padding:10px;
            
        }

        #comment {
            claer: both;
            height:100px;
        }
        </style>
    `;

    var body = `
    <div id=wrapper>

        <div id=image>
            <img src=''>
        </div>

        <div id=contents>
            <h3>작품명:</h3>
            작품설명:
            <br><br>
            경매시작일: -경매마감일:
            <br><br>
            시작금액:
            <br><br>
            현재금액:
            <br><br>
            <label>
            경매 금액: <input type="number" step="10" min="100" max="100000000"></label>
            <br>
            숫자 입력 : 10<input type="range" min="0" max="100000000">100000000

            <br><br>
            <input type="button" value="낙찰">
        </div>

        <div id=comment>
        댓글을 입력하세요.
        </div>

    </div>
    
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