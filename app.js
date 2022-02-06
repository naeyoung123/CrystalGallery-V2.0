var express = require("express");
var app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false })); //body-parser 미들웨어 사용
app.use(express.static("public"));

const mainRouter = require("./routes/main.js");
const loginRouter = require("./routes/account/login.js");
const loginProcessRouter = require("./routes/account/login_process.js");
const logoutProcessRouter = require("./routes/account/logout_process.js");
const signupRouter = require("./routes/account/signup.js");
const signupProcessRouter = require("./routes/account/signup_process.js");

const mygalleryRouter = require("./routes/profile/mygallery.js");
const mypageRouter = require("./routes/profile/mypage.js");

const artworkListRouter = require("./routes/auction/artwork_list.js");
const artworkAuctionRouter = require("./routes/auction/artwork_auction.js");
const registerArtworkErrorRouter = require("./routes/auction/register_artwork_error.js");
const registerArtworkUpdateRouter = require("./routes/auction/register_artwork_update.js");
const registerArtworkRouter = require("./routes/auction/register_artwork.js");
const registerArtworkProcessRouter = require("./routes/auction/register_artwork_process.js");

app.use(
    session({
        secret: "my key",
        resave: false,
        saveUninitialize: true
    }));

app.use('/', mainRouter);
app.get('/login', loginRouter);
app.post('/login_process', loginProcessRouter);
app.get('/logout_process', logoutProcessRouter);
app.get('/signup', signupRouter);
app.post('/signup_process', signupProcessRouter);

app.get('/mygallery', mygalleryRouter);
app.get('/mypage', mypageRouter);

app.get('/artwork_list', artworkListRouter);
app.post('/artwork_list/:sortId', artworkListRouter);
//app.get('/artwork_auction', artworkAuctionRouter);
app.get('/artwork_auction/:listing_no', artworkAuctionRouter);
app.get('/register_artwork_error', registerArtworkErrorRouter);
app.get('/register_artwork_update', registerArtworkUpdateRouter);
app.get('/register_artwork', registerArtworkRouter);
app.post("/register_artwork_process", registerArtworkProcessRouter);
app.use("/register_artwork_process", express.static("uploads")); //사진 경로

app.listen(3000, function() {
    console.log("server is running.")
});