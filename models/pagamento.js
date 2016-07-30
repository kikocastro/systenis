var q = require('q');
var _ = require('lodash');

module.exports = function(daos, BasicModel) {
  var pagamentoDao = daos.Pagamento;
  var Pagamento = new BasicModel(pagamentoDao);

  Pagamento.FORMAS = {
    CARTAO: "Cartão de Crédito",
    BOLETO: "Boleto Bancário"
  };
  
  return Pagamento;
};
