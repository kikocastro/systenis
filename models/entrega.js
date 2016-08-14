var q = require('q');
var _ = require('lodash');
var moment = require('moment');

module.exports = function(daos, BasicModel, models) {
  var entregaDao = daos.Entrega;
  var Entrega = new BasicModel(entregaDao);

  Entrega.createWithNotaFiscal = function (entrega, pedido) {
    var self = this;
    var createdEntrega;
    var Nota = models().Nota;
    var Cliente = models().Cliente;

    return self._dao.create(entrega)
      .then(function(res) {
        createdEntrega = _.first(_.result(res, 'rows'));
        
        return Cliente.find(pedido.cliente_id);
      })
      .then(function (cliente) {

        var notaFiscal = {
          entrega_id: createdEntrega.id,
          emissao: moment().format('YYYY-MM-DD hh:mm:ss'),
          nome: cliente.nome,
          cpf: cliente.cpf,
          valor: pedido.valor_total,
          descricao: "Compra na loja Systênis"
        };
        
        return Nota.create(notaFiscal);
      })
      .then(function(notaFiscal) {
        createdEntrega.notaFiscal = notaFiscal;

        return createdEntrega;
      })
  };

  return Entrega;
};