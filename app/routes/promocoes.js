module.exports = function(app) {
    app.get("/promocoes/form", function(req, res){
        var connection = app.database.connectionFactory();
        var produtosDAO = new app.database.ProdutosDAO(connection);

        produtosDAO.lista(function (err, results) {
            if (err) {
                return next(err)
            }
            res.render('promocoes/form', {lista: results});
        });
        connection.end();
    });

    app.post("/promocoes",function(req,res){
        var promocao = req.body;
        app.get('io').emit('novaPromocao',promocao);
        res.redirect('promocoes/form');
    });
}