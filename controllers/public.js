module.exports = function(models) {
  var Produto = models.Produto;
  var Cortesia = models.Cortesia;
  var Client = models.Client;

  return {
    index: function(scope) {
      scope.currentUser = scope.session.currentUser;

      return Produto.all()
        .then(function(produtos) {
          scope.produtos = produtos;
          return produtos;
        })
        .then(function() {
          return Cortesia.where({ativa:true})
        })
        .then(function(cortesias) {
          scope.haPromocao = false;

          if(cortesias.length > 0) {
            scope.haPromocao = true;
          }
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
