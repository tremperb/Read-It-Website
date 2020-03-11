module.exports = function(){

    var express = require('express');
    var router = express.Router();

    function getCurrentLog(res, mysql, context, done){
        mysql.pool.query("SELECT userID, userName, userPassword FROM userLogin", function(err, result, fields){
            if(err){
                console.log(err);
                res.write(JSON.stringify(err));
                res.end();
            }
            context.getLoginDB = result;

            done();
        });
    }

    router.post('/', function(req, res){

      var context = {};
      var verify = false;
      var mysql = req.app.get('mysql');

      getCurrentLog(res, mysql, context, done);
      function done(){
        for(var i = 0; i < context.getLoginDB.length; i++) {
          if(req.body.usernameInput == context.getLoginDB[i].userName) {
            if(req.body.passwordInput == context.getLoginDB[i].userPassword) {
              verify = true;
            }
          }
        }
        if(verify == true) {
          console.log("\nSuccessful Login\n");
          res.redirect('/home'); //change later to redirect to menu
        }
        else {
          console.log("\nFailure\n");
          context.failureStatus = "Incorrect Username or Password";
          res.status(200).render('login', context);
        }

      }

    });

    router.get('/', function(req, res){
      var context = {};
      var count = 0;
      //context.jsscripts = ["filterAdmin.js"];
      var mysql = req.app.get('mysql');
      res.status(200).render('login', context);

    });






  return router;
}();
