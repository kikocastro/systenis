var _ = require("lodash");

module.exports = function(models) {
  var Funcionario = models.Funcionario;
  var Pedido = models.Pedido;

  return {
    index: function(scope) {
      return Pedido.all().then(function(pedidos) {
        scope.pedidos = pedidos;
        console.log(pedidos);
      });
    },

    show: function(scope) {
      var pedidoId = scope.params.id;
      
      return Pedido.find(pedidoId).then(function(pedido) {
        scope.pedido = pedido;
      });
    }

  };
};