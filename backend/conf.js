const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'soleil',
  database: 'ecoute_ecrit'
});
module.exports = connection;
