var _ = require("lodash");
var moment = require("moment");

module.exports = function(models) {
  var Funcionario = models.Funcionario;
  var Pedido = models.Pedido;
  var Pagamento = models.Pagamento;
  var Entrega = models.Entrega;
  var Nota = models.Nota;

  return {
    index: function(scope) {
      var currentUser = scope.session.currentUser;

      return Pedido.all()
      .then(function(pedidos) {
        scope.pedidos = _.sortBy(pedidos, 'id').reverse();

        if(currentUser.papel === 'saida') {
          scope.pedidos = _.filter(scope.pedidos, function(pedido) {
            return pedido.funcionario_id === currentUser.id;
          });
        }

        if(currentUser.papel === 'supervisor_saida') {
          return Funcionario.where({supervisor_id: currentUser.id});
        }
      })
      .then(function(funcionarios) {
        if(!_.isEmpty(funcionarios)) {
          var funcionarioIds = _.pluck(funcionarios, 'id');
          
          scope.pedidos = _.filter(scope.pedidos, function(pedido) {
            return _.includes(funcionarioIds, pedido.funcionario_id);
          });
        }
      });
    },
    show: function(scope) {
      var currentUser = scope.session.currentUser;
      var pedidoId = scope.params.id;

      return Pedido.find(pedidoId)
      .then(function(pedido) {
        scope.pedido = pedido;
        scope.statuses = Pedido.STATUS;

        if(currentUser.papel === 'saida' || currentUser.papel === 'supervisor_saida') {
          scope.statuses = _.filter(scope.statuses, function(status, key) {
            return key === "DELIVERED" || key === "PARTIALLY_DELIVERED" || key === "IN_TRANSIT";
          });
        }

        return pedido.setItems();
      })
      .then(function(pedido) {
        return Pagamento.where({pedido_id: pedido.id});
      })
      .then(function(pagamento) {
        scope.pagamento = _.first(pagamento);
        return Entrega.where({pedido_id: scope.pedido.id});
      })
      .then(function(entrega) {
        scope.entrega = _.first(entrega);

        if(!!_.result(scope, 'entrega.postado_em')) {
          scope.entrega.postado_em = moment(scope.entrega.postado_em).format('LLL');
        }
        if(!!_.result(scope, 'entrega.entregue_em')) {
          scope.entrega.entregue_em = moment(scope.entrega.entregue_em).format('LLL');
        }
        var funcionario_id = _.result(scope.pedido, 'funcionario_id');

        if(!!funcionario_id) {
          return Funcionario.find(funcionario_id);
        }
        return null;
      })
      .then(function(funcionario) {
        scope.funcionario = funcionario;
        return Nota.where({entrega_id: _.result(scope, 'entrega.id')});
      })
      .then(function(nota) {
        scope.notaFiscal = _.first(nota);

        if(scope.notaFiscal) {
          scope.notaFiscal.emissao =  moment(scope.notaFiscal.emissao).format('LLL')
        }
      });
    },
    updateStatus: function(req, res) {
      var pedidoId = req.params.id;
      var status = req.body.status;
      var currentUser = req.session.currentUser;
      var statusValue = Pedido.STATUS[status];
      var pedido, oldStatus;
      var response = {};

      if(!status.length) {
        return null;
      }
      
      return Pedido.find(pedidoId)
        .then(function(pedido) {
          oldStatus = pedido.status;
          pedido.status = statusValue;
          return pedido.save();
        })
        .then(function(updatedPedido) {
          pedido = updatedPedido;
          response = {
            pedido: pedido,
            status: "Status atualizado com sucesso"
          };

          if(oldStatus ===  Pedido.STATUS['PAYMENT_CONFIRMED'] && status === 'READY_TO_SHIP') {
            var entrega = {pedido_id: pedido.id, postado_em: moment().format('YYYY-MM-DD hh:mm:ss')};
            response.shouldReload = true;
            return Entrega.createWithNotaFiscal(entrega, updatedPedido);
          }

          return Entrega.where({pedido_id: pedido.id});
        })
        .then(function(entrega) {
          if(_.isArray(entrega)) {
            entrega = _.first(entrega);
          }
          if(!_.isEmpty(entrega)) {
            response.entrega = entrega;

            if(!entrega.entregue_em && oldStatus === Pedido.STATUS['IN_TRANSIT'] && pedido.status === Pedido.STATUS['DELIVERED']) {
              entrega.entregue_em = moment().format('YYYY-MM-DD hh:mm:ss');
              response.shouldReload = true;
              return entrega.save();
            }
          }
          return entrega;
        })
        .then(function(entrega) {
          if(!_.isEmpty(entrega)) {
            if(!!entrega.postado_em) {
              entrega.postado_em = moment(entrega.postado_em).format('LLL');
            }
            if(!!entrega.entregue_em) {
              entrega.entregue_em = moment(entrega.entregue_em).format('LLL');
            }
            response.entrega = entrega;
          }
          res.json(response);
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