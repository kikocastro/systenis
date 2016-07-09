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
        return Carrinho.create({cliente_id: cliente.id});
      })
      .then(function(){
        res.redirect("/cliente/sessions/new");
      });
    }

  };

};


