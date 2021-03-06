var _ = require("lodash");

module.exports = function(models) {
  var Item = models.Item;
  var Cliente = models.Cliente;
  var Produto = models.Produto;

  return {
    update: function(req, res) {

      var currentUser = req.session.currentUser;
      var produtoId = req.body.carrinho.produto_id;
      var quantidade = req.body.carrinho.quantidade;

      return Cliente.find(currentUser.id)
        .then(function(cliente) {
          cliente.carrinho = currentUser.carrinho;
          currentUser = cliente;
          return currentUser.carrinho;
        })
        .then(function(carrinho) {
          var item = _.find(carrinho.itens, function(item) {
            return item.produto_id === produtoId;
          });

          if(!!item) {
            return item;
          } else {
            return Item.findOrCreate(carrinho.id, produtoId);
          }
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
          return currentUser.setCarrinho();
        })
        .then(function(cliente) {
          req.session.currentUser.carrinho = cliente.carrinho;
          res.redirect("/cliente/carrinho");
        });
    },
    show: function(scope) {
      
      return Cliente.find(scope.currentUser.id)
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
          scope.totalDaCompra = _.sum(_.map(carrinho.itens, 'total')).toFixed(2);
        });
    },
    destroy: function(req, res, next) {

    }

  };

};



