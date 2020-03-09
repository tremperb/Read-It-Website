module.exports = function(){

    var express = require('express');
    var router = express.Router();

    function getSelectedTripInfo(req, res, mysql, context, done){
      var id = [req.params.id];

        mysql.pool.query("SELECT tripType, distanceTraveled, experienceLevel, tripLength FROM trip WHERE tripID=" + id, function(err, result, fields){
            if(err){
                console.log(err);
                res.write(JSON.stringify(err));
                res.end();
            }

            context.selectedTripInfo = result;

            done();
        });
    }

    function getSelectedTripLocation(req, res, mysql, context, done){
      var id = [req.params.id];
      console.log(req.params);
        mysql.pool.query("SELECT destination, maxAltitude, anticipatedAvgTemperature, anticipatedSkyCondition FROM location WHERE tripID=" + id, function(err, result, fields){
            if(err){
                console.log(err);
                res.write(JSON.stringify(err));
                res.end();
            }

            context.selectedTripLocation = result;

            done();
        });
    }


    router.post('/', function(req, res) {
      var mysql = req.app.get('mysql');
      console.log("in1");
      var sql = "INSERT INTO trip (tripType, distanceTraveled, experienceLevel, tripLength) VALUES(?, ?, ?, ?)";
      var inserts = [req.body.tripTypeInput, req.body.distanceInput, req.body.levelInput, req.body.tripLengthInput];
      sql = mysql.pool.query(sql, inserts, function(err, result, fields){
              if(err){
                  res.write(JSON.stringify(err));
                  res.end();
              }else{
                  // console.log("CUSTOMER ADDED TO DATABASE");
                console.log("in2");
                var newTripId;
                mysql.pool.query("SELECT tripID FROM trip ORDER BY tripID DESC LIMIT 1", function(err, result, fields){
                    if(err){
                        console.log(err);
                        res.write(JSON.stringify(err));
                        res.end();
                    }

                    newTridId = result;

                });

                sql = "INSERT INTO location (tripID, destination, maxAltitude, anticipatedAvgTemperature, anticipatedSkyCondition) VALUES(?, ?, ?, ?, ?)";
                inserts = [newTripId, req.body.destinationInput, req.body.altitudeInput, req.body.temperatureInput, req.body.skyInput];
                console.log("inserts:", inserts);
                sql = mysql.pool.query(sql, inserts, function(err, result, fields) {
                    if(err) {
                      res.write(JSON.stringify(err));
                      res.end();
                    }else {
                      res.redirect('/admin');
                    }

                });

              }
          });
    });

    router.get('/', function(req, res){
      var context = {};
      var count = 0;
      console.log("getting");
      //context.jsscripts = ["filterAdmin.js"];
      var mysql = req.app.get('mysql');
      res.status(200).render('admin', context);

    });



router.get('/update/:id', function(req, res){
    var context = {};
    var count = 0;
    context.jsscripts = ["filterAdmin.js"];
    var mysql = req.app.get('mysql');
    context.tid = [req.params.id];
    getSelectedTripInfo(req, res, mysql, context, done);
    getSelectedTripLocation(req, res, mysql, context, done);

    function done(){
      count++;
      if(count >= 2) {
        res.status(200).render('update-trip', context);
      }
    }


});




  return router;
}();
