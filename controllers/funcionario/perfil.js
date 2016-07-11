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
        });
    },
    edit: function(scope) {
      scope.funcionario = scope.session.currentUser;
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
