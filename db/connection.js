const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Benihana246!',
  database: 'hirearchy'
});

db.connect(err => {
    if (err) throw err;
});



module.exports = db;