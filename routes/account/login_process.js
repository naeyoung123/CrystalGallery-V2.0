var express = require("express");
var router = express.Router();
var template = require("../../lib/template.js");
const db = require("../../db.js");
var qs = require("querystring");

router.post("/login_process", function (request, response) {
  var post = request.body;
  var email = post.email;
  var password = post.password;
  db.query(
    `SELECT username, password FROM user WHERE email=?`,
    [email],
    function (err, res) {
      if (res[0] == undefined) {
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
          //틀리면 alert 띄우기
          response.send(
            `<script type="text/javascript">alert("아이디나 비밀번호가 틀렸습니다.");window.location.href = '/login'</script>;`
          );
        }
      }
    }
  );
});

module.exports = router;
