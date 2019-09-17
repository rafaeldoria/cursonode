var mysql = require('mysql');

var createDBConnection = function(){
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'ABC123.',
        database: 'nodejs'
    });
}

module.exports = function () {
    return createDBConnection;
}