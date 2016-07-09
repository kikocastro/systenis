var _ = require('lodash');

module.exports = function(models, services) {
  var Authentication = services.AuthenticationFor("Cliente");
  var Item = models.Item;
  var Carrinho = models.Carrinho;

  return {
    new: function(scope) {

    },
    create: function(req, res, next) {
      var email = req.body.cliente.email;
      var password = req.body.cliente.password;
      var session = req.session;

      return Authentication.login(email, password, session)
        .then(function(cliente) {
          return cliente;
          }, function() {
          // Authentication fail
          res.redirect("/cliente/sessions/new");
        })
        .then(function(cliente) {
          return Carrinho.where({cliente_id: cliente.id});
        })
        .then(function(carrinho) {
          var carrinho = _.first(carrinho);

          req.session.currentUser.carrinho = carrinho || {};

          return Item.where({carrinho_id: carrinho.id});
        })
        .then(function(itens) {
          req.session.currentUser.carrinho.itens = itens;
          req.session.currentUser.carrinho.totalItens = _.sum(_.map(itens, 'quantidade'));
        })
        .then(function() {
          res.redirect("/");
        });
      
    },
    delete: function(req, res, next) {
      var session = req.session;
      return Authentication.logout(session).then(function() {
        res.redirect("/");
      });
    }
  };

};
