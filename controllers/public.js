module.exports = function(models) {
  var Produto = models.Produto;
  var Client = models.Client;

  return {
    index: function(scope) {
      scope.currentUser = scope.session.currentUser;

      return Produto.all().then(function(produtos) {
        scope.produtos = produtos;
      });
    },
    show: function(scope) {
      var produtoId = scope.params.id;

      return Produto.find(produtoId).then(function(produto) {
        scope.produto = produto;
      });
    },
    createCarrinho: function(scope) {
    },
    carrinho: function(scope) {
    },
    updateCarrinho: function(scope) {
    },
    destroyCarrinho: function(scope) {
    }

  };

};
