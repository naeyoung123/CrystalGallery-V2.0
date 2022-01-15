var express = require('express');
var router = express.Router();
var template = require('../../lib/template.js');
const db = require('../../db.js');
var qs = require('querystring');

router.post('/signup_process', function (request, response) {
    var body = ``;
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
        var post = qs.parse(body);
        var email = post.email;
        var password = post.password;
        var password_check = post.password_check;
        var nickname = post.nickname;
        if(password == password_check){
            db.query(`INSERT INTO user (email, password, nickname) VALUES(?, ?, ?)`, [email, password, nickname], function(err, res){
                if(err) {
                    response.writeHead(200, {Location: `/signup`});
                    response.end();
                }
                response.writeHead(302, {Location: `/`});
                response.end();
            });
    }
    });
});

module.exports = router;