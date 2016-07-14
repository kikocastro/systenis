var q = require("q");

module.exports = function(daos, BasicModel) {
  var cortesiaDao = daos.Cortesia;
  var Cortesia = new BasicModel(cortesiaDao);

  Cortesia.calculaCortesia = function(produtoPreco) {
  	var self = this;
  	if(self.tipo == "porcentagem"){
  		return produtoPreco - self.porcentagem/100 * produtoPreco;
  	}
  	return produtoPreco;
  }; 

  return Cortesia;
};
