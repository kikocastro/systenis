var _ = require("lodash");

module.exports = function(models) {
  var Endereco = models.Endereco;

  return {
    index: function(scope) {
      var clienteId = scope.session.currentUser.id;


      return Endereco.where({cliente_id:clienteId}).then(function(enderecos) {
        scope.enderecos = enderecos;
      });
    }

  };
};


