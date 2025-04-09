const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    database: 'project_01',
    user: 'D2_89484_PRATHAMESH',
    password: 'manager',
})

module.exports = db;