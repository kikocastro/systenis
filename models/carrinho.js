var _ = require("lodash");

module.exports = function(daos, BasicModel, models) {
  var carrinhoDao = daos.Carrinho;
  var Carrinho = new BasicModel(carrinhoDao);

  Carrinho.prototype.populateItems = function() {
    var self = this;
    var Produto = models().Produto;
    
    var produto_ids = _.map(self.itens, function(item) {
      return {id: item.produto_id};
    });

    return Produto.where(produto_ids)
      .then(function(produtos) {
        _.each(self.itens, function(item) {
          item.produto = _.find(produtos, {id: item.produto_id});
          item.total = (item.produto.preco * item.quantidade).toFixed(2);
        });
        
        self.totalDaCompra = _.sum(_.map(self.itens, 'total')).toFixed(2);
        
        return self;
      });
  };
  
  return Carrinho;
};
