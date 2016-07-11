module.exports = function(models) {
  var Transportadora = models.Transportadora;

  return {
    calculaFrete: function(req, res) {
      var cep = req.query.cep;
      
      return res.json(Transportadora.calculaFrete(cep));
    }

  };

};


