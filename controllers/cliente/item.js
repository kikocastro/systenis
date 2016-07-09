var _ = require("lodash");

module.exports = function(models) {
  var Item = models.Item;
  var Cliente = models.Cliente;

  return {
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
          console.log("@@@ cli", cliente);
          req.session.currentUser = cliente;
          if(!cliente.carrinho.itens.length) {
            res.redirect("/");
          }
          res.redirect("/cliente/carrinho");
        });
    }

  };

};