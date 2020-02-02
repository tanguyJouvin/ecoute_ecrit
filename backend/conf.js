const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'soleil',
  database: 'ecoute_ecrit',
  multipleStatements: true
});
module.exports = connection;
