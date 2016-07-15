var q = require("q");

module.exports = function(daos, BasicModel) {
  var cortesiaDao = daos.Cortesia;
  var Cortesia = new BasicModel(cortesiaDao);

  Cortesia.prototype.getPriceWithDiscount = function(produtoPreco) {
  	var self = this;
    produtoPreco =parseFloat(produtoPreco);

    if(self.tipo === "porcentagem"){
      console.log("@@@", produtos,parseFloat(self.porcentagem)/100 )
      var newPrice = produtoPreco - (produtoPreco * parseFloat(self.porcentagem)/100);
  		return newPrice.toFixed(2);
  	}
  	return produtoPreco;
  };

  return Cortesia;
};
