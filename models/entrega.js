var q = require('q');
var _ = require('lodash');

module.exports = function(daos, BasicModel, models) {
  var entregaDao = daos.Entrega;
  var Entrega = new BasicModel(entregaDao);

  return Entrega;
};