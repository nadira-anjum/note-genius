const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // your MySQL password
  database: 'notegenius'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('✅ MySQL connected');
});

module.exports = connection;
