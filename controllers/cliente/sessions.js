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
          return cliente.setCarrinho();
        })
        .then(function(cliente) {
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
