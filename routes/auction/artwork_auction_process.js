var express = require("express");
var router = express.Router();
var template = require("../../lib/template.js");
var author = require("../../lib/author.js");
const db = require("../../db.js");
var path = require("path");

router.post("/artwork_auction_process", function (request, response) {
  var post = request.body;
  var bid_price = post.bid_price;
  var user = request.session.username;
  var listing_no = post.list_no;
  console.log(listing_no);
  db.query(
    `SELECT highest_bid FROM bid WHERE bid_participant=?`,
    [user],
    function (err, res) {
      if (res[0] == undefined) {
        console.log("성공~!");
        db.query(
          `INSERT INTO bid(bid_participant, art_bid_no, highest_bid) VALUES(?, ?, ?)`,
          [user, listing_no, bid_price],
          function (error, row) {
            if (err) {
              console.error(error);
            } else {
              console.log("성공!");
              response.writeHead(302, {
                Location: "/artwork_auction/" + listing_no,
              });
              response.end();
            }
          }
        );
      } else {
        //db.query();
        // response.render("/")
        console.log("실패");
      }
    }
  );
});

module.exports = router;
