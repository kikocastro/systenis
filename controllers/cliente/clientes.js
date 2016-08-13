module.exports = function(models) {
  var Cliente = models.Cliente;

  return {
    new: function(scope) {
      if(scope.query.error === 'already_used') {
        scope.inUseError = "Email e/ou CPF já cadastrados";
      }
    },
    create: function(req, res, next) {
      var cliente = req.body.cliente;

      return Cliente.create(cliente)
      .then(function(cliente) {
        res.redirect("/cliente/sessions/new");
      }, function(error) {
        console.log(error);
        res.redirect("/cliente/clientes/new?error=already_used");
      });
    }

  };

};