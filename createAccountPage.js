module.exports = function(){

    var express = require('express');
    var router = express.Router();


    router.post('/', function(req, res){

      var context = {};
      var mysql = req.app.get('mysql');

      /*
      You Can implement the create account here
      */

    });

    router.get('/', function(req, res){
      var context = {};
      var count = 0;
      //context.jsscripts = ["filterAdmin.js"];
      var mysql = req.app.get('mysql');
      res.status(200).render('createAccount', context);

    });






  return router;
}();
