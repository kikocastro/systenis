var _ = require("lodash");
var q = require("q");
var moment = require("moment");

module.exports = function(models) {
  var Pedido = models.Pedido;
  var Item = models.Item;
  var Carrinho = models.Carrinho;
  var Cliente = models.Cliente;
  var Cortesia = models.Cortesia;
  var Pagamento = models.Pagamento;
  var Transportadora = models.Transportadora;
  var Funcionario = models.Funcionario;

  return {
    new: function(scope) {
      return Cliente.find(scope.currentUser.id)
        .then(function(cliente) {
          return cliente.setEnderecos();
        })
        .then(function(cliente) {
          return cliente.setCarrinho();
        })
        .then(function(cliente) {
          scope.session.currentUser = cliente;
          scope.carrinho = scope.session.currentUser.carrinho;
          return scope.carrinho.populateItems();
        })
        .then(function(carrinho) {
          scope.carrinho.itens = _.sortBy(scope.carrinho.itens, 'id');
          scope.carrinho = carrinho;
          scope.pedido = {};
          scope.formaDePagamento = 'cartao';
          scope.enderecos = scope.session.currentUser.enderecos;
          scope.totalDaCompra = _.sum(_.map(carrinho.itens, 'total')).toFixed(2);
          scope.pedido.endereco_id = _.result(_.first(scope.enderecos), 'id');
        });
    },
    index: function(scope) {
      var clienteId = scope.session.currentUser.id;

      return Pedido.where({cliente_id:clienteId}).then(function(pedidos) {
        scope.pedidos = _.sortBy(pedidos, 'id').reverse();
      });
    },
    update: function(req, res) {
      // var editedProduto = req.body.produto;
      // var permittedParams = getPermittedParams();
      //
      // return Produto.find(editedProduto.id)
      //   .then(function(produto) {
      //
      //     _.each(permittedParams, function(param) {
      //       produto[param] = editedProduto[param];
      //     });
      //
      //     return produto.save();
      //   })
      //   .then(function(produto) {
      //     res.redirect("/intranet/produtos/" + produto.id);
      //   });
    },
    create: function(req, res, next) {
      var currentUser = req.currentUser;
      var pedido = req.body.pedido;
      var endereco = JSON.parse(pedido.endereco_id);
      var scope = {};
      var pagamento = {
        forma: pedido.forma_de_pagamento,
        parcelas: pedido.parcelas
      };

      pedido.endereco_id = endereco.endereco_id;
      pedido.status = Pedido.STATUS.WAITING_PAYMENT_CONFIRMATION;
      pedido.cliente_id = currentUser.id;

      return Cortesia.where({ativa:true})
        .then(function(cortesias) {
          var cortesia = _.first(cortesias);        
          if(!_.isEmpty(cortesia)) {
              pedido.cortesia_id = cortesia.id;
          }
        })
        .then(function() {
          return Cliente.find(currentUser.id)
        })      
        .then(function(cliente) {
          return cliente.setEnderecos();
        })
        .then(function(cliente) {
          return cliente.setCarrinho();
        })
        .then(function(cliente) {
          currentUser = cliente;
          scope.carrinho = currentUser.carrinho;
          return scope.carrinho.populateItems();
        })
        .then(function(carrinho) {
          scope.carrinho = carrinho;
          return Funcionario.getAvailable();
        })
        .then(function(funcionarioId) {
          console.log("@@1", funcionarioId);
          var frete = Transportadora.calculaFrete(endereco.cep).price;
          var totalDaCompra = +_.sum(_.map(scope.carrinho.itens, 'total')).toFixed(2) + +frete;
          pedido.valor_total = parseFloat(totalDaCompra);
          pedido.frete = parseFloat(frete);
          pedido.funcionario_id = funcionarioId;
          
          return Pedido.create(pedido);
        })
        .then(function(pedido) {
          scope.pedido = pedido;

          var promises = _.map(scope.carrinho.itens, function(item) {
            item.pedido_id = pedido.id;
            item.carrinho_id = null;
            item.preco_unitario = item.produto.preco - item.desconto;
            return item.save();
          });

          return q.all(promises);
        })
        .then(function() {
          pagamento.pedido_id = scope.pedido.id;
          pagamento.criado_em = moment().format('YYYY-MM-DD');
          return Pagamento.create(pagamento);
        })
        .then(function() {
          res.redirect("/cliente/pedidos/" + scope.pedido.id + "?msg=created");
        });


    },
    show: function(scope) {
      var pedidoId = scope.params.id;
      scope.successMessage = _.result(scope, 'query.msg');
      var Banco = models.Banco;

      if(scope.successMessage === 'created') {
        scope.successMessage = "Seu pedido foi criado com sucesso :-)";
      }
      
      return Pedido.find(pedidoId)
        .then(function(pedido) {

          if(scope.currentUser.id === pedido.cliente_id) {
            return pedido.setItems();
          }
          return false;
        })
        .then(function(pedido) {
          if(!!pedido) {
            scope.pedido = pedido;
          }
          return Cliente.find(scope.currentUser.id);
        })
        .then(function(cliente) {
          return cliente.setCarrinho();
        })
        .then(function(cliente) {
          scope.session.currentUser = cliente;
          scope.currentUser = cliente;
          if(!!scope.pedido) {
            return Pagamento.where({pedido_id: scope.pedido.id});
          }
        })
        .then(function(pagamento) {
          if(!!scope.pedido && !!pagamento) {
            scope.pagamento = _.first(pagamento);
            scope.pagamento.forma = Pagamento.FORMAS[scope.pagamento.forma];

            if(scope.pedido.status === Pedido.STATUS.WAITING_PAYMENT_CONFIRMATION && scope.pagamento.forma === Pagamento.FORMAS.BOLETO) {
              scope.boleto = Banco.geraBoleto(scope.pedido);
            }

          }
        });
    }

  };

};

///////////////
// Helpers
///////////////

function getPermittedParams() {

  var permittedParams = [
    "id",
    "funcionario_id",
    "endereco_id",
    "cliente_id",
    "status",
    "valor_total",
    "entrega_parcial"
  ];

  return permittedParams;
}
