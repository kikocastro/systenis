var q = require("q");

module.exports = function(daos, BasicModel) {
  var cortesiaDao = daos.Cortesia;
  var Cortesia = new BasicModel(cortesiaDao);

  Cortesia.prototype.getPriceWithDiscount = function(produtoPreco) {
  	var self = this;

    produtoPreco =parseFloat(produtoPreco);

    if(self.tipo === "porcentagem"){
      var newPrice = produtoPreco - (produtoPreco * self.porcentagem/100);
  		return newPrice.toFixed(2);
  	}
  	return produtoPreco;
  };

  return Cortesia;
};
