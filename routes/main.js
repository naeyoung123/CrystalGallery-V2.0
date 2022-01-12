var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');

router.get('/', function (request, response) {
    var title = 'Crystal Gallery';
    var head = ``;
    var body = `
    <main class="flex-shrink-0">
    <div class="container">
        <div class="row">
            <center>
            <br><br>
                <p>안녕하세요</p>
            </center>
        </div>
        <br> <br>
    </div>

    </main>`;

    var html = template.HTML(title, head, body);
    response.send(html);
});

module.exports = router;