var express = require('express');
var router = express.Router();
var template = require('../../lib/template.js');
var author = require('../../lib/author.js');
const db = require('../../db.js');


router.get('/mygallery', function (request, response) {
    var title = 'mygallery';
    var authStatusUI = '<a class="nav-link" href="/login">로그인</a>';
    var head = `
    
    `;
    var body = `
    
    `;
    var html = template.HTML(title, head, body, author.statusUI(request, response));
    response.send(html);
});

module.exports = router;