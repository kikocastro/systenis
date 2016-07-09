var _ = require("lodash");

module.exports = function(models) {
  var Cliente = models.Cliente;
  var Carrinho = models.Carrinho;

  return {
    update: function(req, res) {
      // var editedCliente = req.body.cliente;
      // var permittedParams = getPermittedParams();

      // return Cliente.find(editedCliente.id)
      //   .then(function(cliente) {

      //     _.each(permittedParams, function(param) {
      //       cliente[param] = editedCliente[param];
      //     });

      //     return cliente.save();
      //   })
      //   .then(function(cliente) {
      //     res.redirect("/intranet/clientes/" + cliente.id);
      //   });
    },
    show: function(req, res, next) {

    },
    destroy: function(req, res, next) {
      // return Carrinho.where({cliente_id: req.currentUser.id})
      //   .then(function(cliente) {
      //     return carrinho.delete();
      //   })
      //   .then(function(cliente) {
      //     res.redirect("/intranet/clientes/");
      //   });
    }

  };

};

///////////////
// Helpers
///////////////

function getPermittedParams() {

  var permittedParams = [
    "cliente_id"
  ];

  return permittedParams;
}
