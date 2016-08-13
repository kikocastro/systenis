var _ = require("lodash");

module.exports = function(models) {
  var Funcionario = models.Funcionario;

  return {
    show: function(scope) {
      scope.funcionario = scope.session.currentUser;
    },
    update: function(req, res, next) {
      var editedFuncionario = req.body.funcionario;
      var permittedParams = getPermittedParams();

      return Funcionario.find(editedFuncionario.id)
        .then(function(funcionario) {

          _.each(permittedParams, function(param) {
            funcionario[param] = editedFuncionario[param];
          });

          return funcionario.save();
        })
        .then(function(funcionario) {
          req.session.currentUser = funcionario;
          res.redirect("/intranet/perfil");
        }, function(error) {
          console.log(error);
          res.redirect("/intranet/perfil/edit?error=already_used");
        });
    },
    edit: function(scope) {
      scope.funcionario = scope.session.currentUser;
      if(scope.query.error === 'already_used') {
        scope.inUseError = "Email, CPF, RG ou Número da Carteira de Trabalho já cadastrados";
      }
    }
  };
};

function getPermittedParams() {

  var permittedParams = [
  	"nome",
    "sobrenome",
    "telefone",
    "sexo",
    "email",
    "cpf",
    "rg",
    "password",
    "carteira_de_trabalho",
    "data_de_nascimento",
  ];

  return permittedParams;
}
