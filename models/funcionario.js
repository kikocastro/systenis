var q = require("q");

module.exports = function(daos, BasicModel) {
  var funcionarioDao = daos.Funcionario;
  var Funcionario = new BasicModel(funcionarioDao);

  return Funcionario;
};
