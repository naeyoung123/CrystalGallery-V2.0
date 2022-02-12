var express = require("express");
const session = require("express-session");
var router = express.Router();
var template = require("../../lib/template.js");
var author = require("../../lib/author.js");
const db = require("../../db.js");

//coin 확인 떄문에 body에 대충 틀만 넣었는데 이름이랑 이메일은 어차피 css 적용 전이라 안보이고
//지금 들어가있는 틀 그냥 다 뜯어서 버려도 됩니다~!
router.get("/mypage", function (request, response) {
  var user = request.session.username;
  const sql = `SELECT email, username, coin FROM user WHERE username = ?`;
  db.query(sql, [user], (err, row) => {
    if (err) {
      console.error(err);
    } else {
      const email = row[0].email;
      const coin = row[0].coin;

      var title = "mypage";
      var authStatusUI = '<a class="nav-link" href="/login">로그인</a>';
      var head = `
    
    `;
      var body = `
                        <h5>
                            NAME:
                            <strong style="font-size: 17px;color:lightslategrey;">
                                ${user}
                            </strong>
                        </h5>
                        <h5>
                            E-mail: <strong
                                style="font-size: 17px; color:lightslategrey;">${email}</strong>
                        </h5>

                        <div>
                            <div>
                                <div class="text-muted"><strong style="font-weight: bold;">COIN</strong></div>
                                <div class="text-muted">${coin}</div>
                            </div>
                        </div>
                    </div>
    `;
      var html = template.HTML(
        title,
        head,
        body,
        author.statusUI(request, response)
      );
      response.send(html);
    }
  });
});

module.exports = router;
