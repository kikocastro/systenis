var _ = require("lodash");
var q = require("q");

module.exports = function(models) {
  var Item = models.Item;
  var Cliente = models.Cliente;

  return {
    update: function(req, res, next) {
      var updatedItem;
      var updatedItems = req.body.updatedItems;
      var updatedItemsIds = _.map(updatedItems, function(item) {
        return {id: item.id};
      });

      if(!updatedItemsIds.length) {
        res.redirect("/cliente/carrinho");
      }

      return Item.where(updatedItemsIds)
        .then(function(items) {
          var promises = [];

          _.each(items, function(item) {
            updatedItem = _.find(updatedItems, {id: item.id.toString()});

            if(item.quantidade !== updatedItem.quantidade) {
              item.quantidade = updatedItem.quantidade;
              promises.push(item.save());
            }
          });

          return q.all(promises);
        })
        .then(function() {
          return Cliente.find(req.session.currentUser.id);
        })
        .then(function(cliente) {
          return cliente.setCarrinho();
        })
        .then(function(cliente) {
          req.session.currentUser = cliente;
          
          if(!cliente.carrinho.itens.length) {
            res.redirect("/");
          }
          res.redirect("/cliente/carrinho");
        });
    },
    destroy: function(req, res, next) {
      var itemId = req.params.id;

      return Item.find(itemId)
        .then(function(item) {
          return item.delete();
        })
        .then(function() {
          return Cliente.find(req.session.currentUser.id);
        })
        .then(function(cliente) {
          return cliente.setCarrinho();
        })
        .then(function(cliente) {
          req.session.currentUser = cliente;
          if(!cliente.carrinho.itens.length) {
            res.redirect("/");
          }
          res.redirect("/cliente/carrinho");
        });
    }

  };

};