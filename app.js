var express = require('express');
var app = express();

const mainRouter = require('./routes/main.js');

app.use('/', mainRouter);

app.listen(3000, function () {
    console.log("server is running.")
  });