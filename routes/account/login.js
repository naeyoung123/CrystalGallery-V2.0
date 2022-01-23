var express = require('express');
var router = express.Router();
var template = require('../../lib/template.js');
var author = require('../../lib/author.js');

router.get('/login', function (request, response) {
    var title = '로그인';
    var head = `
    <style>
        main>.container {
            padding: 60px 15px 0;
        }

        body {
            text-align: center;
            background-color: rgb(0, 0, 0);
            color : rgb(255,255,255);
        }

        #signupLogo {
            color : rgb(255,255,255);
            font-size: 3.0rem;
            margin-bottom: 30px;
        }

        .signupBox {
            background-color: white;
            width: 50%;
            height: 50%;
            text-align: center;
            border: 1px solid rgb(0, 0, 0);
            margin-top: 300px;
            border-radius: 30px;
            padding-bottom: 30px;
        }

        .inputField {
            background-color: white;
            margin-bottom: 77px;
        }

        .input-type {
            color: black;
            font-size: 1.0rem;
            font-weight: 700;
            border: 2px solid white;
            box-shadow: 1px 1px 4px rgb(165, 165, 165);
            display: inline-block;
            width: 270px;
            height: 35px;
            margin-top: 8px;
            margin-bottom: 10px;
            border-radius: 10px;
            padding: 3px 5px 3px 15px;
        }

        #pwpara,
        #emailpara{
            color: rgb(255,255,255);
            font-weight: 700;
            margin-bottom: 0px;
            margin-right: 200px;
            padding-left: 60PX;
            font-size: 1.1rem;
        }

        #emailpara {
            margin-right: 260px;
        }

        #pwpara {
            margin-right: 230px;
        }

        #signupSubmitBtn {
            border-color: #ffffff;
            background-color: #000000;
            width: 270px;
            color: #ffffff;
            font-weight: 700;
            font-size: 1.0rem;
            vertical-align: middle;
            padding-top: 10px;
            padding-bottom: 10px;
            border: 0.2px solid rgb(158, 158, 158);
            border-radius: 15px;
            cursor: pointer;
            margin-top: 20px;
        }

        #orpara {
            color: rgb(216, 216, 216);
            font-weight: 700;
            margin-top: 25px;
            margin-bottom: 25px;
        }

        #loginpara,
        #link {
            margin-top: 10px;
            margin-bottom: 0;
            font-size: 0.9rem;
            color: rgb(143, 143, 143);
            font-weight: 700;
        }

        #link {
            color: white;
            text-decoration-line: none;
        }
    </style>

    <script>
        function login(){
            const emailReg = document.getElementById("email").value;
            const passwordReg = document.getElementById("password").value;

            const email_check = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
            if (!emailReg.match(email_check)) {
                return alert('올바른 이메일 형식을 입력하세요.');
            }
        }
    </script>
    `;
    var body = `
    <main class="flex-shrink-0">
        <br><br><br>
        <div class="container">
            <div className="signupBox">
                <p id="signupLogo"><strong>Log In</strong></p>
                <form action="/login_process" method="post" className="inputField">
                    <p id="emailpara">Email</p>
                    <input type="email" name="email" class="input-type" placeholder="email">
                    <br>
                    <p id="pwpara">Password</p>
                    <input type="password" name="password" class="input-type" placeholder="password">
                    <br>
                    <button type="submit" id="signupSubmitBtn" onClick=login()>Log In</button>

                    <p id="orpara">─────────────　OR　─────────────</p>
                    <p id="loginpara">Forgot your password?<a href="/find_password" id="link">　Find Password</b></a></p>
                    <p id="loginpara">Don't you have an account?<a href="/signup" id="link">　Sign Up</b></a></p>
                </form>
            </div>
        </div>
    </main>
    `;
    var html = template.HTML(title, head, body, author.statusUI(request, response));
    response.send(html);
});

module.exports = router;