var mysql = require('mysql');

var createDBConnection = function(){
    if(!process.env.NODE_ENV){
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'ABC123.',
            database: 'nodejs'
        });
    }

    if(process.env.NODE_ENV == 'test'){
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'ABC123.',
            database: 'nodejs_test'
        });
    }
;}

module.exports = function () {
    return createDBConnection;
}