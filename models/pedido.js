var q = require('q');
var _ = require('lodash');

module.exports = function(daos, BasicModel, models) {
  var pedidoDao = daos.Pedido;
  var Pedido = new BasicModel(pedidoDao);
  
  Pedido.STATUS = {
    WAITING_PAYMENT_CONFIRMATION: "Aguardando pagamento",
    PAYMENT_CONFIRMED: "Pagamento Confirmado",
    READY_TO_SHIP: "Pronto para envio",
    IN_TRANSIT: "Em trânsito",
    DELIVERED: "Entregue",
    PARTIALLY_DELIVERED: "Parcialmente entregue",
    CANCELED: "Cancelado",
    RETURNED: "Devolvido",
    COMPENSATED: "Ressarcido"
  };

  // Pedido.createWithValidation = function(pedido) {
  //   var self = this;
  //   self.errors = [];
  //
  //   if(!validateWithBank(pedido)) {
  //     self.errors.push("")
  //     return self.create(pedido);
  //   }
  // };

  Pedido.prototype.setItems = function() {
    var self = this;
    var Produto = models().Produto;
    var Item = models().Item;

    return Item.where({pedido_id: self.id})
      .then(function(itens) {

        self.itens = itens;
        self.totalItens = _.sum(_.map(itens, 'quantidade'));

        var produtoIds = _.map(self.itens, function(item) {
          return { id: item.produto_id };
        });

        return Produto.where(produtoIds);
      })
      .then(function(produtos) {

        _.each(self.itens, function(item) {
          item.produto = _.find(produtos, {id: item.produto_id});
          item.total = (item.produto.preco * item.quantidade).toFixed(2);
        });

        self.totalDaCompra = _.sum(_.map(self.itens, 'total')).toFixed(2);

        return self;
      });
  };


  return Pedido;
};

// function validateWithBank(pedido) {
//   console.log("@@@ validate", pedido);
//   if(pedido.forma_de_pagamento === 'cartao') {
//     return pedido.data_de_expiracao_do_cartao.length && pedido.nome_no_cartao.length && pedido.numero_do_cartao.length;
//   }
// }