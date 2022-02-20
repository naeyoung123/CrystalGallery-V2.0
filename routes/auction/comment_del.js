var express = require("express");
var router = express.Router();
var template = require("../../lib/template.js");
var author = require("../../lib/author.js");
const db = require("../../db.js");
var path = require("path");

router.post("/comment_del", function (request, response) {
  var post = request.body;
  var comment_no = post.comment_no;
  var user = request.session.username;
  var listing_no = post.art_file;

  console.log(comment_no);
  //댓글 삭제
  db.query(
    `DELETE FROM comment WHERE comment_no = ?`,
    [comment_no],
    function (err, row) {
      if (err) {
        console.error(err);
      } else {
        response.writeHead(302, {
          Location: "/artwork_auction/" + listing_no,
        });
        response.end();
      }
    }
  );
});

module.exports = router;
