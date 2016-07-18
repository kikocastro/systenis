var _ = require("lodash");

module.exports = function(daos, BasicModel, models) {
  var carrinhoDao = daos.Carrinho;
  var Carrinho = new BasicModel(carrinhoDao);

  Carrinho.prototype.populateItems = function() {
    var self = this;
    var Produto = models().Produto;
    var Cortesia = models().Cortesia;
    
    var porcentagem = 0;

    var produto_ids = _.map(self.itens, function(item) {
      return {id: item.produto_id};
    });

    return Cortesia.where({ativa:true})
      .then(function(cortesias) {
          var cortesia = _.first(cortesias);        
          if(!_.isEmpty(cortesia)) {
              porcentagem = cortesia.porcentagem;
          }
      })
      .then(function() {
        return Produto.where(produto_ids)
      })
      .then(function(produtos) {
        _.each(self.itens, function(item) {
          item.produto = _.find(produtos, {id: item.produto_id});
          item.desconto = (porcentagem/100 * item.produto.preco).toFixed(2);
          item.total = ((item.produto.preco - item.desconto) * item.quantidade).toFixed(2);
        });
        
        self.totalDaCompra = _.sum(_.map(self.itens, 'total')).toFixed(2);
        
        return self;
      });
  };
  
  return Carrinho;
};
