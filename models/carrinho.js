var q = require("q");

module.exports = function(daos, BasicModel) {
  var carrinhoDao = daos.Carrinho;
  var Carrinho = new BasicModel(carrinhoDao);

  return Carrinho;
};
