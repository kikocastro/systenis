module.exports = function(models) {
  var Funcionario = models.Funcionario;

  return {
    show: function(scope) {
      scope.funcionario = scope.session.currentUser;
    },
    update: function(req, res) {
      var editedFuncionario = req.body.funcionario;
      var permittedParams = getPermittedParams();

      return Funcionario.find(editedFuncionario.id)
        .then(function(cliente) {

          _.each(permittedParams, function(param) {
            funcionario[param] = editedFuncionario[param];
          });

          return funcionario.save();
        })
        .then(function(funcionario) {
          res.redirect("/intranet/perfil");
        });
    },
    edit: function(req, res, next) {
      scope.cliente = req.session.currentUser;
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
