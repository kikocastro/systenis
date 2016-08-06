var _ = require("lodash");
var moment = require("moment");

module.exports = function(models) {
  var Funcionario = models.Funcionario;
  var Pedido = models.Pedido;
  var Pagamento = models.Pagamento;

  return {
    index: function(scope) {
      return Pedido.all().then(function(pedidos) {
        scope.pedidos = pedidos;
        console.log(pedidos);
      });
    },
    show: function(scope) {
      var pedidoId = scope.params.id;

      return Pedido.find(pedidoId)
      .then(function(pedido) {
        scope.pedido = pedido;
        scope.statuses = Pedido.STATUS;

        return Pagamento.where({pedido_id: pedido.id});
      })
      .then(function(pagamento) {
        scope.pagamento = _.first(pagamento);
      });
    },
    updateStatus: function(req, res) {
      var pedidoId = req.params.id;
      var status = Pedido.STATUS[req.body.status];

      if(!status.length) {
        return null;
      }
      
      return Pedido.find(pedidoId)
        .then(function(pedido) {
          pedido.status = status;
          return pedido.save();
        })
        .then(function(pedido) {
          res.json({pedido: pedido, status: "Status atualizado com sucesso"});
        });
    },

    confirmPayment: function(req, res, next) {
      var pedidoId = req.params.id;

      return Pagamento.where({pedido_id: pedidoId})
        .then(function(pagamento) {
          pagamento = _.first(pagamento);
          pagamento.confirmado_em =  moment().format('YYYY-MM-DD hh:mm:ss');
          return pagamento.save();
        })
        .then(function(pagamento) {
          if(!!pagamento.confirmado_em) {
            return Pedido.find(pedidoId);
          }
        })
        .then(function(pedido) {
          if(!!pedido) {
            pedido.status = Pedido.STATUS.PAYMENT_CONFIRMED;
            return pedido.save();
          }
        })
        .then(function(pedido) {
          return res.json(pedido);
        })
        .catch(function(error) {
          console.log("confirmPayment", error);
          return error;
        });
    }

  };
};