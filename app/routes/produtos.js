module.exports = function (app) {
    var listaProdutos = function (req, res, next) {
        var connection = app.database.connectionFactory();
        var produtosDAO = new app.database.ProdutosDAO(connection);

        produtosDAO.lista(function (err, results) {
            if (err) {
                return next(err)
            }
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
        res.render('produtos/form',{
            errosValidacao: {},
            produto: {}
        });
    });
    
    app.post('/produtos', function (req, res, next) {
        
        var produto = req.body;

        req.assert('titulo', 'Titulo é obrigatório').notEmpty();
        req.assert('preco', 'Formato inválido').isFloat();

        var erros = req.validationErrors();
        if(erros){
            res.format({
                html: function () {
                    res.status(400).render('produtos/form', {
                        errosValidacao: erros,
                        produto:produto
                    });
                },
                json: function () {
                    res.status(400).json({
                        "false": erros
                    });
                }
            });
            return;
        }
        
        var connection = app.database.connectionFactory();
        var produtosDAO = new app.database.ProdutosDAO(connection);
        produtosDAO.salvar(produto, function (err, results) {
            if (err) {
                return next(err)
            }
            res.redirect('/produtos');
        })
    });
}
