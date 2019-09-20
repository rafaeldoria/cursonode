module.exports = function(app) {
    app.get('/',function(req, res) {
        var connection = app.database.connectionFactory();
        var produtosDAO = new app.database.ProdutosDAO(connection);

        produtosDAO.lista(function (err, results) {
            if (err) {
                return next(err)
            }
            res.render('home/index',{livros:results});
        });
        connection.end();
    });
}