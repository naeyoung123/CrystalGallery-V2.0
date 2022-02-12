var express = require("express");
var router = express.Router();
var template = require("../../lib/template.js");
var author = require("../../lib/author.js");
const db = require("../../db.js");
var path = require("path");

router.post("/artwork_auction_process", function (request, response) {
  var post = request.body;
  var bid_price = post.bid_price;
  bid_price = parseInt(bid_price);
  var user = request.session.username;
  var bid_upload_user = post.bid_upload_user;
  var highest_bid = post.highest_bid;
  highest_bid = parseInt(highest_bid);
  var listing_no = post.list_no;
  var bid_participant = post.bid_participant;
  console.log(user);
  console.log(bid_participant);
  db.query(
    // bid에서 해당하는 artwork 가져오기
    `SELECT * FROM bid WHERE art_bid_no=?`,
    [listing_no],
    function (err, res) {
      console.log(res[0]);
      if (res[0] === null) {
        db.query(
          // 만약 null이라면 bid에 값 넣기 -> null일 일도 없어서 02.19에 수정하겠음
          `INSERT INTO bid(bid_participant, art_bid_no, highest_bid) VALUES(?, ?, ?)`,
          [user, listing_no, bid_price],
          function (error, row) {
            if (error) {
              console.error(error);
            } else {
              response.writeHead(302, {
                Location: "/artwork_auction/" + listing_no,
              });
              response.end();
            }
          }
        );
      } else {
        // null이 아니라면
        // 같은 사용자인지 확인하기 -> 프론트에서 처리돼서 여기까지 안들어와도 될듯
        // 02.19에 수정하겠음
        if (user === bid_upload_user) {
          console.log("같은 사용자");
          response.writeHead(302, {
            Location: "/artwork_auction/" + listing_no,
          });
          response.end();
        } else {
          // 입찰가랑 최고가랑 비교
          console.log(highest_bid, bid_price, listing_no);
          if (bid_price > highest_bid) {
            // 입찰가가 더 높으면
            if (res[0].bid_participant === null) {
              console.log("비교");
              db.query(
                `UPDATE bid SET bid_participant = ?, highest_bid = ? WHERE art_bid_no = ?`,
                [user, bid_price, listing_no],
                function (err2, row1) {
                  if (err2) {
                    console.error(err2);
                  } else {
                    // user 테이블을 검사하고 username이랑 동일한 bid_participant 즉, 지금 로그인한 입찰하려는 사람의 금액에서 차감
                    db.query(
                      `SELECT coin FROM user WHERE username = ?`,
                      [user],
                      function (err3, row2) {
                        if (err3) {
                          console.error(err3);
                        } else {
                          var coin = row2[0].coin;
                          coin = parseInt(coin);
                          coin -= bid_price;
                          db.query(
                            `UPDATE user SET coin = ? WHERE username = ?`,
                            [coin, user],
                            function (err4, row3) {
                              if (err4) {
                                console.error(err4);
                              } else {
                                response.writeHead(302, {
                                  Location: "/artwork_auction/" + listing_no,
                                });
                                response.end();
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                }
              );
            } else {
              db.query(
                //최고가로 입찰했던 사람 = bid_participant의 coin 찾기
                `SELECT coin FROM user WHERE username =?`,
                [bid_participant],
                function (err2, row1) {
                  if (err2) {
                    console.error(err2);
                  } else {
                    console.log(bid_participant);
                    var coin = row1[0].coin;
                    coin = parseInt(coin);
                    coin += highest_bid;
                    //현재 입찰가보다 더 높은 금액으로 입찰한 사람이 생겨서 전 최고 입찰자에게 돈 돌려주기
                    db.query(
                      `UPDATE user SET coin = ? WHERE username = ?`,
                      [coin, bid_participant],
                      function (err3, row2) {
                        if (err3) {
                          console.error(err3);
                        } else {
                          db.query(
                            // 현재 최고가로 입찰한 사람 = user
                            `SELECT coin FROM user WHERE username =?`,
                            [user],
                            function (err4, row3) {
                              if (err3) {
                                console.error(err4);
                              } else {
                                var new_coin = row3[0].coin;
                                new_coin = parseInt(new_coin);
                                new_coin -= bid_price;
                                db.query(
                                  // 최고가로 입찰했기 때문에 coin을 bid_price만큼 깎아
                                  `UPDATE user SET coin = ? WHERE username = ?`,
                                  [new_coin, user],
                                  function (err4, row3) {
                                    if (err4) {
                                      console.error(err4);
                                    } else {
                                      db.query(
                                        // bid에서 최고가로 입찰한 사람 = participant와 현 최고가 = highest_bid 를 업데이트
                                        `UPDATE bid SET bid_participant = ?, highest_bid = ? WHERE art_bid_no = ?`,
                                        [user, bid_price, listing_no],
                                        function (err5, row4) {
                                          if (err5) {
                                            console.error(err5);
                                          } else {
                                            response.writeHead(302, {
                                              Location:
                                                "/artwork_auction/" +
                                                listing_no,
                                            });
                                            response.end();
                                          }
                                        }
                                      );
                                    }
                                  }
                                );
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                }
              );
            }
          } else {
            // 입찰가가 더 낮으면
            console.log("bid_price가 highest_bid보다 작거나 같은 경우");
            response.send(
              `<script type="text/javascript">alert("현재가보다 낮은 금액은 입찰하실 수 없습니다.");window.location.href = '/artwork_auction/' + ${listing_no} </script>;`
            );
          }
        }
      }
    }
  );
});

module.exports = router;
