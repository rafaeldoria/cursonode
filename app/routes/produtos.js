module.exports = function (app) {
    var listaProdutos = function (req, res) {
        var connection = app.database.connectionFactory();
        var produtosDAO = new app.database.ProdutosDAO(connection);

        produtosDAO.lista(function (err, results) {
            res.format({
                html: function() {
                    res.render('produtos/lista', {
                        lista: results
                    });
                },
                json: function() {
                  res.json(results);  
                }
            });
        });

        connection.end();
    };
    app.get('/produtos', listaProdutos);
    
    app.get('/produtos/form', function (req, res) {
        res.render('produtos/form');
    });
    
    app.post('/produtos', function (req, res) {
        
        var produto = req.body;
        
        var connection = app.database.connectionFactory();
        var produtosDAO = new app.database.ProdutosDAO(connection);
        produtosDAO.salvar(produto, function (err, results) {
            res.redirect('/produtos');
        })
    });
}
