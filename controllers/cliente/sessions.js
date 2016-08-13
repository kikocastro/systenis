var _ = require('lodash');

module.exports = function(models, services) {
  var Authentication = services.AuthenticationFor("Cliente");

  return {
    new: function(scope) {  
      if(scope.query.error === 'wrong_information') {
        scope.loginError = "Email e/ou senha incorretos";
      }
    },
    create: function(req, res, next) {
      var email = req.body.cliente.email;
      var password = req.body.cliente.password;
      var session = req.session;

      return Authentication.login(email, password, session)
        .then(function(cliente) {
          return cliente;
          }, function(error) {
          // Authentication fail
          console.log(error);
          res.redirect("/cliente/sessions/new?error=wrong_information");
        })
        .then(function(cliente) {
          return cliente.setCarrinho();
        })
        .then(function(cliente) {
          console.log("Created session. cliente:", cliente);
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
