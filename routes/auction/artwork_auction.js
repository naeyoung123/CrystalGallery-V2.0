var express = require("express");
var router = express.Router();
var template = require("../../lib/template.js");
var author = require("../../lib/author.js");
const db = require("../../db.js");
var path = require("path");

router.get("/artwork_auction/:listing_no", function (request, response) {
  /* url에서 listing_no 번호만 가져오기 */
  var listing_no = path.parse(request.params.listing_no).base;
  console.log("listing_no은" + listing_no + "입니다.");
  const sql = `
        SELECT art_name, art_explain, art_file, initial_price, time_ending, time_starting,
        bid_participant, highest_bid, bid_upload_user, listing_no, art_bid_no
        FROM listing LEFT JOIN bid
        ON listing.listing_no = bid.art_bid_no
      WHERE listing_no = ?;`;
  db.query(sql, [listing_no], (err, row) => {
    if (err) {
      console.error(err);
    } else {
      var title = "작품 경매";
      const list_no = row[0].art_bid_no;
      const art_name = row[0].art_name;
      const art_file = row[0].art_file;
      const initial_price = row[0].initial_price;
      const art_explain = row[0].art_explain;
      const time_ending = row[0].time_ending;
      const time_starting = row[0].time_starting;
      const highest_bid = row[0].highest_bid;
      const bid_upload_user = row[0].bid_upload_user;
      const user = request.session.username;
      const bid_participant = row[0].bid_participant;
      console.log(bid_participant);
      console.log(user);

      var head = `
          <style>
          #wrapper {
              width: 100%
              height: 800px;
              border: 1px solid #d1d1d1;
              margin-top: auto;
          }
  
          #image {
             width: 50%;
             height: 500px;
             float: left;
             padding:10px;
             border: 1px solid #d1d1d1;
  
          }
  
          #contents {
              width: 50%;
              height: 500px;
              float: right;
              text-align: left;
              padding:10px;
              
          }
  
          #comment {
              claer: both;
              height:100px;
          }
          </style>
      `;
      // 시간 및 사용자 비교
      const now = new Date();
      const deadline = new Date(time_ending);
      var body = `
      <div id="wrapper">
  
          <div id="image">
            <img src='${art_file}' width: 50% height: 500px alt='${art_name}'>      
          </div>
  
          <div id="contents">
              <h3>작품명: ${art_name} </h3>
              작품설명: ${art_explain}
              <br><br>
              경매시작일: ${time_starting} -경매마감일: ${time_ending}
              <br><br>
              시작금액: ${initial_price}
              <br><br>
              현재금액: ${
                highest_bid === initial_price ? "입찰자 없음" : highest_bid
              }
              <br><br>
              <form action="/artwork_auction_process" method ="post">
                <input type="hidden" name = "list_no" value=${list_no}>
                <input type="hidden" name = "highest_bid" value=${highest_bid}>
                <input type="hidden" name = "bid_upload_user" value=${bid_upload_user}>
                <input type="hidden" name = "initial_price" value=${initial_price}>
                <input type="hidden" name = "bid_participant" value=${bid_participant}>
                
                ${
                  bid_upload_user === user
                    ? "<h5>자신의 작품은 낙찰할 수 없습니다.</h5>"
                    : now > deadline
                    ? "<h5>마감 기한이 지난 경매는 참여할 수 없습니다.</h5>"
                    : `<label>경매 금액: <input type="number" name ="bid_price" step="10" min="100" max="100000000"></label>
                    <br>
                    숫자 입력 : 10<input type="range" min="0" max="100000000">100000000
                    <br><br>
                    <button type="submit" style="width:50%"><b>낙찰</b></button>
                    `
                }
              </form>
          </div>
          <div class="container py-4 listing-comments" id="comment">
          <h4>댓글</h4>`;
      // 댓글
      db.query(
        `SELECT * from comment WHERE art_file = ?`,
        [list_no],
        function (err2, row2) {
          if (err2) {
            console.error(err2);
          } else {
            var i = 0;
            var artwork_auction = ``;
            var comment = ``;
            if (user === undefined) {
              if (row2[i] === undefined) {
                // 로그인이 안되어있으면서 댓글이 없는 경우
                artwork_auction += `
          <div class="comment-container">
            <span class="text-muted">
              댓글이 아직 없습니다.
            </span>
  
          </div>
          <hr>`;
              } else {
                while (i < row2.length) {
                  console.log(row2[i]);
                  // 로그인 안되어있으면서 댓글이 있는 경우
                  artwork_auction += `
          <div class="comment-container">
  
            <div style="margin: 5px;">
              <div class="comment-owner ">
                ${row2[i].comment_user}
              </div>
              <span class="comment-content">
                ${row2[i].art_comment}

              </span>
            </div>
          </div>
          <hr>`;
                  i++;
                }
              }
            } else {
              if (row2[i] == undefined) {
                // 로그인 되어있으면서 댓글이 없는 경우
                artwork_auction += `
          <div class="comment-container">
            <span class="text-muted">
              댓글이 아직 없습니다.
            </span>
  
          </div>
          <hr>`;
              } else {
                while (i < row2.length) {
                  // 로그인 되어있으면서 댓글이 있는 경우
                  artwork_auction += `
          <div class="comment-container">
  
            <div style="margin: 5px;">
              <div class="comment-owner ">
                ${row2[i].comment_user}
              </div>
              <span class="comment-content">
                ${row2[i].art_comment}
              ${
                user === row2[i].comment_user
                  ? `<span class="text-muted" style="text-align: right; margin-right: 5px;">
              <form class="comment_mod" action="/comment_mod" method="POST">    
                <input name="art_file" type="hidden" value="${list_no}">
                <input name="comment_no" type="hidden" value="${row2[i].comment_no}">
                <button name="comment_mod" type="submit" style="float: right;">수정</button>            </form>
            <form class="comment_del" action="/comment_del" method="POST">    
                <input name="comment_no" type="hidden" value="${row2[i].comment_no}">
                <input name="art_file" type="hidden" value="${list_no}">
                <button name="comment_del" type="submit" style="float: right;">삭제</button>
            </form>
            </span><hr>`
                  : "<hr>"
              }
              </span>
            </div>
          </div>
          `;
                  i++;
                }
              }
              comment += `<form class="comment-form" action="/comment" method="POST">
            댓글 입력:
  
            <textarea name="content" class="form-control" placeholder="여기에 댓글을 입력해주세요" rows="3"
              maxlength="400"></textarea>
            
            <input name="art_file" type="hidden" value="${list_no}">
            <br>
            <button class="btn btn-outline-secondary my-2" type="submit" style="float: right;">Comment</button>
    
          </form>`;
            }

            body += `${artwork_auction} ${comment} </div></div>`;

            var html = template.HTML(
              title,
              head,
              body,
              author.statusUI(request, response)
            );
            response.send(html);
          }
        }
      );
    }
  });
});

module.exports = router;
