var express = require("express");
var router = express.Router();
var template = require("../../lib/template.js");
var author = require("../../lib/author.js");
const db = require("../../db.js");
var path = require("path");

router.post("/comment", function (request, response) {
  var post = request.body;
  const user = request.session.username;
  const art_comment = post.content;
  const art_file = post.art_file;
  db.query(
    `INSERT INTO comment(comment_user, art_file, art_comment) VALUES(?, ?, ?)`,
    [user, art_file, art_comment],
    function (err, row) {
      if (err) {
        console.error(err);
      } else {
        response.writeHead(302, {
          Location: "/artwork_auction/" + art_file,
        });
        response.end();
      }
    }
  );
});

module.exports = router;
