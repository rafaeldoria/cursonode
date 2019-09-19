var express = require('../config/express')();
var request = require('supertest')(express);
var DatabaseCleaner = require('database-cleaner');

require('dotenv').config();

console.log(process.env.NODE_ENV);

describe('#ProdutosController', function () {

    beforeEach(function(done) {
       var databaseCleaner = new DatabaseCleaner('mysql');
       databaseCleaner.clean(express.database.connectionFactory(), function() {
           done();
       });
    });
    
    it('#listagem json', function (done) {
        request.get('/produtos')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('#Novo Produto - Dados inválidos', function (done) {
        request.post('/produtos')
            .send({
                titulo: "",
                descricao: "teste error"
            })
            .expect(400, done);
    });

    it('#Novo Produto - success', function (done) {
        request.post('/produtos')
            .send({
                titulo: "Teste de novo produto",
                preco: 100.00,
                descricao: "Inserindo novo produto"
            })
            .expect(302, done);
    });
});
