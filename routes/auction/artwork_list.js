var express = require('express');
var router = express.Router();
var template = require('../../lib/template.js');
var author = require('../../lib/author.js');
const db = require('../../db.js');

router.get('/artwork_list', function(request, response) {
    var title = '작품 목록';
    var head = `
    <style>
    body {
        background-color: rgb(0, 0, 0);
        color: white;
    }

    .btn {
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
    </style>
    `;
    var body = `
    <main class="flex-shrink-0">
        <div class="container">
            <section class="py-5">
                <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"
                        aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                        aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                        aria-label="Slide 3"></button>
                    </div>`;

    /* 경매 입찰가 TOP1, TOP2, TOP3 작품 띄우기 */
    db.query(`SELECT a.bid_participant, a.highest_bid, 
    b.art_name, b.initial_price, b.upload_user, b.art_file, b.art_explain, b.time_ending
    FROM bid AS a INNER JOIN listing AS b 
    ON a.art_bid_no = b.listing_no
    ORDER BY highest_bid DESC
    limit 3;`, function(error, output) {
        if (error) {
            console.log(error);
            res.send({ success: false, message: 'database error', error: error });
            return;
        }

        var top1_title = '';
        var top1_explain = '';
        var top2_title = '';
        var top2_explain = '';
        var top3_title = '';
        var top3_explain = '';

        if (output[0] !== undefined) {
            top1_title = output[0].art_name;
            top1_explain = output[0].art_explain;
        }

        if (output[1] !== undefined) {
            top1_title = output[1].art_name;
            top1_explain = output[1].art_explain;
        }

        if (output[2] !== undefined) {
            top1_title = output[2].art_name;
            top1_explain = output[2].art_explain;
        }

        body += `
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <a href="#">
                                <img src="#" class="d-block">
                            </a>
                            <div class="carousel-caption d-none d-md-block">
                                <h2><b>Top1</b></h2>
                                <h4>${top1_title}</h4>
                                <h4>${top1_explain}</h4>
                            </div>
                        </div>

                        <div class="carousel-item">
                            <a href="#">
                                <img src="#" class="d-block">
                            </a>
                            <div class="carousel-caption d-none d-md-block">
                                <h2><b>Top2</b></h2>
                                <h4>${top2_title}</h4>
                                <h4>${top2_explain}</h4>
                            </div>
                        </div>

                        <div class="carousel-item">
                            <a href="#">
                                <img src="#" class="d-block">
                            </a>
                            <div class="#">
                                <h2><b>Top3</b></h2>
                                <h4>${top3_title}</h4>
                                <h4>${top3_explain}</h4>
                        </div>
                    </div>
                </div>
                
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>

                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
                </div>
            </section>

            <p style="text-align: center;">
                <a href="#" class="btn btn-outline-secondary">내 작품 등록하기</a>
                <a href="#" class="btn btn-outline-secondary">내 작품 등록하기</a>
            </p>

            <div class="py-5">
                <div class="btn-group" role="group">
                    <form action="#" method="POST">
                        <button type="submit" class="btn btn-outline-secondary" name="bid">경매중</button>
                        <button type="submit" class="btn btn-outline-secondary" name="bid">경매 마감</button>
                    </form>
                </div>

                <br><br>
                <div class="row" id="work">
                    <div class="col-md-3">
                        <div class="mb-3" id="card">
                        <div id="li">
                            <img src="#" style="width : 300px; height : 200px; ">
                            <div class="card-body">
                                <p class="card-text">제목: </p>
                                <p class="card-text">시작가: </p>
                                <p class="card-text">현재가: </p>
                                <p><small>deadline: </small>
                                    <a href="#" class="btn btn-sm btn-secondary" style="font-size: 0.5vw;">응찰</a>
                                    <button type="submit" style = "background-color: transparent; border-color: transparent;">
                                        <img src="/images/like.png" width="20px" height="20px" alt="좋아요">
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    `;

        var html = template.HTML(title, head, body, author.statusUI(request, response));
        response.send(html);
    });


});

module.exports = router;