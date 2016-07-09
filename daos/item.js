module.exports = function(db, BasicDao) {
  var fields = [
		"carrinho_id",
    "produto_id"
	];

  return new BasicDao({tableName: "itens", fieldNames: fields, db: db});
};