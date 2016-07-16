var _ = require("lodash");

module.exports = function(models) {
  var Endereco = models.Endereco;

  return {
    index: function(scope) {
      var clienteId = scope.session.currentUser.id;
      
      return Endereco.where({cliente_id:clienteId}).then(function(enderecos) {
        scope.enderecos = enderecos;
      });
    },

    edit: function(scope) {
      var enderecoId = scope.params.id;

      return Endereco.find(enderecoId).then(function(endereco) {
        scope.endereco = endereco;
      });
    },

    new: function(scope) {

    },

    update: function(req, res) {
      var editedEndereco = req.body.endereco;
      var permittedParams = getPermittedParams();
      var enderecoId = editedEndereco.id;

      return Endereco.find(enderecoId)
        .then(function(endereco) {

          _.each(permittedParams, function(param) {
            endereco[param] = editedEndereco[param];
          });

          return endereco.save();
        })
        .then(function(endereco) {
          res.redirect("/cliente/enderecos/" + endereco.id);
        });
    },

    create: function(req, res, next) {
      var endereco = req.body.endereco;

      return Endereco.create(endereco).then(function(endereco) {
          res.redirect("/cliente/enderecos/" + endereco.id);
        });
    },

    show: function(scope) {
      var enderecoId = scope.params.id;

      return Endereco.find(enderecoId).then(function(endereco) {
        scope.endereco = endereco;
      });
    }

  };
};

function getPermittedParams() {

  var permittedParams = [
    "cep",
    "numero",
    "cidade",
    "rua",
    "complemento",
    "estado"
  ];

  return permittedParams;
}
