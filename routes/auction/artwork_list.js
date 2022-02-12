var express = require('express');
var router = express.Router();
var template = require('../../lib/template.js');
var author = require('../../lib/author.js');
const db = require('../../db.js');
var path = require('path');
/* <style>태그 코드는 아래 변수에 1개로 통일해서 사용 */
var title = '작품 목록';
var head = `
    <link rel="canonical" href="https://getbootstrap.com/docs/5.1/examples/carousel/">

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
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        grid-template-rows: repeat(auto-fit, minmax(200px, 1fr));
        grid-gap: 1rem;
    }

    #card .card-body {
        position: absolute;
        top: 200px;
        width: 300px;
        height: 200px;
        padding-top: 15%;
        background: rgba(0, 0, 0, 0.6);
        opacity: 0;
        transition: all 0.6s ease-in-out;
        z-index: 10;
        font-size: 12px;
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
        width: 300px;

        height: 200px;
    }

    .d-block {
        width: 100%;
        height: 30rem;
        max-width: 100%;
        object-fit: contain;
    }

    .carousel-caption{
        color: white;
        text-shadow: -1px 0 rgb(103, 103, 103), 0 1px rgb(103, 103, 103), 1px 0 rgb(103, 103, 103), 0 -1px rgb(103, 103, 103);
    }
   
    .user_table{
        width:100%;
      }
      #username{
        width:300px;
      }
      .userFollow{
        margin:30px;
        text-align: right;
      }
    
    </style>
    `;

/* head와 body는 2개의 라우터에서 중복되는 내용이 많으니 둘다 추가.. */

router.get('/artwork_list', function(request, response) {


    var body = `
    <main class="flex-shrink-0">
        <div class="container">
            <section class="py-5">
                <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>`;

    /* 경매 입찰가 TOP1, TOP2, TOP3 작품 띄우기 */
    db.query(`SELECT a.bid_participant, a.highest_bid, 
    b.listing_no, b.art_name, b.initial_price, b.upload_user, b.art_file, b.art_explain, b.time_ending
    FROM bid AS a INNER JOIN listing AS b 
    ON a.art_bid_no = b.listing_no
    ORDER BY highest_bid DESC;`,
        function(error, output) {
            if (error) {
                console.log(error);
                res.send({
                    success: false,
                    message: 'database error',
                    error: error
                });
                return;
            }

            var top1_title = '';
            var top1_explain = '';
            var top1_art_file = '';
            var top2_title = '';
            var top2_explain = '';
            var top2_art_file = '';
            var top3_title = '';
            var top3_explain = '';
            var top3_art_file = '';

            if (output[0] !== undefined) {
                top1_title = output[0].art_name;
                top1_explain = output[0].art_explain;
                top1_art_file = output[0].art_file;
            }

            if (output[1] !== undefined) {
                top2_title = output[1].art_name;
                top2_explain = output[1].art_explain;
                top2_art_file = output[1].art_file;
            }

            if (output[2] !== undefined) {
                top3_title = output[2].art_name;
                top3_explain = output[2].art_explain;
                top3_art_file = output[2].art_file;
            }

            body += `
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <a href="${top1_art_file}">
                            <img src="${top1_art_file}" class="d-block" alt="${top1_title}" width="300px">
                        </a>
                        <div class="carousel-caption d-none d-md-block">
                            <h2><b>Top1</b></h2>
                            <h4>${top1_title}</h4>
                            <h4>${top1_explain}</h4>
                        </div>
                    </div>

                    <div class="carousel-item">
                        <a href="${top2_art_file}">
                            <img src="${top2_art_file}" class="d-block" alt="${top2_title}"  width="300px">
                        </a>
                        <div class="carousel-caption d-none d-md-block">
                            <h2><b>Top2</b></h2>
                            <h4>${top2_title}</h4>
                            <h4>${top2_explain}</h4>
                        </div>
                    </div>

                    <div class="carousel-item">
                        <a href="${top3_art_file}">
                            <img src="${top3_art_file}" class="d-block" alt="${top3_title}"  width="300px">
                        </a>
                        <div class="carousel-caption d-none d-md-block">
                            <h2><b>Top3</b></h2>
                            <h4>${top3_title}</h4>
                            <h4>${top3_explain}</h4>
                        </div>
                    </div>
                </div>
                
                <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>

                <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
                
                
                </div>
            </section>

            <p style="text-align: center;">
                <a href="/register_artwork" id = "btn1" class="btn btn-outline-secondary">내 작품 등록하기</a>
            </p>

            <div class="py-5">
                <div class="btn-group" role="group">
                    <form action="/artwork_list/ongoing_bid" method="POST">
                        <button type="submit" id = "btn1" class="btn btn-outline-secondary" name="ongoing_bid">경매중</button>
                    </form>
                    <form action="/artwork_list/end_bid" method="POST">
                        <button type="submit" id = "btn1" class="btn btn-outline-secondary" name="end_bid">경매 마감</button>
                    </form>
                    <form action="/artwork_list" method="GET">
                        <button type="submit" id = "btn1" class="btn btn-outline-secondary">전체</button>
                    </form>
                </div>
                <br><br>

                <div class="row" id="work">
                `;


            /* 작품 경매 리스트 - 기본적으로 경매중 */
            db.query(`SELECT a.highest_bid, 
    b.listing_no, b.art_name, b.initial_price, b.art_file, b.time_ending, b.upload_user
    FROM bid AS a RIGHT JOIN listing AS b 
    ON a.art_bid_no = b.listing_no; `, function(error, output) {
                if (error) {
                    console.log(error);
                    res.send({
                        success: false,
                        message: 'database error',
                        error: error
                    });
                    return;
                }

                var i = 0;
                var artwork_list = ``;

                while (i < output.length) {
                    artwork_list += `
                            <div class="col-md-3">
                                <div class="mb-3" id="card">
                                    <div id="li">
                                        <img src="${output[i].art_file}" style="width : 300px; height : 200px; ">
                                        <div class="card-body">
                                            <p class="card-text">제목: ${output[i].art_name}</p>
                                            <p class="card-text">시작가: ${output[i].initial_price}</p>
                                            <p class="card-text">현재가: ${(output[i].highest_bid === null) ? '입찰자 없음' : output[i].highest_bid}</p>
                                            <p><small>deadline: ${output[i].time_ending}</small>
                                                <a href="/artwork_auction/${output[i].listing_no}" class="btn btn-sm btn-secondary" style="font-size: 0.5vw;">응찰</a>
                                                <button type="submit" style = "background-color: transparent; border-color: transparent;">
                                                    <img src="/images/like.png" width="20px" height="20px" alt="좋아요">
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="upload-user profile">
                                    <table class="user_table">
                                        <tr>
                                        <td id="username">${output[i].upload_user}</td>
                                        <td id="userFollow" class="userFollow"><buttton class="btn btn-outline-primary">Follow</button></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>`;
                    i++;
                }

                body += `${artwork_list}
                </div>
            </div>

        </main>
        
        `;

                var html = template.HTML(title, head, body, author.statusUI(request, response));
                response.send(html);
            });
        });
});

