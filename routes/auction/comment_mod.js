var express = require("express");
var router = express.Router();
var template = require("../../lib/template.js");
var author = require("../../lib/author.js");
const db = require("../../db.js");
var path = require("path");

router.post("/comment_mod", function (request, response) {
    // var post = request.body;
    // var comment_no = post.comment_no;
    // var user = request.session.username;
    // var listing_no = post.list_no;

    // console.log(comment_no);
    // db.query(`UPDATE comment SET art_comment =? WHERE comment_no =? and user =?`),[]
});

module.exports = router;