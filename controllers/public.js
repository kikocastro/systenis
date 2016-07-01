module.exports = function(models) {
  var Client = models.Client;

  return {
    index: function(scope) {
      scope.currentUser = scope.session.currentUser;
    },
    show: function(scope) {
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
