var express = require('express');
var router = express.Router();
var template = require('../../lib/template.js');
var author = require('../../lib/author.js');
const db = require('../../db.js');


router.get('/register_artwork_update', function (request, response) {
    var title = '작품 등록 수정';
    var authStatusUI = '<a class="nav-link" href="/login">로그인</a>';
    var head = `
    
    `;
    var body = `
    
    `;
    var html = template.HTML(title, head, body, author.statusUI(request, response));
    response.send(html);
});

module.exports = router;