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
    
    return valores[cep % 5].toFixed(2);
  };

  return Transportadora;
};
