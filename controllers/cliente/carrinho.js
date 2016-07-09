var _ = require("lodash");

module.exports = function(models) {
  var Carrinho = models.Carrinho;
  var Item = models.Item;

  return {
    update: function(scope) {
      var clienteId = scope.session.currentUser.id;
      var produtoId = scope.params.produto_id;
      var quantidade;

      return Carrinho.where({cliente_id: clienteId})
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
          console.log("### item", item);
          res.redirect("/carrinho");
        });
    },
    show: function(req, res, next) {

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
