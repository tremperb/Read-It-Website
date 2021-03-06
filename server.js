/*
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name: Brayden Tremper
 * Email: tremperb@oregonstate.edu
 */

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars'); //so handlebars works
var app = express();
app.set('port', process.argv[2]);

/////
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');
//var pool = mysql.createPool(require('./dbcon.js'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
////

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.set('mysql', mysql);

/////////////////////
var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

//////////////////////

//No need to edit this one

app.use('/', require('./loginPage.js'));

app.use('/createAccount', require('./createAccountPage.js'));

app.use('/home', require('./homePage.js'));

app.use('/menu', require('./menuPage.js'));
//Change style to app.use when set up like others


app.get('*', function (req, res) {
  res.status(404).render('error404');
});

app.listen(app.get('port'), function () {
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
