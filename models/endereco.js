var q = require("q");

module.exports = function(daos, BasicModel) {
  var enderecoDao = daos.Endereco;
  var Endereco = new BasicModel(enderecoDao);

  return Endereco;
};
