var _ = require("lodash");

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
      console.log("@@@", req);
      // var currentUser = req.currentUser;
      //
      // return Carrinho.where({cliente_id: currentUser.id}).then(function(carrinho) {
      //   console.log("@@@", carrinho);
      //
      // }, function(err) {
      //   next(err);
      // });
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
