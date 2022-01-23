var express = require("express");
var router = express.Router();
var template = require("../../lib/template.js");
const db = require("../../db.js");
var qs = require("querystring");

router.post("/login_process", function (request, response) {
  var post = request.body;
  var email = post.email;
  var password = post.password;
  var username = post.username;
  db.query(
    `SELECT username, password FROM user WHERE email=?`,
    [email],
    function (err, res) {
      if (res[0] == undefined) {
        console.log("여기");
        response.redirect(`/login`);
      } else {
        if (res[0].password == password) {
          request.session.is_logined = true;
          request.session.email = email;
          request.session.username = res[0].username;
          request.session.save(function () {
            response.redirect(`/`);
          });
        } else {
          response.redirect(`/login`);
        }
      }
    }
  );
});

module.exports = router;
