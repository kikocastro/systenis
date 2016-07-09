var _ = require("lodash");

module.exports = function(models) {
  var Carrinho = models.Carrinho;
  var Item = models.Item;

  return {
    update: function(req, res) {
      var currentUser = req.session.currentUser;
      var produtoId = req.params.produto_id;
      var quantidade = req.params.quantidade;

      return Carrinho.where({cliente_id: currentUser.id})
        .then(function(carrinho) {
          return _.first(carrinho);
        })
        .then(function(carrinho) {
          return Item.findOrCreate(carrinho.id, produtoId);
        })
        .then(function(item) {
          if(quantidade) {
            // chart is being updated
            item.quantidade = quantidade;
          } else {
            // client clicked on button buy again
            item.quantidade += 1;
          }
          return item.save();
        })
        .then(function(item) {
          updateCurrentUserCarrinho(currentUser, item);
          res.redirect("/carrinho");
        });
    },
    show: function(scope) {
      var clienteId = scope.session.currentUser.id;

      

    },
    destroy: function(req, res, next) {
      // return Carrinho.where({cliente_id: req.currentUser.id})
      //   .then(function(cliente) {
      //     return carrinho.delete();
      //   })
      //   .then(function(cliente) {
      //     res.redirect("/intranet/clientes/");
      //   });
    }

  };

};

///////////////
// Helpers
///////////////

function updateCurrentUserCarrinho(currentUser, updatedItem) {
  _.each(currentUser.carrinho.itens, function(item) {
    if(item.id === updatedItem.id) {
      item = updatedItem;
    }
  });
}
