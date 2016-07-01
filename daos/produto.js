module.exports = function(db, BasicDao) {
  var fields = [
		"nome",
		"cores",
		"fabricante",
		"peso",
		"quantidade_estoque",
		"tamanho",
		"preco",
		"imagem"
	];

  return new BasicDao({tableName: "produtos", fieldNames: fields, db: db});
};