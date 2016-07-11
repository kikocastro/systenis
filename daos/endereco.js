module.exports = function(db, BasicDao) {
  var fields = [
		"cep",
		"rua",
		"numero",
		"complemento",
		"cidade",
		"estado",
		"cliente_id"
	];

  return new BasicDao({tableName: "enderecos", fieldNames: fields, db: db});
};