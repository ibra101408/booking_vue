const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'database',
});

module.exports = con;
