module.exports = function(models) {
  var Cliente = models.Cliente;

  return {
    show: function(scope) {
      scope.cliente = scope.session.currentUser;
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
          res.redirect("/cliente/perfil");
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
