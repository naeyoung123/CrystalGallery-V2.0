var express = require('express');
var router = express.Router();
var template = require('../../lib/template.js');
var author = require('../../lib/author.js');
const db = require('../../db.js');


router.get('/mygallery', function (request, response) {
    var title = 'mygallery';
    var authStatusUI = '<a class="nav-link" href="/login">로그인</a>';
    var head = `
    <style>
    @import url("https://use.typekit.net/lli2uap.css");
    
    @font-face {
      font-family: 'SF_IceLemon';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2106@1.1/SF_IceLemon.woff') format('woff');
      font-weight: normal;
      font-style: normal;
    }

    body{
      background-image: url(/images/main.png);
      background-repeat : no-repeat;
      background-size: cover;
    }
    #btn1 {
      border-color: rgb(255, 255, 255);
      color: rgb(255, 255, 255);
      font-size: 1.1vw;
    }
    
    #work {
        display: grid;
        grid-template-columns: repeat(2, minmax(276px, 1fr));
        grid-template-rows: repeat(auto-fit, minmax(271px, 1fr));
        grid-gap: 1rem;
    }
    #card .card-body {
        position: absolute;
        top: 200px;
        width: 276px;
        height: 271px;
        padding-top: 15%;
        background: rgba(0, 0, 0, 0.6);
        opacity: 0;
    }

    </style>
    `;
    var body = `
    <main class="flex-shrink-0">
      <div class="container">
      <br><br>
        <div class="text" style = "color : white;">
          <center>
            <h4>이수빈 님</h4>
            <h4>sungshin@gmail.com</h4>
            <p style = "font-size : 1.2vw; font-family: discourse-wide,sans-serif; color : orange;" >1000 crystal </p>
          </center>
        </div>
        <br>
        
        <div class ="row">
            <div class="col-md-6">
            <center><p style = "color : white; font-size : 1.5vw;">Works</p></center><br>
                <div class="row" id="work">
                    <div class = "col-xs-6" >
                        <img src="#" style="width : 276px; height : 271px; object-fit: cover; border-radius: 10%;" >
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <center><p style = "color : white; font-size : 1.5vw;">Collects</p></center><br>
                <div class="row" id="work">
                    <div class = "col-xs-6">
                        <img src="#" style="width : 276px; height : 271px; object-fit: cover; border-radius: 10%;" >
                    </div>
                </div>
            </div>
        </div>
      </div>
    </main> <br>
    `;
    var html = template.HTML(title, head, body, author.statusUI(request, response));
    response.send(html);
});

module.exports = router;