var q = require("q");

module.exports = function(daos, BasicModel) {
  var funcionarioDao = daos.Funcionario;
  var Funcionario = new BasicModel(funcionarioDao)

  Funcionario.PAPEIS = {
    ADMIN: "Administrador",
    COMERCIAL: "Funcionário do Comercial",
    SUPERVISOR_DE_SAIDA: "Supervisor do Controle de Saída",
    SAIDA: "Funcionário do Controle de Saída"
  };

  return Funcionario;
};
