var _ = require("lodash");

module.exports = function(models) {
  var Funcionario = models.Funcionario;

  return {
    index: function(scope) {
      return Funcionario.all().then(function(funcionarios) {
        scope.funcionarios = funcionarios;
      });
    },
    new: function(scope) {
      if(scope.query.error === 'already_used') {
        scope.inUseError = "Email, CPF ou Carteira de Trabalho já cadastrados";
      }
    },
    edit: function(scope) {
      var funcionarioId = scope.params.id;

      return Funcionario.find(funcionarioId).then(function(funcionario) {
        scope.funcionario = funcionario;
        if(scope.query.error === 'already_used') {
          scope.inUseError = "Email, CPF ou Carteira de Trabalho já cadastrados";
        }
      });
    },
    update: function(req, res) {
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
          res.redirect("/intranet/funcionarios/" + funcionario.id);
        }, function(error) {
          console.log(error);
          res.redirect("/intranet/funcionarios/" + editedFuncionario.id + "/edit?error=already_used");
        });
    },
    create: function(req, res, next) {
      var funcionario = req.body.funcionario;

      funcionario.password = generatePassword();

      return Funcionario.create(funcionario)
        .then(function(funcionario) {
          res.redirect("/intranet/funcionarios/" + funcionario.id);
        }, function(error) {
          console.log(error);
          res.redirect("/intranet/funcionarios/new?error=already_used");
        });
    },
    show: function(scope) {
      var funcionarioId = scope.params.id;

      return Funcionario.find(funcionarioId).then(function(funcionario) {
        scope.funcionario = funcionario;
      });
    },
    destroy: function(req, res, next) {
      var funcionarioId = req.params.id;

      return Funcionario.find(funcionarioId)
        .then(function(funcionario) {
          return funcionario.delete();
        })
        .then(function(funcionario) {
          res.redirect("/intranet/funcionarios/");
        });
    }

  };

};

///////////////
// Helpers
///////////////

function generatePassword() {
  return "123123";
}

function getPermittedParams() {

  var permittedParams = [
    "nome",
    "sobrenome",
    "telefone",
    "sexo",
    "email",
    "cpf",
    "rg",
    "telefone",
    "data_de_nascimento",
    "papel",
    "carteira_de_trabalho",
    "data_de_inicio_do_contrato",
    "data_de_fim_do_contrato"
  ];

  return permittedParams;
}
