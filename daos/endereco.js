module.exports = function(db, BasicDao) {
  var fields = [
		"cep",
		"rua",
		"numero",
		"complemento",
		"cidade",
		"estado"
	];

  return new BasicDao({tableName: "enderecos", fieldNames: fields, db: db});
};