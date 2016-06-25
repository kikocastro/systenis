module.exports = function(models) {
  var Cliente = models.Cliente;

  return {
    show: function(req, res, next) {
      scope.cliente = req.body.cliente;
    }

  };

};


