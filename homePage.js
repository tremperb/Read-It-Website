module.exports = function(){

    var express = require('express');
    var router = express.Router();


    router.get('/', function(req, res){
      var context = {};
      var count = 0;
      //context.jsscripts = ["filterAdmin.js"];
      var mysql = req.app.get('mysql');
      res.status(200).render('error404', context);

    });

    router.get('/:id', function(req, res){
      var context = {};
      var count = 0;
      //context.jsscripts = ["filterAdmin.js"];
      var mysql = req.app.get('mysql');
      context.userID = req.params.id;
      res.status(200).render('mainPage', context);

    });






  return router;
}();
