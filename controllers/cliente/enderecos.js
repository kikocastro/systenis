var _ = require("lodash");

module.exports = function(models) {
  var Endereco = models.Endereco;

  return {
    index: function(scope) {
      var clienteId = scope.session.currentUser.id;
      
      if(scope.query.error === 'max_number') {
        scope.maxError = "Número máximo de endereços permitdo é 3 por cliente.";
      }

      return Endereco.where({cliente_id:clienteId}).then(function(enderecos) {
        scope.enderecos = enderecos;
        scope.showNewEnderecoButton = enderecos.length < 3;
      });
    },

    edit: function(scope) {
      var enderecoId = scope.params.id;

      return Endereco.find(enderecoId).then(function(endereco) {
        scope.endereco = endereco;
      });
    },

    new: function(scope) {
      var clienteId = scope.currentUser.id;

      return Endereco.where({cliente_id: clienteId}).then(function(enderecos) {
        if (enderecos.length > 2) {
          var errorMsg = "max_number";
          console.log(errorMsg)
          res.redirect("/cliente/enderecos?error=" + encodeURIComponent(errorMsg));
        }
      });
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
      endereco.cliente_id = req.session.currentUser.id;

      return Endereco.where({cliente_id: endereco.cliente_id}).then(function(enderecos) {
        if(enderecos.length > 2) {
          return false;
        }

        return Endereco.create(endereco);
      })
      .then(function(endereco) {
        if(!endereco) {
          var errorMsg = "max_number";
          console.log(errorMsg)
          res.redirect("/cliente/enderecos?error=" + encodeURIComponent(errorMsg));
        }
        res.redirect("/cliente/enderecos/new" + endereco.id);
      });
    },

    show: function(scope) {
      var enderecoId = scope.params.id;

      return Endereco.find(enderecoId).then(function(endereco) {
        scope.endereco = endereco;
      });
    },

    destroy: function(req, res, next) {
      var enderecoId = req.params.id;

      return Endereco.find(enderecoId)
        .then(function(endereco) {
          return endereco.delete();
        })
        .then(function(endereco) {
          res.redirect("/cliente/enderecos");
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
