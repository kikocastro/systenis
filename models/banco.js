var moment = require("moment");

module.exports = function() {

  var Banco = {};

  Banco.geraBoleto = function(pedido) {
    var boleto = {
      valorTotal: pedido.valor_total,
      favorecido: "Banco PCS",
      vencimento: moment().add(4, 'days').format('L'),
      codigoDeBarras: Math.floor(Math.random() * 111111111111111) + 999999999999999
    };
    
    return boleto;
  };

  return Banco;
};
