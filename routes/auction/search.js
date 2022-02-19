var express = require("express");
var router = express.Router();
const session = require("express-session");
var template = require("../../lib/template.js");
var author = require("../../lib/author.js");
const db = require("../../db.js");
var path = require("path");
var url = require('url');

router.get("/search", function(request, response) {
    var title = "작품 검색"
    var body = ``;

    //head코드는 artwork_list.js와 동일
    var head = `
    <style>
    body {
        background-color: rgb(0, 0, 0);
        color: white;
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
    .d-block {
        width: 100%;
        height: 25rem;
        max-width: 100%;
        object-fit: cover;
    }
    </style>`;

    /*url 쿼리에서 검색어 추출*/
    var search_word = url.parse(request.url, true).query.search_word;
    console.log(search_word);


    db.query(
        `SELECT a.highest_bid, 
    b.listing_no, b.art_name, b.initial_price, b.art_file, b.time_ending
    FROM bid AS a RIGHT JOIN listing AS b 
    ON a.art_bid_no = b.listing_no
    WHERE art_name LIKE ?; `, ['%' + search_word + '%'],
        function(error, output) {
            if (error) {
                console.log(error);
                res.send({
                    success: false,
                    message: "database error",
                    error: error,
                });
                return;
            }

            var i = 0;
            var artwork_list = `
            <main class="flex-shrink-0">
                <div class="container">
                    <div class="row" id="work">`;

            while (i < output.length) {
                artwork_list += `
              <div class = "col-xs-3" id="card">
                <div id="li">
                    <img src="${
                      output[i].art_file
                    }" style="width : 276px; height : 271px; object-fit: cover; border-radius: 10%;" >
                      <div class="card-body">
                        <p class="card-text">제목: ${output[i].art_name}</p>
                        <p class="card-text">시작가: ${
                          output[i].initial_price
                        }</p>
                        <p class="card-text">현재가: ${
                          output[i].highest_bid === output[i].initial_price
                            ? "입찰자 없음"
                            : output[i].highest_bid
                        }</p>
                        <p><small>deadline: ${output[i].time_ending}</small>
                          <a href="/artwork_auction/${
                            output[i].listing_no
                          }" class="btn btn-sm btn-secondary" style="font-size: 0.5vw;">응찰</a>
                          <br><br>
                          <button type="submit" style = "background-color: transparent; border-color: transparent;">
                            <img src="/images/좋아요테두리.png" width="30px" height="30px" alt="좋아요">
                          </button>
                        </p>
                      </div>
                  </div>
                </div>
            `;
                i++;
            }

            body += `
            ${artwork_list}
             </div> 
            </div>
          </main>`;

            var html = template.HTML(
                title,
                head,
                body,
                author.statusUI(request, response)
            );
            response.send(html);
        }
    );
});

module.exports = router;