module.exports = function(models, services) {
  var Authentication = services.AuthenticationFor("Funcionario");

  return {
    new: function(scope) {
      if(scope.query.error === 'wrong_information') {
        scope.loginError = "Email e/ou senha incorretos";
      }
    },
    create: function(req, res, next) {
      var email = req.body.funcionario.email;
      var password = req.body.funcionario.password;
      var session = req.session;

      return Authentication.login(email, password, session).then(function(user) {
        res.redirect("/intranet/clientes/");
      }, function() {
        // Authentication fail
        res.redirect("/intranet?error=wrong_information");
      });
    },
    delete: function(req, res, next) {
      var session = req.session;

      return Authentication.logout(session).then(function() {
        res.redirect("/intranet/");
      }, function() {
        res.redirect("/intranet/");
      });
    }
  };

};

function permittedParams(user) {

}
