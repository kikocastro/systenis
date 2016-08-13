var _ = require("lodash");

module.exports = function(models) {
  var Cliente = models.Cliente;

  return {
    show: function(scope) {
      scope.cliente = scope.session.currentUser;
    },
    update: function(req, res, next) {
      var editedCliente = req.body.cliente;
      var permittedParams = getPermittedParams();

      return Cliente.find(editedCliente.id)
        .then(function(cliente) {

          _.each(permittedParams, function(param) {
            cliente[param] = editedCliente[param];
          });

          return cliente.save();
        })
        .then(function(cliente) {
          req.session.currentUser = cliente;
          res.redirect("/cliente/perfil");
        }, function(error) {
          console.log(error);
          res.redirect("/cliente/perfil/edit?error=already_used");
        });
    },
    edit: function(scope) {
      scope.cliente = scope.session.currentUser;
      if(scope.query.error === 'already_used') {
        scope.inUseError = "Email, CPF ou RG já cadastrados";
      }
    }
  };
};

function getPermittedParams() {

  var permittedParams = [
  	"nome",
  	"sobrenome",
  	"password",
  	"email",
  	"cpf",
  	"rg",
  	"telefone",
  	"data_de_nascimento",
  	"sexo"
  ];

  return permittedParams;
}
