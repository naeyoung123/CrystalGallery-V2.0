var express = require("express");
var router = express.Router();
var template = require("../../lib/template.js");
var author = require("../../lib/author.js");
const db = require("../../db.js");
var path = require("path");
const { init } = require("express/lib/application");

router.get("/artwork_auction/:listing_no", function(request, response) {
    /* url에서 listing_no 번호만 가져오기 */
    var listing_no = path.parse(request.params.listing_no).base;
    console.log("listing_no은" + listing_no + "입니다.");
    const sql = `
        SELECT art_name, art_explain, art_file, initial_price, time_ending, time_starting,
        bid_participant, highest_bid, bid_upload_user
        FROM listing LEFT JOIN bid
        ON listing.listing_no = bid.art_bid_no
      WHERE listing_no = ?;`
    db.query(sql, [listing_no], (err, row) => {
        if (err) {
            console.error(err);
        } else {
            var title = "작품 경매";
            const list_no = row[0].art_bid_no;
            const art_name = row[0].art_name;
            const art_file = row[0].art_file;
            const initial_price = row[0].initial_price;
            const art_explain = row[0].art_explain;
            const time_ending = row[0].time_ending;
            const time_starting = row[0].time_starting;
            const highest_bid = row[0].highest_bid ? row[0].highest_bid : "입찰자 없음";
            const bid_upload_user = row[0].bid_upload_user ? row[0].highest_bid : "입찰자 없음";
            const user = request.session.username;

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
    <div id="wrapper">

        <div id="image">
          <img src='${art_file}' width: 50% height: 500px alt='${art_name}'>      
        </div>

        <div id="contents">
            <h3>작품명: ${art_name} </h3>
            작품설명: ${art_explain}
            <br><br>
            경매시작일: ${time_starting} -경매마감일: ${time_ending}
            <br><br>
            시작금액: ${initial_price}
            <br><br>
            현재금액: ${highest_bid === null ? initial_price : highest_bid}
            <br><br>
            ${
              bid_upload_user === user
                ? "자신의 작품에는 낙찰할 수 없습니다."
                : "입찰 가능"
            }
            <form action="/artwork_auction_process" method ="post">
              <input type="hidden" name = "list_no" value=${list_no}>
              <input type="hidden" name = "highest_bid" value=${highest_bid}>
              <input type="hidden" name = "bid_upload_user" value=${bid_upload_user}>
              <input type="hidden" name = "initial_price" value=${initial_price}>
              <label>
            경매 금액: <input type="number" name ="bid_price" step="10" min="100" max="100000000">
              </label>
            <br>
            숫자 입력 : 10<input type="range" min="0" max="100000000">100000000
              <br><br>
              <button type="submit" style="width:50%"><b>낙찰</b></button>
            </form>
        </div>

        <div id="comment">
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
        }
    });
});

module.exports = router;