var express = require("express");
var router = express.Router();
var template = require("../lib/template.js");
var author = require("../lib/author.js");

router.get("/", function (request, response) {
  var title = "CrystalGallery";
  var head = `
    <style>
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
        grid-template-columns: repeat(4, minmax(276px, 1fr));
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
        transition: all 0.6s ease-in-out;
        z-index: 10;
        font-size: 13px;
    }
    #card #li {
        padding: 0;
        overflow: hidden;
        position: relative;
    }
    #card #li:hover .card-body {
        opacity: 1;
        transform: translateY(-200px);
    }
    #card .card-body p {
        color: #fff;
        text-align: center;
    }
    #li {
        width: 276px;
        height: 271px;
    }
    </style>
    
          `;
  var body = `
    <main class="flex-shrink-0">
      <div class="container">
      <br><br>
        <div class="text" style = "font-family: 'SF_IceLemon'; color : white;">
          <center>
          <p style = "font-size : 5vw;">
            CRYSTAL<br>GALLERY</p>
          <p style="font-size: 3.5vw;">당신의 진가, 크리스탈에서 발굴해보세요<br>
            <a href="/artwork_list" class="btn btn-outline-light">옥션 구경하러 가기</a></p>
          </center>
        </div>
        <br>
        <p style = "color : white; font-size : 1.5vw;">WEEKLY BEST</p>
        <div class="row" id="work">
          <div class = "col-xs-3" id="card">
            <div id="li">
              <img src="#" style="width : 276px; height : 271px; object-fit: cover; border-radius: 10%;" >
                <div class="card-body">
                  <p class="card-text">제목:</p>
                  <p class="card-text">시작가:</p>
                  <p class="card-text">현재가:</p>
                  <p><small>deadline: </small>
                    <a href="/artwork_auction" class="btn btn-sm btn-secondary" style="font-size: 0.5vw;">응찰</a>
                    <br><br>
                    <button type="submit" style = "background-color: transparent; border-color: transparent;">
                      <img src="/images/좋아요테두리.png" width="30px" height="30px" alt="좋아요">
                    </button>
                   </p>
                </div>
            </div>
          </div>
        </div>
        <hr>
        <p style = "color : white; font-size : 1.5vw;">최근 등록된 작품</p>
        <div class="row" id="work">
          <div class = "col-xs-3" id="card">
            <div id="li">
              <img src="#" style="width : 276px; height : 271px; object-fit: cover; border-radius: 10%;" >
                <div class="card-body">
                  <p class="card-text">제목:</p>
                  <p class="card-text">시작가:</p>
                  <p class="card-text">현재가:</p>
                  <p><small>deadline: </small>
                    <a href="/artwork_auction" class="btn btn-sm btn-secondary" style="font-size: 0.5vw;">응찰</a>
                    <br><br>
                    <button type="submit" style = "background-color: transparent; border-color: transparent;">
                      <img src="/images/좋아요테두리.png" width="30px" height="30px" alt="좋아요">
                    </button>
                  </p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </main> <br>
    `;
  var html = template.HTML(
    title,
    head,
    body,
    author.statusUI(request, response)
  );
  response.send(html);
});

module.exports = router;
