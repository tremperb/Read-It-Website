var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_tremperb',
  password        : 'XXXXXXX',
  database        : 'cs340_tremperb'
});

module.exports.pool = pool;
