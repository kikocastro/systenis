var q = require("q");

module.exports = function(daos, BasicModel) {
  var produtoDao = daos.Produto;
  var Produto = new BasicModel(produtoDao);
  
  Produto.prototype.setPrecoComDesconto = function() {
    var self = this;
    var Cortesia = models().Cortesia;
    self.precoComDesconto = self.preco - Cortesia.calculaDesconto(self.preco);	
  };
  return Produto;
};
