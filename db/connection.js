const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Benihana246!',
  database: 'hirearchy'
});

module.exports = db;