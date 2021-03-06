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
    var query = "SELECT funcionarios.id as func_id, COUNT (*) as total FROM funcionarios LEFT OUTER JOIN pedidos ON (funcionarios.id = pedidos.funcionario_id) WHERE papel = 'saida' GROUP BY func_id ORDER BY total LIMIT 1;"

    return self._dao.query(query)
    .then(function(result) {
      return _.result(_.first(_.result(result, 'rows')), 'func_id');
    })
    .then(function(id) {
      if(!id) {
        return self._dao.where({papel: 'saida'});
      }

      return id;
    })
    .then(function(res) {
      if(_.isNumber(res)) {
        // id
        return res;
      }

      var funcionarios = _.first(_.result(res, 'rows'));
      // funcionario

      return _.result(funcionarios, 'id');
    });
  };

  return Funcionario;
};
