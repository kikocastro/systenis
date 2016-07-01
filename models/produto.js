var q = require("q");

module.exports = function(daos, BasicModel) {
  var produtoDao = daos.Produto;
  var Produto = new BasicModel(produtoDao);

  return Produto;
};
