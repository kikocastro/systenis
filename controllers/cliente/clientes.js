module.exports = function(models) {
  var Cliente = models.Cliente;
  var Carrinho = models.Carrinho;

  return {
    new: function(scope) {

    },
    create: function(req, res, next) {
      var cliente = req.body.cliente;

      return Cliente.create(cliente)
      .then(function(cliente) {
        res.redirect("/cliente/sessions/new");
      });
    }

  };

};


