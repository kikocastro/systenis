var _ = require('lodash');

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
          return Cortesia.where({ativa:true});
        })
        .then(function(cortesia) {
          cortesia = _.first(cortesia);
          scope.haPromocao = false;

          if(!_.isEmpty(cortesia) && scope.produtos.length) {
            scope.haPromocao = true;
            scope.produtos = formatPricesWithDiscount(scope.produtos, cortesia);
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

///////////////
// Helpers
///////////////

function formatPricesWithDiscount(produtos, cortesia) {

  _.each(produtos, function(produto) {
    produto.preco_com_desconto = cortesia.getPriceWithDiscount(produto.preco);
  });

  return produtos;
}

