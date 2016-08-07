var q = require("q");
var _ = require("lodash");

module.exports = function(daos, BasicModel, models) {
  var funcionarioDao = daos.Funcionario;
  var Funcionario = new BasicModel(funcionarioDao)

  Funcionario.PAPEIS = {
    ADMIN: "Administrador",
    COMERCIAL: "Funcionário do Comercial",
    SUPERVISOR_DE_SAIDA: "Supervisor do Controle de Saída",
    SAIDA: "Funcionário do Controle de Saída"
  };

  Funcionario.getAvailable = function() {
    var self = this;
    var query = "SELECT funcionario_id, COUNT(funcionario_id) FROM pedidos GROUP BY funcionario_id ORDER BY SUM(funcionario_id) LIMIT 1;"

    return self._dao.query(query).then(function(result) {
      console.log("@@", result);
      return _.result(_.first(_.result(result, 'rows')), 'funcionario_id');
    });
  };

  return Funcionario;
};
