module.exports = function(daos, BasicModel) {
  var pedidoDao = daos.Pedido;
  var Pedido = new BasicModel(pedidoDao);
  
  return Pedido;
};
