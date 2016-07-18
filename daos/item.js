module.exports = function(db, BasicDao) {
  var fields = [
	"carrinho_id",
    "produto_id",
    "pedido_id",
    "quantidade",
    "preco_unitario"
	];

  return new BasicDao({tableName: "itens", fieldNames: fields, db: db});
};