var _ = require("lodash");
var q = require("q");

module.exports = function(models) {
  var Pedido = models.Pedido;
  var Item = models.Item;
  var Carrinho = models.Carrinho;
  var Cliente = models.Cliente;

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
      // return Produto.all().then(function(produtos) {
      //   scope.produtos = produtos;
      // });
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

      pedido.endereco_id = endereco.endereco_id;
      pedido.status = Pedido.STATUS.WAITING_PAYMENT_CONFIRMATION;

      return Cliente.find(currentUser.id)
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
          var totalDaCompra = _.sum(_.map(carrinho.itens, 'total')).toFixed(2);
          pedido.valor_total = parseFloat(totalDaCompra);

          return Pedido.create(pedido);
        })
        .then(function(pedido) {
          scope.pedido = pedido;

          var promises = _.map(scope.carrinho.itens, function(item) {
            item.pedido_id = pedido.id;
            item.carrinho_id = null;
            return item.save();
          });

          return q.all(promises);
        })
        .then(function() {
          res.redirect("/cliente/pedidos/" + scope.pedido.id);
        })


    },
    show: function(scope) {
      // var produtoId = scope.params.id;
      //
      // return Produto.find(produtoId).then(function(produto) {
      //   scope.produto = produto;
      // });
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
    "status",
    "valor_total",
    "entrega_parcial"
  ];

  return permittedParams;
}
