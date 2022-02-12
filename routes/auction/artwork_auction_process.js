var express = require("express");
var router = express.Router();
var template = require("../../lib/template.js");
var author = require("../../lib/author.js");
const db = require("../../db.js");
var path = require("path");

router.post("/artwork_auction_process", function (request, response) {
  var post = request.body;
  var bid_price = post.bid_price;
  bid_price = parseInt(bid_price);
  var user = request.session.username;
  // var bid_participant = post.bid_participant;
  var bid_upload_user = post.bid_upload_user;
  var highest_bid = post.highest_bid;
  var listing_no = post.list_no;
  var initial_price = post.initial_price;
  console.log(user);
  console.log(listing_no);
  db.query(
    `SELECT * FROM bid WHERE art_bid_no=?`,
    [listing_no],
    function (err, res) {
      console.log(res[0]);
      if (res[0] === null) {
        console.log("if내부");
        db.query(
          `INSERT INTO bid(bid_participant, art_bid_no, highest_bid) VALUES(?, ?, ?)`,
          [user, listing_no, bid_price],
          function (error, row) {
            if (error) {
              console.error(error);
            } else {
              response.writeHead(302, {
                Location: "/artwork_auction/" + listing_no,
              });
              response.end();
            }
          }
        );
      } else {
        console.log("else 내부");
        if (user === bid_upload_user) {
          //입찰자와 등록자가 동일하여 입찰 불가
          //alert 띄우고 싶은데 02.13에 할 예정
          console.log("같은 사용자");
          response.writeHead(302, {
            Location: "/artwork_auction/" + listing_no,
          });
          response.end();
        } else {
          console.log(highest_bid, bid_price, listing_no);
          if (bid_price > highest_bid) {
            console.log("비교");
            //bid_price 가 highest_bid보다 작을 때는 아직 처리가 안돼서 이부분도 다음 주에 고치겠음
            db.query(
              `UPDATE bid SET bid_participant = ?, highest_bid = ? WHERE art_bid_no = ?`,
              [user, bid_price, listing_no],
              function (error, row) {
                if (error) {
                  console.error(error);
                } else {
                  response.writeHead(302, {
                    Location: "/artwork_auction/" + listing_no,
                  });
                  response.end();
                }
              }
            );
          } else {
            console.log("bid_price가 highest_bid보다 작거나 같은 경우");
            response.send(
              `<script type="text/javascript">alert("현재가보다 낮은 금액은 입찰하실 수 없습니다.");window.location.href = '/artwork_auction/' + ${listing_no} </script>;`
            );
          }
        }
      }
    }
  );
});

module.exports = router;
