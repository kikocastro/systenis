var moment = require("moment");

module.exports = function() {

  var Transportadora = {};

  Transportadora.calculaFrete = function(cep) {
    var valores = {
      0: 10,
      1: 12,
      2: 15,
      3: 20,
      4: 25
    };
    var reference = valores[cep % 5];

    var freteInformation = {
      price: reference.toFixed(2),
      arrivalDateEstimation: moment().add(reference, 'days').format('L')
    };
    
    return freteInformation;
  };

  return Transportadora;
};