/* 작품 경매 리스트 - 경매중/경매 마감 클릭 시 분류 */
router.post("/artwork_list/:sortId", function(request, response) {

    var sortId = path.parse(request.params.sortId).base;

    /* TOP1~TOP3띄우는 것 까지는 artwork_list 라우터와 완전히 중복되는 코드  */

    var body = `
    <main class="flex-shrink-0">
        <div class="container">
            <section class="py-5">
            <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
              <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>`;

    /* 경매 입찰가 TOP1, TOP2, TOP3 작품 띄우기 */
    db.query(`SELECT a.bid_participant, a.highest_bid, 
    b.listing_no, b.art_name, b.initial_price, b.upload_user, b.art_file, b.art_explain, b.time_ending
    FROM bid AS a INNER JOIN listing AS b 
    ON a.art_bid_no = b.listing_no
    ORDER BY highest_bid DESC;`,
        function(error, output) {
            if (error) {
                console.log(error);
                res.send({
                    success: false,
                    message: 'database error',
                    error: error
                });
                return;
            }

            var top1_title = '';
            var top1_explain = '';
            var top1_art_file = '';
            var top2_title = '';
            var top2_explain = '';
            var top2_art_file = '';
            var top3_title = '';
            var top3_explain = '';
            var top3_art_file = '';

            if (output[0] !== undefined) {
                top1_title = output[0].art_name;
                top1_explain = output[0].art_explain;
                top1_art_file = output[0].art_file;
            }

            if (output[1] !== undefined) {
                top2_title = output[1].art_name;
                top2_explain = output[1].art_explain;
                top2_art_file = output[1].art_file;
            }

            if (output[2] !== undefined) {
                top3_title = output[2].art_name;
                top3_explain = output[2].art_explain;
                top3_art_file = output[2].art_file;
            }

            body += `
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <a href="${top1_art_file}">
                                <img src="${top1_art_file}" class="d-block" alt="${top1_title}">
                            </a>
                            <div class="carousel-caption d-none d-md-block">
                                <h2><b>Top1</b></h2>
                                <h4>${top1_title}</h4>
                                <h4>${top1_explain}</h4>
                            </div>
                        </div>

                        <div class="carousel-item">
                            <a href="${top2_art_file}">
                            <img src="${top2_art_file}" class="d-block" alt="${top2_title}">
                            </a>
                            <div class="carousel-caption d-none d-md-block">
                                <h2><b>Top2</b></h2>
                                <h4>${top2_title}</h4>
                                <h4>${top2_explain}</h4>
                            </div>
                        </div>

                        <div class="carousel-item">
                            <a href="${top3_art_file}">
                                <img src="${top3_art_file}" class="d-block" alt="${top3_title}">
                            </a>
                            <div class="carousel-caption d-none d-md-block">
                                <h2><b>Top3</b></h2>
                                <h4>${top3_title}</h4>
                                <h4>${top3_explain}</h4>
                        </div>
                    </div>
                </div>
                
                <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>

                <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
                </div>
            </section>

            <p style = "text-align:center;">
                <a href="/register_artwork" class="btn btn-outline-secondary" id = "btn1">내 작품 등록하기</a>
            </p>

            <div class="py-5">
                <div class="btn-group" role="group">
                    <form action="/artwork_list/ongoing_bid" method="POST">
                        <button type="submit" id = "btn1" class="btn btn-outline-secondary" name="ongoing_bid">경매중</button>
                    </form>
                    <form action="/artwork_list/end_bid" method="POST">
                        <button type="submit" id = "btn1" class="btn btn-outline-secondary" name="end_bid">경매 마감</button>
                    </form>
                    <form action="/artwork_list" method="GET">
                        <button type="submit" id = "btn1" class="btn btn-outline-secondary">전체</button>
                    </form>
                </div>
                <br><br>

                <div class="row" id="work">`;


            db.query(`SELECT a.highest_bid, 
    b.listing_no, b.art_name, b.initial_price, b.art_file, b.time_ending, b.upload_user
    FROM bid AS a RIGHT JOIN listing AS b 
    ON a.art_bid_no = b.listing_no; `,
                function(error, output) {
                    if (error) {
                        console.log(error);
                        res.send({
                            success: false,
                            message: 'database error',
                            error: error
                        });
                        return;
                    }

                    if (sortId === 'ongoing_bid') { //경매중 클릭

                        console.log("경매중 클릭!");

                        var i = 0;
                        var artwork_list = ``;

                        while (i < output.length) {
                            const now = new Date();
                            const deadline = new Date(output[i].time_ending);

                            if (now < deadline) {
                                //경매중 -> 진행중인 경매
                                artwork_list += `
                        <div class="col-md-3">
                            <div class="mb-3" id="card">
                                <div id="li">
                                    <img src="${output[i].art_file}" style="width : 300px; height : 200px; ">
                                    <div class="card-body">
                                        <p class="card-text">제목: ${output[i].art_name}</p>
                                        <p class="card-text">시작가: ${output[i].initial_price}</p>
                                        <p class="card-text">현재가: ${(output[i].highest_bid === null) ? '입찰자 없음' : output[i].highest_bid}</p>
                                        <p><small>deadline: ${output[i].time_ending}</small>
                                            <a href="/artwork_auction/${output[i].listing_no}" class="btn btn-sm btn-secondary" style="font-size: 0.5vw;">응찰</a>
                                            <button type="submit" style = "background-color: transparent; border-color: transparent;">
                                                <img src="/images/like.png" width="20px" height="20px" alt="좋아요">
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="upload-user profile">
                                    <table class="user_table">
                                        <tr>
                                        <td id="username">${output[i].upload_user}</td>
                                        <td id="userFollow" class="userFollow"><buttton class="btn btn-outline-primary">Follow</button></td>
                                        </tr>
                                    </table>
                                </div>
                        </div>`;
                            }

                            i++;
                        }

                        body += `${artwork_list}
            </div>
        </div>
    </main>`;

                        var html = template.HTML(title, head, body, author.statusUI(request, response));
                        response.send(html);

                    } else if (sortId === 'end_bid') { //경매 마감 클릭

                        console.log("경매 마감 클릭!");
                        var i = 0;
                        var artwork_list = ``;

                        while (i < output.length) {
                            const now = new Date();
                            const deadline = new Date(output[i].time_ending);

                            if (now >= deadline) {
                                //경매 마감 -> 마감기한이 다된 경매
                                artwork_list += `
                        <div class="col-md-3">
                            <div class="mb-3" id="card">
                                <div id="li">
                                    <img src="${output[i].art_file}" style="width : 300px; height : 200px; ">
                                    <div class="card-body">
                                        <p class="card-text">제목: ${output[i].art_name}</p>
                                        <p class="card-text">시작가: ${output[i].initial_price}</p>
                                        <p class="card-text">현재가: ${(output[i].highest_bid === null) ? '입찰자 없음' : output[i].highest_bid}</p>
                                        <p><small>deadline: ${output[i].time_ending}</small>
                                            <a href="/artwork_auction/${output[i].listing_no}" class="btn btn-sm btn-secondary" style="font-size: 0.5vw;">응찰</a>
                                            <button type="submit" style = "background-color: transparent; border-color: transparent;">
                                                <img src="/images/like.png" width="20px" height="20px" alt="좋아요">
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="upload-user profile">
                                    <table class="user_table">
                                        <tr>
                                        <td id="username">${output[i].upload_user}</td>
                                        <td id="userFollow" class="userFollow"><buttton class="btn btn-outline-primary">Follow</button></td>
                                        </tr>
                                    </table>
                                </div>

                        </div>`;
                            }

                            i++;
                        }

                        body += `${artwork_list}
            </div>
        </div>
    </main>`;

                        var html = template.HTML(title, head, body, author.statusUI(request, response));
                        response.send(html);

                    }
                });
        });
});
module.exports = router;