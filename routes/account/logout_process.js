var express = require('express');
var router = express.Router();
var template = require('../../lib/template.js');

router.get('/logout_process', function(req,res){
    if( req.session.is_logined){
        req.session.destroy(function(err){
            if(err) throw err;
            res.redirect('/');
        });
    }
    else{
        res.redirect('/');
    }
});

module.exports = router;