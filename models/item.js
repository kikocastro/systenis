module.exports = function(daos, BasicModel) {
  var itemDao = daos.Item;
  var Item = new BasicModel(itemDao);

  Item.findOrCreate = function(carrinhoId, produtoId) {
    var self = this;

    return self._dao.where([
      {carrinho_id: carrinhoId, produto_id: produtoId}
    ]).then(function(result) {
      if(result.rows.length == 0) {
        // If not found, it's the first time a client is clicking on buy button, therefore, 
        // quantity must be 1
        return self.create({carrinho_id: carrinhoId, produto_id: produtoId, quantidade: 1});
      }
      else {
        var item = new Item(result.rows[0]);
        
        return item;
      }
    });
  };

  return Item;
};
