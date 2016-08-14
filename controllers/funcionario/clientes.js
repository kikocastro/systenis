var _ = require("lodash");

module.exports = function(models) {
  var Cliente = models.Cliente;

  return {
    index: function(scope) {
      return Cliente.all().then(function(clientes) {
        scope.clientes = clientes;
      });
    },
    new: function(scope) {
      if(scope.query.error === 'already_used') {
        scope.inUseError = "Email e/ou CPF já cadastrados";
      }
    },
    edit: function(scope) {
      var clienteId = scope.params.id;

      return Cliente.find(clienteId).then(function(cliente) {
        scope.cliente = cliente;
        if(scope.query.error === 'already_used') {
          scope.inUseError = "Email e/ou CPF já cadastrados";
        }
      });
    },
    update: function(req, res) {
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
          res.redirect("/intranet/clientes/" + cliente.id);
        }, function(error) {
          console.log(error);
          res.redirect("/intranet/clientes/" + editedCliente.id + "/edit?error=already_used");
        });
    },
    create: function(req, res, next) {
      var cliente = req.body.cliente;

      cliente.password = generatePassword();

      return Cliente.create(cliente)
        .then(function(cliente) {
          res.redirect("/intranet/clientes/" + cliente.id);
        }, function(error) {
          console.log(error);
          res.redirect("/intranet/clientes/new?error=already_used");
        });
    },
    show: function(scope) {
      var clienteId = scope.params.id;

      return Cliente.find(clienteId).then(function(cliente) {
        scope.cliente = cliente;
      });
    },
    destroy: function(req, res, next) {
      var clienteId = req.params.id;

      return Cliente.find(clienteId)
        .then(function(cliente) {
          return cliente.delete();
        })
        .then(function(cliente) {
          res.redirect("/intranet/clientes/");
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
    "data_de_nascimento"
  ];

  return permittedParams;
}
