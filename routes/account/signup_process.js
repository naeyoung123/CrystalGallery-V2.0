var express = require('express');
var router = express.Router();
var template = require('../../lib/template.js');
const db = require('../../db.js');
var qs = require('querystring');

router.post('/signup_process', function(request, response) {

    var post = request.body; //app.js에 만들어둔 bodyParser로 데이터 받기
    var email = post.email;
    var password = post.password;
    var password_check = post.password_check;
    var username = post.username;
    if (password == password_check) {
        db.query(`INSERT INTO user (email, username, password) VALUES(?, ?, ?)`, [email, username, password], function(err, res) {
            if (err) {
                response.writeHead(200, { Location: '/signup' });
                v.end();
            }
            response.writeHead(302, { Location: '/' });
            response.end();
        });
    }
});

module.exports = router;